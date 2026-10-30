import type { Metadata } from "next";
import Analytics from "./_common/Analytics";
import CopyGuard from "./_common/CopyGuard";
import "./_common/common.css";

// [모든 연도 공통] 모든 연도 페이지를 감싸는 가장 바깥 틀(각 연도 앱의 src/app/layout.tsx로 복사됨). 여기엔 매년 똑같아야 하는 것만 둠(README.md "공통 규칙").
// 바탕색·글꼴·파비콘·링크 미리보기처럼 연도마다 다른 것은 각 연도 폴더의 layout.tsx에서 정함 — 여기 추가하지 말 것

// 링크 미리보기(og:image 등)의 이미지 주소를 절대 주소로 만들 기준.
// 연도마다 Vercel 프로젝트가 따로라 각 프로젝트의 기본 주소(khid-grad-YYYY.vercel.app)가 아니라
// 방문자가 보는 학교 도메인으로 고정 (입구 프로젝트 entry/가 이 도메인을 받아 연도별로 넘겨줌). 미리보기 배포는 그 배포 주소, 로컬은 localhost
const SITE =
  process.env.VERCEL_ENV === "production"
    ? "https://khid.grad.khu.ac.kr"
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: "KHID Graduation Exhibition",
  description:
    "경희대학교 산업디자인학과 졸업전시. Kyung Hee University Industrial Design graduation exhibition.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko">
      <body>
        {children}
        <CopyGuard />
        <Analytics />
      </body>
    </html>
  );
}
