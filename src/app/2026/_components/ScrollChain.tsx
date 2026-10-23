"use client";

import { useEffect, useRef } from "react";

// PROJECTS 목록(768~): 탭 아래 영역 안에서 작품 목록([data-scroll-list])만 스크롤되는데,
// 브라우저는 한 번의 휠·트랙패드 동작이 목록에 "붙어" 있으면 목록 끝에 닿아도 페이지로 넘어가지 않음.
// 그래서 영역 어디서 굴리든 직접 나눠서 움직임:
//   아래로 → 목록 먼저 끝까지, 남은 만큼 페이지(푸터 쪽)
//   위로   → 페이지 먼저 맨 위(탭이 다시 보일 때)까지, 남은 만큼 목록
// 목록이 스크롤 영역이 아닐 때(모바일 ~767)는 아무것도 안 함 — 브라우저 기본 스크롤
export default function ScrollChain({ className, children }: { className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const area = ref.current;
    const list = area?.querySelector<HTMLElement>("[data-scroll-list]");
    if (!area || !list) return;

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return; // 확대(핀치)·가로 스크롤은 그대로
      if (list.scrollHeight <= list.clientHeight) return; // 모바일: 목록이 스크롤 영역 아님
      // 휠 단위를 px로 (줄 단위 16px, 페이지 단위 화면 높이)
      const d = e.deltaY * (e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? window.innerHeight : 1);
      const pageMax = document.documentElement.scrollHeight - window.innerHeight;
      let toList = 0;
      let toPage = 0;
      if (d > 0) {
        const room = list.scrollHeight - list.clientHeight - list.scrollTop;
        toList = Math.min(d, Math.max(0, room));
        toPage = Math.min(d - toList, Math.max(0, pageMax - window.scrollY));
      } else {
        toPage = Math.max(d, -window.scrollY);
        toList = Math.max(d - toPage, -list.scrollTop);
      }
      if (!toList && !toPage) return; // 더 갈 곳 없음 — 기본 동작(튕김 등)에 맡김
      e.preventDefault();
      if (toList) list.scrollTop += toList;
      if (toPage) window.scrollBy(0, toPage);
    };

    area.addEventListener("wheel", onWheel, { passive: false });
    return () => area.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
