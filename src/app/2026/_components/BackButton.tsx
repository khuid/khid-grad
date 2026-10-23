"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

// 작품 상세·디자이너 프로필 왼쪽 위(상단바 아래 여백, 프레임 선 안쪽)의 "← BACK".
// 사이트 안에서 넘어왔으면 브라우저 뒤로 가기(스크롤 위치·탭 그대로), 링크로 바로 들어왔으면 목록(fallback)으로
const KEY = "khid2026-nav"; // 이번 탭에서 사이트 안 페이지를 몇 개 거쳤는지 (NavTrack이 셈)

export default function BackButton({ fallback, className = "" }: { fallback: string; className?: string }) {
  const router = useRouter();
  const back = () => {
    let steps = 0;
    try {
      steps = JSON.parse(sessionStorage.getItem(KEY) ?? "{}").n ?? 0;
    } catch {}
    if (steps > 1) router.back();
    else router.push(fallback);
  };
  return (
    <button
      type="button"
      onClick={back}
      lang="en"
      className={`flex items-center gap-[6px] text-[13px] leading-[normal] font-semibold tracking-[-0.04em] text-deepblue transition-colors hover:text-key min-[768px]:text-[15px] ${className}`}
    >
      <span aria-hidden>←</span>
      BACK
    </button>
  );
}

// 2026 레이아웃에 한 번: 주소가 실제로 바뀔 때만 이번 탭의 이동 수를 1씩 늘림
// (같은 주소로 effect가 두 번 불려도 — 개발 모드 등 — 한 번만 셈)
export function NavTrack() {
  const pathname = usePathname();
  useEffect(() => {
    try {
      const { last, n = 0 } = JSON.parse(sessionStorage.getItem(KEY) ?? "{}");
      if (last !== pathname) sessionStorage.setItem(KEY, JSON.stringify({ last: pathname, n: n + 1 }));
    } catch {}
  }, [pathname]);
  return null;
}
