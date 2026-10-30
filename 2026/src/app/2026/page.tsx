import type { Metadata, Viewport } from "next";
import Concept from "./_components/Concept";
import Credits from "./_components/Credits";
import ExhibitionInfo from "./_components/ExhibitionInfo";
import Footer from "./_components/Footer";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import SiteCursor from "./_components/SiteCursor";
import SiteGate from "./_components/SiteGate";

export const metadata: Metadata = {
  title: "KHID 2026 Graduation Exhibition",
  description: "경희대학교 산업디자인학과 2026 졸업전시",
};

// 모바일 브라우저 상단 바 색
export const viewport: Viewport = {
  themeColor: "#1980FF",
};

// 공개 전 커밍순 게이트는 SiteGate (공개 시각·삭제 주의사항도 거기)

// 구역별로 만들어 가는 중: [1] 히어로, [2] 기획, [3] 전시안내·지도교수, [4] 졸준위·후원사, 푸터
function FullSite() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Concept />
        <ExhibitionInfo />
        <Credits />
      </main>
      <Footer />
      <SiteCursor heroId="top" />
    </>
  );
}

export default function Page() {
  return (
    <SiteGate>
      <FullSite />
    </SiteGate>
  );
}
