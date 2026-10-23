"use client";

import { useEffect, useRef, useState } from "react";

// 히어로 배경: 포스터와 같은 격자 + 각도 그리드 + 하단 줄자.
// Figma(37px 격자)를 32px 격자로 다시 짠 것. 각도선 끝점은 Figma 좌표를 격자 칸 단위로 옮김
// (위·아래 두 띠, Figma는 각 11칸). 두 띠 묶음은 화면 위쪽 끝까지 반복.
// 칸 크기는 화면 폭 브레이크포인트에 맞춰 줄어듦 (모바일 구조 ~1279).

const LINE = "#E4E4E4"; // = globals.css의 lightgray(Figma #DDD보다 살짝 밝게). SVG 속성이라 값을 직접 씀 — 바꿀 땐 같이

// 타일 안 [col, row] — row는 각 띠의 위쪽 선 기준(0~11)
type Seg = [number, number, number, number];
const UPPER: Seg[] = [
  [15, 11, 4, 0],
  [4, 11, 15, 0],
  [2, 11, 8, 0],
  [15, 11, 21, 0],
  [17, 11, 25.7, 1.48],
];
const LOWER: Seg[] = [
  [25, 11, 14, 0],
  [14, 11, 25, 0],
  [12, 11, 18, 0],
  [1, 11, 7, 0],
  [3, 11, 13, 0],
  [14, 11, 3, 0],
];
// 각도 표기 [col, 마지막 가로선에서 위로 몇 칸, 글자]
const LABELS: [number, number, string][] = [
  [17.64, 15.79, "60°"],
  [4.7, 15.79, "60°"],
  [20.46, 14.69, "45°"],
  [3.07, 3.56, "60°"],
  [14.11, 3.56, "60°"],
  [6.05, 3.46, "45°"],
  [17.55, 3.44, "45°"],
];
// 대각선이 빽빽해 보여서 Figma 무늬를 키움:
// - 띠 높이 11칸 → 16칸 (선이 위로 길어짐, 기울기 유지를 위해 가로 길이도 같은 배율)
// - 선끼리·세트끼리 간격(시작 칸)은 Figma의 2.24배, 타일 폭도 같은 배율
const LENGTH = 16 / 11;
const SPREAD = 2.24;
const TILE = 58; // Figma 26칸 × 2.24
const BAND = 16;
const scaleSegs = (segs: Seg[]): Seg[] =>
  segs.map(([a, b, d, e]) => {
    const a2 = Math.round(a * SPREAD);
    return [a2, b * LENGTH, a2 + (d - a) * LENGTH, e * LENGTH];
  });
const UPPER_S = scaleSegs(UPPER);
const LOWER_S = scaleSegs(LOWER);

export function cellSize(width: number) {
  if (width >= 1280) return 32;
  if (width >= 1024) return 28;
  if (width >= 768) return 24;
  if (width >= 640) return 20;
  return 16;
}

export default function HeroGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ w: Math.round(width), h: Math.round(height) });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {size && <GridSvg w={size.w} h={size.h} />}
    </div>
  );
}

function GridSvg({ w, h }: { w: number; h: number }) {
  // 칸 크기는 뷰포트 기준 (히어로는 항상 화면 전체 폭)
  const c = cellSize(typeof window === "undefined" ? w : window.innerWidth);
  const B = h - 0.5; // 줄자 바닥선
  const R0 = B - 2 * c; // 마지막 가로선(줄자 위)
  // 화면 가운데가 29번째 세로선이 되도록 기준점 지정
  const x0 = Math.round(w / 2 - 29 * c) + 0.5;
  const iMin = Math.floor(-x0 / c) - 1;
  const iMax = Math.ceil((w - x0) / c) + 1;

  const v: React.ReactNode[] = [];
  const ticks: string[] = [];
  const nums: React.ReactNode[] = [];
  let n = 0;
  for (let i = iMin; i <= iMax; i++) {
    const x = x0 + i * c;
    const even = ((i % 2) + 2) % 2 === 0;
    // 짝수 칸: 숫자 자리에서 끊기고 긴 눈금 / 홀수 칸: 바닥까지
    v.push(<line key={`v${i}`} x1={x} x2={x} y1={0} y2={even ? B - 1.81 * c : B} />);
    if (even) {
      ticks.push(`M${x} ${B}V${B - 0.71 * c}`);
      if (x > c / 2 && x < w - c / 2) {
        n += 1;
        nums.push(
          <text key={`n${i}`} x={x} y={B - 1.49 * c} dy="0.36em">
            {n}
          </text>,
        );
      }
    }
    ticks.push(`M${x + c / 2} ${B}V${B - 0.46 * c}`);
    ticks.push(`M${x + c / 4} ${B}V${B - 0.29 * c}`, `M${x + (3 * c) / 4} ${B}V${B - 0.29 * c}`);
  }

  const hl: React.ReactNode[] = [];
  for (let y = R0, k = 0; y > -c; y -= c, k++) {
    hl.push(<line key={`h${k}`} x1={0} x2={w} y1={Math.round(y) + 0.5} y2={Math.round(y) + 0.5} />);
  }

  const diag: string[] = [];
  const labels: React.ReactNode[] = [];
  const tMin = Math.floor(iMin / TILE) - 1;
  const tMax = Math.ceil(iMax / TILE);
  // 두 띠 묶음을 위로 반복. 위로 올라갈 때마다 타일 반 칸씩 엇갈려서 같은 무늬가 겹쳐 보이지 않게
  const pairs = Math.ceil(R0 / (2 * BAND * c));
  for (let k = 0; k < pairs; k++) {
    const base = R0 - k * 2 * BAND * c;
    for (let t = tMin - 1; t <= tMax; t++) {
      const ox = x0 + (t + (k % 2) * 0.5) * TILE * c;
      const band = (segs: Seg[], top: number) =>
        segs.forEach(([a, b, d, e]) =>
          diag.push(`M${ox + a * c} ${top + b * c}L${ox + d * c} ${top + e * c}`),
        );
      band(UPPER_S, base - 2 * BAND * c);
      band(LOWER_S, base - BAND * c);
      LABELS.forEach(([col, up, s], j) => {
        const cx = ox + (Math.round(col * SPREAD * 2) / 2) * c;
        const cy = base - up * LENGTH * c;
        labels.push(
          <g key={`l${k}-${t}-${j}`}>
            <rect x={cx - 0.5 * c} y={cy - 0.23 * c} width={c} height={0.46 * c} fill="#fff" />
            <text x={cx} y={cy} dy="0.36em">
              {s}
            </text>
          </g>,
        );
      });
    }
  }

  return (
    <svg width={w} height={h} className="block" fill="none">
      <g stroke={LINE} strokeWidth={1}>
        {v}
        {hl}
        <path d={diag.join("")} />
        <path d={ticks.join("")} />
        <line x1={0} x2={w} y1={B} y2={B} />
      </g>
      <g
        fill={LINE}
        textAnchor="middle"
        className="font-ruler"
        style={{ fontSize: 0.44 * c, fontWeight: 700 }}
      >
        {labels}
        {nums}
      </g>
    </svg>
  );
}
