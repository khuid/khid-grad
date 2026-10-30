"use client";

import { useSyncExternalStore } from "react";
import Header from "./Header";

// SiteGate가 서버 답(공개 여부·미리보기 쿠키)을 기다리는 동안 보이는 임시 화면.
// - 처음 접속(서버에서 그린 HTML): 파란 화면 — 커밍순 이미지가 뜨기 전 배경과 같게
// - 사이트 안에서 페이지를 옮길 때(이미 브라우저에서 돌아가는 중): 상단바 + 흰 화면 — 파란 화면이 번쩍이지 않게
const noop = () => () => {};

export default function GateFallback() {
  const inBrowser = useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );
  if (!inBrowser) return <main className="fixed inset-0 bg-[#1980FF]" />;
  return (
    <>
      <Header />
      <main className="fixed inset-0 bg-white" />
    </>
  );
}
