// [기본 구조] 디자이너(졸전자) 데이터 — 화면 디자인과 상관없는 "데이터 모양"이라 시작 틀에 기본으로 들어 있음.
// 작품(works.ts)의 members에 적은 국문 이름과 여기 ko가 같으면 서로 연결됨:
//   작품 상세에서 이름 클릭 → 디자이너 페이지, 디자이너 페이지에서 그 사람 작품 목록.
// ⚠️ 이름으로 연결하므로 동명이인이 있으면 ko를 구분되게(예: "김지은A") 적고 화면 표시는 따로 처리할 것
// slug는 주소(/YYYY/designers/<slug>)에 쓰는 영문 — 소문자·하이픈만(예: "kim-jieun")
export type Designer = {
  slug: string;
  ko: string;
  en: string;
  contact?: string;
  portfolio: string[];
};

export const DESIGNERS: Designer[] = [
  // { slug: "hong-gildong", ko: "홍길동", en: "Hong Gildong", portfolio: [] },
];

export const designerHref = (d: Designer) => `/YYYY/designers/${d.slug}`;
export const designerOf = (ko: string) => DESIGNERS.find((d) => d.ko === ko);
