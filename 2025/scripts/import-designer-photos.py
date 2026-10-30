"""[2025 전용 도구] 디자이너 사진 → public/2025/designers/<slug>.webp(목록 카드) · <slug>-pose.webp(프로필 페이지)
프레이머 기준(2026-10-31 확인): 디자이너 목록 카드 = 개인 프로필 사진(정면, 마우스 올리면 살짝 커지기만), 프로필 페이지 왼쪽 큰 사진 = 컨셉 사진
원본(사용자가 줌): 35기_졸준위/2025개인 프로필 보정/<이름>.jpg, 2025컨셉사진 보정/<이름>_2….jpg — 파일 이름 앞의 한글 이름으로 찾음
크기: 카드 폭 600(화면 최대 200의 3배), 컨셉 폭 1100(화면 최대 519의 2배)

실행 (저장소의 2025 폴더에서):
  python3 scripts/import-designer-photos.py "../../2025개인 프로필 보정" "../../2025컨셉사진 보정"
"""
import re, sys, unicodedata
from pathlib import Path
from PIL import Image, ImageOps

card_dir, pose_dir = Path(sys.argv[1]), Path(sys.argv[2])
ts = Path("src/app/2025/_components/designers.ts").read_text()
people = re.findall(r'slug: "([^"]+)",\s+ko: "([^"]+)"', ts)
out = Path("public/2025/designers")
out.mkdir(parents=True, exist_ok=True)


def find(folder, ko):
    hits = [f for f in folder.iterdir() if f.is_file() and re.match(re.escape(ko) + r"(?![가-힣])", unicodedata.normalize("NFC", f.name))]
    return hits[0] if len(hits) == 1 else None


def save(src, dst, width):
    im = ImageOps.exif_transpose(Image.open(src)).convert("RGB")
    if im.width > width:
        im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
    im.save(dst, "WEBP", quality=85, method=6)


for slug, ko in people:
    c, p = find(card_dir, ko), find(pose_dir, ko)
    if not c or not p:
        print(f"!! {ko}: 개인 프로필 {c and c.name}, 컨셉 {p and p.name}")
    if c:
        save(c, out / f"{slug}.webp", 600)
    if p:
        save(p, out / f"{slug}-pose.webp", 1100)
print(f"{len(people)}명 처리")
