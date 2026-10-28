// 2025 과목(수업) — 작품 목록 왼쪽 탭·과목 페이지 위쪽 정보·작품 상세의 빨간 과목명에 쓰임.
// 프레이머 페이지 /projects/projects-<영문> 에 대응. 주소는 /2025/projects/<slug>
// [데이터] 교수님·과목 소개는 시트를 받으면 채움 (미래공간디자인 교수님만 프레이머에서 확인됨)
export type Category = {
  slug: string;
  ko: string;
  en: string; // 과목 정보 영문 (프레이머: "Futuristic Space Design")
  barEn: string; // 섹션 제목 바 영문 (프레이머: "FUTURISTIC SPATIAL DESIGN" — 위와 다르게 적혀 있음)
  professors: { ko: string; en: string }[];
  description: string;
};

export const CATEGORIES: Category[] = [
  {
    slug: "futuristic-space",
    ko: "미래공간디자인",
    en: "Futuristic Space Design",
    barEn: "Futuristic Spatial Design",
    professors: [{ ko: "최유식", en: "Choi Yoosik" }],
    description: "[데이터] 과목 소개",
  },
  {
    slug: "comprehensive-industrial",
    ko: "산업디자인종합설계",
    en: "[데이터] 영문 과목명",
    barEn: "[데이터] 영문 과목명",
    professors: [{ ko: "[데이터]", en: "[데이터]" }],
    description: "[데이터] 과목 소개",
  },
  {
    slug: "smart-convergence",
    ko: "스마트융합디자인",
    en: "Smart Converged Design",
    barEn: "Smart Converged Design",
    professors: [{ ko: "[데이터]", en: "[데이터]" }],
    description: "[데이터] 과목 소개",
  },
  {
    slug: "ai-augmented",
    ko: "인공지능증강디자인",
    en: "A.I Augmented Design",
    barEn: "A.I Augmented Design",
    professors: [{ ko: "[데이터]", en: "[데이터]" }],
    description: "[데이터] 과목 소개",
  },
  {
    // 프레이머에 /projects-global_design 페이지는 있는데 작품 상세 폴더가 없음 (일본교류전 관련 컴포넌트 KYOTO·GK 있음) — 무엇을 보여 줄지 확인 필요
    slug: "global-design",
    ko: "[데이터] 글로벌디자인",
    en: "[데이터] Global Design",
    barEn: "[데이터] Global Design",
    professors: [{ ko: "[데이터]", en: "[데이터]" }],
    description: "[데이터] 과목 소개",
  },
];

export const categoryOf = (slug: string) => CATEGORIES.find((c) => c.slug === slug);
export const categoryHref = (c: Category) => `/2025/projects/${c.slug}`;
