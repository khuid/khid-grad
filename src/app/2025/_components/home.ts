// 2025 메인 페이지 내용 — 프레이머 Home 화면(미리보기) 기준으로 옮김. 레이어 이름에 남은 옛 값(11.11 Tue 18:00 등)이 아니라 화면에 보이는 값.
export const EXHIBITION = [
  { title: "Exhibition", date: "2025.11.12-16. 10:00-20:00", place: "경기도 용인시 기흥구 덕영대로 1732\n경희대학교 국제캠퍼스 예술디자인대학 2F A&D 갤러리" },
  { title: "Opening", date: "2025.11.12. Wed 17:00", place: "경기도 용인시 기흥구 덕영대로 1732\n경희대학교 국제캠퍼스 예술디자인대학 2F A&D 갤러리" },
];

// 졸업전시준비위원회 — 두 팀씩 한 줄
export const COMMITTEE = [
  [
    { team: "P.O.", names: ["정동화"] },
    { team: "AnF", names: ["류정우"] },
  ],
  [
    { team: "Team B.X/B.I", names: ["배지우", "신지영"] },
    { team: "Team Marketing", names: ["이영주", "박서현"] },
  ],
  [
    { team: "Team Space Design", names: ["김채민", "박정민", "유차니", "이세은"] },
    { team: "Team Communication", names: ["전지수"] },
  ],
];

export const PROFESSORS = [
  { ko: "김선철", en: "Kim Sunchul" },
  { ko: "김유빈", en: "Kim Youbin" },
  { ko: "이동민", en: "Lee Dongmin" },
  { ko: "최유식", en: "Choi Yoosik" },
];

// 후원 — 로고 이미지는 [데이터] (원본 받으면 public/2025/sponsors/에)
export const SPONSORS = ["Yoondesign", "F/A/B/A", "RixFont", "3DPAGE", "LOWLIT COLLECTIVE"];

// [데이터] 메인 영상 YouTube 영상 ID (주소 watch?v= 뒤의 글자)
export const VIDEO_ID = "";

export const FOOTER = {
  when: "2025.11.12 Wed - 2025.11.16 Sun",
  where: "경희대학교 국제캠퍼스 예술디자인대학 2F A&D 갤러리",
  instagram: "@khid.2025",
};
