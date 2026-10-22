import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  // 이미지 최적화: 지원 브라우저엔 AVIF(같은 화질에서 WebP보다 더 작음), 아니면 WebP
  images: {
    formats: ["image/avif", "image/webp"],
  },
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
