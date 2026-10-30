"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Node } from "./SectionBar";

// 작품 상세·디자이너 프로필 왼쪽 위(상단바 아래 여백)의 뒤로 가기 칸.
// 프레임 왼쪽 선 ~ 오른쪽 칸막이 선 사이 정사각형 칸(한 변 = 여백 높이 24/40/50)에 선 화살표만(16/20/23).
// 마우스를 올리면 연한 하늘색(탭 호버와 같은 pale 50%), 누르는 동안 pale.
// 사이트 안에서 넘어왔으면 브라우저 뒤로 가기(스크롤 위치·탭 그대로), 링크로 바로 들어왔으면 목록(fallback)으로.
// 부모는 여백 칸 전체 높이를 차지하고, 아래 가로선은 부모 바로 아래 1px에 있다는 전제
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
      aria-label="뒤로 가기"
      className={`relative ml-px flex aspect-square h-full items-center justify-center text-deepblue transition-colors hover:bg-pale/50 active:bg-pale ${className}`}
    >
      {/* 선 화살표 ← */}
      <svg viewBox="0 0 20 20" aria-hidden className="size-[16px] min-[768px]:size-[20px] min-[1000px]:size-[23px]">
        <path d="M17 10H3.5M9 4.5 3.5 10 9 15.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      {/* 오른쪽 칸막이(아래 가로선까지). 칸이 작아서 칸막이 끝 사각형은 두지 않음(2026-10-23 결정) */}
      <span aria-hidden className="absolute top-0 right-0 -bottom-px w-px bg-deepblue" />
      {/* 왼쪽 아래 모서리(프레임 선 × 가로선) 사각형도 칸 안에서 다시 그려서 호버 색 위에 오게 */}
      <Node className="top-[calc(100%+0.5px)] left-[-0.5px]" />
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
