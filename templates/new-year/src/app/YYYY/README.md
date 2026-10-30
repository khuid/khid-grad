# YYYY 사이트

이 폴더는 YYYY 졸업전시 사이트 전용입니다. 다른 연도와 공유하지 않습니다.
이 연도 앱은 저장소의 `YYYY/` 폴더 전체이고, Vercel 프로젝트 `khid-grad-YYYY` 하나입니다.
공통 규칙은 저장소 맨 위의 `README.md`, 다른 연도에서 가져다 쓸 수 있는 기능은 `FEATURES.md`를 보세요.

## 처음 채울 것 (시각 요소는 전부 새로 정함)
- [ ] 색·글꼴·글자 크기·바탕색 — `YYYY.css`
- [ ] 폰트 — 원본 `YYYY/fonts-src/`, 경량본 `YYYY/public/YYYY/fonts/`, 연결 `layout.tsx`
- [ ] 파비콘 — `icon.svg`(또는 `icon.png`), `apple-icon.png`를 이 폴더에
- [ ] 링크 미리보기 이미지(1200×630) — `YYYY/public/YYYY/`, 연결 `layout.tsx`
- [ ] 메인 페이지 — `page.tsx`
- [ ] 디자이너·작품 데이터 — `_components/designers.ts`, `_components/works.ts`
- [ ] Vercel 프로젝트 `khid-grad-YYYY` 만들기 (Root Directory = `YYYY`) — 저장소 README "새 연도 추가"
- [ ] 마지막 점검 — `python3 scripts/check-year.py YYYY` (남은 "[정하기]", 다른 연도 숫자, 빠진 파일을 찾아 줌)

## 다른 연도에서 가져온 기능
가져올 때마다 아래에 적어 두세요. 다음 해에 "이 기능을 그대로 쓸지" 판단하는 근거가 됩니다.

| 기능 | 가져온 연도 | 그대로 / 바꾼 것 |
|---|---|---|
| (예) 커밍순 공개 게이트 | 2026 | 공개 일시를 YYYY-11-xx로, 커밍순 이미지 새로 |
