// DESIGNERS 페이지 데이터: 졸전자 55명(졸준위만 한 56 이수민·57 오지샘 제외), 가나다 순 = work/data/designers/designers.csv 순서.
// slug(주소 /2026/designers/<slug>)와 사진 파일명은 csv의 name_en. en은 임시 표기(성 + 이름 로마자) — 본인 표기를 받으면 en·slug·사진 이름을 같이 바꿀 것.
// contact(이메일)·portfolio(링크 여러 개)는 나중에 일괄 입력. 비어 있으면 화면에 "준비 중".
// 프로필 아래 작품 3개는 projects.ts의 members(국문 이름)로 저절로 찾음
export type Designer = {
  no: string;
  slug: string;
  ko: string;
  en: string;
  contact?: string;
  portfolio: string[];
};

const d = (no: string, ko: string, slug: string, en: string): Designer => ({
  no,
  slug,
  ko,
  en,
  portfolio: [],
});

export const DESIGNERS: Designer[] = [
  d("01", "공성욱", "gong-seonguk", "Gong Seonguk"),
  d("02", "권정현", "kwon-jeonghyeon", "Kwon Jeonghyeon"),
  d("03", "기정현", "ki-jeonghyeon", "Ki Jeonghyeon"),
  d("04", "김남경", "kim-namgyeong", "Kim Namgyeong"),
  d("05", "김도경", "kim-dogyeong", "Kim Dogyeong"),
  d("06", "김도연", "kim-doyeon", "Kim Doyeon"),
  d("07", "김동은", "kim-dongeun", "Kim Dongeun"),
  d("08", "김명선", "kim-myeongseon", "Kim Myeongseon"),
  d("09", "김예림", "kim-yerim", "Kim Yerim"),
  d("10", "김윤주", "kim-yunju", "Kim Yunju"),
  d("11", "김주연", "kim-juyeon", "Kim Juyeon"),
  d("12", "김지은", "kim-jieun", "Kim Jieun"),
  d("13", "김태령", "kim-taeryeong", "Kim Taeryeong"),
  d("14", "김현호", "kim-hyeonho", "Kim Hyeonho"),
  d("15", "박세권", "park-segwon", "Park Segwon"),
  d("16", "박수해", "park-suhae", "Park Suhae"),
  d("17", "박예은", "park-yeeun", "Park Yeeun"),
  d("18", "박한나", "park-hanna", "Park Hanna"),
  d("19", "박효찬", "park-hyochan", "Park Hyochan"),
  d("20", "배민아", "bae-mina", "Bae Mina"),
  d("21", "성아현", "sung-ahyeon", "Sung Ahyeon"),
  d("22", "손예원", "son-yewon", "Son Yewon"),
  d("23", "손은혜", "son-eunhye", "Son Eunhye"),
  d("24", "신예환", "shin-yehwan", "Shin Yehwan"),
  d("25", "안지언", "ahn-jieon", "Ahn Jieon"),
  d("26", "양성은", "yang-seongeun", "Yang Seongeun"),
  d("27", "유은서", "yoo-eunseo", "Yoo Eunseo"),
  d("28", "윤아영", "yoon-ayeong", "Yoon Ayeong"),
  d("29", "이규진", "lee-gyujin", "Lee Gyujin"),
  d("30", "이민기", "lee-mingi", "Lee Mingi"),
  d("31", "이민혁", "lee-minhyeok", "Lee Minhyeok"),
  d("32", "이보화", "lee-bohwa", "Lee Bohwa"),
  d("33", "이수연", "lee-suyeon", "Lee Suyeon"),
  d("34", "이수진", "lee-sujin", "Lee Sujin"),
  d("35", "이유택", "lee-yutaek", "Lee Yutaek"),
  d("36", "이지수", "lee-jisu", "Lee Jisu"),
  d("37", "이진", "lee-jin", "Lee Jin"),
  d("38", "이진주", "lee-jinju", "Lee Jinju"),
  d("39", "이하은", "lee-haeun", "Lee Haeun"),
  d("40", "임형민", "lim-hyeongmin", "Lim Hyeongmin"),
  d("41", "장서영", "jang-seoyeong", "Jang Seoyeong"),
  d("42", "장일정", "zhang-yicheng", "Zhang Yicheng"), // 본인 영문 표기 ZHANG YICHENG
  d("43", "전예영", "jeon-yeyeong", "Jeon Yeyeong"),
  d("44", "정보연", "jung-boyeon", "Jung Boyeon"),
  d("45", "정예원", "jung-yewon", "Jung Yewon"),
  d("46", "정효재", "jung-hyojae", "Jung Hyojae"),
  d("47", "조수안", "cho-suan", "Cho Suan"),
  d("48", "조해린", "cho-haerin", "Cho Haerin"),
  d("49", "최마리", "choi-mari", "Choi Mari"),
  d("50", "최성지", "choi-seongji", "Choi Seongji"),
  d("51", "최세린", "choi-serin", "Choi Serin"),
  d("52", "하채연", "ha-chaeyeon", "Ha Chaeyeon"),
  d("53", "한예지", "han-yeji", "Han Yeji"),
  d("54", "허경주", "heo-gyeongju", "Heo Gyeongju"),
  d("55", "홍진솔", "hong-jinsol", "Hong Jinsol"),
];

export const frontPhoto = (p: Designer) => `/2026/designers/front/f${p.no}-${p.slug}.webp`;
export const posePhoto = (p: Designer) => `/2026/designers/pose/p${p.no}-${p.slug}.webp`;
