import { NotionToMarkdown } from "notion-to-md";

import { notion } from "@/lib/notion/client";

export const n2m = new NotionToMarkdown({ notionClient: notion });

export async function convertPage(pageId: string) {
  const mdblocks = await n2m.pageToMarkdown(pageId);
  const mdString = n2m.toMarkdownString(mdblocks);
  return mdString.parent;
}
