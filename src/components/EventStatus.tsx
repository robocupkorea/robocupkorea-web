export default function EventStatus({ status }: { status: string }) {
  switch (status) {
    case "UPCOMING":
      return (
        <span className="flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-2.5 py-1">
          <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
          <span className="text-sm font-medium text-green-700">개최 예정</span>
        </span>
      );
    case "ONGOING":
      return (
        <span className="flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-2.5 py-1">
          <div className="h-2.5 w-2.5 rounded-full bg-orange-500"></div>
          <span className="text-sm font-medium text-orange-700">진행중</span>
        </span>
      );
    case "ENDED":
      return (
        <span className="flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1">
          <div className="h-2.5 w-2.5 rounded-full bg-gray-400"></div>
          <span className="text-sm font-medium text-gray-600">종료</span>
        </span>
      );
    default:
      return null;
  }
}
