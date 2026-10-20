# KHID 연도별 졸업전시 사이트

`khid.grad.khu.ac.kr` — 하나의 사이트 안에서 `/2026`, `/2027`처럼 경로로 연도를 구분합니다.
(전체 아카이브 사이트 `khid.exhibit.khu.ac.kr`는 별도 프로젝트 `archive-site`)

## 구조
- `src/app/page.tsx` — 루트(`/`)는 최신 연도로 이동
- `src/app/2026/page.tsx` — 2026 사이트. 2026-11-11 09:00(KST) 전엔 coming soon 이미지, 이후 전체 사이트
- `public/2026/` — 2026 사이트 전용 이미지

## 새 연도 추가
`src/app/2027/`, `public/2027/` 폴더를 새로 만들고, `src/app/page.tsx`의 이동 경로를 `/2027`로 변경. 이전 연도 폴더는 지우지 않고 그대로 둡니다.

## 로컬 실행
```bash
npm install
npm run dev
```
http://localhost:3000/2026
