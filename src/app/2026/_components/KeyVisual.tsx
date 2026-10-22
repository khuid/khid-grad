"use client";

import { useEffect, useRef } from "react";

// 키비주얼 = 면(kv-nonline.svg, 글자) + 선(kv-line.svg = main_line, 화살표선) 두 장을 겹침.
// 둘 다 조각별 애니메이션 때문에 문서 안에 직접 넣음(파일 내용을 Hero에서 읽어 넘김).
// 순서는 무빙포스터(mp.2026)처럼 선 → 면:
// 1) 진한 파랑 화살표선이 시작점(원 또는 화살촉 없는 끝) → 선 → 화살촉 순서로 시차를 두고 그려짐
// 2) 선이 다 그려지면 글자 면 조각이 랜덤 순서로 깜빡이며 생김 (처음 한 번)
// 3) 선은 잠시 머물렀다 사라지고 다시 그려지기를 반복 (면, NOT 왼쪽 2026 선은 그대로)
// 다른 구역에 갔다가 돌아오면 1)부터 다시 재생
const LINE_COLORS = ["#0068FF", "#0257FF"];

// 선 사이클 타이밍(ms)
const STAGGER_TOTAL = 2200; // 첫 선 ~ 마지막 선 시작 간격 합
const DRAW_MIN = 450;
const DRAW_PER_PX = 4; // 선 길이 1px당 그리는 시간
const DRAW_MAX = 1300;
const HOLD = 3200; // 전부 그려진 뒤 머무는 시간 (첫 사이클엔 이 사이에 면이 생김)
const FADE = 600;
const REST = 1200; // 사라진 뒤 다음 사이클까지 쉬는 시간
const HEAD_NEAR = 10; // 화살촉 중심이 선 끝점에서 이 거리 안이면 그 끝에 붙은 화살촉
// NOT 왼쪽 "2026" 모양 선(선 SVG 좌표 영역): 처음 한 번 그려진 뒤엔 사라지지 않고 유지
const KEEP_BOX = { x0: -5, y0: 245, x1: 185, y1: 332 };

// 글자 깜빡임: 조각마다 랜덤 시점에 시작해서 FLICKER 동안
// 연하게 켜졌다 꺼졌다를 반복하다 진하게 고정 (무빙포스터 2.4~4.8초 구간 참고)
const LETTER_GAP = 100; // 선이 다 그려진 뒤 면 시작까지
const LETTER_SPREAD = 2000;
const FLICKER = 520;
const FLICKER_STEPS = [0, 0.35, 0, 0.7, 0.2, 1];
const TAGLINE_FADE = 700; // "하나의 끝, 새로운 길"은 면 깜빡임 중간쯤 부드럽게 나타남

type Pt = { x: number; y: number };
const dist = (p: Pt, q: Pt) => Math.hypot(p.x - q.x, p.y - q.y);

export default function KeyVisual({
  fillSvg,
  lineSvg,
  children,
}: {
  fillSvg: string;
  lineSvg: string;
  children?: React.ReactNode; // 키비주얼 위에 얹는 문구 — data-kv-tagline 붙은 요소는 면 깜빡임 중간에 나타남
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const lineSvgEl = lineRef.current?.querySelector("svg");
    const fillSvgEl = fillRef.current?.querySelector("svg");
    if (!root || !lineSvgEl || !fillSvgEl) return;
    // 애니메이션 준비 전엔 숨겨 둠(완성본이 잠깐 보였다 사라지는 깜빡임 방지)
    const reveal = () => root.setAttribute("data-ready", "");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      reveal();
      return;
    }

    const isLine = (c: string | null) => !!c && LINE_COLORS.includes(c.toUpperCase());
    const strokes = [...lineSvgEl.querySelectorAll<SVGPathElement>("path[stroke]")].filter((p) =>
      isLine(p.getAttribute("stroke")),
    );
    // 같은 색 면: 곡선(C)으로 된 건 시작점 원, 나머지는 화살촉
    const marks = [...lineSvgEl.querySelectorAll<SVGPathElement>("path[fill]")]
      .filter((p) => isLine(p.getAttribute("fill")))
      .map((el) => {
        const bb = el.getBBox();
        return {
          el,
          c: { x: bb.x + bb.width / 2, y: bb.y + bb.height / 2 },
          dot: /c/i.test(el.getAttribute("d") ?? ""),
        };
      });
    const heads = marks.filter((m) => !m.dot);
    const dots = marks.filter((m) => m.dot);
    const nearest = (list: typeof marks, p: Pt) => Math.min(Infinity, ...list.map((m) => dist(m.c, p)));
    const kept = (p: Pt) => p.x > KEEP_BOX.x0 && p.x < KEEP_BOX.x1 && p.y > KEEP_BOX.y0 && p.y < KEEP_BOX.y1;

    // 선마다 화살촉이 붙은 쪽을 끝점으로(화살촉 없는 쪽이 시작점):
    // 원이 한쪽 끝에만 딱 붙어 있으면 그쪽이 시작, 아니면 화살촉이 더 가까운 쪽이 끝.
    // 경로의 시작(0)이 끝점이 되면 거꾸로 그림
    const lines = strokes.map((el) => {
      const len = el.getTotalLength();
      const p0 = el.getPointAtLength(0);
      const p1 = el.getPointAtLength(len);
      const a = { x: p0.x, y: p0.y };
      const b = { x: p1.x, y: p1.y };
      const dotA = nearest(dots, a) < 3;
      const dotB = nearest(dots, b) < 3;
      const headA = nearest(heads, a);
      const headB = nearest(heads, b);
      const reverse =
        dotA !== dotB ? dotB : Math.min(headA, headB) < HEAD_NEAR && headA < headB;
      return {
        el,
        len,
        start: reverse ? b : a,
        end: reverse ? a : b,
        reverse,
        keep: kept({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }),
        left: el.getBoundingClientRect().left,
      };
    });
    // 왼쪽에서 오른쪽으로 훑듯이 순서 지정
    lines.sort((p, q) => p.left - q.left);
    const step = STAGGER_TOTAL / Math.max(1, lines.length - 1);
    const timed = lines.map((l, i) => ({
      ...l,
      delay: i * step,
      dur: Math.min(DRAW_MAX, Math.max(DRAW_MIN, l.len * DRAW_PER_PX)),
    }));
    const drawEnd = Math.max(...timed.map((l) => l.delay + l.dur));
    const fadeStart = drawEnd + HOLD;
    const cycle = fadeStart + FADE + REST;
    const at = (ms: number) => Math.min(1, ms / cycle);
    const loop: KeyframeAnimationOptions = { duration: cycle, iterations: Infinity, easing: "linear" };
    const once: KeyframeAnimationOptions = { duration: cycle, easing: "linear", fill: "forwards" };

    // 원·화살촉: 가장 가까운 선 끝을 찾아, 시작 쪽이면 선이 출발할 때, 끝 쪽이면 다 그려졌을 때 나타남
    const markTimes = marks.map((m) => {
      let best: { ms: number; d: number; keep: boolean } | null = null;
      for (const l of timed) {
        const ds = dist(l.start, m.c);
        const de = dist(l.end, m.c);
        if (!best || ds < best.d) best = { ms: l.delay, d: ds, keep: l.keep };
        if (de < best.d) best = { ms: l.delay + l.dur - 80, d: de, keep: l.keep };
      }
      return { ...m, ms: best ? best.ms : 0, keep: best ? best.keep : kept(m.c) };
    });

    const pieces = [...fillSvgEl.querySelectorAll<SVGElement>(":scope > path, :scope > g")];
    const tagline = root.querySelector<HTMLElement>("[data-kv-tagline]");
    // 계단식(steps) 구간이 마지막 키프레임에 걸리면 끝난 뒤 중간 값(0.2 등)에 멈추는 경우가 있어서,
    // 마지막에 1 → 1 구간을 하나 더 둬서 항상 진하게 끝나게 함
    const n = FLICKER_STEPS.length;
    const flicker: Keyframe[] = [
      ...FLICKER_STEPS.map((o, i) => ({ opacity: o, offset: i / n, easing: "steps(1, end)" })),
      { opacity: 1, offset: 1 },
    ];

    let anims: Animation[] = [];
    // 처음부터 재생 (첫 진입 + 다른 구역에 갔다 돌아왔을 때)
    const play = () => {
      anims.forEach((a) => a.cancel());
      anims = [];

      for (const l of timed) {
        // 거꾸로 그릴 땐 dashoffset을 -길이 → 0으로 (끝 쪽에서부터 나타남)
        const hidden = l.reverse ? -l.len : l.len;
        l.el.style.strokeDasharray = `${l.len} ${l.len}`;
        const draw: Keyframe[] = [
          { strokeDashoffset: hidden, opacity: 1, offset: 0 },
          { strokeDashoffset: hidden, opacity: 1, offset: at(l.delay), easing: "cubic-bezier(0.45, 0, 0.25, 1)" },
          { strokeDashoffset: 0, opacity: 1, offset: at(l.delay + l.dur) },
        ];
        anims.push(
          l.keep
            ? l.el.animate([...draw, { strokeDashoffset: 0, opacity: 1, offset: 1 }], once)
            : l.el.animate(
                [
                  ...draw,
                  { strokeDashoffset: 0, opacity: 1, offset: at(fadeStart) },
                  { strokeDashoffset: 0, opacity: 0, offset: at(fadeStart + FADE) },
                  { strokeDashoffset: hidden, opacity: 0, offset: 1 },
                ],
                loop,
              ),
        );
      }

      for (const m of markTimes) {
        const show: Keyframe[] = [
          { opacity: 0, offset: 0 },
          { opacity: 0, offset: at(m.ms) },
          { opacity: 1, offset: at(m.ms + 120) },
        ];
        anims.push(
          m.keep
            ? m.el.animate([...show, { opacity: 1, offset: 1 }], once)
            : m.el.animate(
                [
                  ...show,
                  { opacity: 1, offset: at(fadeStart) },
                  { opacity: 0, offset: at(fadeStart + FADE) },
                  { opacity: 0, offset: 1 },
                ],
                loop,
              ),
        );
      }

      // 글자 면 깜빡임: svg 바로 아래 조각 단위(묶인 <g>는 통째로, 예: T 옆 큰 화살표)
      const letterStart = drawEnd + LETTER_GAP;
      for (const piece of pieces) {
        anims.push(
          piece.animate(flicker, {
            duration: FLICKER,
            delay: letterStart + Math.random() * LETTER_SPREAD,
            fill: "both",
          }),
        );
      }
      if (tagline) {
        anims.push(
          tagline.animate([{ opacity: 0 }, { opacity: 1 }], {
            duration: TAGLINE_FADE,
            delay: letterStart + LETTER_SPREAD / 2,
            easing: "ease-out",
            fill: "both",
          }),
        );
      }
    };

    play();
    reveal();

    // 아카이빙 Phase1처럼: 다른 구역으로 완전히 벗어났다가 다시 30% 이상 보이면 처음부터 재생
    let hasLeft = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          hasLeft = true;
        } else if (hasLeft && entry.intersectionRatio >= 0.3) {
          hasLeft = false;
          play();
        }
      },
      { threshold: [0, 0.3] },
    );
    const section = root.closest("section") ?? root;
    observer.observe(section);

    return () => {
      observer.disconnect();
      anims.forEach((a) => a.cancel());
      strokes.forEach((s) => (s.style.strokeDasharray = ""));
    };
  }, []);

  // 세 파일은 main_full(939×524) 좌표 기준: 면은 (0,0) 888×506, 선은 (3.78,0) 935×524.
  // 서버에서 그대로 그려 두고, 준비되면(data-ready) 보이게 함
  return (
    <div
      ref={rootRef}
      className="absolute inset-0 [&:not([data-ready])]:invisible [&_svg]:block [&_svg]:h-auto [&_svg]:w-full"
    >
      <div role="img" aria-label="THIS IS NOT GRADUATION 2026">
        <div
          ref={fillRef}
          className="absolute top-0 left-0 w-[calc(888/939*100%)]"
          dangerouslySetInnerHTML={{ __html: fillSvg }}
        />
        <div
          ref={lineRef}
          className="absolute top-0 left-[calc(3.78/939*100%)] w-[calc(935/939*100%)]"
          dangerouslySetInnerHTML={{ __html: lineSvg }}
        />
      </div>
      {children}
    </div>
  );
}
