"""연도 사이트 점검 — [모든 연도 공통 도구]

그 연도 폴더에서 아래를 찾아 알려 줌(고치지는 않음):
  1. 아직 채우지 않은 "[정하기]" 표시
  2. 다른 연도 숫자(예: 2027 폴더 안의 "2026") — 이전 연도에서 가져온 코드에 그 해 날짜·주소가 남았을 수 있음
  3. 빠진 파일: 파비콘, 링크 미리보기 이미지, 연도 css
  4. 다른 연도 폴더를 불러오는 코드(import)
2·4는 일부러 남긴 것일 수도 있으니(예: "2026년부터 시작된 전시" 문구) 하나씩 보고 판단.

실행 (사이트 폴더에서):
  python3 scripts/check-year.py 2027
"""
import pathlib
import re
import sys

if len(sys.argv) != 2 or not sys.argv[1].isdigit():
    sys.exit("연도를 적어 주세요. 예: python3 scripts/check-year.py 2027")
YEAR = sys.argv[1]
ROOT = pathlib.Path(__file__).resolve().parent.parent
APP = ROOT / "src" / "app" / YEAR
if not APP.is_dir():
    sys.exit(f"폴더가 없어요: src/app/{YEAR}")

TEXT = (".ts", ".tsx", ".css", ".json", ".md")
problems = 0


def report(title, items):
    global problems
    print(f"\n■ {title}: {len(items) or '없음'}")
    for i in items:
        print("  ", i)
    problems += len(items)


files = [f for f in APP.rglob("*") if f.suffix in TEXT and f.name != "README.md"]
todo, years, imports = [], [], []
for f in files:
    for n, line in enumerate(f.read_text(encoding="utf-8").splitlines(), 1):
        where = f"{f.relative_to(ROOT)}:{n}  {line.strip()[:90]}"
        if "[정하기]" in line:
            todo.append(where)
        if any(y != YEAR for y in re.findall(r"(?<!\d)20\d\d(?!\d)", line)):
            years.append(where)
        if re.search(r"""from\s+["'][^"']*/(?:app/)?20\d\d/""", line) and f"/{YEAR}/" not in line:
            imports.append(where)

report("아직 채우지 않은 [정하기]", todo)
report(f"{YEAR}이 아닌 연도 숫자", years)
report("다른 연도 폴더를 불러오는 코드", imports)

missing = []
if not list(APP.glob("icon*")):
    missing.append(f"파비콘: src/app/{YEAR}/icon.svg (또는 icon.png)")
if not (APP / "apple-icon.png").exists():
    missing.append(f"홈 화면 아이콘: src/app/{YEAR}/apple-icon.png (180×180)")
if not (APP / f"{YEAR}.css").exists():
    missing.append(f"연도 스타일: src/app/{YEAR}/{YEAR}.css")
og = [p for p in (ROOT / "public" / YEAR).glob("og*") if p.suffix in (".jpg", ".png")]
if not og:
    missing.append(f"링크 미리보기 이미지: public/{YEAR}/og….jpg (1200×630)")
report("빠진 파일", missing)

print("\n문제 없음" if not problems else f"\n확인할 것 {problems}개")
