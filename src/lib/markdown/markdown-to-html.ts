import rehypeExternalLinks from "rehype-external-links";
import rehypeHighlight from "rehype-highlight";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

/**
 * Markdown 문자열을 HTML 문자열로 변환
 * @param markdown - 마크다운 원본
 * @returns HTML 문자열
 */
export async function convertMarkdownToHtml(markdown: string): Promise<string> {
  const result = await unified()
    .use(remarkParse) // Markdown을 Markdown AST로 변환
    .use(remarkGfm) // GitHub Flavored Markdown 지원
    .use(remarkRehype) // Markdown AST를 HTML AST로 변환
    .use(rehypeSanitize) // XSS 방지
    .use(rehypeExternalLinks, {
      target: "_blank",
      rel: ["noopener", "noreferrer"],
      test: (node) => {
        const href = node.properties?.href;

        // href가 없거나 문자열이 아니면 처리하지 않음
        if (typeof href !== "string") return false;

        // robocupkorea.org가 포함된 주소는 내부 링크로 간주하여 해당 탭에서 navigate 되도록 함
        if (href.includes("robocupkorea.org")) return false;

        // http:// 또는 https:// 로 시작하지 않는 경우(상대 경로 /, 앵커 #, 메일 mailto:)는 처리하지 않음
        if (!/^https?:\/\//.test(href)) return false;

        // 위 조건에 걸리지 않으면 외부 링크로 간주하여 target="_blank" 적용
        return true;
      },
    })
    .use(rehypeHighlight) // 코드 하이라이트 지원
    .use(rehypeStringify) // HTML AST를 HTML 문자열로 변환
    .process(markdown);

  // 이메일을 <a> 태그가 아닌 일반 텍스트로 변환
  const html = String(result).replace(
    /<a[^>]*href=["']mailto:([^"']+)["'][^>]*>(.*?)<\/a>/gi,
    "$2",
  );

  return html;
}
