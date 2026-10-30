"""새 연도 사이트 만들기 — [모든 연도 공통 도구]

templates/new-year/의 빈 시작 틀로 그 연도 앱 폴더 <연도>/를 만들고, 학교 도메인에 연결될 준비까지 함.
이전 연도 폴더는 건드리지 않음.
  <연도>/                       ← templates/new-year/ (YYYY를 연도로 바꿔서). 연도 앱 하나 = Vercel 프로젝트 하나
  <연도>/src/app/ 공통 부품      ← common/ 복사 (scripts/sync-common.py)
  <연도>/public/<연도>/fonts/   (빈 폴더: 이미지·영상·폰트 경량본)
  <연도>/fonts-src/             (빈 폴더: 폰트 원본)
  <연도>/scripts/               (빈 폴더: 그 해에만 쓰는 도구)
  entry/vercel.json             ← /<연도> 주소를 새 연도 프로젝트로 넘겨주는 4줄 추가
  .github/dependabot.yml        ← 새 연도 폴더를 보안 알림 목록에 추가
2026 등 이전 연도 폴더를 통째로 복사하지 않는 이유: 그 해의 날짜·색·설정이 모르는 사이에 따라오기 때문(README "새 연도 추가").

실행 (저장소 맨 위 폴더에서):
  python3 scripts/new-year.py 2027
"""
import json
import pathlib
import subprocess
import sys

if len(sys.argv) != 2 or not (sys.argv[1].isdigit() and len(sys.argv[1]) == 4):
    sys.exit("연도를 적어 주세요. 예: python3 scripts/new-year.py 2027")
YEAR = sys.argv[1]
ROOT = pathlib.Path(__file__).resolve().parent.parent
TEMPLATE = ROOT / "templates" / "new-year"
APP = ROOT / YEAR
ZONE = f"https://khid-grad-{YEAR}.vercel.app"  # 새 연도 Vercel 프로젝트 이름 khid-grad-<연도>의 기본 주소

if APP.exists():
    sys.exit(f"이미 있어요: {YEAR}/ — 기존 연도는 덮어쓰지 않습니다.")

# 1) 시작 틀 복사
for src in sorted(TEMPLATE.rglob("*")):
    if src.is_dir():
        continue
    dst = APP / str(src.relative_to(TEMPLATE)).replace("YYYY", YEAR)
    dst.parent.mkdir(parents=True, exist_ok=True)
    dst.write_text(src.read_text(encoding="utf-8").replace("YYYY", YEAR), encoding="utf-8")
    print("만듦", dst.relative_to(ROOT))

for d in (APP / "public" / YEAR / "fonts", APP / "fonts-src", APP / "scripts"):
    d.mkdir(parents=True, exist_ok=True)
    keep = d / ".gitkeep"  # 빈 폴더도 git에 남도록
    if not any(d.iterdir()):
        keep.touch()
    print("만듦", d.relative_to(ROOT))

# 2) 공통 부품 복사
subprocess.run([sys.executable, str(ROOT / "scripts" / "sync-common.py"), YEAR], check=True)

# 3) 입구 연결: /<연도> → 새 연도 프로젝트 (가장 최신 연도로의 / 이동은 바꾸지 않음 — 공개할 때 직접)
entry_path = ROOT / "entry" / "vercel.json"
entry = json.loads(entry_path.read_text(encoding="utf-8"))
entry["rewrites"] += [
    {"source": f"/{YEAR}", "destination": f"{ZONE}/{YEAR}"},
    {"source": f"/{YEAR}/:path*", "destination": f"{ZONE}/{YEAR}/:path*"},
    {"source": f"/{YEAR}-static/:path*", "destination": f"{ZONE}/{YEAR}-static/:path*"},
    {"source": "/_next/image", "has": [{"type": "query", "key": "url", "value": f"/{YEAR}/.*"}], "destination": f"{ZONE}/_next/image"},
]
lines = ",\n".join("    " + json.dumps(r, ensure_ascii=False) for r in entry["rewrites"])
redirects = ",\n".join("    " + json.dumps(r, ensure_ascii=False) for r in entry["redirects"])
head = {k: v for k, v in entry.items() if k not in ("redirects", "rewrites")}
text = json.dumps(head, indent=2, ensure_ascii=False)[:-2]
entry_path.write_text(f'{text},\n  "redirects": [\n{redirects}\n  ],\n  "rewrites": [\n{lines}\n  ]\n}}\n', encoding="utf-8")
print("연결", "entry/vercel.json", f"/{YEAR} → {ZONE}")

# 4) 보안 알림 목록에 추가
dep = ROOT / ".github" / "dependabot.yml"
lines = dep.read_text(encoding="utf-8").splitlines()
last = max(i for i, l in enumerate(lines) if l.strip().startswith('- "/'))
lines.insert(last + 1, f'      - "/{YEAR}"')
dep.write_text("\n".join(lines) + "\n", encoding="utf-8")
print("추가", ".github/dependabot.yml", f"/{YEAR}")

print(f"""
다음:
  1. cd {YEAR} && npm install   (보안을 위해 최신 버전으로: npm install next@latest eslint-config-next@latest react@latest react-dom@latest)
  2. {YEAR}/src/app/{YEAR}/README.md의 체크리스트를 채우고, 끝나면 python3 scripts/check-year.py {YEAR}
  3. Vercel에 새 프로젝트 khid-grad-{YEAR} 만들기 (같은 GitHub 저장소, Root Directory = {YEAR}) — README "새 연도 추가"
  4. 공개할 때 최신 연도로 바꾸려면 entry/vercel.json redirects의 /로 이동을 /{YEAR}로 (지난 연도를 추가하는 거면 그대로)""")
