import type { Metadata, Viewport } from "next";
import "./2025.css";

// 2025 사이트 전용 설정 — 다른 연도와 공유하지 않음.
// 2025는 지난 연도를 나중에 추가한 것 (제34회 THE NEXT MOVE : 공존의 설계). 디자인 원본은 프레이머 khid2025.

// [정하기] 폰트: 원본(ITC Avant Garde Gothic, 윤고딕 700, Inter Display)을 fonts-src/2025/에 넣고
// `python3 scripts/subset-fonts.py 2025`로 public/2025/fonts/에 경량본을 만든 뒤 아래처럼 연결.
// 변수 이름은 2025.css가 찾는 이름(--font-avantgarde, --font-yoongothic, --font-interdisplay)으로 맞출 것
// 예) import localFont from "next/font/local";
//     const avant = localFont({ variable: "--font-avantgarde", src: [{ path: "../../../public/2025/fonts/파일이름.woff2", weight: "400" }] });

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
  return <div className="font-ko text-ink">{children}</div>;
}
