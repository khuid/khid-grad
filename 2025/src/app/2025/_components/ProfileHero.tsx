"use client";

import { useEffect, useState } from "react";
import Ph from "./Ph";

// 프로필 맨 위 큰 이미지 — 프레이머 profile_thumbnail (1440×810, 16:9 폭 가득)
// 작품 이미지 3장을 번갈아 보여 줌(variant 세개-1/2/3), 1장이면 그대로(한개)
// [추정] 넘어가는 간격 3초·서서히 바뀜(0.8초)은 프레이머 값을 못 읽어 임시로 정함
export default function ProfileHero({ images }: { images: (string | undefined)[] }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (images.length < 2) return;
    const t = setInterval(() => setI((n) => (n + 1) % images.length), 3000);
    return () => clearInterval(t);
  }, [images.length]);

  return (
    <div className="relative aspect-video w-full overflow-hidden">
      {images.map((src, n) => (
        <Ph
          key={n}
          src={src}
          label={`대표 이미지 ${n + 1} / ${images.length}`}
          className={`absolute inset-0 size-full transition-opacity duration-800 ${n === i ? "opacity-100" : "opacity-0"}`}
        />
      ))}
    </div>
  );
}
