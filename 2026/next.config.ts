import type { NextConfig } from "next";

// 2026 사이트 전용 설정 — 이 연도 앱(Vercel 프로젝트 khid-grad-2026)에만 적용됨
const nextConfig: NextConfig = {
  // 학교 도메인 하나에 연도별 앱 여러 개가 붙어 있어서(입구 entry/가 /2026 → 이 앱으로 넘겨줌),
  // 이 앱의 JS·CSS 파일 주소(/_next/...)가 다른 연도와 겹치지 않게 /2026-static/_next/...로 둠 (Next.js multi-zones)
  assetPrefix: "/2026-static",
  cacheComponents: true,
  partialPrefetching: true,
  // 이미지 최적화: 지원 브라우저엔 AVIF(같은 화질에서 WebP보다 더 작음), 아니면 WebP
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // next dev가 AI 도구용 AGENTS.md를 자동으로 만들지 않게 — 같은 안내는 CLAUDE.md에 둠
  agentRules: false,
  experimental: {
    agentUpgrade: "security",
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
