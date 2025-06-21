"use client";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-16">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">
          공지사항을 불러올 수 없습니다
        </h1>
        <p className="mt-4 text-gray-600">
          공지사항을 불러오는 중 오류가 발생했습니다.
        </p>
        <button
          onClick={reset}
          className="mt-6 bg-black px-4 py-2 text-white hover:bg-gray-800"
        >
          다시 시도
        </button>
      </div>
    </div>
  );
}
