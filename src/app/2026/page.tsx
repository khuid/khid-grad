import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import { connection } from "next/server";
import { Suspense } from "react";
import ClearPreview from "./_components/ClearPreview";
import ComingSoon from "./_components/ComingSoon";
import Concept from "./_components/Concept";
import Credits from "./_components/Credits";
import ExhibitionInfo from "./_components/ExhibitionInfo";
import Footer from "./_components/Footer";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import { PREVIEW_COOKIE } from "./_components/preview";
import SiteCursor from "./_components/SiteCursor";

export const metadata: Metadata = {
  title: "KHID 2026 Graduation Exhibition",
  description: "경희대학교 산업디자인학과 2026 졸업전시",
};

// 모바일 브라우저 상단 바 색
export const viewport: Viewport = {
  themeColor: "#1980FF",
};

// 2026-11-11 09:00 KST 이후 전체 사이트 공개.
// ⚠️ 커밍순 관련 코드(Gate, ComingSoon, ClearPreview, preview.ts, comingsoon.jpg)는
//    공개 시각 이후 졸준위가 직접 삭제를 요청할 때만 지울 것. 미리 지우면 그 배포 순간 사이트가 공개됨
const OPEN_AT = new Date("2026-11-11T09:00:00+09:00").getTime();

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

async function Gate() {
  // 요청 시점의 시각으로 판단 (빌드 시점에 고정되지 않도록).
  // 로컬 개발(npm run dev)에서는 작업 확인을 위해 항상 전체 사이트를 보여줌.
  // 공개 전에도 미리보기 쿠키(커밍순 이미지 2초 길게 누르기)가 있으면 전체 사이트.
  // 쿠키는 화면이 뜨자마자 지워서(ClearPreview) 새로고침하면 다시 커밍순
  await connection();
  if (isOpen()) return <FullSite />;
  if ((await cookies()).has(PREVIEW_COOKIE)) {
    return (
      <>
        <FullSite />
        <ClearPreview />
      </>
    );
  }
  return <ComingSoon />;
}

function isOpen() {
  return process.env.NODE_ENV === "development" || Date.now() >= OPEN_AT;
}

export default function Page() {
  // 기다리는 동안은 이미지 없이 파란 화면만 (커밍순 이미지는 실제로 커밍순일 때만 받게)
  return (
    <Suspense fallback={<main className="fixed inset-0 bg-[#1980FF]" />}>
      <Gate />
    </Suspense>
  );
}
