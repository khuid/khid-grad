// 2025 일본 전공연수(Global Design Intelligence Exchange 2025 Japan) 페이지의 나머지 내용 — 프레이머 /projects-global_design
// 과목 정보·프로그램 개요/주제·참여 프로젝트는 categories.ts의 global-design. 여기는 영상·교수진·현장 답사·일본 학생 작품
// 2026-10-30 프레이머에 보이는 글 그대로 읽음 (숨김 레이어 제외), 띄어쓰기만 고침(오사카 국제박람회·팀랩)
// 사진(2026-10-31): 사용자가 준 드라이브 "일본관련" 폴더만 씀 — 교수진·현장 답사는 리플렛(태산인디고 리플렛.ai)에 든 사진을 꺼냄
//   리플렛 사진은 인쇄용 CMYK(Japan Color 2001 Coated) → 반드시 그 ICC 프로필로 sRGB 변환해야 색이 맞음 (2026-10-31 그냥 꺼냈다가 푸른빛으로 틀어져 다시 변환), 일본 학생 작품은 jpg 3장
// 화면: GlobalSections.tsx

export const GLOBAL_VIDEO = "ZF16vfddQRw"; // 프레이머 YouTube 컴포넌트

// 참여 교수진 및 전문가 INSTRUCTORS & EXPERTS — 묶음별 사람(이름·직무)
export const GLOBAL_EXPERTS: { group: string; people: { name: string; role: string; photo: string }[] }[] = [
  {
    "group": "경희대학교 교수진",
    "people": [
      {
        "name": "장광집",
        "photo": "/2025/global/experts/jang-kwangjib.webp",
        "role": "교수"
      },
      {
        "name": "김선철",
        "photo": "/2025/global/experts/kim-sunchul.webp",
        "role": "교수"
      },
      {
        "name": "이동민",
        "photo": "/2025/global/experts/lee-dongmin.webp",
        "role": "교수/학과장"
      },
      {
        "name": "김유빈",
        "photo": "/2025/global/experts/kim-youbin.webp",
        "role": "조교수"
      },
      {
        "name": "윤상원",
        "photo": "/2025/global/experts/yoon-sangwon.webp",
        "role": "겸임교수"
      }
    ]
  },
  {
    "group": "교토공예섬유대학교 교수진",
    "people": [
      {
        "name": "쿠로야나기 카나코",
        "photo": "/2025/global/experts/kuroyanagi-kanako.webp",
        "role": "조교수"
      },
      {
        "name": "니시무라 마사노부",
        "photo": "/2025/global/experts/nishimura-masanobu.webp",
        "role": "부교수"
      },
      {
        "name": "타타라 케이타",
        "photo": "/2025/global/experts/tatara-keita.webp",
        "role": "조교수"
      }
    ]
  },
  {
    "group": "GK디자인",
    "people": [
      {
        "name": "후지 아사다",
        "photo": "/2025/global/experts/fuji-asada.webp",
        "role": "CEO"
      },
      {
        "name": "카도와키 코지",
        "photo": "/2025/global/experts/kadowaki-koji.webp",
        "role": "디렉터"
      }
    ]
  },
  {
    "group": "글로벌 디자인 전문가",
    "people": [
      {
        "name": "엄지연 대표",
        "photo": "/2025/global/experts/eom-jiyeon.webp",
        "role": "이오디 디자인"
      },
      {
        "name": "김용하 I/O 디바이스팀",
        "photo": "/2025/global/experts/kim-yongha.webp",
        "role": "엘레컴 주식회사"
      }
    ]
  }
];

// 현장 답사 SITE VISIT — 장소별 이름·설명 (사진 1장씩)
export const GLOBAL_VISITS: { title: string; photo: string; text: string }[] = [
  {
    "title": "교토공예섬유대학",
    "photo": "/2025/global/visits/kyoto-kit.webp",
    "text": "전통과 현대를 융합한 교토공예섬유대학의 교수진과 학생들과의 교류를 통해 다양한 시각으로 디자인을 바라보았다."
  },
  {
    "title": "GK 교토",
    "photo": "/2025/global/visits/gk-kyoto.webp",
    "text": "디자인&리서치 그룹인 GK 디자인 그룹 교토 지사에서 현장 디자이너들의 실무 과정을 직접 체험하며, 참여자들의 프로젝트를 소개하였다. 이를 통해 실무 전문가들의 피드백을 받아 작품의 퀄리티를 한층 고도화하였다."
  },
  {
    "title": "2025 오사카 간사이 엑스포",
    "photo": "/2025/global/visits/osaka-expo.webp",
    "text": "'모두의 건강한 삶을 위한 무한한 가능성'을 주제로 한 오사카 국제박람회를 방문하였다. '생명 연결', '생명에게 힘을', '생명 구원'이라는 세 가지 핵심 테마의 파빌리온에서 다양한 기술과 아이디어를 탐색하였다. 더불어 기네스 세계 기록에 등재된 건축물인 '그랜드 링'을 직접 체험하는 시간을 가졌다."
  },
  {
    "title": "팀랩 보태니컬 가든",
    "photo": "/2025/global/visits/teamlab-botanical.webp",
    "text": "디지털 아트와 자연이 결합된 공간에서 상호작용을 경험하며, 마치 자연 속에 들어와 있는 듯한 체험형 디지털 아트를 감상한다. 기술과 예술, 자연이 공존하는 몰입형 인터랙티브 전시 속에서 새로운 감각적 경험을 느낄 수 있다."
  },
  {
    "title": "그랜드 그린 오사카 & 나카노시마 어린이 책의 숲",
    "photo": "/2025/global/visits/grand-green-osaka.webp",
    "text": "안도 다다오가 설계한 그랜드 그린 오사카와 나카노시마 어린이 도서관에서 녹음과 기술 혁신이 어우러진 공간을 탐색하고, 우메다-난바 지역을 탐색하며 도시 속 새로운 시각의 공공 디자인을 탐사한다."
  }
];

// 일본 학생 작품 JAPANESE STUDENTS' WORKS — 작품 제목·학생 이름(일본어 표기 + 영문)
export const GLOBAL_JP_WORKS: { title: string; name: string; image: string }[] = [
  {
    "title": "관광지에서의 적절한 폐기물 처리를 위한 제안",
    "name": "泉野雅斗  IZUMINO MASATO",
    "image": "/2025/global/jp-works/izumino-masato.webp"
  },
  {
    "title": "fictionose",
    "name": "高井優作  TAKAI YUSAKU",
    "image": "/2025/global/jp-works/takai-yusaku.webp"
  },
  {
    "title": "sotomoco",
    "name": "中道咲花  NAKAMICHI SAWA",
    "image": "/2025/global/jp-works/nakamichi-sawa.webp"
  }
];
