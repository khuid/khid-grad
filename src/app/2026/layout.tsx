import { Hahmlet } from "next/font/google";
import localFont from "next/font/local";

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

export default function Layout2026({ children }: LayoutProps<"/2026">) {
  return <div className={`${freesentation.variable} ${hahmlet.variable} font-sans`}>{children}</div>;
}
