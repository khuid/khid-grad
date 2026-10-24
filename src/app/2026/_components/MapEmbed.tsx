"use client";

import { useEffect, useRef, useState } from "react";

// [3] 약도 구글 지도. 그냥 넣으면 휴대폰에서 스크롤이 턱턱 막힘(2026-10-24 측정: 지도 빼면 끊김 0):
// - 지도 페이지가 무거운 스크립트·글꼴을 받아 실행하는데, 아이폰(사파리·카카오톡)은 iframe도 같은 스레드에서 돌아서
//   loading="lazy"로 스크롤 도중 불러지면 그동안 화면이 멈춤
// - 손가락이 지도 위에서 스크롤을 시작하면 지도 쪽 터치 처리를 기다리느라 또 멈춤
// 그래서
// 1) 지도 칸이 화면에 보이고 스크롤이 멈춘 뒤(IDLE)에야 불러옴 — 그 전엔 연한 배경만
// 2) 터치 기기는 지도 위를 투명한 링크로 덮음: 손가락을 대고 밀면 그냥 페이지 스크롤, 탭하면 구글 지도(앱)에서 열림
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

  const q = encodeURIComponent(query);
  return (
    <div ref={boxRef} className="relative aspect-[712/520] w-full overflow-hidden bg-pale">
      {load && (
        <iframe
          src={`https://www.google.com/maps?q=${q}&hl=ko&z=16&output=embed`}
          title={title}
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 size-full border-0"
        />
      )}
      <a
        href={`https://www.google.com/maps/search/?api=1&query=${q}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`구글 지도에서 열기: ${query}`}
        className="absolute inset-0 hidden pointer-coarse:block"
      />
    </div>
  );
}
