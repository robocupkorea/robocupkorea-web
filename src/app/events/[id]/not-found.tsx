import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-16">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">
          이벤트를 찾을 수 없습니다
        </h1>
        <p className="mt-4 text-gray-600">
          요청하신 이벤트가 존재하지 않습니다.
        </p>
        <Link
          href="/events"
          className="mt-6 inline-block bg-black px-4 py-2 text-white hover:bg-gray-800"
        >
          이벤트 목록으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
