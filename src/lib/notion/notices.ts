import { isFullPage } from "@notionhq/client";
import {
  BlockObjectResponse,
  PageObjectResponse,
  PartialBlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

import { notion } from "@/lib/notion/client";
import { Notice } from "@/types/notice";

/**
 * Notice에 필요한 속성이 모두 있는지 확인
 */
type NoticeProps = {
  Title: { type: "title"; title: Array<{ plain_text: string }> };
  CreatedAt: { type: "created_time"; created_time: string };
};

function hasNoticeProps(
  page: PageObjectResponse,
): page is PageObjectResponse & { properties: NoticeProps } {
  const p = page.properties as Record<string, { type: string }>;
  return (
    "Title" in p &&
    p.Title.type === "title" &&
    "CreatedAt" in p &&
    p.CreatedAt.type === "created_time"
  );
}

export interface NoticePage {
  notice: Notice;
  blocks: Array<BlockObjectResponse | PartialBlockObjectResponse>;
}

/**
 * Notion 공지사항 목록 조회
 * @returns 공지사항 목록
 */
export async function getNotices(): Promise<Notice[]> {
  try {
    const { results } = await notion.databases.query({
      database_id: process.env.NOTION_NOTICES_TABLE_ID!,
      filter: { property: "Status", select: { equals: "Published" } },
      sorts: [{ property: "CreatedAt", direction: "descending" }],
    });

    return results
      .filter(isFullPage) // 타입 가드
      .filter(hasNoticeProps) // Notice에 필요한 속성이 모두 있는지 확인
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
  if (!isFullPage(response) || !hasNoticeProps(response)) return null;

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
  page: PageObjectResponse & { properties: NoticeProps },
): Notice {
  const { Title, CreatedAt } = page.properties;
  return {
    id: page.id,
    title: Title.title[0]?.plain_text ?? "제목 없음",
    createdAt: CreatedAt.created_time,
  };
}
