"use client";

import { useLayoutEffect, useRef } from "react";

// 긴 작품 제목이 2줄을 넘으면 글자를 조금씩 줄여 2줄 안에 들어가게 함(최소 원래 크기의 70%).
// 단어 중간에서 끊기지 않게 break-keep, 그래도 한 단어가 칸보다 길 때만 단어 안에서 줄바꿈.
// 행간은 1.2로 고정해 줄 수를 높이로 셈. 칸 폭이 바뀌면(화면 크기) 다시 맞춤
const LINES = 2;
const LEADING = 1.2;

export default function FitTitle({ className, children }: { className: string; children: React.ReactNode }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fit = () => {
      el.style.fontSize = "";
      const base = parseFloat(getComputedStyle(el).fontSize);
      let fs = base;
      while (el.scrollHeight > LINES * LEADING * fs + 1 && fs > base * 0.7) {
        fs -= 0.5;
        el.style.fontSize = `${fs}px`;
      }
    };
    // 폭이 바뀔 때만 다시 맞춤 (글자를 줄이면 높이가 바뀌니 높이 변화로는 다시 안 돎)
    let width = -1;
    const ro = new ResizeObserver(([e]) => {
      if (e.contentRect.width === width) return;
      width = e.contentRect.width;
      fit();
    });
    ro.observe(el);
    document.fonts.ready.then(fit); // 웹폰트가 늦게 뜨면 글자 폭이 달라지니 한 번 더
    return () => ro.disconnect();
  }, []);

  return (
    <p ref={ref} className={`leading-[1.2] break-keep [overflow-wrap:anywhere] ${className}`}>
      {children}
    </p>
  );
}
