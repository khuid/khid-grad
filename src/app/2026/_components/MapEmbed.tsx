"use client";

import { useEffect, useRef, useState } from "react";

// [3] 약도 구글 지도. 지도 페이지가 무거운 스크립트·글꼴을 받아 실행하는데,
// loading="lazy"로 두면 스크롤 도중에 불러져서 그동안 화면이 멈춤(2026-10-24 측정: 지도 빼면 끊김 0, 카카오톡에서 체감).
// 그래서 지도 칸이 화면에 보이고 스크롤이 멈춘 뒤(IDLE)에야 불러옴 — 그 전엔 연한 배경만.
// 휴대폰에서도 지도는 직접 만질 수 있게 둠(2026-10-25 사용자 결정 — 투명 링크로 덮었던 것 되돌림)
const IDLE = 300;

export default function MapEmbed({ query, title }: { query: string; title: string }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const box = boxRef.current;
    if (!box || load) return;
    let visible = false;
    let timer = 0;
    const wait = () => {
      clearTimeout(timer);
      if (visible) timer = window.setTimeout(() => setLoad(true), IDLE);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      wait();
    });
    observer.observe(box);
    window.addEventListener("scroll", wait, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", wait);
      clearTimeout(timer);
    };
  }, [load]);

  return (
    <div ref={boxRef} className="relative aspect-[712/520] w-full overflow-hidden bg-pale">
      {load && (
        <iframe
          src={`https://www.google.com/maps?q=${encodeURIComponent(query)}&hl=ko&z=16&output=embed`}
          title={title}
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 size-full border-0"
        />
      )}
    </div>
  );
}
