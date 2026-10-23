import type { Metadata } from "next";
import { Hahmlet } from "next/font/google";
import { connection } from "next/server";
import localFont from "next/font/local";
import CopyGuard from "./_components/CopyGuard";
import { isOpen } from "./_components/SiteGate";

// 2026 사이트 폰트: 본문·UI 전부 Freesentation 하나. 굵기는 ExtraBold·SemiBold·Medium·Regular 네 가지만
// Hahmlet은 히어로 배경 격자의 줄자 숫자·각도 표기 전용
const freesentation = localFont({
  variable: "--font-freesentation",
  src: [
    { path: "../../../public/fonts/Freesentation-4Regular.woff2", weight: "400", style: "normal" },
    { path: "../../../public/fonts/Freesentation-5Medium.woff2", weight: "500", style: "normal" },
    { path: "../../../public/fonts/Freesentation-6SemiBold.woff2", weight: "600", style: "normal" },
    { path: "../../../public/fonts/Freesentation-8ExtraBold.woff2", weight: "800", style: "normal" },
  ],
});

const hahmlet = Hahmlet({
  variable: "--font-hahmlet",
  subsets: ["latin"],
  weight: ["700"],
});

// 링크 미리보기(카톡·인스타·메신저 등): 공개(2026-11-11 09:00 KST) 전에는 커밍순 이미지, 공개 후에는 메인 히어로 가로 이미지.
// 둘 다 1200×630 (public/2026/og-comingsoon.jpg, og-open.jpg). 요청 시각으로 고르니 공개 순간 따로 배포할 필요 없음.
// 단 카카오톡 등은 미리보기를 한동안 저장해 두므로 공개 후 예전 이미지가 보이면 각 서비스의 캐시 초기화 도구로 새로고침
export async function generateMetadata(): Promise<Metadata> {
  await connection();
  const image = isOpen() ? "/2026/og-open.jpg" : "/2026/og-comingsoon.jpg";
  const title = "KHID 2026 Graduation Exhibition";
  const description = "경희대학교 산업디자인학과 제35회 졸업전시 — THIS IS NOT GRADUATION : THIS IS A NEW PATHWAY";
  return {
    openGraph: {
      type: "website",
      siteName: "KHID 2026",
      title,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export default function Layout2026({ children }: LayoutProps<"/2026">) {
  return (
    <div className={`${freesentation.variable} ${hahmlet.variable} font-sans`}>
      {children}
      <CopyGuard />
    </div>
  );
}
