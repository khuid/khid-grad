"""[2024 전용 도구] 구글폼으로 상세 이미지가 안 들어온 작품 11개 → 아임웹 상세 페이지에 올라가 있던 판넬 이미지를 받아 씀 (사용자 결정 2026-11-05)
→ public/2024/projects/<과목>/<작품 id>/01.webp, 02.webp … + _components/work-panels-imweb.ts
폼으로 받은 작품(scripts/import-panels.py → work-panels.ts)은 건드리지 않음. works.ts는 work-panels.ts를 먼저 보고, 없으면 이 파일을 봄
아래 IMWEB = 아임웹 작품 페이지(관리자 로그인 상태로만 보임)의 이미지 주소를 위에서부터 차례로 적은 것 (2026-11-05)
  LUCA /196 · GEONDEOGI /199 · CUDDLY /206 · NADEUL-E JANG /213 · POP-IT /218 · Nexora /222 · CROP /226
  물결이 머무는 섬 /238 · Wave of Island /241 · Otium /242 · REFFUSE /243
원본(받은 그대로)은 work/data/2024_imweb_panels/<과목>_<id>/ 에 저장. 변환: 폭 1920 이하 WebP

실행 (저장소의 2024 폴더에서):
  python3 scripts/import-imweb-panels.py
"""
import urllib.request
from pathlib import Path
from PIL import Image, ImageOps

Image.MAX_IMAGE_PIXELS = None
CDN = "https://cdn.imweb.me/thumbnail/"
RAW = Path("../../work/data/2024_imweb_panels")
out_root = Path("public/2024/projects")
index = Path("src/app/2024/_components/work-panels-imweb.ts")

IMWEB = {
    "ai-augmented/14": "20241204/1e4b5fc85ae04.png,20241204/98c518917773e.png,20241204/a339294bf630b.png",  # LUCA
    "ai-augmented/17": "20241204/7ba3f74f926fc.png,20241204/50ff646012c0e.png,20241204/8398c385c5b2f.png,20241204/e564d79f7a9de.png,20241204/9c1c80e9e1e48.png",  # GEONDEOGI
    "ai-augmented/24": "20241121/b8f686b1f37dc.png",  # CUDDLY (폼 파일은 0바이트였음)
    "future-space/07": "20241204/aeda52d62d9c7.png,20241204/e9a96aa50c92c.png,20241204/94347851648c3.png,20241204/f23df216e5cfa.png,20241204/0ee787b0abf0c.png",  # NADEUL-E JANG
    "smart-convergence/02": "20241204/54cff21c0e46c.png,20241204/21ab6bd9a5199.png,20241204/2554c0e993943.png,20241204/91f1b8cdf201c.png",  # POP-IT
    "smart-convergence/06": "20241204/28a8b67a77622.png,20241204/c502f7b7f75c5.png,20241204/2b1e45de11f50.png,20241204/8eac8c8b2e770.png,20241204/0ccf91784b921.png,20241204/2cf19af1eff17.png,20241204/6b56846729c65.png,20241204/3f7f14a53207f.png,20241204/221a3656fd2c3.png,20241204/13db69dd28b3f.png,20241204/d0338af2d6757.png,20241204/cc0eeafa86d39.png,20241204/3203844f02ffa.png",  # Nexora
    "smart-convergence/10": "20241204/72d60c5c14206.png,20241204/e27f18037b11a.png,20241204/eeff52d6c2fd8.png,20241204/dcaea792049c5.png,20241204/740692fc373d5.png,20241204/abb24890e9175.png,20241204/e0c8fb9e5e64c.png,20241204/5a05762339f49.png,20241204/2f80180451e02.png,20241204/b1b251acc0c37.png,20241204/8b5bd31b45993.png,20241204/1ea5bc4688141.png,20241204/2d9f774767a4f.png,20241204/590d2eecb71a0.png",  # CROP
    "industrial/04": "20241204/6db187c85f590.png,20241204/c5c20babfa391.png",  # 물결이 머무는 섬, 노들서가
    "industrial/07": "20241126/110c92e02d4ca.png,20241126/0c92c6cc6ba49.png,20241126/d5d592a62aee0.png,20241126/4f89a08bd5d9d.png,20241126/262dd0c246c5e.png,20241126/82adca9af127c.png,20241126/6151232433e13.png,20241126/43cf01bf051dd.png,20241126/a6dc59a3e92cc.png,20241126/989be924fb554.png",  # Wave of Island
    "industrial/08": "20241204/2ec4450e4901b.png,20241204/e301eeb264979.png,20241204/c550bd7c3d0c6.png,20241204/b29e2ae762f85.png,20241204/5cef4a71f60ec.png,20241204/7b2856290d4e3.png,20241204/fb491627adc02.png,20241204/c5c75b58d3181.png,20241204/2b01667bbe22b.png,20241204/141aae68667a8.png",  # Otium
    "industrial/09": "20241204/8df56ca63a653.png,20241204/0a39cc95f2812.png,20241204/960fe30b28544.png,20241204/7ae3db132f00f.png,20241204/37f5e3dcf86ca.png,20241204/fcf48940b504b.png",  # REFFUSE
}

result = {}
for key, paths in IMWEB.items():
    raw_dir = RAW / key.replace("/", "_")
    raw_dir.mkdir(parents=True, exist_ok=True)
    sizes = []
    for i, p in enumerate(paths.split(","), 1):
        raw = raw_dir / f"{i:02d}{Path(p).suffix}"
        if not raw.exists():
            urllib.request.urlretrieve(CDN + p, raw)
        im = ImageOps.exif_transpose(Image.open(raw)).convert("RGB")
        if im.width > 1920:
            im = im.resize((1920, round(im.height * 1920 / im.width)), Image.LANCZOS)
        out = out_root / key / f"{i:02d}.webp"
        out.parent.mkdir(parents=True, exist_ok=True)
        im.save(out, "WEBP", quality=85, method=6)
        sizes.append(im.size)
    result[key] = sizes
    print(key, len(sizes), "장")

rows = "".join(f'  "{k}": [{", ".join(f"[{w}, {h}]" for w, h in v)}],\n' for k, v in sorted(result.items()))
index.write_text(
    "// 자동 생성 — scripts/import-imweb-panels.py. 직접 고치지 말 것\n"
    "// 폼 제출이 없어 아임웹에서 받은 상세 판넬: \"<과목>/<작품 id>\" → [가로, 세로] 목록 (public/2024/projects/<과목>/<작품 id>/01.webp … 순서)\n"
    "export const WORK_PANELS_IMWEB: Record<string, [number, number][]> = {\n" + rows + "};\n",
    encoding="utf-8",
)
print("만듦", index)
