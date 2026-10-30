import Script from "next/script";

// [모든 연도 공통] 방문자 기록 — Google Analytics 4. 보고서는 analytics.google.com (졸준위 구글 계정)에서
// 월·주·일·시간대별 방문자, 페이지별 조회, 기기, 유입 경로(카톡·인스타 등) 확인.
// 측정 ID(G-로 시작)를 아래에 넣으면 켜짐. 비어 있으면 아무것도 불러오지 않음.
// 배포 사이트(Vercel production)에서만 기록 — 로컬·미리보기 배포에서 들어간 건 세지 않음.
// 페이지 이동(링크 클릭)은 GA4 "향상된 측정"의 페이지 변경 감지로 자동 기록
// 운영자 본인 방문 빼기: 주소 끝에 ?notrack=1 로 한 번 들어가면 그 브라우저는 이후 기록 안 됨(?notrack=0 으로 해제).
// 브라우저마다 따로 저장됨(크롬·사파리·카톡 안 브라우저 각각), 방문 기록 지우거나 시크릿 창이면 다시 기록됨
const GA_ID = "G-QYL2N68NQF";

export default function Analytics() {
  if (!GA_ID || process.env.VERCEL_ENV !== "production") return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga4" strategy="afterInteractive">
        {`try{var n=new URLSearchParams(location.search).get('notrack');if(n==='1')localStorage.setItem('khid-notrack','1');if(n==='0')localStorage.removeItem('khid-notrack');if(localStorage.getItem('khid-notrack'))window['ga-disable-${GA_ID}']=true}catch(e){}window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA_ID}');`}
      </Script>
    </>
  );
}
