// [4] 졸준위 팀·사람 데이터 (CommitteeGrid 사진 격자와 Credits 이름 목록이 같이 씀)
type Team = { key: string; label: React.ReactNode; title: string };

export const TEAMS: Team[] = [
  { key: "po", label: "P.O.", title: "P.O." },
  { key: "anf", label: "AnF", title: "AnF" },
  { key: "comm", label: <>Team.<br />Communication</>, title: "Team. Communication" },
  { key: "mkt", label: "Team. Marketing", title: "Team. Marketing" },
  { key: "space", label: "Team. Space Design", title: "Team. Space Design" },
  { key: "brand", label: <>Team.<br />Branding</>, title: "Team. Branding" },
  { key: "web", label: <>Team.<br />Web Design</>, title: "Team. Web Design" },
];

// 사진: 자유컷(work/data/designers/pose)을 칸 비율로 가로 가운데·위 기준으로 잘라 640px WebP로 public/2026/committee/에.
// 이수민(56)·오지샘(57)은 졸준위만 하고 졸전자가 아니라 자유컷만 있음 (오지샘 자유컷은 2026-10-23 받은 p57-오지샘.png로 교체 완료 — 혼자 피부가 밝고 대비가 강해서
// scripts/tone-match.py --strength 0.8 --desat -0.4 --cool 6 --magenta 3으로 다른 사진들 피부톤에 맞춤(생기는 장서영·양성은·정예원 수준, 쿨한 분홍기). profile-photos.py로 다시 만들면 이것도 다시)
// d = 데스크탑·태블릿 [칸, 줄], m = 모바일 [칸, 줄] (Figma iPhone 390: 4칸 × 4줄, 빈칸 유지)
export const MEMBERS: { name: string; team: string; photo?: string; d: [number, number]; m: [number, number] }[] = [
  { name: "장서영", photo: "/2026/committee/p41-jang-seoyeong.webp", team: "po", d: [1, 1], m: [1, 1] },
  { name: "양성은", photo: "/2026/committee/p26-yang-seongeun.webp", team: "anf", d: [2, 1], m: [2, 1] },
  { name: "김동은", photo: "/2026/committee/p07-kim-dongeun.webp", team: "comm", d: [4, 1], m: [4, 1] },
  { name: "김현호", photo: "/2026/committee/p14-kim-hyeonho.webp", team: "mkt", d: [6, 1], m: [2, 2] },
  { name: "박예은", photo: "/2026/committee/p17-park-yeeun.webp", team: "mkt", d: [7, 1], m: [3, 2] },
  { name: "안지언", photo: "/2026/committee/p25-ahn-jieon.webp", team: "space", d: [1, 2], m: [1, 3] },
  { name: "이유택", photo: "/2026/committee/p35-lee-yutaek.webp", team: "space", d: [2, 2], m: [2, 3] },
  { name: "정예원", photo: "/2026/committee/p45-jung-yewon.webp", team: "space", d: [3, 2], m: [3, 3] },
  { name: "오지샘", photo: "/2026/committee/p57-oh-jisaem.webp", team: "brand", d: [5, 2], m: [2, 4] },
  { name: "이수민", photo: "/2026/committee/p56-lee-sumin.webp", team: "web", d: [7, 2], m: [4, 4] },
];
