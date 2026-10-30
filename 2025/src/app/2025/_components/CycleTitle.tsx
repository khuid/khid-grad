"use client";

import { useEffect, useState } from "react";

// 목록 페이지 빨간 제목 — 프레이머 title 컴포넌트. 단어마다 정해진 시간만큼 머문 뒤 다음 단어로(끝나면 처음으로)
//   작품: (MOVE)S 2초 → (PROJECT)S 2.9초 → (TRACE)S 2.9초 / 디자이너: (PLAYER)S·(DESIGNER)S·(THINKER)S 각 2초
//   바뀔 때: 겹치지 않고 바로 바뀜 — 프레이머는 단어 레이어를 숨김/보임으로 바꿔서 서서히 섞이지 않음 (2026-10-30 미리보기로 확인)
// 단어마다 폭이 달라서 높이를 고정하고 폭은 이미지 비율대로. 이미지는 프레이머에서 뽑은 SVG (public/2025/titles/)
export default function CycleTitle({
  words,
  className,
}: {
  words: { src: string; label: string; hold: number }[];
  className: string;
}) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => setI((n) => (n + 1) % words.length), words[i].hold * 1000);
    return () => clearTimeout(t);
  }, [i, words]);

  return (
    <span className="grid justify-items-center min-[720px]:justify-items-start">
      <span className="sr-only">{words[0].label}</span>
      {/* 셋을 같은 자리에 겹쳐 두고 지금 단어만 보이게 (미리 받아 두니 바뀔 때 깜빡이지 않음, 잔상 없이 바로 바뀜) */}
      {words.map((w, n) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={w.src}
          src={w.src}
          alt=""
          aria-hidden
          className={`col-start-1 row-start-1 block w-auto ${
            n === i ? "opacity-100" : "opacity-0"
          } ${className}`}
        />
      ))}
    </span>
  );
}
