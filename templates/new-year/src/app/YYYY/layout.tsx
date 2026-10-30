import type { Metadata } from "next";
import "./YYYY.css";

// YYYY 사이트 전용 설정 — 다른 연도와 공유하지 않음. 아래 "정하기" 표시가 남지 않게 모두 이 해의 것으로 채울 것
// (남은 표시는 `python3 scripts/check-year.py YYYY`로 찾을 수 있음)

// [정하기] 폰트: 원본은 fonts-src/YYYY/, 경량본은 `python3 scripts/subset-fonts.py YYYY`로 public/YYYY/fonts/에 만든 뒤 연결
// 예) import localFont from "next/font/local";
//     const font = localFont({ variable: "--font-main", src: [{ path: "../../../public/YYYY/fonts/파일이름.woff2", weight: "400" }] });

// [정하기] 링크 미리보기(카톡·인스타 등): 1200×630 이미지를 public/YYYY/에 넣고 아래 images에 연결
export const metadata: Metadata = {
  title: "KHID YYYY Graduation Exhibition",
  description: "경희대학교 산업디자인학과 YYYY 졸업전시",
  openGraph: {
    type: "website",
    siteName: "KHID YYYY",
    title: "KHID YYYY Graduation Exhibition",
    // images: [{ url: "/YYYY/og.jpg", width: 1200, height: 630 }],
  },
  // [정하기] 폴더를 만들어 배포하는 순간 /YYYY 주소는 누구나 열 수 있음. 그동안 검색에는 안 나오게 막아 둠 — 공개할 때 이 줄을 지울 것.
  // 공개 전 화면 자체를 가리려면 FEATURES.md의 "커밍순 공개 게이트"를 가져올 것
  robots: { index: false, follow: false },
};

// [정하기] 파비콘: icon.svg(또는 icon.png)와 apple-icon.png(180×180)을 이 폴더(src/app/YYYY/)에 넣으면 자동으로 붙음

export default function LayoutYYYY({ children }: LayoutProps<"/YYYY">) {
  return <div>{children}</div>;
}
