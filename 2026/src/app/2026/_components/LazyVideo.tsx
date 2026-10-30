"use client";

import { useEffect, useRef } from "react";

// 작품 상세의 mp4 영상 (소리 없음, 반복). 처음엔 아무것도 받지 않고(preload="none"),
// 화면 가까이(위아래 300px) 오면 그때 받아서 재생, 화면 밖으로 나가면 멈춤 → 끝까지 안 내린 사람은 영상 데이터를 쓰지 않음
export default function LazyVideo({ src, className = "" }: { src: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { rootMargin: "300px 0px" },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return <video ref={ref} src={src} muted loop playsInline preload="none" className={className} />;
}
