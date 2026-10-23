"use client";

import { useEffect, useRef } from "react";

// 사이트 마우스 포인터 (Figma 메모): 파란 화살표로 교체, 끝점이 왼쪽 위.
// - [1] 구역(히어로)이 마우스 아래에 있으면 큰 화살표 — 상단바 위에 올려도 그 뒤가 히어로면 그대로 크게
// - 나머지 구역은 작은 화살표("1구역 제외한 모든 영역"), 파란 배경 구역(data-cursor="light") 위에선 흰색
// 마우스가 있는 기기(pointer: fine)에서만. 터치 기기는 기본 그대로(포인터 없음)
const BIG = { src: "/2026/cursor-hero.svg", w: 72, h: 70.95 }; // Figma 90×88.68의 80%
const SMALL = { w: 25.2, h: 24.83 }; // Figma 36×35.47의 70%
const SMALL_BLUE = "/2026/cursor.svg";
const SMALL_WHITE = "/2026/cursor-white.svg";

export default function SiteCursor({ heroId }: { heroId: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const bigRef = useRef<HTMLImageElement>(null);
  const smallRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const cursor = ref.current;
    const big = bigRef.current;
    const small = smallRef.current;
    if (!cursor || !big || !small) return;
    const fine = window.matchMedia("(pointer: fine)");
    const root = document.documentElement;

    let x = -1;
    let y = -1;
    const size = () => {
      const hero = document.getElementById(heroId)?.getBoundingClientRect();
      const inHero = !!hero && y >= hero.top && y < hero.bottom;
      big.style.display = inHero ? "block" : "none";
      small.style.display = inHero ? "none" : "block";
      if (!inHero) {
        // 마우스 바로 아래 요소가 파란 배경 구역이면 흰 화살표 (상단바 위면 파란 화살표)
        const light = !!document.elementFromPoint(x, y)?.closest('[data-cursor="light"]');
        const src = light ? SMALL_WHITE : SMALL_BLUE;
        if (small.getAttribute("src") !== src) small.setAttribute("src", src);
      }
    };
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x = e.clientX;
      y = e.clientY;
      size();
      cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      cursor.style.opacity = "1";
    };
    // 마우스는 가만히 있고 스크롤만 해도 아래 구역이 바뀌면 크기 갱신
    const scroll = () => y >= 0 && size();
    const leave = () => (cursor.style.opacity = "0");
    // 지도·영상 iframe 안에선 마우스 이벤트가 안 와서 화살표가 가장자리에 멈춤 → 숨기고 iframe 자체 커서 사용
    const over = (e: PointerEvent) => e.target instanceof HTMLIFrameElement && leave();

    const apply = () => root.classList.toggle("site-cursor", fine.matches);
    apply();
    fine.addEventListener("change", apply);
    window.addEventListener("pointermove", move);
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("pointerover", over);
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      fine.removeEventListener("change", apply);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("pointerleave", leave);
      root.classList.remove("site-cursor");
    };
  }, [heroId]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[60] opacity-0 transition-opacity duration-150"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img ref={bigRef} src={BIG.src} alt="" width={BIG.w} height={BIG.h} className="block max-w-none" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img ref={smallRef} src={SMALL_BLUE} alt="" width={SMALL.w} height={SMALL.h} className="hidden max-w-none" />
    </div>
  );
}
