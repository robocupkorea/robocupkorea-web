/**
 * 날짜와 요일을 포맷팅하는 함수
 * yyyy-mm-dd -> yyyy.mm.dd(d)
 */
export const formatDate = (dateString: string, locale: string) => {
  if (!dateString) return "";

  const date = new Date(dateString);

  const formattedDate = dateString.replaceAll("-", ".");
  const weekday = date.toLocaleDateString(locale, { weekday: "short" });
  return `${formattedDate}(${weekday})`;
};

/**
 * ISO 날짜 형식을 한국 날짜 형식으로 변환
 * yyyy-mm-ddThh:mm:ss.000Z -> yyyy.mm.dd hh:mm
 */
export const formatISODate = (isoDateString: string) => {
  if (!isoDateString) return "";

  const date = new Date(isoDateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}.${month}.${day}`;
};

/**
 * 날짜 범위를 포맷팅하는 함수
 * yyyy-mm-dd -> yyyy.mm.dd(d) - yyyy.mm.dd(d)
 */
export const formatDateRange = (
  startDate: string,
  endDate: string,
  locale: string,
) => {
  if (!startDate) return "";

  // endDate가 없거나 빈 문자열이면 시작 날짜만 반환
  if (!endDate || endDate === startDate) {
    return formatDate(startDate, locale);
  }

  return `${formatDate(startDate, locale)} - ${formatDate(endDate, locale)}`;
};

export const getEventStatus = (startDate: string, endDate: string) => {
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (now < start) {
    return "UPCOMING";
  } else if (now >= start && now <= end) {
    return "ONGOING";
  } else {
    return "ENDED";
  }
};
