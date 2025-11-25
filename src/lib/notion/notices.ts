import { isFullPage } from "@notionhq/client";
import {
  BlockObjectResponse,
  PageObjectResponse,
  PartialBlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

import { notion } from "@/lib/notion/client";
import { Notice } from "@/types/notice";

/**
 * Notion 공지사항 페이지에서 Notice에 필요한 속성이 모두 있는지 확인
 */
type NotionNoticeProps = {
  Title: { type: "title"; title: Array<{ plain_text: string }> };
  Date: { type: "date"; date: { start: string; end?: string } | null };
  Status?: { type: "select"; select: { name: string } | null }; // 발행 여부
};

function hasNotionNoticeProps(
  page: PageObjectResponse,
): page is PageObjectResponse & { properties: NotionNoticeProps } {
  const p = page.properties as Record<string, { type: string }>;
  return (
    "Title" in p &&
    p.Title.type === "title" &&
    "Date" in p &&
    p.Date.type === "date"
  );
}

/**
 * Notion 공지사항 페이지, 마크다운 블록
 */
export interface NoticePage {
  notice: Notice; // 공지사항 타입
  blocks: Array<BlockObjectResponse | PartialBlockObjectResponse>; // 공지사항 페이지 마크다운 블록
}

/**
 * Notion 공지사항 목록 조회
 * @returns 공지사항 목록
 */
export async function getNotices(locale: string): Promise<Notice[]> {
  try {
    const { results } = await notion.databases.query({
      database_id: process.env.NOTION_NOTICES_DATABASE_ID!,
      filter: {
        and: [
          { property: "Status", select: { equals: "Published" } },
          { property: "Locale", select: { equals: locale } },
        ],
      }, // 발행된 공지사항만 반환
      sorts: [{ property: "Date", direction: "descending" }], // 날짜 기준 내림차순 정렬
    });

    return results
      .filter(isFullPage) // 타입 가드
      .filter(hasNotionNoticeProps) // Notice에 필요한 속성이 모두 있는지 확인
      .map(mapPageToNotice);
  } catch (err) {
    console.error("Error fetching getNotices:", err);
    return [];
  }
}

/**
 * Notion 공지사항 페이지 조회
 * @param id 공지사항 페이지 ID
 * @returns 공지사항 페이지
 */
export async function getNoticePage(id: string): Promise<NoticePage | null> {
  const response = await notion.pages.retrieve({ page_id: id });

  // 타입 가드
  if (!isFullPage(response) || !hasNotionNoticeProps(response)) return null;

  // 발행된 공지사항만 반환
  if (response.properties.Status?.select?.name !== "Published") return null;

  const notice = mapPageToNotice(response);

  const blocks: NoticePage["blocks"] = [];
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

  return { notice, blocks };
}

/**
 * Notion 공지사항 페이지를 Notice 타입으로 변환
 * @param page 공지사항 페이지
 * @returns 공지사항
 */
function mapPageToNotice(
  page: PageObjectResponse & { properties: NotionNoticeProps },
): Notice {
  const { Title, Date: DateProperty } = page.properties;
  return {
    id: page.id,
    title: Title.title[0]?.plain_text ?? "제목 없음",
    date: DateProperty.date?.start ?? "2025-01-01",
  };
}
