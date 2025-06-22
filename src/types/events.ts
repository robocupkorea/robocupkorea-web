export interface Event {
  id: number;
  slug: string;
  year: string;
  dateStart: string;
  dateEnd: string;
}

/**
 * TODO: event 데이터베이스 구조 참고
 *
 * CREATE TABLE event (
 *   id         INT AUTO_INCREMENT PRIMARY KEY,
 *   slug       VARCHAR(255) NOT NULL UNIQUE,
 *   year       VARCHAR(4) NOT NULL,
 *   date_start DATE NOT NULL,
 *   date_end   DATE NOT NULL
 * ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
 */

export interface EventDetail {
  id: string; // Notion Page ID
  eventId: number; // Event ID (Foreign Key)
  slug: string;
  title: string;
  location: string; // 장소
  address?: string; // 상세 주소
  posterImageUrl?: string;
  isMain: boolean; // 홈 페이지 랜딩에 표시
  isEvent: boolean; // 이벤트 페이지에 표시
}

/**
 * TODO: event_detail 데이터베이스 구조 참고
 *
 * CREATE TABLE event_detail (
 *   id         INT AUTO_INCREMENT PRIMARY KEY,
 *   event_id   INT NOT NULL,
 *   language   VARCHAR(5) NOT NULL,
 *   title      VARCHAR(255) NOT NULL,
 *   location   VARCHAR(255) NOT NULL,
 *   address    VARCHAR(255) NOT NULL,
 *   poster_image_url VARCHAR(255) NOT NULL,
 *   is_main   BOOLEAN NOT NULL,
 *   is_event BOOLEAN NOT NULL
 * ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
 */
