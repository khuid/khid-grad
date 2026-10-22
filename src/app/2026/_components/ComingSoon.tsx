"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { PREVIEW_COOKIE } from "./preview";

// 공개 전(2026-11-11 09:00 KST) 화면.
// 이스터에그: 이미지를 2초 이상 길게 누르면 미리보기 쿠키를 심고 새로고침 → 전체 사이트가 보임.
// 쿠키는 브라우저를 닫으면 사라짐(세션 쿠키)
const HOLD_MS = 2000;

// 이미지 가장자리 색(#1980FF)과 배경색을 맞춰서, 화면 비율이 달라도
// 이미지 전체가 보이면서(object-contain) 남는 여백은 배경과 이어져 보이게 함
export default function ComingSoon() {
  const router = useRouter();
  const timer = useRef<number | null>(null);

  const cancel = () => {
    if (timer.current !== null) window.clearTimeout(timer.current);
    timer.current = null;
  };
  const start = () => {
    cancel();
    timer.current = window.setTimeout(() => {
      document.cookie = `${PREVIEW_COOKIE}=1; path=/; SameSite=Lax`;
      router.refresh();
    }, HOLD_MS);
  };

  return (
    <main
      className="fixed inset-0 touch-none bg-[#1980FF] select-none [-webkit-touch-callout:none]"
      onPointerDown={start}
      onPointerUp={cancel}
      onPointerLeave={cancel}
      onPointerCancel={cancel}
      // 길게 누를 때 뜨는 이미지 저장 메뉴 막기
      onContextMenu={(e) => e.preventDefault()}
    >
      <Image
        src="/2026/comingsoon.jpg"
        alt="KHID 2026 Graduation Exhibition — Coming Soon"
        fill
        priority
        sizes="100vw"
        draggable={false}
        className="pointer-events-none object-contain"
      />
    </main>
  );
}
