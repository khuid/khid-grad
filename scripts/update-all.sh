#!/bin/bash
# 모든 연도 보안 업데이트 — [모든 연도 공통 도구]
# 연도 앱마다 프로그램(Next.js 등)이 따로 설치되므로, 보안 문제가 생기면 지난 연도까지 전부 올려야 함
# (지난 연도 사이트도 계속 공개돼 있으니까). 연도마다 설치 → 빌드까지 해서 깨지는 연도가 있는지 알려 줌.
#
# 실행 (저장소 맨 위 폴더에서):
#   bash scripts/update-all.sh            # 알려진 보안 문제만 고침(npm audit fix)
#   bash scripts/update-all.sh 16.4.3     # Next.js를 이 버전으로 (보안 공지가 버전을 알려 줄 때)
# 끝나면 바뀐 연도의 화면을 확인하고 커밋·푸시 → 바뀐 연도만 Vercel이 다시 배포함
cd "$(dirname "$0")/.." || exit 1
NEXT_VERSION="$1"
failed=()
for dir in [0-9][0-9][0-9][0-9]; do
  [ -f "$dir/package.json" ] || continue
  echo "■ $dir"
  (
    cd "$dir" || exit 1
    npm install || exit 1
    if [ -n "$NEXT_VERSION" ]; then
      npm install --save-exact "next@$NEXT_VERSION" || exit 1
      npm install --save-dev --save-exact "eslint-config-next@$NEXT_VERSION" || exit 1
    fi
    npm audit fix
    npm run build || exit 1
  ) || failed+=("$dir")
done
if [ ${#failed[@]} -eq 0 ]; then echo "모든 연도 빌드 성공"; else echo "빌드 실패: ${failed[*]} — 그 연도 폴더에서 원인을 확인하세요"; exit 1; fi
