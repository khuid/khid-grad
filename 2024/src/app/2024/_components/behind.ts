// Behind 페이지(/2024/behind)에 위에서부터 차례로 보일 사진·영상 — 아임웹에 없던 새 페이지 (사용자 결정 2026-11-04)
// [받으면] 파일을 public/2024/behind/에 넣고 아래에 순서대로 적기
//   사진: { kind: "image", src: "/2024/behind/01.webp", size: [가로, 세로] }   ← 픽셀 크기를 적으면 불러오기 전에 자리를 잡음
//   영상: { kind: "video", src: "/2024/behind/02.mp4", size: [가로, 세로], poster: "/2024/behind/02.jpg" }   ← poster(첫 화면 이미지)는 없어도 됨
// 지금은 비어 있음 → 화면에 빈칸 하나만 보임
export type BehindItem =
  | { kind: "image"; src: string; size: [number, number]; alt?: string }
  | { kind: "video"; src: string; size: [number, number]; poster?: string };

export const BEHIND: BehindItem[] = [];
