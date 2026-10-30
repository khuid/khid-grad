"use client";

import { useEffect, useRef, useState } from "react";

// [1] 구역 클릭 모션 (Figma 메모 "클릭 시 모션(메인에서만)"). 커서 모양은 SiteCursor.
// - 누른 자리에서 분홍(#FF2EFF) 화살표선이 방사형으로 뻗어나감. 개수·각도·길이 랜덤
// - 터치 기기: 손가락이 닿는 순간이 아니라 탭으로 끝났을 때(click)만 —
//   히어로를 스크롤하려고 손가락을 댈 때는 안 나오게
// - 모바일(~767)은 화면이 작아서 선 길이 60%
// - 첫 클릭 전까지 마지막 에셋(전시 정보·날짜 묶음) 바로 아래 가운데에 "CLICK ANYWHERE"(터치 기기는 "TAP ANYWHERE")
//   안내를 pointpink로 깜빡이게 둠(글자 13 → 768부터 15 → 1280부터 16). [1] 안 어디든 한 번 누르면 사라짐.
//   위치는 묶음([data-hero-content]) 아랫선에서 36(모바일 28) 아래. 줄자 숫자까지 공간이 모자라면 둘 사이 한가운데 — 화면 크기가 바뀌면 다시 잼
const BURST_COLOR = "#FF2EFF"; // = 2026.css의 pointpink. 스크립트로 그려서 값을 직접 씀 — 바꿀 땐 같이

export default function HeroBurst({ areaId }: { areaId: string }) {
  const burstRef = useRef<SVGSVGElement>(null);
  const hintRef = useRef<HTMLParagraphElement>(null);
  const [hint, setHint] = useState(true);
  const [touch, setTouch] = useState(false);

  // 안내 위치: 전시 정보 묶음 아래 (격자·화면 크기가 바뀌면 다시)
  useEffect(() => {
    if (!hint) return;
    const area = document.getElementById(areaId);
    const el = hintRef.current;
    if (!area || !el) return;
    setTouch(window.matchMedia("(pointer: coarse)").matches);
    const place = () => {
      const content = area.querySelector("[data-hero-content]");
      if (!content) return;
      const base = area.getBoundingClientRect().top;
      const gap = window.matchMedia("(max-width: 767px)").matches ? 28 : 36;
      const below = content.getBoundingClientRect().bottom - base;
      let top = below + gap;
      const num = [...area.querySelectorAll(".font-ruler text")].find((t) => /^\d+$/.test(t.textContent ?? ""));
      if (num) {
        // 공간이 모자라면(화면이 낮을 때) 묶음과 줄자 숫자 사이 한가운데
        const numTop = num.getBoundingClientRect().top - base;
        if (top + el.offsetHeight + 8 > numTop) top = (below + numTop - el.offsetHeight) / 2;
      }
      // 1280 이상·높이 890 미만(전시 정보를 반 칸 올린 구간, Hero.tsx)은 4 더 내림 — 줄자 숫자와 겹쳐도 됨
      if (window.matchMedia("(min-width: 1280px) and (max-height: 889px)").matches) top += 4;
      el.style.top = `${top}px`;
      el.style.visibility = "visible";
    };
    place();
    const ro = new ResizeObserver(place);
    ro.observe(area);
    // 격자(HeroGrid)는 화면 크기를 잰 뒤에 그려지니, 줄자 숫자가 생기거나 바뀔 때도 다시
    const mo = new MutationObserver(place);
    mo.observe(area, { childList: true, subtree: true });
    document.fonts.ready.then(place);
    return () => {
      ro.disconnect();
      mo.disconnect();
    };
  }, [areaId, hint]);

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
      if (!(e.target as Element).closest("a, button")) setHint(false); // 첫 클릭(터치는 탭)에서 안내 숨김
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
    <>
      <svg ref={burstRef} aria-hidden className="pointer-events-none absolute inset-0 z-20 h-full w-full overflow-visible" />
      {hint && (
        <p
          ref={hintRef}
          aria-hidden
          lang="en"
          className="pointer-events-none invisible absolute inset-x-0 z-20 text-center text-[13px] leading-[normal] font-semibold tracking-[-0.04em] text-pointpink motion-safe:animate-pulse min-[768px]:text-[15px] min-[1280px]:text-[16px]"
        >
          {touch ? "TAP ANYWHERE" : "CLICK ANYWHERE"}
        </p>
      )}
    </>
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
