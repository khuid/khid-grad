// PROJECTS 데이터: 수업 4개(가나다 순) × 작품 자리 81개(받은 74개 + 빈 자리). 수업마다 /2026/projects/<수업>, 작품마다 /2026/projects/<수업>/<번호>.
// 작품 제목·만든 사람(members, 국문 이름 1~4명)은 WORKS에. 목록·프로필 모두 제목 가나다-abc 순.
// members에 넣은 이름은 DESIGNERS 프로필의 작품 카드에도 저절로 연결됨(이름이 같은 졸전자).
// 이미지·영상·링크·설명은 나중에 일괄 입력 — 제출 규격은 work/docs/04_이미지제출가이드.md (구글폼, 팀당 대표 1인):
//   thumb        목록 썸네일 4:5, JPG 1080×1350 권장
// 파일은 public/2026/projects/<수업>/<제목 slug>/ (thumb.webp, 01.webp…, 영상 NN.mp4) — scripts/2026/import-media.py로 만들고 아래 FILES에 등록
//   media        상세 왼쪽 세로 나열(사이 여백 0): 16:9 장표 이미지 3~7장(1920×1080↑, 파일명 순서 넘버링)
//                + 선택 영상 1개 — 15초 이내 MP4(10MB↓, type "video") 또는 유튜브 링크(type "youtube")
//   description  국문 설명, 공백 포함 최대 400자
//   links        작품별 외부 링크 최대 3개 (비핸스 등, 상세 오른쪽 아래 "Behance ↗")
export type ClassKey = "spatial" | "capstone" | "smart" | "ai";

export type Media =
  | { type: "image"; src: string }
  | { type: "video"; src: string } // mp4 직접
  | { type: "youtube"; id: string }; // 유튜브 주소의 v= 뒤 값

export type Project = {
  cls: ClassKey;
  no: string; // 수업 안 번호 01~
  title: string;
  members: string[];
  thumb?: string;
  description?: string;
  links: { label: string; href: string }[];
  media: Media[];
};

export type ClassInfo = {
  key: ClassKey;
  ko: string;
  en: string; // 수업 소개 자료의 영문 표기, Figma처럼 모두 대문자
  professors: string[];
  description?: string; // 줄바꿈(\n)은 화면에서도 줄바꿈
};

export const CLASSES: ClassInfo[] = [
  {
    key: "spatial",
    ko: "미래공간디자인",
    en: "FUTURISTIC SPATIAL DESIGN",
    professors: ["최유식"],
    description:
      "산업의 구조 변화와 경제의 글로벌화 등으로 인한 인간의 생활 환경 변화는 물리적, 정신적으로 다양한 트렌드로 나타나고 있으며 이는 인간 삶의 질을 결정짓는 중요한 요소다. 다양한 미래 환경(공간) 트렌드에 대한 조사와 분석을 통해 인간 생활 환경을 학습하고 이를 바탕으로 미래 인간 삶의 트렌드 예측 및 대안을 제시함으로써 미래 사회 구성원의 일부로서의 역할을 경험해 본다.",
  },
  {
    key: "capstone",
    ko: "산업디자인종합설계",
    en: "COMPREHENSIVE INDUSTRIAL DESIGN",
    professors: ["김선철", "이동민"],
    description:
      "연구 주제를 통해 연구 논문 포트폴리오 및 프로토타입을 개발하여 캡스톤 과정의 협업 공동 연구 시스템을 이해하는 종합적 설계 과정을 거친다. 디자인 기초 연구를 기반으로 방법론을 학습하고, 아이디어 탐색 및 문제 해결 과정을 통해 아이템을 시각화하며, 비즈니스적 발상을 기반으로 연구 아이템을 테스트 및 개선하여 실현 가능한 아이템을 제안하는 것을 목표로 한다.",
  },
  {
    key: "smart",
    ko: "스마트융합디자인",
    en: "SMART CONVERGENCE DESIGN",
    professors: ["이동민"],
    description:
      "새로운 디지털 시대에 맞는 폭넓은 융합적 사고를 통해, 현재 사람들의 일상을 개선하고 미래의 라이프스타일을 발굴한다.\n산업디자이너로서 필요한 디자인적 사고와 다양한 시각화 능력을 활용하여 디자인 방법론을 기반으로 사람과 사회에 가치 있는 디자인적 솔루션을 도출해낸다.",
  },
  {
    key: "ai",
    ko: "인공지능증강디자인",
    en: "A.I. AUGMENTED DESIGN",
    professors: ["김선철"],
    description:
      "기술의 끊임없는 발전에 따라 현대 디자이너들의 역할에 대해 고민하는 시기가 다시 찾아왔다. 인공지능이 인간의 일상에 자연스럽게 녹아듦에 따라 사람들은 인공지능의 무궁무진한 가능성에 놀라기도, 두려워하기도 한다. 하지만 분명한 것은 인공지능과 공존해야 한다는 것이다. 성장하는 디자이너들은 앞으로 어떻게 인공지능과 협업해야 하는가? 2026년 경희대학교 산업디자인학과 인공지능증강디자인 수업 학생들은 1년간 필요에 따라 인공지능과 협업하며 그들의 디자인적 사고 능력에 박차를 가했다. 학생들은 디자인 계획에서부터 연구 및 분석 결과에 이르기까지 인공지능과 협업하여 증강하는 형태로 프로젝트를 진화시켰다.",
  },
];

// 수업별 작품 수(자리). 받은 작품이 이보다 적으면 남는 자리는 "작품 제목" 빈 카드로 둠
const SLOTS: Record<ClassKey, number> = { spatial: 10, capstone: 18, smart: 29, ai: 24 };

// 수업별 작품 [제목, 만든 사람들] — work/data/projects/project-list.xlsx(2026-10-23)에서 작품명·팀원 이름만 옮김(순서 상관없음, 아래에서 정렬).
// 같은 수업에 팀원이 똑같은 줄이 또 있으면 첫 줄만(스융디 ATOA·인지디 Knoticy 중복 제외).
// "1. Put _ [ ]. 2. Bruiser"는 한 작품. ZHANG YICHENG = 장일정
// 셋째 값 = 소개글(구글폼 작품 응답에서 옮김, 2026-10-27~). 응답은 팀원 이름이 모두 같은 작품에 맞추고, 제목도 응답 표기로 바꿈(소개글은 받은 그대로)
const WORKS: Record<ClassKey, [title: string, members: string[], description?: string][]> = {
  spatial: [
    [
      "LIMEN : The Threshold of Senses",
      ["최성지", "김남경", "박세권"],
      "2046년, AI와 VR이 일상이 된 초연결 시대. 보고 듣는 정보는 넘치지만 손끝의 감각은 무뎌졌습니다. LIMEN(라틴어로 '문턱')은 디지털을 끄는 대신 가현실강·햅틱·홀로그램 같은 미래 기술로 아날로그 감각을 다시 켜는 디지로그 복합 공간입니다. 1968년 김수근이 설계한 국내 최초의 주상복합 세운상가를 허물지 않고, 공중보행데크로 이어진 상가군의 틀을 이어받아 2046년의 모습으로 다시 지었습니다. 3개 동 8개 층에 10개 공간이 있으며, 메인 콘텐츠인 오감 탐색 공간에서는 탐정이 되어 옛 상가에 숨은 흔적을 보고, 듣고, 냄새 맡고, 만져서 찾아냅니다. 상인과 함께 고치는 공간, 창업자의 작업실, 사라진 장인의 손기술을 남기는 공간까지, 감각 체험을 넘어 상생·창작·보존을 잇습니다.",
    ],
    ["이상유희", ["박효찬"]],
    ["Microbial Loop Habitat", ["조해린", "손예원"]],
    ["이음마루", ["김윤주", "정보연", "이수연"]],
    ["SOYO", ["김명선", "김주연"]],
    ["NEXPORT", ["김예림", "배민아"]],
    ["WHALE CITY 鲸城｜웨일 시티", ["장일정"]],
    ["O2-SIS", ["이지수", "윤아영"]],
    ["NUFF", ["이민기"]],
  ],
  capstone: [
    ["Amber", ["이규진", "임형민", "전예영"]],
    ["Da dog im", ["김윤주", "이수연", "정보연"]],
    ["elo", ["김도연", "김동은", "이진", "정효재"]],
    ["woofwoof", ["김태령", "이수진", "하채연"]],
    ["Orr (오르)", ["김명선", "김주연", "장서영"]],
    ["SEOM", ["손예원", "조해린", "이민혁", "장일정"]],
    ["Jaram", ["손은혜", "조수안", "최마리"]],
    ["HANGIT", ["정예원", "박예은", "안지언", "이보화"]],
    ["TUK", ["김지은"]],
    ["SSALO", ["기정현", "김도경", "이진주"]],
    ["TOBI", ["박수해", "권정현"]],
    ["FORE", ["박한나", "성아현", "유은서", "최세린"]],
    ["EEUM", ["김예림", "배민아"]],
    ["ZEИITH Acoustics - 001", ["이유택"]],
    ["NODE", ["김현호", "한예지"]],
    ["AMOUS", ["공성욱", "박효찬", "신예환", "허경주"]],
  ],
  smart: [
    [
      "RE:SOURCE",
      ["박세권", "최성지"],
      "RE:SOURCE는 자원은 고갈되고 쓰레기는 넘쳐나는 근미래를 배경으로, 버려진 쓰레기를 현장에서 바로 자원으로 되살리는 모빌리티와 슈트 디자인이다. 캐터필러로 매립지를 오가는 모빌리티는 지붕 뒤 세 개의 로봇팔로 쓰레기를 집어 투입구에 넣고, 차 안에서 선별·분쇄·세척·열처리를 거쳐 재질별 펠릿 캡슐로 만들어 짐칸에 싣는다. 작업자가 입는 슈트는 판초처럼 덧입는 하드 쉘과 두 개의 로봇팔로 무거운 작업을 대신하고, 위험하거나 쉴 때는 판초가 부풀어 몸을 감싸는 돔 쉘터가 된다. 두 오브젝트는 화이트 앤 그레이 바탕에 포인트 컬러 라인과 숫자로 하나의 디자인 언어를 공유하며, 쓰레기를 외부 플랜트로 보내지 않고 현장에서 해결하는 하나의 시스템을 제안한다.",
    ],
    ["Pacer", ["안지언", "이보화"]],
    [
      "Swig",
      ["정예원", "박예은"],
      "Swig는 바쁜 일상과 장시간의 업무 속에서 물 마시는 것을 잊기 쉬운 사람들을 위한 이동형 퍼스널 워터 시스템이다. 정수 및 급·배수 기능을 담당하는 고정 베이스와 사용자에게 물을 전달하는 이동형 디바이스로 구성된다. 사용자의 위치와 움직임을 인식해 곁으로 직접 이동하며, 적절한 순간에 부드러운 알림을 제공해 자연스러운 수분 섭취를 유도한다. 또한 물의 온도, 섭취 간격, 1회 섭취량을 자유롭게 조절할 수 있으며, 다양한 캡슐을 통해 개인의 취향과 필요에 맞는 맞춤형 수분 경험을 제공한다. 물방울에서 영감을 받은 부드러운 형태와 가구를 닮은 디자인은 생활 공간에 자연스럽게 어우러진다. Swig는 물을 마시기 위해 일상의 흐름을 멈추는 대신, 수분 섭취가 일상의 리듬 속에 자연스럽게 스며드는 새로운 방식을 제안한다.",
    ],
    ["ZEEN", ["조해린", "손예원"]],
    ["LYAXOME", ["김태령", "이수진", "하채연"]],
    ["NEXUS", ["이진", "임형민", "전예영"]],
    ["Sync", ["이진주"]],
    ["Pearl-in", ["김윤주", "이수연", "정보연"]],
    ["찰록 (Challok)", ["권정현", "박수해"]],
    ["IRIS", ["김남경"]],
    ["Tension", ["박한나"]],
    ["Nadir", ["성아현", "유은서", "최세린"]],
    ["TERRAVIA", ["신예환", "허경주"]],
    ["VOLLU", ["양성은", "김지은"]],
    ["NOURA", ["김도연", "김동은"]],
    ["LINKO", ["기정현", "김도경"]],
    ["MUA", ["손은혜", "조수안", "최마리"]],
    ["SAEM", ["김주연"]],
    ["PARA", ["이지수"]],
    ["LUMI", ["장일정"]],
    ["MOARK", ["윤아영"]],
    ["MODRIX", ["공성욱"]],
    ["Audi IGNITE", ["배민아"]],
    ["David", ["이유택", "이규진"]],
    ["ATTACA", ["김현호"]],
    ["숨, 결", ["이하은"]],
  ],
  ai: [
    [
      "VN",
      ["최성지", "김남경"],
      "VN은 혼자 아플 때 침대 밖으로 나가지 않고 회복할 수 있도록 돕는 제로동선 회복 침대입니다. 아픈 1인 가구는 물과 약을 챙기러 침대 밖을 오가는 일조차 버겁습니다. VN은 그 동선을 침대 위로 모았습니다. 팝업 테이블의 컵 웰에는 아래에서 물이 차오르고, 바늘 없는 마이크로 어레이 패드가 약을 한 번에 한 회분씩 전달합니다. 어시스트 그립은 앉고 일어서는 동작을 받쳐 주고, 투명 디스플레이 캐노피는 밤하늘을 띄워 조명·온도·안마를 조절하며 숙면을 돕습니다. 침대 아래에는 고양이가 쉬는 펫 덴과 로봇청소기가 지나는 하부를 두었습니다. AI가 만든 후보 336개를 다섯 번의 가중치 평가로 확산·수렴시키고, 실측 모델링과 비평을 반복해 형태를 완성했습니다.",
    ],
    ["Sensory Core", ["박세권"]],
    ["ONBIT", ["이규진", "이유택"]],
    ["FACEHUG", ["권정현", "김예림", "박효찬"]],
    ["ELGO", ["이보화"]],
    [
      "Caret",
      ["정예원", "김현호", "박예은", "안지언"],
      "CARET은 병동에서 반복적으로 이루어지는 배식과 바이탈 체크를 하나의 플랫폼으로 통합한 모듈형 서비스 로봇이. 정해진 식사 시간에는 환자에게 식사를 전달하고 회수하며, 그 외 시간에는 생체 신호 측정을 보조하는 방식으로 역할을 전환해 병동 업무의 효율성을 높인다.\n확장형 식판 거치대와 교체형 의료기기 모듈을 적용해 각 업무에 유연하게 대응하며, 컴팩트한 ㄷ자형 구조를 통해 제한된 병실에서도 환자 가까이 접근할 수 있도록 설계했다. 또한 병동별 필요에 따라 의료기기 구성을 변경할 수 있어 다양한 의료 환경에서 활용할 수 있다.\nCARET은 단순한 업무 자동화를 넘어, 의료진의 반복적인 업무 부담을 줄이고 간호사가 환자 관찰과 의료적 판단에 더 집중할 수 있는 새로운 병동 서비스를 제안한다.",
    ],
    ["Knoticy", ["김도경"]],
    ["HO:RONG", ["이진"]],
    ["DEVOID", ["박한나", "성아현", "이진주", "전예영"]],
    ["WHEW", ["김지은"]],
    ["08:59 (follow nine)", ["김명선", "유은서", "최세린"]],
    ["-ing", ["박수해", "기정현", "정효재"]],
    ["Torus", ["정효재"]],
    ["DAM-DDLE(담뜰)", ["김태령", "이수진", "하채연"]],
    ["onu", ["김도연", "김동은", "양성은"]],
    ["SSOC", ["손은혜", "조수안", "최마리"]],
    ["WHIFFY", ["윤아영", "이지수"]],
    ["NUUN", ["공성욱", "신예환"]],
    ["DIVRS", ["이민혁"]],
    ["COLT", ["이민기"]],
    ["Put _ [ ] / Bruiser", ["임형민", "허경주"]],
    ["EGGSHELL", ["이하은"]],
    ["arti", ["한예지"]],
  ],
};

// 받은 파일: "<수업>/<제목 slug>" → 장표 번호 순서 ("NN" = NN.webp, "NN.mp4" = 영상). thumb.webp는 늘 함께 있음
const FILES: Record<string, string[]> = {
  "ai/caret": ["01", "02", "03", "04", "05", "06", "07"],
  "ai/vn": ["01", "02.mp4", "03", "04", "05", "06", "07"],
  "smart/re-source": ["01.mp4", "02", "03", "04", "05", "06", "07"],
  "smart/swig": ["01", "02", "03", "04", "05", "06", "07"],
  "spatial/limen-the-threshold-of-senses": ["01", "02", "03", "04", "05", "06", "07.mp4"],
};

// 제목 → 폴더 이름 (영문·숫자만, 나머지는 -)
const slug = (title: string) => title.replace(/[^A-Za-z0-9]+/g, "-").replace(/^-|-$/g, "").toLowerCase();

function filesOf(cls: ClassKey, title: string): Pick<Project, "thumb" | "media"> {
  const key = `${cls}/${slug(title)}`;
  const list = FILES[key];
  if (!list) return { media: [] };
  const dir = `/2026/projects/${key}`;
  return {
    thumb: `${dir}/thumb.webp`,
    media: list.map((f): Media => (f.endsWith(".mp4") ? { type: "video", src: `${dir}/${f}` } : { type: "image", src: `${dir}/${f}.webp` })),
  };
}

// 작품 제목 가나다 → abc → 숫자·기호 순 (앞의 기호·공백은 무시, 대소문자 구분 없음)
function group(title: string) {
  const ch = title.replace(/^[^\p{L}\p{N}]+/u, "")[0] ?? "";
  if (/\p{Script=Hangul}/u.test(ch)) return 0;
  if (/[a-z]/i.test(ch)) return 1;
  return 2;
}
export function byTitle(a: { title: string }, b: { title: string }) {
  return (
    group(a.title) - group(b.title) ||
    a.title.localeCompare(b.title, "ko", { sensitivity: "base", ignorePunctuation: true, numeric: true })
  );
}

// 번호(주소 /<수업>/<번호>)는 정렬한 순서대로, 빈 자리는 맨 뒤
export const PROJECTS: Project[] = CLASSES.flatMap((c) => {
  // 만든 사람도 가나다 순
  const filled = WORKS[c.key]
    .map(([title, members, description]) => ({ title, members: [...members].sort((a, b) => a.localeCompare(b, "ko")), description }))
    .sort(byTitle);
  const empty = Array.from({ length: Math.max(0, SLOTS[c.key] - filled.length) }, () => ({ title: "작품 제목", members: [] }));
  return [...filled, ...empty].map((w, i) => ({
    cls: c.key,
    no: String(i + 1).padStart(2, "0"),
    ...w,
    links: [],
    ...filesOf(c.key, w.title),
  }));
});

export const classOf = (key: string) => CLASSES.find((c) => c.key === key);
export const projectsOf = (key: ClassKey) => PROJECTS.filter((p) => p.cls === key);
export const projectHref = (p: Project) => `/2026/projects/${p.cls}/${p.no}`;
export const worksOf = (name: string) => PROJECTS.filter((p) => p.members.includes(name)).sort(byTitle);
