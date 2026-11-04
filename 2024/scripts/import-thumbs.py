"""[2024 전용 도구] 작품 카드 썸네일(구글 드라이브 "웹사이트 썸네일 이미지 (가장 중요)" 폴더) → public/2024/projects/<과목>/<작품 id>/thumb.webp + _components/work-thumbs.ts
원본: 드라이브에서 zip으로 받아 푼 폴더 (드라이브 파일은 받기만, 고치지 않음) — work/data/2024_thumbs_src/
파일 이름 "웹사이트_썸네일_<작품 이름> - <제출자>.png" 의 작품 이름으로 작품을 찾음 (아래 MATCH, 한글 이름·줄임말은 직접 적어 둠)
같은 작품에 파일이 둘이면 "수정본"이 든 것을 씀. 변환: 4:3으로 가운데 맞춰 자르고 1200×900 WebP
어느 작품에도 안 맞는 파일은 "!!"로 알림 (2026-11-04: "Frame 30 - 김다은"(DARAM 카드) 하나 — 2024 작품 중에 없어서 안 씀)

실행 (저장소의 2024 폴더에서):
  python3 scripts/import-thumbs.py --dry ../../work/data/2024_thumbs_src   # 매칭만 확인
  python3 scripts/import-thumbs.py ../../work/data/2024_thumbs_src
"""
import sys, unicodedata
from pathlib import Path
from PIL import Image, ImageOps

dry = "--dry" in sys.argv
roots = [Path(a) for a in sys.argv[1:] if not a.startswith("--")]
out_root = Path("public/2024/projects")
index = Path("src/app/2024/_components/work-thumbs.ts")

# 파일 이름에 든 글자(소문자로 비교) → 과목/작품 id (works.ts 순서 번호)
MATCH = {
    "shedy": "ai-augmented/01", "fluvo": "ai-augmented/02", "ojent": "ai-augmented/03", "vipassana": "ai-augmented/04",
    "blom": "ai-augmented/05", "asterroad": "ai-augmented/06", "sniffscape": "ai-augmented/07", "nutrimate": "ai-augmented/08",
    "nexium": "ai-augmented/09", "b.u.d": "ai-augmented/10", "toys for children": "ai-augmented/11", "v.i.b.a": "ai-augmented/12",
    "sculpt": "ai-augmented/13", "루카": "ai-augmented/14", "glin+or": "ai-augmented/15", "비토즈": "ai-augmented/16",
    "geondeogi": "ai-augmented/17", "aiteamcopilotdesk": "ai-augmented/18", "gobi": "ai-augmented/19", "drivai": "ai-augmented/20",
    "제유진 인공지능증강디자인": "ai-augmented/21", "smr-14": "ai-augmented/22", "safekey": "ai-augmented/23", "cuddly": "ai-augmented/24",
    "newcellta": "future-space/01", "louxus": "future-space/02", "미공디_웹_최종 - ‍이수현": "future-space/03", "next nest": "future-space/04",
    "transpot": "future-space/05", "solum": "future-space/06", "나들이장": "future-space/07", "livro": "future-space/08",
    "chronoworld": "future-space/09", "stem": "future-space/10",
    "크로마키프렌즈": "smart-convergence/01", "pop-it": "smart-convergence/02", "mute": "smart-convergence/03", "atmo": "smart-convergence/04",
    "bring": "smart-convergence/05", "nexora": "smart-convergence/06", "virtuoso": "smart-convergence/07", "리필": "smart-convergence/09",
    "crop": "smart-convergence/10", "new eyes for firefighters": "smart-convergence/11", "dribo": "smart-convergence/12",
    "xplova": "smart-convergence/13", "fade": "smart-convergence/14", "담소": "smart-convergence/15", "win -": "smart-convergence/16",
    "path": "smart-convergence/18",
    "parkinpark": "industrial/01", "hi,by": "industrial/02", "another choice for women": "industrial/03", "물결이 머무는 섬": "industrial/04",
    "노들러오세요": "industrial/05", "wave of island": "industrial/07", "오티움": "industrial/08", "reffuse": "industrial/09", "clea": "industrial/10",
    "웹사이트 썸네일(수정본) - 유채연": "industrial/10",  # 이름에 작품 이름이 없지만 그림이 CLEA (수정본)
}


def key_of(name: str):
    n = unicodedata.normalize("NFC", name).lower()
    hits = {v for k, v in MATCH.items() if unicodedata.normalize("NFC", k).lower() in n}
    return hits.pop() if len(hits) == 1 else (None if not hits else "!!" + ",".join(sorted(hits)))


chosen: dict[str, Path] = {}
for root in roots:
    for f in sorted(p for p in root.rglob("*") if p.suffix.lower() in (".png", ".jpg", ".jpeg") and not p.name.startswith(".")):
        k = key_of(f.name)
        if not k or k.startswith("!!"):
            print("!!", f.name, k or "맞는 작품 없음")
            continue
        old = chosen.get(k)
        if old and "수정본" in unicodedata.normalize("NFC", old.name) and "수정본" not in unicodedata.normalize("NFC", f.name):
            print("  (안 씀, 수정본 있음)", f.name)
            continue
        if old:
            print("  (안 씀, 수정본으로 바꿈)", old.name)
        chosen[k] = f

for k, f in sorted(chosen.items()):
    print(k, "←", f.name)
    if dry:
        continue
    out = out_root / k / "thumb.webp"
    out.parent.mkdir(parents=True, exist_ok=True)
    im = ImageOps.fit(ImageOps.exif_transpose(Image.open(f)).convert("RGB"), (1200, 900), Image.LANCZOS)
    im.save(out, "WEBP", quality=85, method=6)

print(f"{len(chosen)}개")
if not dry:
    keys = sorted(str(p.parent.relative_to(out_root)) for p in out_root.rglob("thumb.webp"))
    index.write_text(
        "// 자동 생성 — scripts/import-thumbs.py. 직접 고치지 말 것\n"
        "// 카드 썸네일(4:3, 1200×900)이 있는 작품: \"<과목>/<작품 id>\" → public/2024/projects/<과목>/<작품 id>/thumb.webp\n"
        "export const WORK_THUMBS = new Set<string>([\n" + "".join(f'  "{k}",\n' for k in keys) + "]);\n",
        encoding="utf-8",
    )
    print("만듦", index)
