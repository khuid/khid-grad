"use client";

import { useEffect, useRef } from "react";

// 키비주얼 = 면(kv-nonline.svg, 글자) + 선(kv-line.svg, 화살표선) 두 장을 겹침.
// 둘 다 조각별 애니메이션 때문에 문서 안에 직접 넣음(파일 내용을 Hero에서 읽어 넘김).
// 1) 무빙포스터(mp.2026)처럼 글자 면 조각이 랜덤 순서로 깜빡이며 생김 (처음 한 번)
// 2) 이어서 진한 파랑 화살표선이 시작점(원) → 선 → 화살촉 순서로 시차를 두고 그려지고,
//    다 그려진 뒤 잠시 머물렀다 사라지는 걸 반복
const LINE_COLORS = ["#0068FF", "#0257FF"];

// 글자 깜빡임: 조각마다 0~LETTER_SPREAD 사이 랜덤 시점에 시작해서 FLICKER 동안
// 연하게 켜졌다 꺼졌다를 반복하다 진하게 고정 (무빙포스터 2.4~4.8초 구간 참고)
const LETTER_SPREAD = 2000;
const FLICKER = 520;
const FLICKER_STEPS = [0, 0.35, 0, 0.7, 0.2, 1];

// 한 사이클 타이밍(ms)
const STAGGER_TOTAL = 2200; // 첫 선 ~ 마지막 선 시작 간격 합
const DRAW_MIN = 450;
const DRAW_PER_PX = 4; // 선 길이 1px당 그리는 시간
const DRAW_MAX = 1300;
const HOLD = 3200; // 전부 그려진 뒤 머무는 시간
const FADE = 600;
const REST = 1200; // 사라진 뒤 다음 사이클까지 쉬는 시간

type Pt = { x: number; y: number };

export default function KeyVisual({ fillSvg, lineSvg }: { fillSvg: string; lineSvg: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const svg = ref.current?.querySelector("svg");
    const fillSvgEl = fillRef.current?.querySelector("svg");
    if (!root || !svg || !fillSvgEl) return;
    // 애니메이션 준비 전엔 숨겨 둠(완성본이 잠깐 보였다 사라지는 깜빡임 방지)
    const reveal = () => root.setAttribute("data-ready", "");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      reveal();
      return;
    }

    const anims: Animation[] = [];

    // 1) 글자 면 깜빡임
    let lettersDone = 0;
    for (const piece of fillSvgEl.querySelectorAll<SVGPathElement>("path")) {
      const delay = Math.random() * LETTER_SPREAD;
      const n = FLICKER_STEPS.length - 1;
      anims.push(
        piece.animate(
          FLICKER_STEPS.map((o, i) => ({ opacity: o, offset: i / n, easing: "steps(1, end)" })),
          { duration: FLICKER, delay, fill: "both" },
        ),
      );
      lettersDone = Math.max(lettersDone, delay + FLICKER);
    }

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

    // 선은 글자가 다 생긴 뒤 첫 사이클 시작
    const intro = lettersDone + 200;
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
          { duration: cycle, delay: intro, iterations: Infinity, easing: "linear", fill: "backwards" },
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
          { duration: cycle, delay: intro, iterations: Infinity, easing: "linear", fill: "backwards" },
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
    reveal();

    return () => {
      anims.forEach((a) => a.cancel());
      strokes.forEach((s) => (s.style.strokeDasharray = ""));
    };
  }, []);

  // 세 파일은 main_full(939×524) 좌표 기준: 면은 (0,0) 888×506, 선은 (3.78,0) 935×524.
  // 서버에서 그대로 그려 두고, 준비되면(data-ready) 보이게 함
  return (
    <div
      ref={rootRef}
      role="img"
      aria-label="THIS IS NOT GRADUATION 2026"
      className="absolute inset-0 [&:not([data-ready])]:invisible [&_svg]:block [&_svg]:h-auto [&_svg]:w-full"
    >
      <div
        ref={fillRef}
        className="absolute top-0 left-0 w-[calc(888/939*100%)]"
        dangerouslySetInnerHTML={{ __html: fillSvg }}
      />
      <div
        ref={ref}
        className="absolute top-0 left-[calc(3.78/939*100%)] w-[calc(935/939*100%)]"
        dangerouslySetInnerHTML={{ __html: lineSvg }}
      />
    </div>
  );
}
