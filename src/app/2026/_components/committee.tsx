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

// 사진은 나중에 일괄로: public/2026/committee/에 넣고 photo에 경로 적기
// d = 데스크탑·태블릿 [칸, 줄], m = 모바일 [칸, 줄]
export const MEMBERS: { name: string; team: string; photo?: string; d: [number, number]; m: [number, number] }[] = [
  { name: "장서영", team: "po", d: [1, 1], m: [1, 1] },
  { name: "양성은", team: "anf", d: [2, 1], m: [2, 1] },
  { name: "김동은", team: "comm", d: [4, 1], m: [4, 2] },
  { name: "김현호", team: "mkt", d: [6, 1], m: [3, 1] },
  { name: "박예은", team: "mkt", d: [7, 1], m: [4, 1] },
  { name: "안지언", team: "space", d: [1, 2], m: [1, 2] },
  { name: "이유택", team: "space", d: [2, 2], m: [2, 2] },
  { name: "정예원", team: "space", d: [3, 2], m: [3, 2] },
  { name: "오지샘", team: "brand", d: [5, 2], m: [1, 3] },
  { name: "이수민", team: "web", d: [7, 2], m: [2, 3] },
];
