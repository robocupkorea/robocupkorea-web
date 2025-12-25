interface ProseArticleProps {
  id: string;
  htmlContent: string;
}

/**
 * HTML로 변환된 마크다운 콘텐츠를 표시하는 컴포넌트
 * @param id
 * @param htmlContent
 */
export default function ProseArticle({ id, htmlContent }: ProseArticleProps) {
  return (
    <article
      id={id}
      className={[
        "prose w-full break-keep max-sm:prose-sm",
        // 테이블 오버플로우
        "prose-table:!w-max", // 내용물만큼 확장
        "prose-table:!min-w-full", // 최소한 w-full

        "prose-table:my-1",
        "prose-th:bg-gray-50 prose-th:px-4 prose-th:py-3 prose-td:px-4 prose-td:py-3",
        "prose-a:font-bold prose-a:text-blue-600 prose-a:underline-offset-2",
        "max-sm:leading-[1.3rem] max-sm:prose-h1:text-2xl sm:leading-[1.5rem] sm:prose-h1:text-3xl",
      ].join(" ")}
      dangerouslySetInnerHTML={{
        __html: htmlContent,
      }}
    />
  );
}
