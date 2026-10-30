"use client";

import { useEffect } from "react";
import { PREVIEW_COOKIE } from "./preview";

// 미리보기는 한 번만: 전체 사이트가 뜨면 바로 쿠키를 지워서, 새로고침하면 다시 커밍순.
// 단 사이트 안에서 PROJECTS·DESIGNERS 등 다른 페이지로 넘어갈 때는(링크 클릭·뒤로/앞으로) 그 직전에 쿠키를
// 잠깐(30초) 다시 넣어서 다음 페이지도 미리보기로 열림 — 새 페이지가 뜨면 이 컴포넌트가 다시 지움
const set = () => (document.cookie = `${PREVIEW_COOKIE}=1; path=/; max-age=30; SameSite=Lax`);

export default function ClearPreview() {
  useEffect(() => {
    document.cookie = `${PREVIEW_COOKIE}=; path=/; max-age=0; SameSite=Lax`;

    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element).closest<HTMLAnchorElement>("a[href]");
      if (a && a.origin === location.origin && a.pathname.startsWith("/2026")) set();
    };
    // 캡처 단계에서 — 링크가 페이지를 바꾸기 전에 쿠키가 먼저 들어가게
    document.addEventListener("click", onClick, true);
    window.addEventListener("popstate", set);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("popstate", set);
    };
  }, []);
  return null;
}
