import { NotionAPI } from "notion-client";

export async function convertPage(pageId: string) {
  const api = new NotionAPI({ authToken: process.env.NOTION_TOKEN });

  const page = await api.getPage(pageId);
  return page;
}
