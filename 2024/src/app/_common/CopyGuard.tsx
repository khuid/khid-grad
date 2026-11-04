// 자동 복사본 — 고치지 말고 저장소의 common/에서 고친 뒤 python3 scripts/sync-common.py
"use client";

import { useEffect } from "react";

// [모든 연도 공통] 루트 layout에서 모든 페이지에 붙음.
// 이미지·영상 무단 저장 방지(완벽한 차단은 불가능 — 화면에 보이는 파일은 이미 브라우저로 내려온 것이라
// 마음먹으면 꺼낼 수 있음. 여기서는 쉬운 길만 막음):
// - 이미지·영상 위 우클릭 메뉴(이미지 복사·저장) 막기
// - 끌어다 바탕화면에 놓기 막기 (모바일 길게 눌러 저장은 _common/common.css의 -webkit-touch-callout으로)
// - 배포 사이트에선 개발자 도구·소스 보기·페이지 저장 단축키 막기 (브라우저 메뉴로 여는 건 못 막음)
const MEDIA = "img, video, picture, svg, canvas, [data-protect]";

export default function CopyGuard() {
  useEffect(() => {
    const onMedia = (e: Event) => e.target instanceof Element && !!e.target.closest(MEDIA);
    const block = (e: Event) => onMedia(e) && e.preventDefault();

    const keys = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      const mod = e.metaKey || e.ctrlKey;
      if (
        k === "f12" ||
        (mod && (e.shiftKey || e.altKey) && ["i", "j", "c"].includes(k)) || // 개발자 도구
        (mod && e.altKey && k === "u") || // 소스 보기(맥)
        (mod && ["u", "s"].includes(k)) // 소스 보기·페이지 저장
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", block);
    document.addEventListener("dragstart", block);
    // 로컬 작업(npm run dev) 중에는 개발자 도구를 써야 하니 단축키는 배포 사이트에서만 막음
    const guardKeys = process.env.NODE_ENV === "production";
    if (guardKeys) document.addEventListener("keydown", keys);
    return () => {
      document.removeEventListener("contextmenu", block);
      document.removeEventListener("dragstart", block);
      if (guardKeys) document.removeEventListener("keydown", keys);
    };
  }, []);

  return null;
}
