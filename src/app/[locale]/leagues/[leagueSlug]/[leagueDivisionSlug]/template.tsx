import { Suspense } from "react";
import ArticleContentSkeleton from "@/components/ArticleContentSkeleton";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    // suspense로 로딩 경계를 생성
    <Suspense fallback={<ArticleContentSkeleton />}>
      {/* fallback이 사라지면 animate-fade-in이 적용된 page가 렌더링됨 */}
      <div className="animate-fade-in">{children}</div>
    </Suspense>
  );
}
