import { isFullPage } from "@notionhq/client";
import {
  BlockObjectResponse,
  PageObjectResponse,
  PartialBlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

import { notion } from "@/lib/notion/client";
import { EventDetail } from "@/types/events";

/**
 * Notion 대회 페이지에서 Event에 필요한 속성이 모두 있는지 확인
 */
type NotionEventDetailProps = {
  Title: { type: "title"; title: Array<{ plain_text: string }> };
  EventId: { type: "number"; number: number };
  Slug: { type: "rich_text"; rich_text: Array<{ plain_text: string }> };
  Location: { type: "rich_text"; rich_text: Array<{ plain_text: string }> };
  Address: { type: "rich_text"; rich_text: Array<{ plain_text: string }> };
  PosterImageUrl: { type: "url"; url: string };
  IsMain: { type: "checkbox"; checkbox: boolean };
  IsEvent: { type: "checkbox"; checkbox: boolean };
};

function hasEventProps(
  page: PageObjectResponse,
): page is PageObjectResponse & { properties: NotionEventDetailProps } {
  const p = page.properties as Record<string, { type: string }>;

  return (
    "Title" in p &&
    p.Title.type === "title" &&
    "EventId" in p &&
    p.EventId.type === "number" &&
    "Slug" in p &&
    p.Slug.type === "rich_text" &&
    "Location" in p &&
    p.Location.type === "rich_text" &&
    "Address" in p &&
    p.Address.type === "rich_text" &&
    "PosterImageUrl" in p &&
    p.PosterImageUrl.type === "url" &&
    "IsMain" in p &&
    p.IsMain.type === "checkbox" &&
    "IsEvent" in p &&
    p.IsEvent.type === "checkbox"
  );
}

interface EventPage {
  event: EventDetail;
  blocks: Array<BlockObjectResponse | PartialBlockObjectResponse>;
}

/**
 * Notion 대회 목록 조회
 * @returns 대회 목록
 */
export async function getEventDetails(): Promise<EventDetail[]> {
  try {
    const { results } = await notion.databases.query({
      database_id: process.env.NOTION_EVENTS_DATABASE_ID!,
      filter: {
        // 이벤트인 대회만 반환
        property: "IsEvent",
        checkbox: {
          equals: true,
        },
      },
    });

    return results
      .filter(isFullPage) // 타입 가드
      .filter(hasEventProps) // Event에 필요한 속성이 모두 있는지 확인
      .map(mapPageToEvent);
  } catch (err) {
    console.error("Error fetching getEventDetails:", err);
    return [];
  }
}

/**
 * Notion 대회 상세 페이지 조회
 * @param id 대회 상세 페이지 ID
 * @returns 대회 상세 페이지
 */
export async function getEventDetailPage(
  id: string,
): Promise<EventPage | null> {
  const response = await notion.pages.retrieve({ page_id: id });

  // 타입 가드
  if (!isFullPage(response) || !hasEventProps(response)) return null;

  // 이벤트인 대회만 반환
  if (response.properties.IsEvent?.checkbox !== true) return null;

  const event = mapPageToEvent(response);

  const blocks: EventPage["blocks"] = [];
  let cursor: string | undefined;

  do {
    const { results, next_cursor, has_more } =
      await notion.blocks.children.list({
        block_id: id,
        page_size: 100,
        start_cursor: cursor,
      });
    blocks.push(...results);
    cursor = has_more ? (next_cursor ?? undefined) : undefined;
  } while (cursor);

  return { event, blocks };
}

/**
 * Notion 대회 페이지를 EventDetail 타입으로 변환
 * @param page 대회 페이지
 * @returns 대회 페이지
 */
function mapPageToEvent(
  page: PageObjectResponse & { properties: NotionEventDetailProps },
): EventDetail {
  const {
    Title,
    EventId,
    Slug,
    Location,
    Address,
    PosterImageUrl,
    IsMain,
    IsEvent,
  } = page.properties;

  return {
    id: page.id, // Notion Page ID
    title: Title.title[0]?.plain_text ?? "",
    eventId: EventId.number ?? 0,
    slug: Slug.rich_text[0]?.plain_text ?? "",
    location: Location.rich_text[0]?.plain_text ?? "",
    address: Address.rich_text[0]?.plain_text ?? "",
    posterImageUrl: PosterImageUrl.url ?? "",
    isMain: IsMain.checkbox,
    isEvent: IsEvent.checkbox,
  };
}
