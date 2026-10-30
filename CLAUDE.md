# 작업 규칙 (Claude Code용)

이 저장소는 `/2026`, `/2027`처럼 연도별로 완전히 분리된 사이트들의 모음입니다. 연도마다 앱 폴더(`2026/` …) = Vercel 프로젝트(`khid-grad-2026` …)가 따로이고, 학교 도메인은 입구(`entry/`, 프로젝트 `khid-grad`)가 받아 연도별로 넘겨줍니다. 사람용 설명은 README.md, 기능 목록은 FEATURES.md.

- README.md "공통 규칙" 표에 있는 것만 공통입니다. 그 밖의 것(특히 색·바탕색·글꼴·이미지·아이콘·레이아웃)은 연도 폴더 안에만 두고, `common/`에 넣지 않습니다. 공통 규칙을 바꾸거나 추가하면 README 표도 같이 고칩니다.
- 공통 부품은 `common/`에서만 고치고 `python3 scripts/sync-common.py`로 연도 앱에 복사합니다. 연도 앱의 `src/app/layout.tsx`, `not-found.tsx`, `_common/`은 자동 복사본이라 직접 고치지 않습니다.
- 한 연도를 작업할 때 다른 연도 폴더를 고치거나 import하지 않습니다.
- 연도 앱의 npm·next 명령(dev, build, lint, install)은 그 연도 폴더 안에서 실행합니다. 연도 앱의 `next.config.ts` `assetPrefix: "/YYYY-static"`는 지우지 않습니다.
- 보안 업데이트는 한 연도만 하지 말고 `bash scripts/update-all.sh`로 모든 연도에 적용합니다.
- 새 연도는 `python3 scripts/new-year.py YYYY`로 만듭니다. 이전 연도 폴더를 통째로 복사하지 않습니다.
- 새 연도에서 FEATURES.md의 기능을 쓰려고 하면, 코드를 가져오기 전에 사용자에게 먼저 묻습니다: 그 기능이 쓰인 연도의 동작을 그대로 가져올지, 그리고 표의 "가져올 때 확인할 것"을 항목별로 어떻게 할지. 답을 받은 뒤 새 연도 폴더에 복사해 고치고, 그 연도 README의 "가져온 기능" 표에 적습니다.
- 시각 요소는 이전 연도 값을 기본값으로 쓰지 않습니다. 정해지지 않았으면 추측하지 말고 묻습니다.
- 연도에 새 기능을 만들면 FEATURES.md에 추가합니다.
- 작업을 마치면 `python3 scripts/check-year.py YYYY`로 점검합니다.
- 이 사이트의 Next.js는 최신 버전이라 API·규칙·파일 구조가 예전과 다를 수 있습니다. Next.js 코드를 쓰기 전에 그 연도 폴더의 `node_modules/next/dist/docs/`의 해당 안내를 먼저 읽고, 지원 중단(deprecation) 안내를 따릅니다. (원래 next dev가 만들던 AGENTS.md 내용 — next.config의 `agentRules: false`로 끄고 여기로 옮김)
- 커밋 작성자는 Leesumin(xumm58 noreply)이어야 Vercel(Hobby)이 배포합니다.
