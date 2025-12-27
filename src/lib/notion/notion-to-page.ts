import { NotionAPI } from "notion-client";

export async function convertPage(pageId: string) {
  try {
    const api = new NotionAPI({
      activeUser: process.env.NOTION_ACTIVE_USER,
      authToken: process.env.NOTION_TOKEN_V2,
    });

    const page = await api.getPage(pageId);
    return page;
  } catch (e) {
    console.error(e);
    return null;
  }
}
