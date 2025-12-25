import type { Element, Root } from "hast";
import rehypeExternalLinks from "rehype-external-links";
import rehypeHighlight from "rehype-highlight";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { visit } from "unist-util-visit";

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

    // 커스텀 변환 플러그인
    .use(rehypeWrapTable) // Table Wrap
    .use(rehypeUnwrapMailto) // 메일 링크 제거

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

  return String(result);
}

/**
 * <table>을
 * <div class="overflow-x-auto">
 *   <table>...</table>
 * </div>
 * 형태로 감싸는 rehype 플러그인
 */
function rehypeWrapTable() {
  return (tree: Root) => {
    visit(tree, "element", (node, index, parent) => {
      if (node.tagName !== "table") return; // table 태그가 아니면 무시
      if (typeof index !== "number") return; // index 없으면 교체 불가
      if (!parent) return; // parent 없으면 교체 불가

      // 새로운 div element를 만들어 삽입
      const wrapper: Element = {
        type: "element",
        tagName: "div",
        properties: {
          className: ["overflow-x-auto"],
        },
        children: [node],
      };

      parent.children[index] = wrapper;
    });
  };
}

/**
 * mailto 링크를 비활성화하는 rehype 플러그인
 *
 * <a href="mailto:test@test.com">text</a>
 * ↓
 * <span>text</span>
 */
function rehypeUnwrapMailto() {
  return (tree: Root) => {
    visit(tree, "element", (node, index, parent) => {
      if (node.tagName !== "a") return; // a 태그가 아니면 무시
      if (typeof index !== "number") return; // index 없으면 교체 불가
      if (!parent) return; // parent 없으면 교체 불가

      const href = node.properties?.href;
      if (typeof href !== "string" || !href.startsWith("mailto:")) return;

      // 새로운 span element를 만들어 교체
      const span: Element = {
        type: "element",
        tagName: "span",
        properties: {},
        children: node.children,
      };

      // 부모 children 배열에서 a를 span으로 교체
      parent.children[index] = span;
    });
  };
}
