"use client";

import { useEffect, useRef } from "react";

// [1] 구역 클릭 모션 (Figma 메모 "클릭 시 모션(메인에서만)"). 커서 모양은 SiteCursor.
// - 누른 자리에서 분홍(#FF2EFF) 화살표선이 방사형으로 뻗어나감. 개수·각도·길이 랜덤
// - 터치 기기: 손가락이 닿는 순간이 아니라 탭으로 끝났을 때(click)만 —
//   히어로를 스크롤하려고 손가락을 댈 때는 안 나오게
// - 모바일(~767)은 화면이 작아서 선 길이 60%
const BURST_COLOR = "#FF2EFF";

export default function HeroBurst({ areaId }: { areaId: string }) {
  const burstRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const area = document.getElementById(areaId);
    const layer = burstRef.current;
    if (!area || !layer) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia("(max-width: 767px)");

    // 마우스는 누르는 즉시, 터치·펜은 탭(click)으로 끝났을 때 터뜨림
    let lastPointer = "mouse";
    const down = (e: PointerEvent) => {
      lastPointer = e.pointerType;
      if (e.pointerType === "mouse" && e.button === 0) burst(e);
    };
    const tap = (e: MouseEvent) => {
      if (lastPointer !== "mouse") burst(e);
    };

    const burst = (e: MouseEvent) => {
      if (reduce.matches) return;
      // 링크·버튼 클릭에는 모션 없음
      if ((e.target as Element).closest("a, button")) return;
      const rect = area.getBoundingClientRect();
      const ox = e.clientX - rect.left;
      const oy = e.clientY - rect.top;
      // 개수(4~7)·각도·길이 전부 랜덤. 단 한쪽에 몰리지 않게 선끼리 최소 각도 유지
      const count = 4 + Math.floor(Math.random() * 4);
      const angles = randomAngles(count);
      const ns = "http://www.w3.org/2000/svg";
      for (const ang of angles) {
        const len = (50 + Math.random() * 200) * (mobile.matches ? 0.6 : 1);
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
        // 두께·화살촉: 데스크탑 1.6 / 길이 8×폭 7.6, 모바일은 조금 더 가늘고 작게 1.2 / 6.5×6.2
        line.setAttribute("stroke-width", mobile.matches ? "1.2" : "1.6");
        line.style.strokeDasharray = `${len}`;
        // 화살촉: Figma 메모 삼각형(길이 11)을 줄인 크기
        const head = document.createElementNS(ns, "path");
        head.setAttribute("d", mobile.matches ? "M0 0L-6.5 -3.1L-6.5 3.1Z" : "M0 0L-8 -3.8L-8 3.8Z");
        head.setAttribute("fill", BURST_COLOR);
        head.setAttribute("transform", `translate(${x2} ${y2}) rotate(${(ang * 180) / Math.PI})`);
        g.append(line, head);
        layer.append(g);

        const dur = 150 + Math.random() * 100; // 0.15~0.25초
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
          duration: 380,
          delay: dur + 180,
          fill: "forwards",
        }).finished.then(() => g.remove(), () => g.remove());
      }
    };

    area.addEventListener("pointerdown", down);
    area.addEventListener("click", tap);
    return () => {
      area.removeEventListener("pointerdown", down);
      area.removeEventListener("click", tap);
    };
  }, [areaId]);

  return (
    <svg ref={burstRef} aria-hidden className="pointer-events-none absolute inset-0 z-20 h-full w-full overflow-visible" />
  );
}

// 0~360° 사이 랜덤 각도 n개. 이웃한 선끼리 최소 MIN_GAP 이상 벌어지게 뽑고,
// 여러 번 시도해도 안 되면 고르게 나눈 각도에 살짝 흔들림만 줌
const MIN_GAP = (40 * Math.PI) / 180;
function randomAngles(n: number) {
  const TAU = Math.PI * 2;
  for (let tries = 0; tries < 60; tries++) {
    const a = Array.from({ length: n }, () => Math.random() * TAU).sort((x, y) => x - y);
    const ok = a.every((v, i) => (i === 0 ? a[0] + TAU - a[n - 1] : v - a[i - 1]) >= MIN_GAP);
    if (ok) return a;
  }
  const base = Math.random() * TAU;
  return Array.from({ length: n }, (_, i) => base + (i / n) * TAU + (Math.random() - 0.5) * (TAU / n) * 0.3);
}
