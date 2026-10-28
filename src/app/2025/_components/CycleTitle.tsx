"use client";

import { useEffect, useState } from "react";

// 목록 페이지 빨간 제목 — 프레이머 title 컴포넌트. 나타나고 2초마다 다음 단어로 바뀜(끝나면 처음으로)
//   작품: (MOVE)S → (PROJECT)S → (TRACE)S / 디자이너: (PLAYER)S → (DESIGNER)S → (THINKER)S
// 단어마다 폭이 달라서 높이를 고정하고 폭은 이미지 비율대로. 이미지는 프레이머에서 뽑은 SVG (public/2025/titles/)
// [추정] 디자이너 제목의 2초 간격은 작품 제목 값을 그대로 씀
export default function CycleTitle({ words, className }: { words: { src: string; label: string }[]; className: string }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((n) => (n + 1) % words.length), 2 * 1000);
    return () => clearInterval(t);
  }, [words.length]);

  return (
    <>
      <span className="sr-only">{words[0].label}</span>
      {/* 다음 단어가 바뀔 때 깜빡이지 않게 셋 다 미리 넣어 두고 지금 단어만 보임 */}
      {words.map((w, n) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img key={w.src} src={w.src} alt="" aria-hidden className={`w-auto ${n === i ? "block" : "hidden"} ${className}`} />
      ))}
    </>
  );
}
