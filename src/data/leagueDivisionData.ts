export interface LeagueDivision {
  id: number;
  leagueId: number;
  slug: string; // league와 조합하여 경로로 사용, unique 불필요
  name: string;
  description: string;
  imageUrl: string;
}

/*
 * CREATE TABLE league_divisions (
 *   id          INT AUTO_INCREMENT PRIMARY KEY,
 *   league_id   INT NOT NULL,
 *   slug        VARCHAR(255) NOT NULL,
 *   name        VARCHAR(255) NOT NULL,
 *   description TEXT,
 *   FOREIGN KEY (league_id) REFERENCES leagues(id) ON DELETE CASCADE
 * ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
 */

export const leagueDivisionData: LeagueDivision[] = [
  {
    id: 1,
    leagueId: 1,
    slug: "humanoid",
    name: "Humanoid",
    description: "",
    imageUrl:
      "https://media.robocupkorea.org/images/leagues/robocup-soccer/humanoid.png",
  },
  {
    id: 2,
    leagueId: 1,
    slug: "standard-platform",
    name: "Standard Platform",
    description: "",
    imageUrl:
      "https://media.robocupkorea.org/images/leagues/robocup-soccer/standard-platform.png",
  },
  {
    id: 3,
    leagueId: 1,
    slug: "middle-size",
    name: "Middle Size",
    description: "",
    imageUrl:
      "https://media.robocupkorea.org/images/leagues/robocup-soccer/middle-size.png",
  },
  {
    id: 4,
    leagueId: 1,
    slug: "small-size",
    name: "Small Size",
    description: "",
    imageUrl:
      "https://media.robocupkorea.org/images/leagues/robocup-soccer/small-size.png",
  },
  {
    id: 5,
    leagueId: 1,
    slug: "simulation",
    name: "Simulation",
    description: "",
    imageUrl:
      "https://media.robocupkorea.org/images/leagues/robocup-soccer/simulation.png",
  },

  {
    id: 6,
    leagueId: 2,
    slug: "robot",
    name: "Robot",
    description: "",
    imageUrl:
      "https://media.robocupkorea.org/images/leagues/robocup-rescue/robot.png",
  },
  {
    id: 7,
    leagueId: 2,
    slug: "simulation",
    name: "Simulation",
    description: "",
    imageUrl:
      "https://media.robocupkorea.org/images/leagues/robocup-rescue/simulation.png",
  },

  {
    id: 8,
    leagueId: 3,
    slug: "open-platform",
    name: "Open Platform",
    description: "",
    imageUrl:
      "https://media.robocupkorea.org/images/leagues/robocup-home/open-platform.png",
  },
  {
    id: 9,
    leagueId: 3,
    slug: "domestic-standard-platform",
    name: "Domestic Standard Platform",
    description: "",
    imageUrl:
      "https://media.robocupkorea.org/images/leagues/robocup-home/domestic-standard-platform.png",
  },
  {
    id: 10,
    leagueId: 3,
    slug: "social-standard-platform",
    name: "Social Standard Platform",
    description: "",
    imageUrl:
      "https://media.robocupkorea.org/images/leagues/robocup-home/social-standard-platform.png",
  },

  {
    id: 11,
    leagueId: 4,
    slug: "robocup-work",
    name: "RoboCup@Work",
    description: "",
    imageUrl:
      "https://media.robocupkorea.org/images/leagues/robocup-industrial/robocup-work.png",
  },
  {
    id: 12,
    leagueId: 4,
    slug: "logistics",
    name: "Logistics",
    description: "",
    imageUrl:
      "https://media.robocupkorea.org/images/leagues/robocup-industrial/logistics.png",
  },

  {
    id: 13,
    leagueId: 5,
    slug: "soccer",
    name: "Soccer",
    description: "",
    imageUrl:
      "https://media.robocupkorea.org/images/leagues/robocup-junior/soccer.png",
  },
  {
    id: 14,
    leagueId: 5,
    slug: "onstage",
    name: "OnStage",
    description: "",
    imageUrl:
      "https://media.robocupkorea.org/images/leagues/robocup-junior/onstage.png",
  },
  {
    id: 15,
    leagueId: 5,
    slug: "rescue",
    name: "Rescue",
    description: "",
    imageUrl:
      "https://media.robocupkorea.org/images/leagues/robocup-junior/rescue.png",
  },

  {
    id: 16,
    leagueId: 6,
    slug: "cospace-autonomous-driving",
    name: "CoSpace Autonomous Driving",
    description: "",
    imageUrl:
      "https://media.robocupkorea.org/images/leagues/robocup-asia-pacific/cospace-autonomous-driving.png",
  },
  {
    id: 17,
    leagueId: 6,
    slug: "cospace-rescue",
    name: "CoSpace Rescue",
    description: "",
    imageUrl:
      "https://media.robocupkorea.org/images/leagues/robocup-asia-pacific/cospace-rescue.png",
  },

  {
    id: 18,
    leagueId: 7,
    slug: "rescue-basic",
    name: "Rescue Basic",
    description: "",
    imageUrl:
      "https://media.robocupkorea.org/images/leagues/robocup-junior-korea/rescue-basic.png",
  },
  {
    id: 19,
    leagueId: 7,
    slug: "rescue-mazebasic",
    name: "Rescue MazeBasic",
    description: "",
    imageUrl:
      "https://media.robocupkorea.org/images/leagues/robocup-junior-korea/rescue-mazebasic.png",
  },
];
