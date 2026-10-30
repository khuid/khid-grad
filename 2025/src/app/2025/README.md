# 2025 사이트

이 폴더는 2025 졸업전시(제34회 THE NEXT MOVE : 공존의 설계) 사이트 전용입니다. 다른 연도와 공유하지 않습니다.
공통 규칙은 사이트 폴더의 `README.md`, 다른 연도에서 가져다 쓸 수 있는 기능은 `FEATURES.md`를 보세요.

- 2025는 **지난 연도를 나중에 추가**한 것 → 입구 `entry/vercel.json`의 `/` 이동(최신 연도 2026)은 바꾸지 않음
- 디자인 원본: 프레이머 `khid2025` (보기 전용). 분석 내용: `work/docs/09_2025_프레이머_디자인분석.md`
- 브레이크포인트는 프레이머 그대로: Phone ~719 / Tablet 720~1439 / Desktop 1440~

## 주소
| 화면 | 주소 | 파일 |
|---|---|---|
| 메인 | `/2025` | `page.tsx` |
| 과목별 작품 목록 | `/2025/projects/<과목>` (`/2025/projects`는 첫 과목으로) | `projects/[cat]/page.tsx` |
| 작품 상세 | `/2025/projects/<과목>/<작품 id>` | `projects/[cat]/[id]/page.tsx` |
| 디자이너 목록 | `/2025/designers/<초성: gn·rbs·o·jch>` (`/2025/designers`는 ㄱ·ㄴ으로) | `designers/[group]/page.tsx` |
| 디자이너 프로필 | `/2025/designers/<초성>/<slug>` | `designers/[group]/[slug]/page.tsx` |

## 지금 상태 (2026-10-28, 브랜치 `2025`)
디자인(틀) + 로고·제목·후원 로고(벡터)까지 넣은 상태. 사진·이미지는 회색 빈칸, 작품·디자이너는 `[샘플]` 가짜 데이터.

## 처음 채울 것 (시각 요소는 전부 새로 정함)
- [x] 색·글꼴·글자 크기·바탕색 — `2025.css` (프레이머 값)
- [ ] 폰트 — 2026-10-29: 로고가 아닌 글자는 전부 Pretendard(무료)로 바꿔 로컬 확인 중 (원본 ITC Avant Garde Gothic·윤고딕 700은 유료). 원본 `2025/fonts-src/`, 데이터 다 넣은 뒤 `python3 scripts/subset-fonts.py 2025`
- [ ] 파비콘 — `icon.svg`(또는 `icon.png`), `apple-icon.png`를 이 폴더에
- [ ] 링크 미리보기 이미지(1200×630) — `public/2025/`, 연결 `layout.tsx`
- [x] 메인 페이지 — `page.tsx`
- [x] 이미지 — 로고(TNM·THE NEXT MOVE·푸터 타이틀·경희대·KHID), 목록 제목 6개((MOVE)S·(PROJECT)S·(TRACE)S / (PLAYER)S·(DESIGNER)S·(THINKER)S), 후원 로고 5개 — 프레이머 복사본에서 Copy SVG로 뽑음 → `public/2025/`
- [ ] 사진·이미지 — 소개 이미지 2장, 단체 사진, 작품 이미지, 참여자 사진: 사용자가 원본을 따로 줌 (프레이머에서 뽑지 않음)
- [ ] 메인 영상 YouTube ID — `_components/home.ts`의 `VIDEO_ID`
- [x] 디자이너 63명 — `_components/designers.ts` (프레이머 프로필 값, 2026-10-29). 프로필 사진만 남음
- [ ] 작품 데이터 — `_components/works.ts`, 과목 교수님·소개 `_components/categories.ts` (`[샘플]`·`[데이터]` 전부 바꾸기)
- [ ] 마지막 점검 — `python3 scripts/check-year.py 2025`

## 프레이머에서 못 읽어 임시로 둔 것 ([추정] 표시)
- 왼쪽 탭 줄 높이·글자 크기, 푸터 안쪽 글자 크기 (상단바 메뉴는 2026-10-28 프레이머 값으로 맞춤)
- 히어로 화살표·로고 움직임, 프로필 맨 위 이미지 넘어가는 속도, 카드 hover 속도 (상단바·후원 로고 hover는 2026-10-28 프레이머 값으로 맞춤)
- 작품 상세 Tablet 배치(지금은 Phone 배치), 프로필의 작품 썸네일 위 글자·hover
- 커스텀 마우스 커서는 2025에 없음 (2026-10-28 확인)

## 다른 연도에서 가져온 기능
가져올 때마다 아래에 적어 두세요. 다음 해에 "이 기능을 그대로 쓸지" 판단하는 근거가 됩니다.

| 기능 | 가져온 연도 | 그대로 / 바꾼 것 |
|---|---|---|
| (없음) | | |

## 이 연도에서 새로 만든 기능
- 바뀌는 제목 `CycleTitle.tsx` — 목록 페이지 제목이 단어별로 머물다 바뀜(작품 2·2.9·2.9초, 디자이너 2·2·2초) (FEATURES.md에 적음)
