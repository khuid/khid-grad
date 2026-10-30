// DESIGNERS 페이지 데이터: 졸전자 55명(졸준위만 한 56 이수민·57 오지샘 제외), 가나다 순 = work/data/designers/designers.csv 순서.
// slug(주소 /2026/designers/<slug>)와 사진 파일명은 csv의 name_en. en은 임시 표기(성 + 이름 로마자) — 본인 표기를 받으면 en·slug·사진 이름을 같이 바꿀 것.
// en·contact(이메일)·portfolio는 구글폼 응답(11/1 마감)에서 옮김 — 영문은 본인 철자 그대로, 형식만 "성 이름"(성 뒤만 띄움, 이름은 붙여 씀, 성·이름 첫 글자만 대문자 — 홍길동 → Hong Gildong). 이메일이 없으면 화면에 "준비 중".
// portfolio(선택, 최대 3개): 인스타는 "@아이디"(아이디·링크 둘 다 쓴 사람도 하나로), 나머지는 https://www. 뺀 주소. 비어 있으면 PORTFOLIO 줄 자체를 안 보임.
// 프로필 아래 작품 3개는 projects.ts의 members(국문 이름)로 저절로 찾음
export type Designer = {
  no: string;
  slug: string;
  ko: string;
  en: string;
  contact?: string;
  portfolio: string[];
};

const d = (no: string, ko: string, slug: string, en: string, contact?: string, portfolio: string[] = []): Designer => ({
  no,
  slug,
  ko,
  en,
  contact,
  portfolio,
});

export const DESIGNERS: Designer[] = [
  d("01", "공성욱", "gong-seonguk", "Gong Seonguk"),
  d("02", "권정현", "kwon-jeonghyeon", "Kwon Jeonghyeon"),
  d("03", "기정현", "ki-jeonghyun", "Ki Jeonghyun", "klr9584@khu.ac.kr"),
  d("04", "김남경", "kim-namgyeong", "Kim Namgyeong"),
  d("05", "김도경", "kim-dogyeong", "Kim Dogyeong"),
  d("06", "김도연", "kim-doyeon", "Kim Doyeon", "dodo1004000@naver.com"), // 본인 표기 Kim Do Yeon → 이름 붙여쓰기 원칙대로
  d("07", "김동은", "kim-dongeun", "Kim Dongeun", "nu3gn0d@gmail.com"),
  d("08", "김명선", "kim-myoungseon", "Kim Myoungseon", "kmskms0223@gmail.com", ["behance.net/myoungseon", "@archive.seon"]),
  d("09", "김예림", "kim-yerim", "Kim Yerim"),
  d("10", "김윤주", "kim-yunju", "Kim Yunju", "1pret@naver.com"),
  d("11", "김주연", "kim-juyeon", "Kim Juyeon"),
  d("12", "김지은", "kim-jieun", "Kim Jieun", "gimjieun805@gmail.com", ["@jieunkim__pd", "@2_156k"]),
  d("13", "김태령", "kim-taeryeong", "Kim Taeryeong"),
  d("14", "김현호", "kim-hyeonho", "Kim Hyeonho"),
  d("15", "박세권", "park-sekwon", "Park Sekwon", "qkrtprnjs531@naver.com"),
  d("16", "박수해", "park-suhae", "Park Suhae", "qkrtngo0521@khu.ac.kr"),
  d("17", "박예은", "park-yeeun", "Park Yeeun", "pi6257@khu.ac.kr", ["@__nueey"]),
  d("18", "박한나", "park-hanna", "Park Hanna"),
  d("19", "박효찬", "park-hyochan", "Park Hyochan"),
  d("20", "배민아", "bae-mina", "Bae Mina"),
  d("21", "성아현", "seong-ahyeon", "Seong Ahyeon", "sah0731@naver.com"),
  d("22", "손예원", "son-yewon", "Son Yewon"),
  d("23", "손은혜", "son-eunhye", "Son Eunhye", "seh2021@khu.ac.kr"),
  d("24", "신예환", "shin-yehwan", "Shin Yehwan"),
  d("25", "안지언", "ahn-jieon", "Ahn Jieon"),
  d("26", "양성은", "yang-seongeun", "Yang Seongeun", "yang030706@gmail.com"),
  d("27", "유은서", "yoo-eunseo", "Yoo Eunseo"),
  d("28", "윤아영", "yun-ayoung", "Yun Ayoung", "yay11311131@gmail.com", ["@a._.young._"]),
  d("29", "이규진", "lee-gyujin", "Lee Gyujin", "gjbomul1@naver.com", ["@nijuygeel"]),
  d("30", "이민기", "lee-mingi", "Lee Mingi"),
  d("31", "이민혁", "lee-minhyeok", "Lee Minhyeok"),
  d("32", "이보화", "lee-bohwa", "Lee Bohwa"),
  d("33", "이수연", "lee-suyeon", "Lee Suyeon"),
  d("34", "이수진", "lee-soojin", "Lee Soojin", "soojinrl0701@naver.com", ["@soojinrl"]),
  d("35", "이유택", "lee-yutaek", "Lee Yutaek"),
  d("36", "이지수", "lee-jisu", "Lee Jisu"),
  d("37", "이진", "lee-jin", "Lee Jin", "wlswls3389@naver.com", ["@l.jin_0514", "behance.net/9ad789f6"]),
  d("38", "이진주", "lee-jinju", "Lee Jinju"),
  d("39", "이하은", "lee-haeun", "Lee Haeun"),
  d("40", "임형민", "lim-hyeongmin", "Lim Hyeongmin"),
  d("41", "장서영", "jang-seoyeong", "Jang Seoyeong", "julie3418@naver.com", ["@seoyeong_jang_"]),
  d("42", "장일정", "zhang-yicheng", "Zhang Yicheng"), // 본인 영문 표기 ZHANG YICHENG
  d("43", "전예영", "jeon-yeyeong", "Jeon Yeyeong"),
  d("44", "정보연", "jung-boyeon", "Jung Boyeon", "lolly7368@gmail.com"),
  d("45", "정예원", "jeong-yewon", "Jeong Yewon", "ywjeong1011@gmail.com", ["behance.net/0ee41a39"]),
  d("46", "정효재", "jung-hyojae", "Jung Hyojae"),
  d("47", "조수안", "cho-suahn", "Cho Suahn", "inwater22@naver.com"),
  d("48", "조해린", "cho-haerin", "Cho Haerin"),
  d("49", "최마리", "choi-marie", "Choi Marie", "marie.choiix@gmail.com"),
  d("50", "최성지", "choi-seongji", "Choi Seongji", "tktprhks2000@naver.com", ["@pilgrim_choi"]),
  d("51", "최세린", "choi-serin", "Choi Serin"),
  d("52", "하채연", "ha-chaeyeon", "Ha Chaeyeon", "dha0809@naver.com", ["@design_chae.yeon", "behance.net/dbe43dfe"]),
  d("53", "한예지", "han-yeji", "Han Yeji", "1neyez95@gmail.com", ["behance.net/YejiHann"]),
  d("54", "허경주", "heo-gyeongju", "Heo Gyeongju"),
  d("55", "홍진솔", "hong-jinsol", "Hong Jinsol"),
];

export const frontPhoto = (p: Designer) => `/2026/designers/front/f${p.no}-${p.slug}.webp`;
export const posePhoto = (p: Designer) => `/2026/designers/pose/p${p.no}-${p.slug}.webp`;
