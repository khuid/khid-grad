// 2024 디자이너(졸전자) 45명 — 아임웹 Designer 메뉴 순서 그대로 (2026-11-04).
// 작품(works.ts)의 members에 적은 국문 이름과 여기 ko가 같으면 서로 연결됨:
//   디자이너 페이지 = 그 사람이 팀원인 작품 카드 목록 (아임웹 디자이너 페이지 구성 그대로 — 사진·소개 글 없음)
// slug는 주소(/2024/designers/<slug>)에 쓰는 이름. 아임웹에 영문 이름이 없어서 순서 번호(01~45)로 둠
// photo: 목록 사진(정사각형) — [사진 받으면] public/2024/designers/<slug>.webp 넣고 여기 연결. 지금은 빈칸
// ⚠️ 동명이인 이서영 2명 — 아임웹 메뉴에는 "이서영 20", "이서영 21"(학번)로 나뉘어 있었지만 작품 팀원 칸은 둘 다 "이서영"이라
//   누가 어느 작품인지 아임웹에서 알 수 없음. 확인 전까지 works.ts에서는 "이서영"으로 두고, 두 사람 페이지에 이서영 작품이 다 보임
export type Designer = {
  slug: string;
  ko: string; // works.ts members와 맞춰 쓰는 이름
  menu?: string; // 메뉴에 보일 이름이 ko와 다를 때 (동명이인)
  photo?: string;
};

const NAMES = [
  "강민지", "고민경", "권의환", "김나우", "김다은", "김도연", "김성용", "김소현", "김수현", "김예은",
  "김지영", "김채연", "김태완", "김택림", "류현정", "박서현", "박해준", "배민경", "송나현", "신동주",
  "심재건", "안영은", "여이현", "오정미", "오현호", "우민국", "우태균", "유채연", "유해룡", "윤소정",
  "윤지민", "이서영 20", "이서영 21", "이수현", "이승욱", "이은서", "이은진", "이하민", "이하은", "장효린",
  "전성식", "정다영", "정성백", "제유진", "주은혁",
];

export const DESIGNERS: Designer[] = NAMES.map((name, i) => {
  const ko = name.replace(/ \d+$/, "");
  return { slug: String(i + 1).padStart(2, "0"), ko, menu: ko === name ? undefined : name };
});

export const designerHref = (d: Designer) => `/2024/designers/${d.slug}`;
export const designerOf = (ko: string) => DESIGNERS.find((d) => d.ko === ko);
