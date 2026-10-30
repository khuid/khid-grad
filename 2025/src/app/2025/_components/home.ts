// 2025 메인 페이지 내용 — 프레이머 Home 화면(미리보기) 기준으로 옮김. 레이어 이름에 남은 옛 값(11.11 Tue 18:00 등)이 아니라 화면에 보이는 값.
export const EXHIBITION = [
  { title: "Exhibition", date: "2025.11.12-16. 10:00-20:00", place: "경기도 용인시 기흥구 덕영대로 1732\n경희대학교 국제캠퍼스 예술디자인대학 2F A&D 갤러리" },
  { title: "Opening", date: "2025.11.12. Wed 17:00", place: "경기도 용인시 기흥구 덕영대로 1732\n경희대학교 국제캠퍼스 예술디자인대학 2F A&D 갤러리" },
];

// 소개 2칸 — 프레이머 overview1·2(바둑판 격자에 글이 그려진 이미지 2880×2880)의 글을 그대로 옮김. 줄바꿈도 이미지 그대로
// j: 양쪽 맞춤한 줄(이미지에서 오른쪽 끝 631까지 꽉 찬 줄)
export const OVERVIEW = [
  {
    title: "where is the NEXT MOVE?",
    sub: "우리는 다음 수를 어디에 둬야 하는가?",
    paras: [
      [
        { t: "10년 전, 인공지능은 인간의 한계를 시험하는 상대였다." },
        { t: "이세돌과 알파고의 대결은 인간과 기계의 경계선을 그으며, 창의성과 계산의 싸움", j: true },
        { t: "이라는 상징적 장면을 남겼다. 그러나 지금, 우리는 더 이상 대결의 시대에 살고", j: true },
        { t: "있지 않다. AI는 적수가 아니라, 함께 새로운 수를 두는 협력자가 되었다." },
      ],
      [
        { t: "이제 디자이너의 역할은 단순한 창작을 넘어, 변화의 흐름 속에서 다음 수를 발견", j: true },
        { t: "하는 일이다. 우리가 만들어갈 디자인은 기술의 진보 속에서 인간의 감각과 의미", j: true },
        { t: "를 되살릴 새로운 형태의 대화가 될 것이다." },
      ],
      [
        { t: "The Next Move는 그 질문의 여정이다. 인간과 인공지능이 함께 만들어갈 미래,", j: true },
        { t: "그 첫 걸음을 어디에 둘 것인가에 대한 탐색." },
        { t: "우리는 묻는다. \"우리의 다음 수는 어디에 있는가?\"" },
      ],
    ],
  },
  {
    title: "what is the BEST MOVE?",
    sub: "격동의 시대, 디자이너에게 최선의 수란 무엇인가?",
    paras: [
      [
        { t: "생성형 인공지능의 등장은 디자인의 전통적 경계를 흔들었다. 무한한 속도와" },
        { t: "조합, 예측할 수 없는 결과물 속에서 창의성의 정의는 다시 쓰이고 있다." },
      ],
      [
        { t: "이 변화의 한가운데에서, 디자이너는 스스로에게 묻게 된다. 우리가 지켜야 할 것", j: true },
        { t: "은 무엇이며, 새로이 받아들여야 할 것은 무엇인가? 기술이 만들어내는 수많은 가", j: true },
        { t: "능성 중, 어떤 한 수가 최선이 될 수 있을까?" },
      ],
      [
        { t: "The Next Move는 이 질문들에서 출발한다." },
        { t: "AI의 계산과 인간의 직관이 교차하는 지점에서 디자인은 더 이상 한쪽의 선택이", j: true },
        { t: "아닌, 두 세계의 협연으로 진화한다. 공존과 협력의 시대 속, 인간과 인공지능이", j: true },
        { t: "함께 두어갈 새로운 수에 대하여." },
      ],
    ],
  },
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

// 후원 — 로고는 프레이머 sponsorship/* 컴포넌트에서 뽑은 SVG. lowlit.svg만 원본 안쪽 흰 타원(#FFF)이 칸 바탕(#FDFDFD)과 달라 비우고, 검정(#040000)을 다른 로고와 같은 #121212로 맞춤(2026-10-30). w = 칸 폭 대비 로고 폭, hw = 마우스를 올렸을 때 (프레이머 값)
export const SPONSORS = [
  { name: "Yoondesign", src: "/2025/sponsors/yoondesign.svg", w: "67%", hw: "77%" },
  { name: "F/A/B/A", src: "/2025/sponsors/faba.svg", w: "67%", hw: "78%" },
  { name: "RixFont", src: "/2025/sponsors/rixfont.svg", w: "67%", hw: "78%" },
  { name: "3DPAGE", src: "/2025/sponsors/3dpage.svg", w: "66%", hw: "75%" },
  { name: "LOWLIT COLLECTIVE", src: "/2025/sponsors/lowlit.svg", w: "79%", hw: "85%" },
];

// [데이터] 메인 영상 YouTube 영상 ID (주소 watch?v= 뒤의 글자)
export const VIDEO_ID = "";

export const FOOTER = {
  when: "2025.11.12 Wed - 2025.11.16 Sun",
  where: "경희대학교 국제캠퍼스 예술디자인대학 2F A&D 갤러리",
  instagram: "@khid.2025",
};
