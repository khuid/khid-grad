// 2024 작품 62개 — 아임웹 Works 메뉴(과목 → 작품) 순서·제목·팀원 그대로 (2026-11-04).
// members에 디자이너 국문 이름(designers.ts의 ko)을 적으면 디자이너 페이지에 그 작품이 뜸.
// 주소: /2024/projects/<과목>/<작품 id>  (id = 과목 안 순서 번호)
//
// panels = 작품 상세 화면에 위에서부터 이어 붙는 판넬 (아임웹 상세 페이지 구성 그대로 — 글 없이 판넬 이미지·영상만)
//   "1920x2186" = 이미지 한 장(원본 픽셀 크기 → 빈칸 비율), "yt:<ID>" = 유튜브, "vimeo:<ID>" = 비메오
//   판넬 이미지: 구글폼 "2024 졸업전시회 웹사이트 2차 파일 제출" → scripts/import-panels.py → public/2024/projects/<과목>/<id>/01.webp …, 목록 work-panels.ts (2026-11-04)
//     받은 작품은 아임웹 이미지 칸을 받은 이미지로 차례로 바꿈(크기도 받은 것으로). 영상은 아임웹 자리 그대로 두고, 받은 장수가 더 많으면 마지막 이미지 뒤에 이어 붙임
//     제출이 없는 작품은 아임웹 이미지 비율대로 빈칸
//   영상: 같은 폼 "작품 세부 내용 영상" 응답 8개 (2026-11-04) — 유튜브·비메오 링크. 제목은 공개 정보(oEmbed)로 확인
//     Virtuoso: 권의환이 "웹사이트_스마트융합디자인_권의환_1·15·17·22·29·36"으로 낸 영상 6개 → 이미지 파일 번호에서 빠진 그 자리에 넣음
//     Sculpt: 아임웹에 있던 유튜브 g-SBjTv9_rw·비메오 1029664809는 제목이 Virtuoso 영상이라 뺌
//     NutriMate: 유튜브 ftxUj-GdMvc (윤지민, 자리 안 적음 → 맨 뒤)
//     BLOM·크로마키프렌즈(8·12번 뒤)·노들러 오세요·Park In' Park: 아임웹에 이미 같은 영상이 같은 자리에 있음
//     비토즈: 폼은 8번 뒤 비메오 1032245645, 10번 뒤 1032246259. 아임웹은 8번 뒤를 나중(12/11)에 올린 화면 기록 1038191193으로 바꿔 둬서 그걸 그대로 둠
//   panels가 빈 작품 = 아임웹에서도 상세 페이지가 비어 있던 것
// hidden = 아임웹 과목 목록(카드)에는 없고 상단 메뉴에만 있던 작품 — 제목도 아임웹에 없음 (안영은 작품만 썸네일 파일 이름으로 "CROP"인 걸 알게 됨)
//
// 동명이인 이서영은 "이서영_Yeong" · "이서영_Young"으로 구분 (designers.ts 설명)
// 아임웹 표기를 고친 것: "김겅용" → 김성용, "류현졍" → 류현정, "Another Choice  For Women" 띄어쓰기 한 칸, "Ojent" → OJent(과목 목록 표기)
import { nameOf } from "./designers";
import { WORK_PANELS } from "./work-panels";
import { WORK_THUMBS } from "./work-thumbs";

export type Category = { slug: string; name: string };
export type Work = {
  cat: string;
  id: string;
  title: string;
  members: string[];
  panels: string[];
  hidden?: boolean;
  thumb?: string; // 카드 이미지(4:3, 1200×900) — 드라이브 "웹사이트 썸네일 이미지" 폴더 → scripts/import-thumbs.py → public/2024/projects/<과목>/<id>/thumb.webp
  images?: string[]; // panels의 이미지 칸에 차례로 들어갈 파일 (work-panels.ts에 있는 작품만)
};

// 상단 메뉴 순서 (아임웹 Works 메뉴)
export const CATEGORIES: Category[] = [
  { slug: "ai-augmented", name: "인공지능증강디자인" },
  { slug: "future-space", name: "미래공간디자인" },
  { slug: "smart-convergence", name: "스마트융합디자인" },
  { slug: "industrial", name: "산업디자인종합설계" },
];
// Works 첫 화면(과목 이름 4줄) 순서 — 아임웹에서 메뉴와 순서가 달랐음
export const WORKS_INDEX_ORDER = ["ai-augmented", "future-space", "industrial", "smart-convergence"];

type Row = [title: string, members: string, panels: string, hidden?: true];
const DATA: Record<string, Row[]> = {
  "ai-augmented": [
    ["SHEDY", "강민지 김도연 윤소정", ""],
    ["FLUVO", "유채연", "1920x2186,1920x790,1920x750,1920x469,1920x560,1920x386,1920x429,1920x760,1920x429,1920x1080,1920x421,1920x1054,1920x1080,1920x1165"],
    ["OJent", "김소현 장효린", ""],
    ["VIPASSANA", "신동주", "1920x5000"],
    ["BLOM", "김예은 김태완 이수현", "1920x5000,1920x5000,yt:PLKp4TsQd0Q,1920x3745"],
    ["Asterroad", "김지영 이서영_Young", ""],
    ["SNIFFSCAPE", "류현정 송나현", ""],
    ["NutriMate", "윤지민", "1920x5000,1920x2959,1920x5000,1920x5000,1920x5000,yt:ftxUj-GdMvc"],
    ["NEXIUM", "LIU HAILONG", ""],
    ["B.U.D", "김택림", "1920x5000"],
    ["TOYS FOR CHILDREN WHO STOPPED THINKING", "김나우 김성용", "1920x5000"],
    ["V.I.B.A", "우민국", "1920x5000"],
    ["Sculpt", "권의환", "1920x2292,1920x802,1920x1080,1920x428,1920x642,1920x774,1920x350,1920x904,1920x312,1920x1056,1920x1786,1920x283,1920x1263,640x400,1920x1440,1920x1545,1920x350,640x400,1920x1768,1920x350,1920x4840,1920x2935,640x400,1920x1360,1920x1199,1920x2522,1920x1346,1920x1200,1920x1535,1920x829"],
    ["LUCA", "고민경 박서현", "1920x1080,1920x1080,1920x3240"],
    ["Glintor", "이하민", "1920x5000,1920x4409"],
    ["비토즈", "김채연 이서영_Yeong", "1920x1461,1920x3994,1920x3599,1920x2480,1920x4735,1920x2704,1920x4083,640x640,vimeo:1038191193,1920x2476,640x416,vimeo:1032246259,1920x1464,1920x2240,1920x1080,1920x1712"],
    ["GEONDEOGI", "이은진 주은혁", "1920x1080,1920x2501,1920x2501,1920x2500,1920x2002"],
    ["AI Team Copilot Desk : 스마트한 팀 협업을 위한 사무용 책상", "김수현", "1920x5000"],
    ["GOBI", "전성식", "1920x1080,1920x2541,1920x4284,1920x3810"],
    ["TOYOTA DRIVAI", "정성백", "1920x810,1920x810,1920x810,1920x810,1920x540,1920x540,1920x810,1920x810,1920x2850"],
    ["Aventi", "제유진", ""],
    ["SMR-14", "박해준", "1920x4446,1920x5436,1920x4906,1920x3123,1920x4620,1920x3776,1920x4133,1920x4408"],
    ["Safekey", "이은서 안영은", "1920x3241,1920x3241,1920x3241,1920x3241,1920x3240,1920x2160,1920x2161"],
    ["CUDDLY", "여이현", "1920x1080"],
  ],
  "future-space": [
    ["NEWCELLTA", "강민지 김도연 윤소정", ""],
    ["LOUXUS", "김택림 우민국", "1920x5000"],
    ["ARETI", "김예은 김태완 이수현", "1920x4421,1920x1437,1920x4963,1920x5000"],
    ["NEXT NEST", "이은진 정다영 주은혁", "1920x2197,1920x2500,1920x2500,1920x2500,1920x1546,1920x1546,1920x1546,1920x1546,1920x1546,1920x907"],
    ["TRANSPOT", "윤지민 이서영_Young", "1920x4618,1920x5000,1920x3664,1920x4806,1920x1123"],
    ["SOLUM", "오현호", "1920x1080,1920x1080,1920x1080"],
    ["NADEUL-E JANG", "김다은 오정미", "1920x2859,1920x919,1920x2265,1920x919,1920x3580"],
    ["LIVRO", "김수현 박해준 유해룡", "1920x5000,1920x5000,1920x5000"],
    ["POST THEME PARK CHRONOWORLD", "고민경 박서현", "1920x1080,1920x3240,1920x3240,1920x3240,1920x3240,1920x3240"],
    ["STEM", "심재건 우태균 이승욱", "1920x3767,1920x3927,1920x4881,1920x4962,1920x4147"],
  ],
  "smart-convergence": [
    ["크로마키프렌즈의 놀이 프로젝트", "김소현 김채연", "1920x1495,1920x1861,1920x2730,1920x1961,1920x4799,1920x4315,1920x4167,640x360,vimeo:1030531332,1920x2012,1920x2551,1920x1280,640x360,vimeo:1030531375,1920x1762,1920x3344,1920x3659"],
    ["POP-IT", "이서영_Yeong 정다영", "1920x4625,1920x4520,1920x4777,1920x945"],
    ["MU:TE", "여이현", "1920x1080"],
    ["ATMO", "이하민 장효린", "1920x4982,1920x4874,1920x4844,1920x4504,1920x2927,1920x3264"],
    ["BRING", "박해준 전성식", "1920x3384,1920x3974,1920x4885,1920x2195,1920x4046,1920x3743,1920x3883,1920x6148"],
    ["Nexora", "오정미 유채연 이은서", "1920x1080,1920x1080,1920x1080,1920x1080,1920x1080,1920x1080,1920x1080,1920x1080,1920x1080,1920x1080,1920x1080,1920x1080,1920x1080"],
    ["Virtuoso", "권의환", "yt:g-SBjTv9_rw,1920x2879,1920x921,1920x356,1920x1346,1920x288,1920x1346,1920x503,1920x1273,1920x503,1920x3074,1920x1272,1920x288,1920x1272,vimeo:1029665391,1920x288,vimeo:1029665499,1920x1272,1920x288,1920x1536,1920x1272,vimeo:1029664809,1920x288,1920x1078,1920x288,1920x601,1920x668,1920x1272,vimeo:1029665020,1920x288,1920x1079,1920x288,1920x601,1920x669,1920x1272,vimeo:1029665258,1920x288,1920x1272,1920x288,1920x711,1920x725,1920x1200,1920x1263,1920x1088,1920x1207,1920x1200,1920x1440,1920x868"],
    ["", "강민지 제유진", "", true],
    ["REFEEL", "김예은 김태완 이수현", "1920x4774,1920x5000"],
    ["CROP", "안영은", "1920x1080,1920x3192,1920x1474,1920x2581,1920x2023,1920x1625,1920x2361,1920x3850,1920x2634,1920x2192,1920x3436,1920x2066,1920x1280,1920x4893", true],
    ["New Eyes For Firefighters", "김나우 김성용", "1920x4828"],
    ["Dribo", "김택림 우민국", "1920x5000"],
    ["XPLOVA", "송나현", ""],
    ["FADE", "신동주", "1920x5000,1920x3149"],
    ["談笑", "심재건 우태균 이승욱", "1920x4000,1920x3620,1920x5000,1920x5000,1920x1200,1920x3308"],
    ["WORKOUT IN MY NEED", "오현호", "1920x1200,1920x1200"],
    ["", "김지영 류현정", "", true],
    ["CHEVROLET PATH", "정성백", "1920x810,1920x810,1920x405,1920x810,1920x810,1920x810,1920x810,1920x810,1920x810,1920x810,1920x810,1920x810"],
  ],
  industrial: [
    ["Park In' Park", "김수현 윤지민 주은혁 정성백 LIU HAILONG", "1920x5000,yt:5Qdzif1Wfd8,1920x3400,1920x1800"],
    ["HI, BY", "심재건 우태균 이승욱 전성식", "1920x4671,1920x3733,1920x4116,1920x3065,1920x4780,1920x4211,1920x1277"],
    ["Another Choice For Women", "김나우 김성용 신동주 여이현", "1920x4911"],
    ["물결이 머무는 섬, 노들서가", "김다은 이하은", "1920x4398,1920x2930"],
    ["노들러 오세요", "김도연 김채연 배민경 송나현 제유진", "1920x1721,1920x2287,1920x1956,1920x1080,1920x1080,1920x2143,1920x2425,1920x1080,1920x2160,1920x2160,1920x2160,1920x1589,1920x1080,1920x3447,1920x1080,1920x1080,1920x2846,1920x2846,1920x2846,1920x1949,1920x4002,1920x1080,1920x2344,640x360,vimeo:1031784197,1920x1080,1920x3420,1920x1080,1920x1080"],
    ["", "김지영 류현정 이서영 장효린", "", true],
    ["Wave of Island, 노들의 시간을 걷다", "김소현 이은진 정다영", "1920x4323,1920x2118,1920x4272,1920x2229,1920x3663,1920x3657,1920x2972,1920x2968,1920x1080,1920x1814"],
    ["Otium", "고민경 박서현", "1920x1080,1920x1080,1920x1080,1920x1080,1920x1080,1920x1080,1920x1080,1920x1080,1920x1080,1920x1080"],
    ["REFFUSE", "오정미 윤소정 이서영_Yeong 이하민", "1920x1943,1920x4243,1920x4099,1920x4077,1920x4859,1920x1076"],
    ["CLEA", "권의환 유채연 이은서 안영은", "1920x1081,1920x1081,1920x1081,1920x4869,1920x1599,1920x2128,1920x2399,1920x4732,1920x2136,1920x4211,1920x3830,1920x1476,1920x1080,1920x1080,1920x1080,1920x678,1920x1080,1920x1080,1920x837"],
  ],
};

// 받은 판넬 이미지가 있으면 아임웹 판넬의 이미지 칸을 차례로 바꾸고(영상 자리는 그대로), 남는 이미지는 마지막 이미지 칸 뒤에 이어 붙임
function withPanels(key: string, imweb: string[]): Pick<Work, "panels" | "images"> {
  const got = WORK_PANELS[key];
  if (!got) return { panels: imweb };
  const isImage = (p: string) => /^\d+x\d+$/.test(p);
  const sizes = got.map(([w, h]) => `${w}x${h}`);
  const last = imweb.findLastIndex(isImage);
  const panels: string[] = [];
  let n = 0;
  imweb.forEach((p, i) => {
    if (!isImage(p)) panels.push(p);
    else if (n < sizes.length) panels.push(sizes[n++]);
    if (i === last) panels.push(...sizes.slice(n));
  });
  if (last < 0) panels.push(...sizes);
  return { panels, images: got.map((_, i) => `/2024/projects/${key}/${String(i + 1).padStart(2, "0")}.webp`) };
}

export const WORKS: Work[] = CATEGORIES.flatMap((c) =>
  DATA[c.slug].map(([title, members, panels, hidden], i) => {
    const id = String(i + 1).padStart(2, "0");
    return {
      cat: c.slug,
      id,
      title,
      // 팀원은 띄어쓰기로 나눔 — 영문 이름 "LIU HAILONG"만 한 사람으로 묶음
      members: members.replace("LIU HAILONG", "LIU+HAILONG").split(" ").map((m) => m.replace("+", " ")),
      ...withPanels(`${c.slug}/${id}`, panels ? panels.split(",") : []),
      hidden,
      thumb: WORK_THUMBS.has(`${c.slug}/${id}`) ? `/2024/projects/${c.slug}/${id}/thumb.webp` : undefined,
    };
  }),
);

export const categoryOf = (slug: string) => CATEGORIES.find((c) => c.slug === slug);
export const categoryHref = (c: Category) => `/2024/projects/${c.slug}`;
export const workHref = (w: Work) => `/2024/projects/${w.cat}/${w.id}`;
// 화면에 보일 팀원 이름 (동명이인 구분 표시를 뗌). 상단 메뉴의 작품 이름도 이것 (아임웹 메뉴 그대로)
export const memberNames = (w: Work) => w.members.map(nameOf).join(" ");
export const workMenuName = memberNames;
// 디자이너 페이지에 보여 줄 그 사람의 작품들 (메뉴 순서) — 구분 없이 "이서영"만 적힌 작품은 이서영 두 사람 모두에게
export const worksOf = (ko: string) => WORKS.filter((w) => w.members.includes(ko) || w.members.includes(nameOf(ko)));

// 판넬 한 칸 풀기
export type Panel = { kind: "image"; w: number; h: number } | { kind: "youtube" | "vimeo"; id: string };
export const parsePanel = (p: string): Panel => {
  if (p.startsWith("yt:")) return { kind: "youtube", id: p.slice(3) };
  if (p.startsWith("vimeo:")) return { kind: "vimeo", id: p.slice(6) };
  const [w, h] = p.split("x").map(Number);
  return { kind: "image", w, h };
};
