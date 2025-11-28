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
