// [기본 구조] 작품 데이터 — designers.ts와 짝. members에 디자이너 국문 이름(designers.ts의 ko)을 적으면 연결됨.
// 수업별 분류·주소 모양(/YYYY/projects/...)·정렬 순서는 그 해 기획에 맞게 바꿔도 됨 (예: 수업/번호 두 단계)
import { designerOf, type Designer } from "./designers";

export type Work = {
  id: string; // 주소에 쓰는 이름(영문·숫자). 예: "01"
  title: string;
  members: string[]; // 국문 이름 1~4명
};

export const WORKS: Work[] = [
  // { id: "01", title: "작품 제목", members: ["홍길동"] },
];

export const workHref = (w: Work) => `/YYYY/projects/${w.id}`;
// 디자이너 페이지에 보여 줄 그 사람의 작품들
export const worksOf = (ko: string) => WORKS.filter((w) => w.members.includes(ko));
// 작품 상세에서 이름마다 디자이너 페이지 링크를 걸 때: 디자이너 목록에 없는 이름은 d가 비어 있음(링크 없이 글자만)
export const membersOf = (w: Work): { ko: string; d?: Designer }[] => w.members.map((ko) => ({ ko, d: designerOf(ko) }));
