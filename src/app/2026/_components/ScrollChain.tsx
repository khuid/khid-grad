"use client";

import { useEffect, useRef } from "react";

// PROJECTS 목록(768~): 탭 아래 영역 안에서 작품 목록([data-scroll-list])만 스크롤되는데,
// 브라우저는 한 번의 휠·트랙패드 동작이 목록에 "붙어" 있으면 목록 끝에 닿아도 페이지로 넘어가지 않음.
// 그래서 영역 어디서 굴리든 목록 + 페이지를 한 줄로 이어 붙여 직접 움직임:
//   0 ~ 목록 끝까지는 목록, 그 뒤 ~ 페이지 끝까지는 페이지 → 아래로는 목록 먼저, 위로는 페이지 먼저.
// 마우스 휠도 자연스럽게: 목표 위치를 정해 두고 매 프레임 남은 거리의 일부만큼 다가감(감속).
// 동작 줄이기 설정이면 바로 이동. 목록이 스크롤 영역이 아닐 때(모바일 ~767)는 브라우저 기본 스크롤
const EASE = 0.18; // 프레임마다 남은 거리의 18%

export default function ScrollChain({ className, children }: { className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const area = ref.current;
    const list = area?.querySelector<HTMLElement>("[data-scroll-list]");
    if (!area || !list) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    const listMax = () => list.scrollHeight - list.clientHeight;
    const pageMax = () => document.documentElement.scrollHeight - window.innerHeight;
    const read = () => list.scrollTop + window.scrollY;
    const apply = (v: number) => {
      const l = Math.min(v, listMax());
      list.scrollTop = l;
      window.scrollTo(0, v - l);
    };

    let cur = 0;
    let target = 0;
    let raf = 0;
    const step = () => {
      cur += (target - cur) * EASE;
      if (Math.abs(target - cur) < 0.5) cur = target;
      apply(cur);
      raf = cur === target ? 0 : requestAnimationFrame(step);
    };

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return; // 확대(핀치)·가로 스크롤은 그대로
      if (listMax() <= 0) return; // 모바일: 목록이 스크롤 영역 아님
      // 휠 단위를 px로 (줄 단위 16px, 페이지 단위 화면 높이)
      const d = e.deltaY * (e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? window.innerHeight : 1);
      if (!raf) cur = target = read(); // 멈춰 있을 때는 지금 위치에서 시작 (다른 데서 스크롤했을 수 있으니)
      const next = Math.min(Math.max(target + d, 0), listMax() + pageMax());
      if (next === target && !raf) return; // 더 갈 곳 없음 — 기본 동작(튕김 등)에 맡김
      e.preventDefault();
      target = next;
      if (reduce.matches) {
        cur = target;
        apply(cur);
      } else if (!raf) raf = requestAnimationFrame(step);
    };

    area.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      area.removeEventListener("wheel", onWheel);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
