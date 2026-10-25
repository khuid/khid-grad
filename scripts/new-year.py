"""새 연도 사이트 만들기 — [모든 연도 공통 도구]

templates/new-year/의 빈 시작 틀을 복사해 그 연도 폴더들을 만듦. 이전 연도 폴더는 건드리지 않음.
  src/app/<연도>/        ← templates/new-year/app/ (YYYY를 연도로 바꿔서)
  public/<연도>/fonts/   (빈 폴더: 이미지·영상·폰트 경량본)
  fonts-src/<연도>/      (빈 폴더: 폰트 원본)
  scripts/<연도>/        (빈 폴더: 그 해에만 쓰는 도구)
2026 등 이전 연도 폴더를 통째로 복사하지 않는 이유: 그 해의 날짜·색·설정이 모르는 사이에 따라오기 때문(README "새 연도 추가").

실행 (사이트 폴더에서):
  python3 scripts/new-year.py 2027
"""
import pathlib
import sys

if len(sys.argv) != 2 or not (sys.argv[1].isdigit() and len(sys.argv[1]) == 4):
    sys.exit("연도를 적어 주세요. 예: python3 scripts/new-year.py 2027")
YEAR = sys.argv[1]
ROOT = pathlib.Path(__file__).resolve().parent.parent
TEMPLATE = ROOT / "templates" / "new-year" / "app"
APP = ROOT / "src" / "app" / YEAR

if APP.exists():
    sys.exit(f"이미 있어요: {APP.relative_to(ROOT)} — 기존 연도는 덮어쓰지 않습니다.")

for src in sorted(TEMPLATE.rglob("*")):
    if src.is_dir():
        continue
    dst = APP / str(src.relative_to(TEMPLATE)).replace("YYYY", YEAR)
    dst.parent.mkdir(parents=True, exist_ok=True)
    dst.write_text(src.read_text(encoding="utf-8").replace("YYYY", YEAR), encoding="utf-8")
    print("만듦", dst.relative_to(ROOT))

for d in (ROOT / "public" / YEAR / "fonts", ROOT / "fonts-src" / YEAR, ROOT / "scripts" / YEAR):
    d.mkdir(parents=True, exist_ok=True)
    keep = d / ".gitkeep"  # 빈 폴더도 git에 남도록
    if not any(d.iterdir()):
        keep.touch()
    print("만듦", d.relative_to(ROOT))

print(f"\n다음: src/app/{YEAR}/README.md의 체크리스트를 채우고, 끝나면 python3 scripts/check-year.py {YEAR}")
print(f"최신 연도로 바꿀 때만 src/app/page.tsx의 이동 경로를 /{YEAR}로 (지난 연도를 추가하는 거면 그대로)")
