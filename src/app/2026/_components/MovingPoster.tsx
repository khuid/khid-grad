"use client";

import { useEffect, useRef, useState } from "react";

// [2] 무빙포스터 — 재생 조건은 archive-site Phase2와 같음:
// - 영상 영역이 절반 이상 보이면 재생, 벗어나면 일시정지(다시 들어오면 멈춘 지점부터)
// - 반복 재생
// - 브라우저 자동재생 정책 때문에 처음엔 음소거, 페이지를 한 번이라도 클릭하면 소리 켬(작게)
const VOLUME = 0.15; // archive-site 2026 무빙포스터와 같은 크기

export default function MovingPoster({ src, className }: { src: string; className?: string }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const unmute = () => setHasInteracted(true);
    document.addEventListener("click", unmute, { once: true });
    return () => document.removeEventListener("click", unmute);
  }, []);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.5,
    });
    observer.observe(box);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.volume = VOLUME;
    if (inView) {
      // 자동재생 정책 등으로 막히면 조용히 무시 (다음 진입이나 클릭 때 다시 시도)
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [inView, hasInteracted]);

  return (
    <div ref={boxRef} className={`relative overflow-hidden bg-white/10 ${className ?? ""}`}>
      <video
        ref={videoRef}
        src={src}
        loop
        muted={!hasInteracted}
        playsInline
        preload="metadata"
        aria-label="제35회 졸업전시 무빙포스터"
        className="size-full object-cover"
      />
    </div>
  );
}
