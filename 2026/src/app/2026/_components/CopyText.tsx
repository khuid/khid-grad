"use client";

import { useEffect, useRef, useState } from "react";

const TOAST_MS = 1600;

// 누르면 글자를 클립보드에 복사하고 화면 아래 가운데에 "복사되었습니다." 안내를 잠깐 띄움.
// 2026 사이트의 이메일은 전부 이걸로(메일 쓰기 mailto 대신 복사 — 아카이브 푸터 CopyText와 같은 동작, 색은 2026 key 파랑).
export default function CopyText({ text, className = "" }: { text: string; className?: string }) {
  const [shown, setShown] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // 클립보드 API가 막힌 환경(비보안 컨텍스트, 일부 인앱 브라우저) 대비
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setShown(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setShown(false), TOAST_MS);
  };

  return (
    <>
      <button type="button" onClick={copy} className={`cursor-pointer text-left break-all transition-colors duration-200 hover:text-key ${className}`}>
        {text}
      </button>
      <span
        role="status"
        className={`pointer-events-none fixed bottom-8 left-1/2 z-50 -translate-x-1/2 rounded-full bg-key px-4 py-2 text-[13px] leading-none font-medium tracking-[-0.04em] whitespace-nowrap text-white transition-opacity duration-300 ${
          shown ? "opacity-100" : "opacity-0"
        }`}
      >
        {shown ? "복사되었습니다." : ""}
      </span>
    </>
  );
}
