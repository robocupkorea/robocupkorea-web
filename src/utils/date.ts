/*
 * 날짜와 요일을 포맷팅하는 함수
 */
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const formattedDate = dateString.replaceAll("-", ".");
  const weekday = date.toLocaleDateString("ko-KR", { weekday: "short" });
  return `${formattedDate}(${weekday})`;
};

/*
 * 날짜 범위를 포맷팅하는 함수
 */
export const formatDateRange = (startDate: string, endDate: string) => {
  if (!startDate) return "";

  // 날짜가 같으면 시작 날짜만 반환
  if (startDate === endDate) {
    return formatDate(startDate);
  }

  return `${formatDate(startDate)} - ${formatDate(endDate || startDate)}`;
};
