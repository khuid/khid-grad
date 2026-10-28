// [기본 구조] 작품 데이터 — designers.ts와 짝. members에 디자이너 국문 이름(designers.ts의 ko)을 적으면 연결됨.
// 2025 주소: /2025/projects/<과목 slug>/<작품 id>  (프레이머: /futuristic_space/미공디_dcro 등)
// 프레이머 기준 내용: 썸네일(정사각형), 제목, 과목, 팀원(최대 6명), 소개글, 웹 판넬(세로로 긴 이미지 여러 장)
import { designerOf, type Designer } from "./designers";

export type Work = {
  id: string; // 주소에 쓰는 이름(영문·숫자·하이픈). 예: "dcro"
  cat: string; // categories.ts의 slug
  title: string;
  members: string[]; // 국문 이름 1~6명
  description: string;
  thumbnail?: string; // 정사각형 썸네일 (public/2025/...)
  panels: string[]; // 웹 판넬 이미지들, 위에서부터 순서대로 (폭 가득, 비율대로 높이)
};

// [샘플] 디자인 확인용 가짜 데이터 — 시트를 받으면 전부 지우고 실제 작품으로 채움
const SAMPLE_MEMBERS = [["강하늘", "나은비"], ["류서준"], ["박민지", "송유진", "이도윤"], ["정하린", "최서연", "한지우", "강하늘"]];
export const WORKS: Work[] = ["futuristic-space", "comprehensive-industrial", "smart-convergence", "ai-augmented"].flatMap((cat) =>
  [1, 2, 3, 4, 5].map((n) => ({
    id: `sample-${n}`,
    cat,
    title: `[샘플] 작품 제목 ${n}`,
    members: SAMPLE_MEMBERS[(n - 1) % SAMPLE_MEMBERS.length],
    description:
      "[샘플] 작품 소개글이 들어가는 자리입니다. 실제 소개글은 시트를 받으면 채웁니다. 두세 줄 정도의 길이를 가정해 문장을 조금 길게 적어 두었습니다. 줄바꿈과 행간을 확인하기 위한 문장입니다.",
    panels: ["", "", ""],
  })),
);

export const workHref = (w: Work) => `/2025/projects/${w.cat}/${w.id}`;
export const worksIn = (cat: string) => WORKS.filter((w) => w.cat === cat);
// 디자이너 페이지에 보여 줄 그 사람의 작품들 (프레이머 작업가이드: 과목 순서 미공디 → 산디종 → 스융디 → 인지디)
export const worksOf = (ko: string) => WORKS.filter((w) => w.members.includes(ko));
// 작품 상세에서 이름마다 디자이너 페이지 링크를 걸 때: 디자이너 목록에 없는 이름은 d가 비어 있음(링크 없이 글자만)
export const membersOf = (w: Work): { ko: string; d?: Designer }[] => w.members.map((ko) => ({ ko, d: designerOf(ko) }));
