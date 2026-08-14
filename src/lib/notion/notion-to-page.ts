import { isFullBlock } from "@notionhq/client";
import {
  BlockObjectResponse,
  PartialBlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

import { notion } from "@/lib/notion/client";

export interface NotionBlock {
  block: BlockObjectResponse;
  children: NotionBlock[];
}

async function getBlockChildren(
  blockId: string,
): Promise<Array<BlockObjectResponse | PartialBlockObjectResponse>> {
  const blocks: Array<BlockObjectResponse | PartialBlockObjectResponse> = [];
  let cursor: string | undefined;

  do {
    const response = await notion.blocks.children.list({
      block_id: blockId,
      page_size: 100,
      start_cursor: cursor,
    });
    blocks.push(...response.results);
    cursor = response.has_more
      ? (response.next_cursor ?? undefined)
      : undefined;
  } while (cursor);

  return blocks;
}

async function toNotionBlocks(
  blocks: Array<BlockObjectResponse | PartialBlockObjectResponse>,
): Promise<NotionBlock[]> {
  return Promise.all(
    blocks.filter(isFullBlock).map(async (block) => ({
      block,
      children: block.has_children
        ? await toNotionBlocks(await getBlockChildren(block.id))
        : [],
    })),
  );
}

/** 공식 Notion API로 페이지 블록을 가져온다. */
export async function getPageBlocks(
  pageId: string,
): Promise<NotionBlock[] | null> {
  try {
    return await toNotionBlocks(await getBlockChildren(pageId));
  } catch (error) {
    console.error("Error fetching Notion page blocks:", error);
    return null;
  }
}
