"use client";

import { useEffect } from "react";

// [1] 앱 안 브라우저(카카오톡 등)에서만 히어로 높이(min-h-svh)를 처음 연 화면 높이로 고정.
// 사파리·크롬 등 일반 브라우저는 그대로 min-h-svh(2026-10-25 사용자 요청: 카카오톡 공유 링크와 나머지를 분리).
// 카카오톡 인앱 브라우저는 위로 스크롤할 때 아래 도구막대가 나오면서 웹뷰 자체가 줄어들어 svh 값도 바뀜 →
// 화면 밖 히어로 높이가 바뀌면 그 아래 내용(지금 보고 있는 곳)이 도구막대 높이만큼 덜컥 밀리고
// 배경 격자(HeroGrid)도 다시 그려져서 스크롤이 턱턱 막힘(2026-10-25 사용자 확인). 사파리는 svh가 원래 안 바뀜.
// 인스타그램·페이스북·네이버·라인 앱 안 브라우저도 같은 웹뷰라 같이 고정(일반 브라우저와 구분만 하면 되므로 넓게 잡음).
// 폭이 바뀔 때(화면 회전 등)만 다시 잼. 그 전(첫 렌더)은 CSS min-h-svh 그대로라 값이 같아서 튀지 않음
const IN_APP = /KAKAOTALK|Instagram|FBAN|FBAV|NAVER\(inapp|Line\//i;

export default function HeroHeightLock({ targetId }: { targetId: string }) {
  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el || !IN_APP.test(navigator.userAgent)) return;
    let width = 0;
    const lock = () => {
      if (window.innerWidth === width) return;
      width = window.innerWidth;
      el.style.minHeight = `${window.innerHeight}px`;
    };
    lock();
    window.addEventListener("resize", lock);
    return () => {
      window.removeEventListener("resize", lock);
      el.style.minHeight = "";
    };
  }, [targetId]);

  return null;
}
