"""웹폰트 경량화(서브셋) — [모든 연도 공통 도구] 단, 한 번에 한 연도만 다룸.

연도마다 쓰는 폰트가 다를 수 있으므로 폰트는 연도별로 따로 둠:
  원본(글자 전체)  <연도>/fonts-src/            (.woff2 · .ttf · .otf)
  경량본(실제 사용) <연도>/public/<연도>/fonts/  ← 그 연도 layout.tsx가 불러오는 파일
남기는 글자 = 기본 세트(영문·숫자·기호 + 자주 쓰는 한글 2,350자 KS X 1001)
            + 그 연도 소스(<연도>/src/app/<연도>/, <연도>/public/<연도>/의 json)에 실제로 들어 있는 글자 전부.
→ 디자이너 이름·작품명처럼 기본 세트에 없는 글자가 데이터로 들어와도,
  데이터를 다 넣은 뒤 이 스크립트를 한 번 다시 돌리면 그 글자까지 자동으로 포함됨.
  다른 연도의 폰트 파일은 건드리지 않음.

실행 (저장소 맨 위 폴더에서, 연도를 꼭 적기):
  pip install fonttools brotli   # 처음 한 번
  python3 scripts/subset-fonts.py 2026
"""
import pathlib
import sys

from fontTools import subset
from fontTools.ttLib import TTFont

if len(sys.argv) != 2 or not sys.argv[1].isdigit():
    sys.exit("연도를 적어 주세요. 예: python3 scripts/subset-fonts.py 2026")
YEAR = sys.argv[1]
ROOT = pathlib.Path(__file__).resolve().parent.parent
APP = ROOT / YEAR  # 그 연도 앱 폴더
SRC = APP / "fonts-src"
OUT = APP / "public" / YEAR / "fonts"
# 글자를 모을 그 연도 소스 (코드·문구·데이터)
SCAN = [(APP / "src" / "app" / YEAR, ("*.ts", "*.tsx", "*.css", "*.json", "*.md")), (APP / "public" / YEAR, ("*.json",))]
if not SRC.is_dir():
    sys.exit(f"원본 폰트 폴더가 없어요: {SRC}")

base = set(chr(c) for c in range(0x20, 0x7F))  # 영문·숫자·기본 기호
base |= set(chr(c) for c in range(0xA0, 0x100))  # 라틴 보충(·, ©, ° 등)
base |= set("‘’“”…–—•→←↑↓↗↘↙↖〈〉《》「」『』【】※★☆○●◆◇□■△▲▽▼♡♥·℃㎡")
base |= set(chr(c) for c in range(0x3131, 0x3164))  # 한글 자모 ㄱ~ㅣ
# 자주 쓰는 한글 2,350자 = EUC-KR(KS X 1001)로 표현되는 완성형 한글
for c in range(0xAC00, 0xD7A4):
    try:
        # 파이썬 euc_kr은 나머지 한글도 8바이트 조합형으로 표현해 주므로 2바이트(KS X 1001)인 것만
        if len(chr(c).encode("euc_kr")) == 2:
            base.add(chr(c))
    except UnicodeEncodeError:
        pass

used = set()
for folder, patterns in SCAN:
    for pattern in patterns:
        for f in folder.rglob(pattern):
            used |= set(f.read_text(encoding="utf-8", errors="ignore"))
used = {ch for ch in used if ord(ch) >= 0x20}
extra = sorted(ch for ch in used - base if ord(ch) > 0x7F)
chars = base | used

opts = subset.Options()
opts.flavor = "woff2"
opts.layout_features = ["*"]  # 커닝 등 글꼴 기능 유지
opts.name_IDs = ["*"]
opts.notdef_outline = True
opts.hinting = False  # 힌팅 정보 제거(화면 표시엔 거의 영향 없음, 용량 큼)

OUT.mkdir(parents=True, exist_ok=True)
for src in sorted(p for p in SRC.iterdir() if p.suffix.lower() in (".woff2", ".ttf", ".otf")):
    font = TTFont(src)
    sub = subset.Subsetter(opts)
    sub.populate(text="".join(chars))
    sub.subset(font)
    dst = OUT / (src.stem + ".woff2")
    font.flavor = "woff2"
    font.save(dst)
    print(f"{src.name}: {src.stat().st_size // 1024}KB -> {dst.stat().st_size // 1024}KB")

if extra:
    print(f"기본 세트 밖 글자 {len(extra)}개도 포함: {''.join(extra)}")
