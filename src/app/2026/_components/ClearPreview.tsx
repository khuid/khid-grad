"use client";

import { useEffect } from "react";
import { PREVIEW_COOKIE } from "./preview";

// 미리보기는 한 번만: 전체 사이트가 뜨면 바로 쿠키를 지워서, 새로고침하면 다시 커밍순
export default function ClearPreview() {
  useEffect(() => {
    document.cookie = `${PREVIEW_COOKIE}=; path=/; max-age=0; SameSite=Lax`;
  }, []);
  return null;
}
