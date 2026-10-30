"use client";

import { useEffect, useRef } from "react";

// 히어로 하단 스폰서 배너: 배너 이미지(665×44, 2배율 1330×88)를 가로로 이어 붙여
// 왼쪽으로 계속 흐르게 함. 이미지 한 장 폭만큼 이동하면 처음 위치와 같아져서 끊김 없이 반복.
// 화면 폭이 넓어도 빈틈이 없도록 넉넉히 복제 (8장 = 5320px → 화면 폭 ~4600까지)
// 다른 모션과 마찬가지로 배너가 화면에 보일 때만 흐름(벗어나면 일시정지)
const COPIES = 8;

export default function SponsorMarquee() {
  const boxRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const box = boxRef.current;
    const track = trackRef.current;
    if (!box || !track) return;
    const observer = new IntersectionObserver(([entry]) => {
      track.style.animationPlayState = entry.isIntersecting ? "running" : "paused";
    });
    observer.observe(box);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={boxRef}
      className="relative h-[33px] overflow-hidden bg-white min-[768px]:h-[44px]"
      aria-label="후원사: FIABA, DANCING CIDER, 3DPAGE, RixFont"
    >
      <div
        ref={trackRef}
        className="flex h-full w-max animate-[marquee_24s_linear_infinite] [animation-play-state:paused] motion-reduce:animate-none"
      >
        {Array.from({ length: COPIES }, (_, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src="/2026/hero/sponsorship-banner.jpg"
            alt=""
            aria-hidden
            className="block h-full w-auto max-w-none shrink-0"
            draggable={false}
          />
        ))}
      </div>
    </div>
  );
}
