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
        "prose w-full max-w-none max-md:prose-sm",
        "prose-a:font-bold prose-a:text-blue-600 prose-a:underline-offset-2",
        "prose-hr:my-3.5",
        "prose-table:block prose-table:max-w-full prose-table:overflow-x-auto prose-table:whitespace-nowrap",
        "max-md:leading-[1.1rem] max-md:prose-h1:text-2xl md:leading-[1.25rem] md:prose-h1:text-3xl",
      ].join(" ")}
      dangerouslySetInnerHTML={{
        __html: htmlContent,
      }}
    />
  );
}
