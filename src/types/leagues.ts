export interface League {
  id: number;
  slug: string; // 경로로 사용, unique 필요
  name: string;
}

/**
 * TODO: league 데이터베이스 구조 참고
 *
 * CREATE TABLE leagues (
 *   id          INT AUTO_INCREMENT PRIMARY KEY,
 *   slug        VARCHAR(255) NOT NULL UNIQUE,
 *   name        VARCHAR(255) NOT NULL,
 * ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
 */

export interface LeagueDivision {
  id: string;
  leagueId: number;
  slug: string; // league와 조합하여 경로로 사용, unique 불필요
  name: string;
  imageUrl: string;
}

/**
 * TODO: league_division 데이터베이스 구조 참고
 *
 * CREATE TABLE league_divisions (
 *   id          INT AUTO_INCREMENT PRIMARY KEY,
 *   league_id   INT NOT NULL,
 *   slug        VARCHAR(255) NOT NULL,
 *   name        VARCHAR(255) NOT NULL,
 *   FOREIGN KEY (league_id) REFERENCES leagues(id) ON DELETE CASCADE
 * ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
 */
