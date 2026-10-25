"""[2026 전용 도구] 2026 시안 기준 규칙이라 다른 연도에 그대로 쓰지 말 것.
졸전자·졸준위 프로필 사진 웹용 사본 만들기.

원본(work/data/designers/front·pose, 한글 파일명)을 칸 비율로 잘라 영문 이름 WebP로 저장.
자르는 규칙 — 모든 사진이 같은 느낌으로 보이게:
  - 가로는 가운데.
  - 머리 꼭대기가 칸 위에서 HEAD_TOP_RATIO(칸 높이의 9%)만큼 떨어지게 세로 위치를 맞춤.
    Figma [4] 졸준위 시안의 사진들을 재서 정한 값(대부분 8~11%).
  - 확대는 안 함(사람마다 머리 크기가 달라지지 않게). 원본 위가 모자라면 배경 회색으로 채워 사진을 내림.
같은 값을 DESIGNERS 페이지 사진에도 씀 — 바꾸려면 여기 숫자만.

실행 (site.2026 폴더에서, Pillow 필요):
  python3 scripts/2026/profile-photos.py --kind pose --out public/2026/committee --names 장서영,양성은
  python3 scripts/2026/profile-photos.py --kind pose --out ... --extra 57=../work/지샘\\ 프로필.jpeg  (원본 폴더 밖 임시 사진)
  DESIGNERS 페이지(졸전자만, 목록 정면 640 / 프로필 자유컷 1000):
  python3 scripts/2026/profile-photos.py --kind front --group designer --out public/2026/designers/front
  python3 scripts/2026/profile-photos.py --kind pose --group designer --width 1000 --out public/2026/designers/pose
"""
import argparse
import csv
from pathlib import Path

from PIL import Image

HEAD_TOP_RATIO = 0.09  # 머리 꼭대기 ~ 칸 위 = 칸 높이의 9%
CELL_RATIO = 198.16 / 158.76  # 칸 세로/가로 (Figma 158.76×198.16)
DARK = 90  # 이보다 어두운 픽셀을 머리카락으로 봄(배경은 밝은 회색·흰색)

ROOT = Path(__file__).resolve().parent.parent.parent  # 사이트 폴더 (이 파일은 scripts/2026/ 안)
DATA = ROOT.parent / "work" / "data" / "designers"


def head_top(im: Image.Image) -> int:
    """위에서부터 내려오며 처음으로 어두운 픽셀(머리카락)이 나오는 줄. 원본 좌표."""
    small = im.convert("L")
    scale = 400 / small.width
    small = small.resize((400, round(small.height * scale)))
    px = small.load()
    x0, x1 = 40, 360  # 가장자리 그림자 무시
    for y in range(small.height):
        if sum(1 for x in range(x0, x1) if px[x, y] < DARK) >= 3:
            return round(y / scale)
    return 0


def frame(im: Image.Image, top: int) -> Image.Image:
    """칸 비율 창: 가로는 원본 폭 그대로(가운데), 머리 꼭대기가 창 높이의 HEAD_TOP_RATIO에 오게.
    원본 위쪽이 모자라면 원본 맨 윗줄 색(배경 회색)으로 채워 내림 — Figma 시안도 사진을 살짝 내려 배치함.
    머리가 낮게 찍혀 아래가 모자라면, 창을 살짝 좁혀(확대) 아래 끝을 원본 아래 끝에 맞춤."""
    w, h = im.size
    ch = round(w * CELL_RATIO)
    y = round(top - HEAD_TOP_RATIO * ch)
    if y > 0 and y + ch > h:
        # 머리가 원본에서 낮게 찍혀 위로 올리면 아래가 모자람 → 회색으로 채우지 않고, 창을 가운데 기준으로 살짝 좁혀(확대)
        # 아래 끝이 원본 아래 끝에 딱 맞게 (2026-10-24 이수민 새 사진: 아래 20px가 회색으로 비던 문제)
        ch = round((h - top) / (1 - HEAD_TOP_RATIO))
        cw = round(ch / CELL_RATIO)
        x0 = (w - cw) // 2
        y = h - ch
        return im.crop((x0, y, x0 + cw, h))
    canvas = Image.new("RGB", (w, ch), im.getpixel((w // 2, 0)))
    canvas.paste(im.crop((0, max(0, y), w, min(h, y + ch))), (0, max(0, -y)))
    return canvas


def make(src: Path, dst: Path, width: int) -> None:
    im = Image.open(src).convert("RGB")
    top = head_top(im)
    out = frame(im, top).resize((width, round(width * CELL_RATIO)), Image.LANCZOS)
    out.save(dst, "WEBP", quality=85, method=6)
    print(f"{dst.name}  head {top / im.height:.1%} of original -> {HEAD_TOP_RATIO:.0%}  {dst.stat().st_size // 1024}KB")


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--kind", choices=["front", "pose"], required=True)
    ap.add_argument("--out", required=True)
    ap.add_argument("--names", help="쉼표로 구분한 한글 이름 (없으면 전원)")
    ap.add_argument("--group", choices=["designer", "committee"], help="designers.csv group 열로 거르기")
    ap.add_argument("--width", type=int, default=640)
    ap.add_argument("--extra", action="append", default=[], help="번호=원본경로 (원본 폴더에 아직 없는 사람)")
    a = ap.parse_args()

    rows = list(csv.DictReader(open(DATA / "designers.csv", encoding="utf-8-sig")))
    names = set(a.names.split(",")) if a.names else None
    extra = dict(e.split("=", 1) for e in a.extra)
    out = ROOT / a.out
    out.mkdir(parents=True, exist_ok=True)
    for r in rows:
        if names and r["name"] not in names:
            continue
        if a.group and r["group"] != a.group:
            continue
        web = r[f"{a.kind}_web"]
        if not web:
            continue
        src = Path(extra[r["no"]]) if r["no"] in extra else DATA / a.kind / r[f"{a.kind}_file"]
        if not src.exists():
            print(f"건너뜀(원본 없음): {r['no']} {r['name']}")
            continue
        make(src, out / web, a.width)


main()
