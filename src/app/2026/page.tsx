import type { Metadata } from "next";
import Image from "next/image";
import { connection } from "next/server";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "KHID 2026 Graduation Exhibition",
  description: "경희대학교 산업디자인학과 2026 졸업전시",
};

// 2026-11-11 09:00 KST 이후 전체 사이트 공개
const OPEN_AT = new Date("2026-11-11T09:00:00+09:00").getTime();

function ComingSoon() {
  return (
    <main className="relative h-dvh w-full bg-black">
      <Image
        src="/2026/comingsoon.jpg"
        alt="KHID 2026 Graduation Exhibition — Coming Soon"
        fill
        priority
        sizes="100vw"
        className="object-contain"
      />
    </main>
  );
}

function FullSite() {
  // TODO: 2026 전체 홈페이지 컴포넌트로 교체
  return <ComingSoon />;
}

async function Gate() {
  // 요청 시점의 시각으로 판단 (빌드 시점에 고정되지 않도록)
  await connection();
  return Date.now() >= OPEN_AT ? <FullSite /> : <ComingSoon />;
}

export default function Page() {
  return (
    <Suspense fallback={<ComingSoon />}>
      <Gate />
    </Suspense>
  );
}
