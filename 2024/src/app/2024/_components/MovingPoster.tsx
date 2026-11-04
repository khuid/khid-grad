"use client";

import { useEffect, useRef } from "react";

// 메인 무빙 포스터 — 자동 재생 · 반복 · 소리 켬(볼륨 50%) · 조작 버튼 없음 (사용자 결정 2026-11-04)
// 브라우저는 사용자가 페이지를 한 번도 누르지 않았으면 "소리 있는" 자동 재생을 막음.
//   → 먼저 소리 켠 채 재생해 보고(사이트 안에서 다른 페이지를 누르고 들어오면 바로 소리 남),
//     막히면 소리 끈 채로 재생하다가 화면 어디든 처음 누르거나 키를 치는 순간 소리를 켬
const VOLUME = 0.5;

export default function MovingPoster({ src, label }: { src: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.volume = VOLUME;
    video.muted = false;
    const unmute = () => {
      video.muted = false;
      video.play().catch(() => {});
    };
    const events = ["pointerdown", "keydown", "touchend"] as const;
    video.play().catch(() => {
      video.muted = true;
      video.play().catch(() => {});
      events.forEach((e) => document.addEventListener(e, unmute, { once: true }));
    });
    return () => events.forEach((e) => document.removeEventListener(e, unmute));
  }, []);

  return <video ref={ref} src={src} loop playsInline muted aria-label={label} className="block aspect-[800/1126] w-full bg-black object-cover" />;
}
