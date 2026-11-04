import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Header from "./_components/Header";
import "./2024.css";

// 2024 사이트 전용 설정 — 다른 연도와 공유하지 않음.
// 2024는 지난 연도를 나중에 추가한 것 (제33회 EXPLORER). 디자인 파일이 없어 아임웹 사이트(khid-exhibition.imweb.me)를 보고 따라 만듦.

// 폰트: 아임웹 원본 그대로 Poppins(구글 무료 폰트, SIL OFL) 400·700, 영문 글자 세트(latin)만. 원본 fonts-src/
//   한글은 웹폰트 없이 기기 기본 고딕 — 아임웹도 그랬음 (2024.css의 --font-main)
const poppins = localFont({
  variable: "--font-poppins",
  src: [
    { path: "../../../public/2024/fonts/Poppins-Regular-latin.woff2", weight: "400", style: "normal" },
    { path: "../../../public/2024/fonts/Poppins-Bold-latin.woff2", weight: "700", style: "normal" },
  ],
});

// 링크 미리보기(카톡·인스타 등): 아카이브 사이트의 2024 초대장(클립 없는 것, archive-site/public/exhibitions/2024/invitation-plain.png)을
//   검정 바탕 1200×630 가운데에 놓은 것 → public/2024/og.jpg (사용자 결정 2026-11-05)
export const metadata: Metadata = {
  title: "KHID 2024 Graduation Exhibition",
  description: "경희대학교 산업디자인학과 제33회 졸업전시 — EXPLORER",
  openGraph: {
    type: "website",
    siteName: "KHID 2024",
    title: "KHID 2024 Graduation Exhibition",
    images: [{ url: "/2024/og.jpg", width: 1200, height: 630 }],
  },
};

// 모바일 브라우저 상단 바 색 = 2024 바탕
export const viewport: Viewport = {
  themeColor: "#050202",
};

// 파비콘: icon.svg = 어두운 바탕(#050202, 2024 바탕색) + 밝은 KIIID 로고(#EEEEEE, 원본 work/assets/logo/kiiid.svg 색 그대로) 32×32 (사용자 결정 2026-11-04)
// apple-icon.png(홈 화면 아이콘)는 넣지 않음 — 필요 없다고 정함 (사용자 결정 2026-11-04)

// 모든 2024 페이지 공통: 상단바 + 본문. 아임웹의 흰 푸터(인스타 아이콘만 있었음)는 아이콘을 상단바로 옮기면서 없앰 (사용자 결정 2026-11-04)
export default function Layout2024({ children }: LayoutProps<"/2024">) {
  return (
    <div className={`${poppins.variable} flex min-h-screen flex-col font-main`}>
      <Header />
      <main className="flex-1">{children}</main>
    </div>
  );
}
