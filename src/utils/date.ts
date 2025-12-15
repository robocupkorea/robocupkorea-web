/**
 * 입력이 Date면 그대로, 문자열이면 Date로 변환하는 helper 함수
 */
const ensureDate = (date: string | Date): Date => {
  return typeof date === "string" ? new Date(date) : date;
};

/**
 * 날짜와 요일을 포맷팅하는 함수
 * yyyy-mm-dd -> yyyy.mm.dd(d)
 */
export const formatDate = (dateInput: string | Date, locale: string) => {
  if (!dateInput) return "";

  const date = ensureDate(dateInput);

  // 날짜 포맷팅 (YYYY.MM.DD)
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const formattedDate = `${year}.${month}.${day}`;

  // 요일 포맷팅 (Short)
  const weekday = date.toLocaleDateString(locale, { weekday: "short" });

  return `${formattedDate}(${weekday})`;
};

/**
 * ISO 날짜 형식을 한국 날짜 형식으로 변환
 * yyyy-mm-ddThh:mm:ss.000Z -> yyyy.mm.dd hh:mm
 */
export const formatISODate = (dateInput: string | Date) => {
  if (!dateInput) return "";

  const date = ensureDate(dateInput);
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
  startDate: string | Date,
  endDate: string | Date,
  locale: string,
) => {
  if (!startDate) return "";

  // Date 객체 비교를 위해 숫자로 변환(getTime)해서 비교
  const start = ensureDate(startDate);
  const end = ensureDate(endDate);

  // 종료일이 없거나 시작일과 같으면 하나만 표시
  if (!endDate || start.getTime() === end.getTime()) {
    return formatDate(start, locale);
  }

  return `${formatDate(start, locale)} - ${formatDate(end, locale)}`;
};

/**
 * 이벤트 상태 반환 (진행중, 예정, 종료)
 */
export const getEventStatus = (
  startDate: string | Date,
  endDate: string | Date,
) => {
  const now = new Date();
  const start = ensureDate(startDate);
  const end = ensureDate(endDate);

  // 날짜 비교 (시간까지 포함됨에 주의, 필요시 setHours(0,0,0,0) 처리)
  if (now < start) {
    return "UPCOMING";
  } else if (now >= start && now <= end) {
    return "ONGOING";
  } else {
    return "ENDED";
  }
};
