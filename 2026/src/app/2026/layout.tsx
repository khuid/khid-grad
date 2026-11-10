import type { Metadata } from "next";
import { Hahmlet } from "next/font/google";
import localFont from "next/font/local";
import { NavTrack } from "./_components/BackButton";
import "./2026.css";

// 2026 사이트 전용 설정(폰트·스타일·파비콘·링크 미리보기) — 다른 연도와 공유하지 않음. 파비콘은 이 폴더의 icon1.ico·icon2.svg·apple-icon.png

// 2026 사이트 폰트: 본문·UI 전부 Freesentation 하나. 굵기는 ExtraBold·SemiBold·Medium·Regular + Bold(상단바 메뉴 전용, 2026-11-04 추가)
// Hahmlet은 히어로 배경 격자의 줄자 숫자·각도 표기 전용
const freesentation = localFont({
  variable: "--font-freesentation",
  src: [
    { path: "../../../public/2026/fonts/Freesentation-4Regular.woff2", weight: "400", style: "normal" },
    { path: "../../../public/2026/fonts/Freesentation-5Medium.woff2", weight: "500", style: "normal" },
    { path: "../../../public/2026/fonts/Freesentation-6SemiBold.woff2", weight: "600", style: "normal" },
    { path: "../../../public/2026/fonts/Freesentation-7Bold.woff2", weight: "700", style: "normal" },
    { path: "../../../public/2026/fonts/Freesentation-8ExtraBold.woff2", weight: "800", style: "normal" },
  ],
});

const hahmlet = Hahmlet({
  variable: "--font-hahmlet",
  subsets: ["latin"],
  weight: ["700"],
});

// 링크 미리보기(카톡·인스타·메신저 등): 메인 히어로 가로 이미지 1200×630 (public/2026/og-open.jpg).
// 커밍순(공개 전 og-comingsoon.jpg)은 2026-11-11 공개하며 삭제. 카카오톡 등에 예전 이미지가 남아 있으면 각 서비스의 캐시 초기화 도구로 새로고침
const OG_TITLE = "KHID 2026 Graduation Exhibition";
const OG_DESCRIPTION = "경희대학교 산업디자인학과 제35회 졸업전시 — THIS IS NOT GRADUATION : THIS IS A NEW PATHWAY";
const OG_IMAGE = "/2026/og-open.jpg";
export const metadata: Metadata = {
  openGraph: {
    type: "website",
    siteName: "KHID 2026",
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: OG_TITLE }],
  },
  twitter: { card: "summary_large_image", title: OG_TITLE, description: OG_DESCRIPTION, images: [OG_IMAGE] },
};

export default function Layout2026({ children }: LayoutProps<"/2026">) {
  return (
    <div className={`${freesentation.variable} ${hahmlet.variable} font-sans`}>
      {children}
      <NavTrack />
    </div>
  );
}
