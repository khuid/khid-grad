import type { NextConfig } from "next";

// 2025 사이트 전용 설정 — 이 연도 앱(Vercel 프로젝트 khid-grad-2025)에만 적용됨. 다른 연도와 공유하지 않음
const nextConfig: NextConfig = {
  // 학교 도메인 하나에 연도별 앱 여러 개가 붙어 있어서(입구 entry/가 /2025 → 이 앱으로 넘겨줌),
  // 이 앱의 JS·CSS 파일 주소(/_next/...)가 다른 연도와 겹치지 않게 /2025-static/_next/...로 둠 (Next.js multi-zones). 지우지 말 것
  assetPrefix: "/2025-static",
  // 이미지 최적화: 지원 브라우저엔 AVIF, 아니면 WebP
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // next dev가 AI 도구용 AGENTS.md를 자동으로 만들지 않게 — 같은 안내는 저장소의 CLAUDE.md에 둠
  agentRules: false,
  // Tailwind (2025.css 맨 위의 @import "tailwindcss"). Tailwind를 안 쓰면 이 부분과 package.json의 tailwind 항목을 지워도 됨
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
