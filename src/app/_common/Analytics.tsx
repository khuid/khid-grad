import Script from "next/script";

// [모든 연도 공통] 방문자 기록 — Google Analytics 4. 보고서는 analytics.google.com (졸준위 구글 계정)에서
// 월·주·일·시간대별 방문자, 페이지별 조회, 기기, 유입 경로(카톡·인스타 등) 확인.
// 측정 ID(G-로 시작)를 아래에 넣으면 켜짐. 비어 있으면 아무것도 불러오지 않음.
// 배포 사이트(Vercel production)에서만 기록 — 로컬·미리보기 배포에서 들어간 건 세지 않음.
// 페이지 이동(링크 클릭)은 GA4 "향상된 측정"의 페이지 변경 감지로 자동 기록
const GA_ID = "";

export default function Analytics() {
  if (!GA_ID || process.env.VERCEL_ENV !== "production") return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga4" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA_ID}');`}
      </Script>
    </>
  );
}
