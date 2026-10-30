# 입구 (entry)

`khid.grad.khu.ac.kr` 도메인을 받는 작은 사이트(Vercel 프로젝트 `khid-grad`). 화면은 없고 주소를 나눠 주는 일만 합니다. 프로그램을 설치하지 않으므로 보안 업데이트가 필요 없습니다.

| 파일 | 하는 일 |
|---|---|
| `vercel.json` `redirects` | 주소만 입력하면(`/`) **가장 최신 연도**로 이동. 새 최신 연도를 추가할 때만 바꿈 |
| `vercel.json` `rewrites` | `/2026…` → 2026 프로젝트(`khid-grad-2026.vercel.app`)로 넘겨줌. 연도마다 4줄(페이지 2줄 + 파일 `/YYYY-static` + 이미지 최적화 `/_next/image`) |
| `404.html` | 어느 연도에도 속하지 않는 주소 안내 화면 (`common/not-found.tsx`와 같은 모양) |

새 연도는 `python3 scripts/new-year.py YYYY`가 rewrites 4줄을 자동으로 넣어 줍니다. 이 README는 `.vercelignore`로 배포에서 빠집니다.
