"use client";

import { useEffect, useRef } from "react";

// 키비주얼 = 면(kv-nonline.svg, 글자) + 선(kv-line.svg, 화살표선) 두 장을 겹침.
// 선 SVG는 애니메이션을 위해 문서 안에 직접 넣음(lineSvg = 파일 내용, Hero에서 읽어 넘김).
// 진한 파랑 화살표선이 시작점(원) → 선 → 화살촉 순서로 조금씩 시차를 두고 그려지고,
// 다 그려진 뒤 잠시 머물렀다 사라지는 걸 반복.
const LINE_COLORS = ["#0068FF", "#0257FF"];

// 한 사이클 타이밍(ms)
const STAGGER_TOTAL = 2200; // 첫 선 ~ 마지막 선 시작 간격 합
const DRAW_MIN = 450;
const DRAW_PER_PX = 4; // 선 길이 1px당 그리는 시간
const DRAW_MAX = 1300;
const HOLD = 3200; // 전부 그려진 뒤 머무는 시간
const FADE = 600;
const REST = 1200; // 사라진 뒤 다음 사이클까지 쉬는 시간

type Pt = { x: number; y: number };

export default function KeyVisual({ lineSvg }: { lineSvg: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const svg = ref.current?.querySelector("svg");
    if (!svg) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const isLine = (c: string | null) => !!c && LINE_COLORS.includes(c.toUpperCase());
    const strokes = [...svg.querySelectorAll<SVGPathElement>("path[stroke]")].filter((p) =>
      isLine(p.getAttribute("stroke")),
    );
    const fills = [...svg.querySelectorAll<SVGPathElement>("path[fill]")].filter((p) =>
      isLine(p.getAttribute("fill")),
    );

    type Line = { el: SVGPathElement; len: number; a: Pt; b: Pt; scope: Element | null; left: number };
    const lines: Line[] = strokes.map((el) => {
      const len = el.getTotalLength();
      const a = el.getPointAtLength(0);
      const b = el.getPointAtLength(len);
      return {
        el,
        len,
        a: { x: a.x, y: a.y },
        b: { x: b.x, y: b.y },
        scope: el.closest("svg"),
        left: el.getBoundingClientRect().left,
      };
    });
    // 왼쪽에서 오른쪽으로 훑듯이 순서 지정
    lines.sort((p, q) => p.left - q.left);
    const step = STAGGER_TOTAL / Math.max(1, lines.length - 1);
    const timed = lines.map((l, i) => {
      const dur = Math.min(DRAW_MAX, Math.max(DRAW_MIN, l.len * DRAW_PER_PX));
      return { ...l, delay: i * step, dur };
    });
    const drawEnd = Math.max(...timed.map((l) => l.delay + l.dur));
    const fadeStart = drawEnd + HOLD;
    const cycle = fadeStart + FADE + REST;
    const at = (ms: number) => Math.min(1, ms / cycle);

    const anims: Animation[] = [];
    const appear = (el: SVGElement, ms: number) => {
      anims.push(
        el.animate(
          [
            { opacity: 0, offset: 0 },
            { opacity: 0, offset: at(ms) },
            { opacity: 1, offset: at(ms + 120) },
            { opacity: 1, offset: at(fadeStart) },
            { opacity: 0, offset: at(fadeStart + FADE) },
            { opacity: 0, offset: 1 },
          ],
          { duration: cycle, iterations: Infinity, easing: "linear" },
        ),
      );
    };

    for (const l of timed) {
      l.el.style.strokeDasharray = `${l.len}`;
      anims.push(
        l.el.animate(
          [
            { strokeDashoffset: l.len, opacity: 1, offset: 0 },
            { strokeDashoffset: l.len, opacity: 1, offset: at(l.delay), easing: "cubic-bezier(0.45, 0, 0.25, 1)" },
            { strokeDashoffset: 0, opacity: 1, offset: at(l.delay + l.dur) },
            { strokeDashoffset: 0, opacity: 1, offset: at(fadeStart) },
            { strokeDashoffset: 0, opacity: 0, offset: at(fadeStart + FADE) },
            { strokeDashoffset: l.len, opacity: 0, offset: 1 },
          ],
          { duration: cycle, iterations: Infinity, easing: "linear" },
        ),
      );
    }

    // 원·화살촉: 같은 조각(svg) 안에서 가장 가까운 선 끝점을 찾아,
    // 시작점에 붙은 건 선이 출발할 때, 끝점에 붙은 건 선이 다 그려졌을 때 나타남
    for (const f of fills) {
      const bb = f.getBBox();
      const c = { x: bb.x + bb.width / 2, y: bb.y + bb.height / 2 };
      const scope = f.closest("svg");
      let best: { ms: number; d: number } | null = null;
      for (const l of timed) {
        if (l.scope !== scope) continue;
        const da = Math.hypot(l.a.x - c.x, l.a.y - c.y);
        const db = Math.hypot(l.b.x - c.x, l.b.y - c.y);
        if (!best || da < best.d) best = { ms: l.delay, d: da };
        if (db < best.d) best = { ms: l.delay + l.dur - 80, d: db };
      }
      appear(f, best ? best.ms : 0);
    }

    return () => {
      anims.forEach((a) => a.cancel());
      strokes.forEach((s) => (s.style.strokeDasharray = ""));
    };
  }, []);

  // 세 파일은 main_full(939×524) 좌표 기준: 면은 (0,0) 888×506, 선은 (3.78,0) 935×524
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/2026/hero/kv-nonline.svg"
        alt="THIS IS NOT GRADUATION 2026"
        className="absolute top-0 left-0 block h-auto w-[calc(888/939*100%)] max-w-none"
      />
      <div
        ref={ref}
        aria-hidden
        className="absolute top-0 left-[calc(3.78/939*100%)] w-[calc(935/939*100%)] [&>svg]:block [&>svg]:h-auto [&>svg]:w-full"
        // 서버에서 그대로 그려서 깜빡임 없이 표시
        dangerouslySetInnerHTML={{ __html: lineSvg }}
      />
    </>
  );
}
