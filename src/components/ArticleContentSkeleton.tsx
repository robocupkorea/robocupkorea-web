export default function ArticleContentSkeleton() {
  return (
    <section className="container mx-auto max-w-3xl px-4 py-8 md:px-8 xl:px-20">
      <div className="animate-pulse space-y-6">
        {/* 제목 */}
        <div className="h-10 w-3/4 rounded bg-gray-200"></div>

        {/* 본문 3줄 */}
        <div className="space-y-2">
          <div className="h-6 w-full rounded bg-gray-200"></div>
          <div className="h-6 w-full rounded bg-gray-200"></div>
          <div className="h-6 w-full rounded bg-gray-200"></div>
        </div>
      </div>
    </section>
  );
}
