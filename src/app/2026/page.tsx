import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import { connection } from "next/server";
import { Suspense } from "react";
import ComingSoon from "./_components/ComingSoon";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import { PREVIEW_COOKIE } from "./_components/preview";

export const metadata: Metadata = {
  title: "KHID 2026 Graduation Exhibition",
  description: "경희대학교 산업디자인학과 2026 졸업전시",
};

// 모바일 브라우저 상단 바 색
export const viewport: Viewport = {
  themeColor: "#1980FF",
};

// 2026-11-11 09:00 KST 이후 전체 사이트 공개
const OPEN_AT = new Date("2026-11-11T09:00:00+09:00").getTime();

// 구역별로 만들어 가는 중: [1] 히어로까지
function FullSite() {
  return (
    <>
      <Header />
      <main>
        <Hero />
      </main>
    </>
  );
}

async function Gate() {
  // 요청 시점의 시각으로 판단 (빌드 시점에 고정되지 않도록).
  // 로컬 개발(npm run dev)에서는 작업 확인을 위해 항상 전체 사이트를 보여줌.
  // 공개 전에도 미리보기 쿠키(커밍순 이미지 3초 길게 누르기)가 있으면 전체 사이트
  await connection();
  const preview = (await cookies()).has(PREVIEW_COOKIE);
  return preview || isOpen() ? <FullSite /> : <ComingSoon />;
}

function isOpen() {
  return process.env.NODE_ENV === "development" || Date.now() >= OPEN_AT;
}

export default function Page() {
  return (
    <Suspense fallback={<ComingSoon />}>
      <Gate />
    </Suspense>
  );
}
