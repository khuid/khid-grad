"use client";

import { useEffect, useRef, type RefObject } from "react";

// [1] 구역 전용 마우스 인터랙션 (Figma 메모):
// - 커서: 파란 화살표(90×88.68, 끝점이 왼쪽 위)로 교체. 마우스가 있는 기기(pointer: fine)에서만
// - 클릭: 누른 자리에서 분홍(#FF2EFF) 화살표선이 방사형으로 뻗어나감. 각도·길이 랜덤
const BURST_COLOR = "#FF2EFF";

export default function HeroCursor({ areaRef }: { areaRef: RefObject<HTMLElement | null> }) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const burstRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const area = areaRef.current;
    const cursor = cursorRef.current;
    const layer = burstRef.current;
    if (!area || !cursor || !layer) return;

    const fine = window.matchMedia("(pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      cursor.style.opacity = "1";
    };
    const leave = () => {
      cursor.style.opacity = "0";
    };

    const burst = (e: PointerEvent) => {
      if (e.button !== 0 || reduce.matches) return;
      // 링크·버튼 클릭에는 모션 없음
      if ((e.target as Element).closest("a, button")) return;
      const rect = area.getBoundingClientRect();
      const ox = e.clientX - rect.left;
      const oy = e.clientY - rect.top;
      const count = 6 + Math.floor(Math.random() * 4);
      const base = Math.random() * Math.PI * 2;
      const ns = "http://www.w3.org/2000/svg";
      for (let i = 0; i < count; i++) {
        // 고르게 퍼지되 각도·길이는 랜덤
        const ang = base + (i / count) * Math.PI * 2 + (Math.random() - 0.5) * (Math.PI / count);
        const len = 50 + Math.random() * 200;
        const gap = 10; // 커서 끝에서 살짝 떨어져서 시작
        const x1 = ox + Math.cos(ang) * gap;
        const y1 = oy + Math.sin(ang) * gap;
        const x2 = ox + Math.cos(ang) * (gap + len);
        const y2 = oy + Math.sin(ang) * (gap + len);
        const g = document.createElementNS(ns, "g");
        const line = document.createElementNS(ns, "line");
        line.setAttribute("x1", `${x1}`);
        line.setAttribute("y1", `${y1}`);
        line.setAttribute("x2", `${x2}`);
        line.setAttribute("y2", `${y2}`);
        line.setAttribute("stroke", BURST_COLOR);
        line.setAttribute("stroke-width", "2");
        line.style.strokeDasharray = `${len}`;
        // 화살촉: Figma 메모와 같은 삼각형(길이 ~11)
        const head = document.createElementNS(ns, "path");
        head.setAttribute("d", "M0 0L-11 -5.2L-11 5.2Z");
        head.setAttribute("fill", BURST_COLOR);
        head.setAttribute("transform", `translate(${x2} ${y2}) rotate(${(ang * 180) / Math.PI})`);
        g.append(line, head);
        layer.append(g);

        const dur = 380 + Math.random() * 180;
        line.animate([{ strokeDashoffset: len }, { strokeDashoffset: 0 }], {
          duration: dur,
          easing: "cubic-bezier(0.2, 0.7, 0.3, 1)",
          fill: "forwards",
        });
        head.animate([{ opacity: 0 }, { opacity: 0, offset: 0.7 }, { opacity: 1 }], {
          duration: dur,
          fill: "forwards",
        });
        g.animate([{ opacity: 1 }, { opacity: 0 }], {
          duration: 420,
          delay: dur + 260,
          fill: "forwards",
        }).finished.then(() => g.remove(), () => g.remove());
      }
    };

    const setCursor = () => area.classList.toggle("cursor-none", fine.matches);
    setCursor();
    fine.addEventListener("change", setCursor);
    area.addEventListener("pointermove", move);
    area.addEventListener("pointerleave", leave);
    area.addEventListener("pointerdown", burst);
    return () => {
      fine.removeEventListener("change", setCursor);
      area.removeEventListener("pointermove", move);
      area.removeEventListener("pointerleave", leave);
      area.removeEventListener("pointerdown", burst);
      area.classList.remove("cursor-none");
    };
  }, [areaRef]);

  return (
    <>
      <svg ref={burstRef} aria-hidden className="pointer-events-none absolute inset-0 z-20 h-full w-full overflow-visible" />
      <div
        ref={cursorRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[60] opacity-0 transition-opacity duration-150"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/2026/cursor-hero.svg" alt="" width={90} height={88.68} className="block max-w-none" />
      </div>
    </>
  );
}
