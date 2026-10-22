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

## 폰트 경량화 (Freesentation)
`fonts-src/`에 원본(한글 전체), `public/fonts/`에 실제로 쓰는 글자만 남긴 경량본이 들어 있어요.
경량본 = 영문·숫자·기호 + 자주 쓰는 한글 2,350자 + 사이트 소스(`src/`, `public/**/*.json`)에 실제로 들어간 글자.
디자이너 이름·작품명 같은 데이터를 추가했다면, 커밋 전에 한 번 다시 만들어 주세요(새 글자가 자동으로 포함됨).
```bash
pip install fonttools brotli   # 처음 한 번
python3 scripts/subset-fonts.py
```
