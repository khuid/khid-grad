// Behind 페이지(/2024/behind)에 위에서부터 차례로 보일 사진·영상 — 아임웹에 없던 새 페이지 (사용자 결정 2026-11-04)
// 순서 = 사용자가 드라이브 "제 33기 KHID 졸업전시위원회 데이터 › 3. 업무별 › 9. 전시 이후" 화면에 매긴 번호 1~9 (2026-11-04)
//   원본(드라이브에서 받은 그대로) work/data/2024_behind_src/ → public/2024/behind/
//   사진: 폭 2400 이하 WebP / 영상 파일: macOS avconvert Preset1920x1080 (원본 193MB → 73MB)
// 그 폴더의 나머지(내부·내부(합성)·오프닝존·외부2·외부3, 오픈식·현장 스케치 MP4)는 번호가 없어서 안 씀 — 2·3번은 사용자가 준 유튜브 링크
// 더 넣을 때:
//   사진: { kind: "image", src: "/2024/behind/10.webp", size: [가로, 세로] }
//   영상 파일: { kind: "video", src: "/2024/behind/11.mp4", size: [가로, 세로], poster: "/2024/behind/11.jpg" }   ← poster(첫 화면)는 없어도 됨
//   유튜브: { kind: "youtube", id: "영상 ID" }
export type BehindItem =
  | { kind: "image"; src: string; size: [number, number]; alt?: string }
  | { kind: "video"; src: string; size: [number, number]; poster?: string; title?: string }
  | { kind: "youtube"; id: string; title?: string };

export const BEHIND: BehindItem[] = [
  { kind: "video", src: "/2024/behind/01-branding.mp4", size: [1920, 1080], title: "졸업전시 브랜딩(오프닝) 영상" }, // 1
  { kind: "youtube", id: "w5IpKznJ_zw" }, // 2
  { kind: "youtube", id: "8CCgC1EQhHk" }, // 3
  { kind: "image", src: "/2024/behind/04.webp", size: [2400, 1600], alt: "전시장 외부" }, // 4 외부1
  { kind: "image", src: "/2024/behind/05.webp", size: [2400, 1600], alt: "전시장 입구" }, // 5 합성2
  { kind: "image", src: "/2024/behind/06.webp", size: [2400, 1350], alt: "포토월" }, // 6 포토월
  { kind: "image", src: "/2024/behind/07.webp", size: [2400, 1600], alt: "오프닝존" }, // 7 오프닝존2
  { kind: "image", src: "/2024/behind/08.webp", size: [2400, 1600], alt: "전시장" }, // 8 전시장2
  { kind: "image", src: "/2024/behind/09.webp", size: [2400, 1600], alt: "전시장" }, // 9 전시장1
];
