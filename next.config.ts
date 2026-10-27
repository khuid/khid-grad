import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
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
