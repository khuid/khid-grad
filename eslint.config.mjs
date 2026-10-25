import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // 새 연도 시작 틀(YYYY 자리표시가 있어 그대로는 코드가 아님) — scripts/new-year.py로 복사된 뒤 검사됨
    "templates/**",
  ]),
]);

export default eslintConfig;
