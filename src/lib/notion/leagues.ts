import { isFullPage } from "@notionhq/client";
import {
  BlockObjectResponse,
  PageObjectResponse,
  PartialBlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

import { notion } from "@/lib/notion/client";
import { LeagueDivision } from "@/types/leagues";

/**
 * Notion 리그 페이지에서 League에 필요한 속성이 모두 있는지 확인
 */
type NotionLeagueDivisionProps = {
  Name: { type: "title"; title: Array<{ plain_text: string }> };
  LeagueId: { type: "number"; number: number | null };
  Slug: { type: "rich_text"; rich_text: Array<{ plain_text: string }> };
  ImageUrl: { type: "url"; url: string | null };
};

function hasNotionLeagueDivisionProps(
  page: PageObjectResponse,
): page is PageObjectResponse & { properties: NotionLeagueDivisionProps } {
  const p = page.properties as Record<string, { type: string }>;

  return (
    "Name" in p &&
    p.Name.type === "title" &&
    "LeagueId" in p &&
    p.LeagueId.type === "number" &&
    "Slug" in p &&
    p.Slug.type === "rich_text" &&
    "ImageUrl" in p &&
    p.ImageUrl.type === "url"
  );
}

/**
 * Notion 리그 페이지, 마크다운 블록
 */
export interface LeagueDivisionPage {
  leagueDivision: LeagueDivision; // 리그 타입
  blocks: Array<BlockObjectResponse | PartialBlockObjectResponse>; // 리그 페이지 마크다운 블록
}

/**
 * Notion 리그 페이지 조회
 * @param leagueId 리그 ID
 * @param leagueDivisionSlug 리그 페이지 Slug
 * @returns 리그 페이지
 */
export async function getLeagueDivisionPage(
  leagueId: number,
  leagueDivisionSlug: string,
): Promise<LeagueDivisionPage | null> {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_LEAGUES_DATABASE_ID!,
    filter: {
      and: [
        {
          property: "LeagueId",
          number: { equals: leagueId }, // 리그 ID
        },
        {
          property: "Slug",
          rich_text: { equals: leagueDivisionSlug }, // 리그 상세 Slug
        },
      ],
    },
  });

  // 타입 가드
  if (
    !isFullPage(response.results[0]) ||
    !hasNotionLeagueDivisionProps(response.results[0])
  )
    return null;

  const leagueDivision = mapPageToLeagueDivision(response.results[0]);

  const blocks: LeagueDivisionPage["blocks"] = [];
  let cursor: string | undefined;

  do {
    const { results, next_cursor, has_more } =
      await notion.blocks.children.list({
        block_id: leagueDivision.id,
        page_size: 100,
        start_cursor: cursor,
      });
    blocks.push(...results);
    cursor = has_more ? (next_cursor ?? undefined) : undefined;
  } while (cursor);

  return { leagueDivision, blocks };
}

/**
 * Notion 공지사항 페이지를 Notice 타입으로 변환
 * @param page 공지사항 페이지
 * @returns 공지사항
 */
function mapPageToLeagueDivision(
  page: PageObjectResponse & { properties: NotionLeagueDivisionProps },
): LeagueDivision {
  const { Name, LeagueId, Slug, ImageUrl } = page.properties;

  return {
    id: page.id,
    leagueId: LeagueId.number ?? 0,
    slug: Slug.rich_text[0]?.plain_text ?? "",
    name: Name.title[0]?.plain_text ?? "",
    imageUrl: ImageUrl.url ?? "",
  };
}
