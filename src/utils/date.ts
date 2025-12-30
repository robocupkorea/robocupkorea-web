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

  // Date object는 언어만 변경할 뿐 시간대를 변경하지 않는다.

  // Intl API를 사용하여 타임존을 'Asia/Seoul'로 고정
  // 서버 지역과 무관하게 한국 시간으로 변환
  const options: Intl.DateTimeFormatOptions = {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
  };

  // 한국 시간 기준으로 포맷팅된 문자열 획득
  const formatter = new Intl.DateTimeFormat(locale, options);

  const parts = formatter.formatToParts(date);

  const findPart = (type: string) => parts.find((p) => p.type === type)?.value;

  const year = findPart("year");
  const month = findPart("month");
  const day = findPart("day");
  const weekday = findPart("weekday");

  return `${year}.${month}.${day}(${weekday})`;
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
