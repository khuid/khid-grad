// PROJECTS 데이터: 수업 4개(가나다 순) × 작품 81개. 수업마다 /2026/projects/<수업>, 작품마다 /2026/projects/<수업>/<번호>.
// 지금은 자리만: 작품 제목·만든 사람(members, 국문 이름)을 받으면 WORKS 각 줄에 채우면 됨.
// members에 넣은 이름은 DESIGNERS 프로필의 작품 카드에도 저절로 연결됨(이름이 같은 졸전자).
// 이미지·영상·링크·수업 설명은 나중에 일괄 입력:
//   thumb  목록 썸네일 4:5 (예: /2026/projects/spatial/01/thumb.webp)
//   media  상세 왼쪽 세로 나열, 1920×1080 가로 이미지 + 영상 최대 1개, 합쳐서 3~7개 (사이 여백 0)
//   links  상세 오른쪽 아래 바로가기 (Behance ↗ 등)
export type ClassKey = "spatial" | "capstone" | "smart" | "ai";

export type Media =
  | { type: "image"; src: string }
  | { type: "video"; src: string } // mp4 직접
  | { type: "youtube"; id: string }; // 유튜브 주소의 v= 뒤 값

export type Project = {
  cls: ClassKey;
  no: string; // 수업 안 번호 01~
  title: string;
  members: string[];
  thumb?: string;
  description?: string;
  links: { label: string; href: string }[];
  media: Media[];
};

export type ClassInfo = {
  key: ClassKey;
  ko: string;
  en: string; // Figma에 있는 건 미래공간디자인뿐 — 나머지 영문 수업명은 임시
  professor?: string;
  description?: string;
};

export const CLASSES: ClassInfo[] = [
  {
    key: "spatial",
    ko: "미래공간디자인",
    en: "FUTURISTIC SPATIAL DESIGN",
    professor: "최유식",
    description:
      "산업의 구조 변화와 경제의 글로벌화 등으로 인한 인간의 생활 환경 변화는 물리적, 정신적으로 다양한 트렌드로 나타나고 있으며 이는 인간 삶의 질을 결정짓는 중요한 요소다. 다양한 미래 환경(공간) 트렌드에 대한 조사와 분석을 통해 인간 생활 환경을 학습하고 이를 바탕으로 미래 인간 삶의 트렌드 예측 및 대안을 제시함으로써 미래 사회구성원의 일부로서의 역할을 경험 해 본다",
  },
  { key: "capstone", ko: "산업디자인종합설계", en: "INDUSTRIAL DESIGN CAPSTONE" },
  { key: "smart", ko: "스마트융합디자인", en: "SMART CONVERGENCE DESIGN" },
  { key: "ai", ko: "인공지능증강디자인", en: "AI AUGMENTED DESIGN" },
];

// 수업별 작품 [제목, 만든 사람들]. 받으면 순서대로 채우기 (빈 칸은 "작품 제목" 자리 표시)
const WORKS: Record<ClassKey, [title: string, members: string[]][]> = {
  spatial: blank(10),
  capstone: blank(18),
  smart: blank(29),
  ai: blank(24),
};

function blank(n: number): [string, string[]][] {
  return Array.from({ length: n }, () => ["", []]);
}

export const PROJECTS: Project[] = CLASSES.flatMap((c) =>
  WORKS[c.key].map(([title, members], i) => ({
    cls: c.key,
    no: String(i + 1).padStart(2, "0"),
    title: title || "작품 제목",
    members,
    links: [],
    media: [],
  })),
);

export const classOf = (key: string) => CLASSES.find((c) => c.key === key);
export const projectsOf = (key: ClassKey) => PROJECTS.filter((p) => p.cls === key);
export const projectHref = (p: Project) => `/2026/projects/${p.cls}/${p.no}`;
export const worksOf = (name: string) => PROJECTS.filter((p) => p.members.includes(name));
