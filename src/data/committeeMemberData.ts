import { Language } from "@/types/language.types";

export interface CommitteeMemberData {
  id: number;
  language: Language;
  name: string;
  position: string;
  affiliation: string;
  contact: string;
}

/*
 * TODO: committee_member 데이터베이스 구조 참고
 *
 * CREATE TABLE committee_member (
 *   language    VARCHAR(5) NOT NULL,
 *   id          INT        NOT NULL,
 *   name        VARCHAR(100) NOT NULL,
 *   position    VARCHAR(50)  NOT NULL,
 *   affiliation VARCHAR(100) NOT NULL,
 *   contact     VARCHAR(100) NOT NULL,
 *   PRIMARY KEY (language, id)
 * ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
 */

export const committeeMemberData: CommitteeMemberData[] = [
  {
    id: 1,
    language: "ko-KR",
    name: "한상용",
    position: "회장",
    affiliation: "국민대학교",
    contact: "syhan@kookmin.ac.kr",
  },
  {
    id: 2,
    language: "ko-KR",
    name: "김신택",
    position: "공동 위원장",
    affiliation: "대림대학교 교수",
    contact: "stkim@daelim.ac.kr",
  },
  {
    id: 3,
    language: "ko-KR",
    name: "고한",
    position: "공동 위원장",
    affiliation: "Midwest Univ. 교수, 우사코그룹 대표",
    contact: "ceo@usakogroup.com",
  },
  {
    id: 4,
    language: "ko-KR",
    name: "박장현",
    position: "위원",
    affiliation: "한양대학교 교수",
    contact: "jpark@hanyang.ac.kr",
  },
  {
    id: 5,
    language: "ko-KR",
    name: "한재권",
    position: "위원",
    affiliation: "한양대학교 교수",
    contact: "jkhan@hanyang.ac.kr",
  },
  {
    id: 6,
    language: "ko-KR",
    name: "조백규",
    position: "위원",
    affiliation: "국민대학교 교수",
    contact: "BaekKyuCho@kookmin.ac.kr",
  },
  {
    id: 7,
    language: "ko-KR",
    name: "김선영",
    position: "위원",
    affiliation: "국민대학교 교수",
    contact: "sykim@kookmin.ac.kr",
  },
  {
    id: 8,
    language: "ko-KR",
    name: "이학",
    position: "위원",
    affiliation: "경북대학교 교수",
    contact: "yihak@knu.ac.kr",
  },
  {
    id: 9,
    language: "ko-KR",
    name: "김성호",
    position: "위원",
    affiliation: "영남대학교 교수",
    contact: "sunghokim@ynu.ac.kr",
  },
  {
    id: 10,
    language: "ko-KR",
    name: "박상배",
    position: "위원",
    affiliation: "한국폴리텍대학교 교수",
    contact: "sb810park@kopo.ac.kr",
  },
  {
    id: 11,
    language: "ko-KR",
    name: "이주형",
    position: "위원",
    affiliation: "국방과학연구소 선임연구원",
    contact: "addlh77@gmail.com",
  },
  {
    id: 12,
    language: "ko-KR",
    name: "최영호",
    position: "위원",
    affiliation: "한국로봇융합연구원 박사",
    contact: "rockboy@kiro.re.kr",
  },
  {
    id: 13,
    language: "ko-KR",
    name: "한동희",
    position: "위원",
    affiliation: "라이드플럭스",
    contact: "dhhan@rideflux.com",
  },
  {
    id: 1,
    language: "en-US",
    name: "SangYong Han",
    position: "Chair",
    affiliation: "Kookmin Univ.",
    contact: "syhan@kookmin.ac.kr",
  },
  {
    id: 2,
    language: "en-US",
    name: "ShinTaek Kim",
    position: "Co-chair",
    affiliation: "Daelim Univ. Prof.",
    contact: "stkim@daelim.ac.kr",
  },
  {
    id: 3,
    language: "en-US",
    name: "Han Ko",
    position: "Co-chair",
    affiliation: "Midwest Univ. Prof. CEO USAKO Group",
    contact: "ceo@usakogroup.com",
  },
  {
    id: 4,
    language: "en-US",
    name: "JahngHyon Park",
    position: "Member",
    affiliation: "Hanyang Univ. Prof.",
    contact: "jpark@hanyang.ac.kr",
  },
  {
    id: 5,
    language: "en-US",
    name: "JaeKweon Han",
    position: "Member",
    affiliation: "Hanyang Univ. Prof.",
    contact: "jkhan@hanyang.ac.kr",
  },
  {
    id: 6,
    language: "en-US",
    name: "BaekKyu Cho",
    position: "Member",
    affiliation: "Kookmin Univ. Prof.",
    contact: "BaekKyuCho@kookmin.ac.kr",
  },
  {
    id: 7,
    language: "en-US",
    name: "SunYoung Kim",
    position: "Member",
    affiliation: "Kookmin Univ. Prof.",
    contact: "sykim@kookmin.ac.kr",
  },
  {
    id: 8,
    language: "en-US",
    name: "Hak Lee",
    position: "Member",
    affiliation: "Kyungpook Nati' Univ. Prof.",
    contact: "yihak@knu.ac.kr",
  },
  {
    id: 9,
    language: "en-US",
    name: "SungHo Kim",
    position: "Member",
    affiliation: "Yeungnam Univ. Prof.",
    contact: "sunghokim@ynu.ac.kr",
  },
  {
    id: 10,
    language: "en-US",
    name: "SangBae Park",
    position: "Member",
    affiliation: "Korea Polytechnics Prof.",
    contact: "sb810park@kopo.ac.kr",
  },
  {
    id: 11,
    language: "en-US",
    name: "JooHyung Lee",
    position: "Member",
    affiliation: "ADD Senior Researcher",
    contact: "addlh77@gmail.com",
  },
  {
    id: 12,
    language: "en-US",
    name: "YoungHo Choi",
    position: "Member",
    affiliation: "KIRO PhD",
    contact: "rockboy@kiro.re.kr",
  },
  {
    id: 13,
    language: "en-US",
    name: "DongHee Han",
    position: "Member",
    affiliation: "RideFlux",
    contact: "dhhan@rideflux.com",
  },
];
