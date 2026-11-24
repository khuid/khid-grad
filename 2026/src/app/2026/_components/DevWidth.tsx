"use client";

import { useEffect, useState } from "react";

// 개발 서버(미리보기)에서만: 화면 오른쪽 아래에 현재 화면 폭을 표시 (브라우저 개발자 도구처럼). 배포 사이트에는 안 나옴
export function DevWidth() {
  const [size, setSize] = useState<[number, number] | null>(null);
  useEffect(() => {
    const update = () => setSize([window.innerWidth, window.innerHeight]);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  if (!size) return null;
  return (
    <div className="pointer-events-none fixed right-2 bottom-2 z-[9999] rounded bg-black/75 px-2 py-1 font-mono text-[12px] leading-none text-white">
      {size[0]} × {size[1]}
    </div>
  );
}
