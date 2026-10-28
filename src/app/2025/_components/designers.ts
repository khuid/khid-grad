// [기본 구조] 디자이너(졸전자) 데이터 — 화면 디자인과 상관없는 "데이터 모양".
// 작품(works.ts)의 members에 적은 국문 이름과 여기 ko가 같으면 서로 연결됨:
//   작품 상세에서 이름 클릭 → 디자이너 페이지, 디자이너 페이지에서 그 사람 작품 목록.
// ⚠️ 이름으로 연결하므로 동명이인이 있으면 ko를 구분되게(예: "김지은A") 적고 화면 표시는 따로 처리할 것
// slug는 주소에 쓰는 영문 — 소문자·하이픈만(예: "kim-jieun")
// 2025 주소: 목록 /2025/designers/<초성 그룹>, 프로필 /2025/designers/<초성 그룹>/<slug> (프레이머처럼 초성별로 나눔)
export type Designer = {
  slug: string;
  ko: string;
  en: string;
  photo?: string; // 프로필 사진 (세로 519:688)
  intro: string; // 자기소개
  answers: [string, string]; // 아래 QUESTIONS 두 개에 대한 답
  email?: string;
  portfolio?: { text: string; href: string };
};

// 모든 디자이너에게 같은 질문 (프레이머 profile 컴포넌트 문구 그대로)
export const QUESTIONS = [
  { title: "Q1. What is the next move?", text: "생성형 인공지능의 등장으로 인해 변하는 세상 속에서 나는 디자이너로서 어떤 수를 둘 것인가" },
  { title: "Q2. Where is the best move?", text: "그 과정 중에서 내가 둘 수 있는 가장 최선의 수는 무엇이라고 생각하는가." },
] as const;

// 초성 그룹 — 프레이머 /designers-ㄱㄴ, -ㄹㅂㅅ, -ㅇ, -ㅈㅊㅎ. 2025 명단에 없는 초성(ㄷ·ㅁ·ㅋ·ㅌ·ㅍ)은 가까운 그룹에 넣음
export const GROUPS = [
  { slug: "gn", label: "ㄱ · ㄴ", initials: "ㄱㄲㄴㄷㄸ" },
  { slug: "rbs", label: "ㄹ · ㅂ · ㅅ", initials: "ㄹㅁㅂㅃㅅㅆ" },
  { slug: "o", label: "ㅇ", initials: "ㅇ" },
  { slug: "jch", label: "ㅈ · ㅊ · ㅎ", initials: "ㅈㅉㅊㅋㅌㅍㅎ" },
] as const;
export type Group = (typeof GROUPS)[number];

const INITIALS = "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ";
const initialOf = (ko: string) => INITIALS[Math.floor((ko.charCodeAt(0) - 0xac00) / 588)] ?? "";
export const groupOf = (d: Designer) => GROUPS.find((g) => g.initials.includes(initialOf(d.ko))) ?? GROUPS[0];

// [샘플] 디자인 확인용 가짜 데이터 — 시트를 받으면 전부 지우고 실제 명단으로 채움 (가나다순)
const sample = (slug: string, ko: string, en: string): Designer => ({
  slug,
  ko,
  en,
  intro: "[샘플] 한 줄 자기소개가 들어가는 자리입니다. 두 줄 정도 길이를 가정했습니다.",
  answers: [
    "[샘플] 첫 번째 질문에 대한 답변이 들어가는 자리입니다. 실제 답변은 시트를 받으면 채웁니다. 여러 줄이 될 수 있어 길게 적어 두었습니다.",
    "[샘플] 두 번째 질문에 대한 답변이 들어가는 자리입니다. 실제 답변은 시트를 받으면 채웁니다.",
  ],
  email: "sample@example.com",
  portfolio: { text: "portfolio.com", href: "https://example.com" },
});
export const DESIGNERS: Designer[] = [
  sample("kang-haneul", "강하늘", "Kang Haneul"),
  sample("na-eunbi", "나은비", "Na Eunbi"),
  sample("ryu-seojun", "류서준", "Ryu Seojun"),
  sample("park-minji", "박민지", "Park Minji"),
  sample("song-yujin", "송유진", "Song Yujin"),
  sample("lee-doyun", "이도윤", "Lee Doyun"),
  sample("jung-harin", "정하린", "Jung Harin"),
  sample("choi-seoyeon", "최서연", "Choi Seoyeon"),
  sample("han-jiwoo", "한지우", "Han Jiwoo"),
];

export const designersIn = (g: Group) => DESIGNERS.filter((d) => groupOf(d).slug === g.slug);
export const designerHref = (d: Designer) => `/2025/designers/${groupOf(d).slug}/${d.slug}`;
export const groupHref = (g: Group) => `/2025/designers/${g.slug}`;
export const designerOf = (ko: string) => DESIGNERS.find((d) => d.ko === ko);
