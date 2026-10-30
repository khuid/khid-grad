import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./2025.css";

// 2025 사이트 전용 설정 — 다른 연도와 공유하지 않음.
// 2025는 지난 연도를 나중에 추가한 것 (제34회 THE NEXT MOVE : 공존의 설계). 디자인 원본은 프레이머 khid2025.

// 폰트 (2026-10-29 사용자 결정, 로컬 확인용): 로고가 아닌 글자는 영문·한글 모두 Pretendard(무료, SIL OFL)로.
//   프레이머 원본은 영문 ITC Avant Garde Gothic, 한글 윤고딕 700 — 둘 다 유료(어도비 폰트)라 바꿈. 로고·제목은 이미 SVG라 그대로.
//   프로필 자기소개·답변(원본 Inter Display)도 Pretendard — Pretendard 영문이 Inter 기반.
//   원본 fonts-src/2025/ → 데이터를 다 넣은 뒤 `python3 scripts/subset-fonts.py 2025`로 public/2025/fonts/에 경량본(지금은 원본 그대로 복사)
const pretendard = localFont({
  variable: "--font-pretendard",
  src: [
    { path: "../../../public/2025/fonts/Pretendard-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../../public/2025/fonts/Pretendard-Bold.woff2", weight: "700", style: "normal" },
  ],
});

// [정하기] 링크 미리보기(카톡·인스타 등): 1200×630 이미지를 public/2025/에 넣고 아래 images에 연결
export const metadata: Metadata = {
  title: "KHID 2025 Graduation Exhibition",
  description: "경희대학교 산업디자인학과 제34회 졸업전시 — THE NEXT MOVE : 공존의 설계",
  openGraph: {
    type: "website",
    siteName: "KHID 2025",
    title: "KHID 2025 Graduation Exhibition",
    // images: [{ url: "/2025/og.jpg", width: 1200, height: 630 }],
  },
  // [정하기] 폴더를 만들어 배포하는 순간 /2025 주소는 누구나 열 수 있음. 그동안 검색에는 안 나오게 막아 둠 — 공개할 때 이 줄을 지울 것
  robots: { index: false, follow: false },
};

// 모바일 브라우저 상단 바 색 = 2025 빨강
export const viewport: Viewport = {
  themeColor: "#E60816",
};

// [정하기] 파비콘: icon.svg(또는 icon.png)와 apple-icon.png(180×180)을 이 폴더(src/app/2025/)에 넣으면 자동으로 붙음

export default function Layout2025({ children }: LayoutProps<"/2025">) {
  return <div className={`${pretendard.variable} font-ko text-ink`}>{children}</div>;
}
