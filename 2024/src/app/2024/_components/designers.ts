// 2024 디자이너(졸전자) 45명 — 아임웹 Designer 메뉴 순서 그대로 (2026-11-04).
// 작품(works.ts)의 members에 적은 국문 이름과 여기 ko가 같으면 서로 연결됨:
//   디자이너 페이지 = 그 사람이 팀원인 작품 카드 목록 (아임웹 디자이너 페이지 구성 그대로 — 사진·소개 글 없음)
// slug는 주소(/2024/designers/<slug>)에 쓰는 이름. 아임웹에 영문 이름이 없어서 순서 번호(01~45)로 둠
// photo: 목록 사진(정사각형) — [사진 받으면] public/2024/designers/<slug>.webp 넣고 여기 연결. 지금은 빈칸
// ⚠️ 동명이인 이서영 2명 — 아임웹 메뉴에는 "이서영 20", "이서영 21"(학번)로 나뉘어 있었지만 작품 팀원 칸은 둘 다 "이서영"이었음.
//   구글폼(2024 웹사이트/인스타 아카이빙 파일 제출) 팀원 칸의 영문 표기가 둘로 갈려서 그걸로 일단 나눔 (사용자 결정 2026-11-04):
//     "Lee Seo Yeong"(@syeongzip) → POP-IT · 비토즈 · REFFUSE  /  "Lee Seo Young · Seoyoung" → Asterroad · TRANSPOT
//   "Lee Seo Yeong"(@syeongzip) = 이서영 20 (사용자 확인 2026-11-04) → 나머지 "Lee Seo Young" = 이서영 21
//   works.ts에서는 "이서영_Yeong" · "이서영_Young"으로 적고, 화면에는 밑줄 뒤를 떼고 "이서영"으로 보임(nameOf).
//   폼에 없는 작품(산디종 김지영·류현정·이서영·장효린)은 그냥 "이서영" → 두 사람 페이지에 다 보임
export type Designer = {
  slug: string;
  ko: string; // works.ts members와 맞춰 쓰는 이름
  menu?: string; // 메뉴에 보일 이름이 ko와 다를 때 (동명이인)
  photo?: string;
};

// 이름 하나 = 메뉴·works.ts에 같은 이름, [메뉴 이름, works.ts 이름] = 동명이인
const NAMES: (string | [string, string])[] = [
  "강민지", "고민경", "권의환", "김나우", "김다은", "김도연", "김성용", "김소현", "김수현", "김예은",
  "김지영", "김채연", "김태완", "김택림", "류현정", "박서현", "박해준", "배민경", "송나현", "신동주",
  "심재건", "안영은", "여이현", "오정미", "오현호", "우민국", "우태균", "유채연", "유해룡", "윤소정",
  "윤지민", ["이서영 20", "이서영_Yeong"], ["이서영 21", "이서영_Young"], "이수현", "이승욱", "이은서", "이은진", "이하민", "이하은", "장효린",
  "전성식", "정다영", "정성백", "제유진", "주은혁",
];

export const DESIGNERS: Designer[] = NAMES.map((name, i) => {
  const slug = String(i + 1).padStart(2, "0");
  return typeof name === "string" ? { slug, ko: name } : { slug, ko: name[1], menu: name[0] };
});

export const designerHref = (d: Designer) => `/2024/designers/${d.slug}`;
// 화면에 보일 이름: 동명이인 구분 표시(밑줄 뒤)를 뗌 — "이서영_Yeong" → "이서영"
export const nameOf = (ko: string) => ko.replace(/_.*$/, "");
