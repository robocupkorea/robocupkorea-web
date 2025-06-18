export interface League {
  id: number;
  slug: string; // 경로로 사용, unique 필요
  name: string;
  description: string;
}

/*
 * CREATE TABLE leagues (
 *   id          INT AUTO_INCREMENT PRIMARY KEY,
 *   slug        VARCHAR(255) NOT NULL UNIQUE,
 *   name        VARCHAR(255) NOT NULL,
 *   description TEXT
 * ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
 */

export const leagueData: League[] = [
  {
    id: 1,
    slug: "robocup-soccer",
    name: "RoboCupSoccer",
    description: "League 1 description",
  },
  {
    id: 2,
    slug: "robocup-rescue",
    name: "RoboCupRescue",
    description: "League 2 description",
  },
  {
    id: 3,
    slug: "robocup-home",
    name: "RoboCup@Home",
    description: "League 3 description",
  },
  {
    id: 4,
    slug: "robocup-industrial",
    name: "RoboCupIndustrial",
    description: "League 4 description",
  },
  {
    id: 5,
    slug: "robocup-junior",
    name: "RoboCupJunior",
    description: "League 5 description",
  },
  {
    id: 6,
    slug: "robocup-asia-pacific",
    name: "RoboCupAsiaPacific",
    description: "League 6 description",
  },
  {
    id: 7,
    slug: "robocup-junior-korea",
    name: "RoboCupJuniorKorea",
    description: "League 7 description",
  },
];
