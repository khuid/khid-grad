"""[2026 전용 도구] 작품 구글폼 업로드 파일 → public/2026/projects/<수업>/<작품 slug>/
원본은 work/data/form-uploads/<수업>/<작품 slug>/ 에 두기 (파일명 앞 4- 썸네일, 5- 16:9 이미지, 6- 영상).
  썸네일 → thumb.webp (가로 1080)
  이미지 → NN.webp (가로 1920), 영상 mp4 → NN.mp4 그대로 복사
  NN은 원본 파일명의 "_01", "_02" … 번호 (영상도 이 번호 순서대로 이미지 사이에 들어감)
규격(4:5, 16:9, 3~7장, 영상 15초·10MB)과 다르면 고치지 않고 "!!"로 알림 → 사용자에게 확인.
끝나면 projects.ts의 FILES에 붙일 줄을 출력.

실행 (site.2026 폴더에서):
  python3 scripts/2026/import-media.py ../work/data/form-uploads
"""
import re, shutil, sys
from pathlib import Path
from PIL import Image

src_root = Path(sys.argv[1])
dst_root = Path("public/2026/projects")


def webp(src: Path, dst: Path, width: int, ratio: float, label: str):
    im = Image.open(src).convert("RGB")
    if abs(im.width / im.height - ratio) > 0.01:
        print(f"!! {label}: 비율 {im.width}×{im.height}")
    if im.width > width:
        im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
    im.save(dst, "WEBP", quality=85, method=6)


for work in sorted(p for p in src_root.glob("*/*") if p.is_dir()):
    cls, slug = work.parent.name, work.name
    out = dst_root / cls / slug
    out.mkdir(parents=True, exist_ok=True)
    items = []
    for f in sorted(work.iterdir()):
        kind = f.name[:1]
        if kind == "4":
            webp(f, out / "thumb.webp", 1080, 4 / 5, f"{cls}/{slug} 썸네일")
            continue
        if kind not in "56":
            continue
        m = re.search(r"_(\d+)\D*\.\w+$", f.name)
        if not m:
            print(f"!! {cls}/{slug}: 번호 없는 파일 {f.name}")
            continue
        nn = f"{int(m.group(1)):02d}"
        if f.suffix.lower() == ".mp4":
            if f.stat().st_size > 10 * 1024 * 1024:
                print(f"!! {cls}/{slug}: 영상 10MB 넘음 {f.name}")
            shutil.copyfile(f, out / f"{nn}.mp4")
            items.append(f"{nn}.mp4")
        else:
            webp(f, out / f"{nn}.webp", 1920, 16 / 9, f"{cls}/{slug} {f.name}")
            items.append(nn)
    items.sort()
    if len({i[:2] for i in items}) != len(items):
        print(f"!! {cls}/{slug}: 번호가 겹침 {items}")
    if not 3 <= sum(1 for i in items if not i.endswith(".mp4")) <= 7:
        print(f"!! {cls}/{slug}: 이미지 {len(items)}개")
    print(f'  "{cls}/{slug}": {items},'.replace("'", '"'))
