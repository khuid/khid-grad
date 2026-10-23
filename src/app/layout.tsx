import type { Metadata } from "next";
import "./globals.css";

// 링크 미리보기(og:image 등)의 이미지 주소를 절대 주소로 만들 기준 — Vercel이 넣어 주는 대표 도메인, 로컬은 localhost
const SITE = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const metadata: Metadata = {
  metadataBase: new URL(SITE ? `https://${SITE}` : "http://localhost:3000"),
  title: "KHID Graduation Exhibition",
  description:
    "경희대학교 산업디자인학과 졸업전시. Kyung Hee University Industrial Design graduation exhibition.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
