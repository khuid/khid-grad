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
  d("01", "공성욱", "gong-seongwook", "Gong Seongwook", "gswfly@naver.com", ["@design_seongwook.gong"]),
  d("02", "권정현", "kwon-junghyun", "Kwon Junghyun", "junghyeon@gmail.com"), // 본인 표기 Kwon Jung Hyun → 이름 붙여쓰기
  d("03", "기정현", "ki-jeonghyun", "Ki Jeonghyun", "klr9584@khu.ac.kr"),
  d("04", "김남경", "kim-namkyung", "Kim Namkyung", "knk@khu.ac.kr", ["youtube.com/@kyouxn"]),
  d("05", "김도경", "kim-dokyung", "Kim Dokyung", "ehrudo0218@gmail.com", ["behance.net/obdo"]),
  d("06", "김도연", "kim-doyeon", "Kim Doyeon", "dodo1004000@naver.com"), // 본인 표기 Kim Do Yeon → 이름 붙여쓰기 원칙대로
  d("07", "김동은", "kim-dongeun", "Kim Dongeun", "nu3gn0d@gmail.com"),
  d("08", "김명선", "kim-myoungseon", "Kim Myoungseon", "kmskms0223@gmail.com", ["behance.net/myoungseon", "@archive.seon"]),
  d("09", "김예림", "kim-yelim", "Kim Yelim", "yelim.nm.kim@gmail.com", ["@15.47l", "behance.net/yelimkim813"]),
  d("10", "김윤주", "kim-yunju", "Kim Yunju", "1pret@naver.com"),
  d("11", "김주연", "kim-juyeon", "Kim Juyeon", "wndusrla0321@gmail.com", ["@juju_main", "behance.net/52cbd72b"]),
  d("12", "김지은", "kim-jieun", "Kim Jieun", "gimjieun805@gmail.com", ["@jieunkim__pd", "@2_156k"]),
  d("13", "김태령", "kim-taeryeong", "Kim Taeryeong", "xofud0328@gmail.com"),
  d("14", "김현호", "kim-hyeonho", "Kim Hyeonho", "hyeonhokkim@gmail.com", ["@hyeonho_kkim"]),
  d("15", "박세권", "park-sekwon", "Park Sekwon", "qkrtprnjs531@naver.com"),
  d("16", "박수해", "park-suhae", "Park Suhae", "pshae2747@gmail.com", ["behance.net/4201763d"]), // 11/1 재제출로 이메일 변경
  d("17", "박예은", "park-yeeun", "Park Yeeun", "pi6257@khu.ac.kr", ["@__nueey"]),
  d("18", "박한나", "park-hanna", "Park Hanna", "banghanna0827@gmail.com", ["@parkhanna.works"]),
  d("19", "박효찬", "park-hyochan", "Park Hyochan", "hyochan912@gmail.com", ["@hxochx_"]),
  d("20", "배민아", "bae-minah", "Bae Minah", "minah062802@gmail.com", ["behance.net/f76f7ac5", "@minahindaeyo"]), // 함께 적은 behance.net/minah2802는 404라 실제 주소만
  d("21", "성아현", "seong-ahyeon", "Seong Ahyeon", "sah0731@naver.com"),
  d("22", "손예원", "son-yewon", "Son Yewon", "rhaea01@gmail.com"), // 포트폴리오 칸에 "X" → 없음
  d("23", "손은혜", "son-eunhye", "Son Eunhye", "seh2021@khu.ac.kr"),
  d("24", "신예환", "shin-yewhan", "Shin Yewhan", "jerryshin4736@gmail.com", ["@syw0821"]),
  d("25", "안지언", "ahn-jieon", "Ahn Jieon", "aju4184519@gmail.com", ["@design_jieon"]),
  d("26", "양성은", "yang-seongeun", "Yang Seongeun", "yang030706@gmail.com"),
  d("27", "유은서", "yu-eunseo", "Yu Eunseo", "yeunseo771@gmail.com", ["geumseo.uxdn.kr", "@geumseo.design"]),
  d("28", "윤아영", "yun-ayoung", "Yun Ayoung", "yay11311131@gmail.com", ["@a._.young._"]),
  d("29", "이규진", "lee-gyujin", "Lee Gyujin", "gjbomul1@naver.com", ["@nijuygeel"]),
  d("30", "이민기", "lee-mingie", "Lee Mingie", "colt_kr@naver.com", ["@colt_kr"]),
  d("31", "이민혁", "lee-minhyeok", "Lee Minhyeok", "hyeok722@khu.ac.kr", ["@swirl403"]),
  d("32", "이보화", "lee-bohwa", "Lee Bohwa", "leebh9493@naver.com", ["@bohwa.lee"]),
  d("33", "이수연", "lee-suyeon", "Lee Suyeon", "suyeon8764@gmail.com"),
  d("34", "이수진", "lee-soojin", "Lee Soojin", "soojinrl0701@naver.com", ["@soojinrl"]),
  d("35", "이유택", "lee-yutaek", "Lee Yutaek", "utaek@icloud.com", ["@utaaek"]),
  d("36", "이지수", "lee-jisoo", "Lee Jisoo", "leejs8492@khu.ac.kr", ["@chun_bog"]),
  d("37", "이진", "lee-jin", "Lee Jin", "wlswls3389@naver.com", ["@l.jin_0514", "behance.net/9ad789f6"]),
  d("38", "이진주", "lee-jinju", "Lee Jinju", "ljj8963@khu.ac.kr"),
  d("39", "이하은", "lee-haeun", "Lee Haeun", "dlgkdms0531@naver.com"),
  d("40", "임형민", "im-hyeongmin", "Im Hyeongmin", "000912dlagudals@naver.com", ["@hyeongmin7661"]),
  d("41", "장서영", "jang-seoyeong", "Jang Seoyeong", "julie3418@naver.com", ["@seoyeong_jang_"]),
  d("42", "장일정", "zhang-yicheng", "Zhang Yicheng", "zhangyicheng955@gmail.com"), // 본인 영문 표기 ZHANG YICHENG
  d("43", "전예영", "jeon-yeayoung", "Jeon Yeayoung", "wjsdpdud456@naver.com", ["@ye___yeo"]),
  d("44", "정보연", "jung-boyeon", "Jung Boyeon", "lolly7368@gmail.com"),
  d("45", "정예원", "jeong-yewon", "Jeong Yewon", "ywjeong1011@gmail.com", ["behance.net/0ee41a39"]),
  d("46", "정효재", "jeong-hyojae", "Jeong Hyojae", "jeonghj513@khu.ac.kr"), // 본인 표기 JEONG HYOJAE → 첫 글자만 대문자
  d("47", "조수안", "cho-suahn", "Cho Suahn", "inwater22@naver.com"),
  d("48", "조해린", "jo-haelin", "Jo Haelin", "hae1in@khu.ac.kr"), // 포트폴리오 칸에 "X" → 없음
  d("49", "최마리", "choi-marie", "Choi Marie", "marie.choiix@gmail.com"),
  d("50", "최성지", "choi-seongji", "Choi Seongji", "tktprhks2000@naver.com", ["@pilgrim_choi"]),
  d("51", "최세린", "choi-serin", "Choi Serin", "choisr02@khu.ac.kr", ["@riinsay"]),
  d("52", "하채연", "ha-chaeyeon", "Ha Chaeyeon", "dha0809@naver.com", ["@design_chae.yeon", "behance.net/dbe43dfe"]),
  d("53", "한예지", "han-yeji", "Han Yeji", "1neyez95@gmail.com", ["behance.net/YejiHann"]),
  d("54", "허경주", "heo-kyungju", "Heo Kyungju", "rudwn2161@naver.com"),
  d("55", "홍진솔", "hong-jinsol", "Hong Jinsol"),
];

export const frontPhoto = (p: Designer) => `/2026/designers/front/f${p.no}-${p.slug}.webp`;
export const posePhoto = (p: Designer) => `/2026/designers/pose/p${p.no}-${p.slug}.webp`;
