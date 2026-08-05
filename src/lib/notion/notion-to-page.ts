import { NotionAPI } from "notion-client";

export async function convertPage(pageId: string) {
  try {
    const api = new NotionAPI({
      activeUser: process.env.NOTION_ACTIVE_USER,
      authToken: process.env.NOTION_TOKEN_V2,
      // Notion의 봇 차단(Cloudflare)이 User-Agent 없는 서버 요청을 403으로 막기 때문에 브라우저 UA를 명시
      ofetchOptions: {
        headers: {
          "user-agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        },
      },
    });

    const page = await api.getPage(pageId);
    return page;
  } catch (e) {
    console.error(e);
    return null;
  }
}
