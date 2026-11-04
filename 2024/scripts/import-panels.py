"""[2024 전용 도구] 작품 상세 판넬 이미지(구글폼 "2024 졸업전시회 웹사이트 2차 파일 제출" › "작품 세부 내용 이미지 (필수)" 폴더)
→ public/2024/projects/<과목>/<작품 id>/01.webp, 02.webp … + _components/work-panels.ts
원본: 드라이브에서 폴더를 zip으로 받아 푼 것 (드라이브·폼은 받기만, 고치지 않음)
  work/data/2024_panels_src/작품 세부 내용 이미지 (필수) (File responses)/   ← 받은 그대로 (학생이 올린 zip·png)
  work/data/2024_panels_unz/<학생 zip 이름>/                                  ← 그 안의 zip을 하나씩 푼 것
파일 이름에 작품 제목이 없어서 "과목 + 팀원/제출자"로 작품을 정함 (아래 MAP, 2026-11-04 정리). 순서 = 파일 이름 끝 번호
변환: 폭 1920 이하로 줄인 WebP (높이는 원본 비율)
제출이 없는 작품은 그대로 빈칸 (아임웹 판넬 비율). 화면 배치(영상 자리 유지)는 works.ts가 work-panels.ts를 보고 정함

실행 (저장소의 2024 폴더에서):
  python3 scripts/import-panels.py --dry   # 매칭·개수만 확인
  python3 scripts/import-panels.py
"""
import re, sys, unicodedata
from pathlib import Path
from PIL import Image, ImageOps

Image.MAX_IMAGE_PIXELS = None
dry = "--dry" in sys.argv
DATA = Path("../../work/data")
SRC = DATA / "2024_panels_src" / "작품 세부 내용 이미지 (필수) (File responses)"
UNZ = DATA / "2024_panels_unz"
out_root = Path("public/2024/projects")
index = Path("src/app/2024/_components/work-panels.ts")

# 과목/작품 id ← [(폴더, 파일 이름에 들어 있어야 할 글자)] — 폴더 이름은 앞부분만 적어도 됨
MAP = {
    "ai-augmented/02": [(UNZ, "웹사이트_인공지능증강디자인_유채연_1")],  # FLUVO
    "ai-augmented/04": [(UNZ, "웹사이트_인공지능증강디자인_신동주_1")],  # VIPASSANA
    "ai-augmented/05": [(UNZ, "웹사이트_인공지능디자인_김예은, 김태완, 이수현_")],  # BLOM (1~4 따로 올림)
    "ai-augmented/08": [(UNZ, "웹사이트_인공지능증강디자인_윤지민_1")],  # NutriMate (두 번 올림, 같은 파일)
    "ai-augmented/10": [(UNZ, "웹사이트_인증디_김택림_1")],  # B.U.D
    "ai-augmented/11": [(UNZ, "[웹사이트_인공지능증강디자인_김나우_1]")],  # TOYS FOR CHILDREN …
    "ai-augmented/12": [(UNZ, "웹사이트_인공지능증강디자인2_우민국")],  # V.I.B.A
    "ai-augmented/13": [(UNZ, "웹사이트_인공지능증강디자인_권의환")],  # Sculpt
    "ai-augmented/15": [(UNZ, "웹사이트_인공지능증강디자인_이하민_")],  # Glintor
    "ai-augmented/16": [(UNZ, "웹사이트_인공지능증강디자인_김채연")],  # 비토즈
    "ai-augmented/18": [(UNZ, "(수정)웹사이트_인증디_김수현_1")],  # AI Team Copilot Desk
    "ai-augmented/19": [(SRC, "웹사이트_인공지능증강디자인_전성식_")],  # GOBI
    "ai-augmented/20": [(UNZ, "웹사이트_인공지능증강디자인_정성백")],  # TOYOTA DRIVAI
    "ai-augmented/22": [(UNZ, "웹사이트_인공지능증강디자인_박해준")],  # SMR-14
    "ai-augmented/23": [(UNZ, "웹사이트_인공지능증강디자인_안영은이은서")],  # Safekey
    "ai-augmented/24": [(UNZ, "웹사이트_인공지능디자인_여이현_1")],  # CUDDLY — 2026-11-04: 올라온 파일이 비어 있음(0바이트) → 빈칸 그대로
    "future-space/02": [(UNZ, "웹사이트_미공디_김택림_1")],  # LOUXUS
    "future-space/03": [(UNZ, "웹사이트_미래공간디자인_김태완, 김예은, 이수현_")],  # ARETI
    "future-space/04": [(UNZ, "웹사이트_미래공간디자인_주은혁")],  # NEXT NEST
    "future-space/05": [(UNZ, "웹사이트_미래공간디자인_이서영, 윤지민_1")],  # TRANSPOT
    "future-space/06": [(UNZ, "오현호_웹사이트2차파일제출_최종", "웹사이트_미래공간디자인_오현호_")],  # SOLUM
    "future-space/08": [(UNZ, "웹사이트_미래공간디자인_김수현")],  # LIVRO
    "future-space/09": [(SRC, "웹사이트_미래공간디자인_박서현_", ".png")],  # CHRONOWORLD (jpg·png 둘 다 올림 → png)
    "future-space/10": [(UNZ, "웹사이트_미래공간디자인_우태균")],  # STEM
    "smart-convergence/01": [(UNZ, "(재제출) 웹사이트_스마트융합디자인_김채연")],  # 크로마키프렌즈
    "smart-convergence/03": [(UNZ, "웹사이트_스마트융합디자인_여이현_1")],  # MU:TE
    "smart-convergence/04": [(UNZ, "웹사이트_스마트융합디자인_이하민장효린_")],  # ATMO (1~5 따로 올림)
    "smart-convergence/05": [(SRC, "웹사이트_스마트융합디자인_전성식_")],  # BRING
    "smart-convergence/07": [(UNZ, "웹사이트_스마트융합디자인_권의환")],  # Virtuoso
    "smart-convergence/09": [(UNZ, "웹사이트_스마트융합디자인_김태완, 김예은, 이수현_")],  # REFEEL
    "smart-convergence/11": [(UNZ, "[웹사이트_스마트융합디자인_김나우_1]")],  # New Eyes For Firefighters
    "smart-convergence/12": [(UNZ, "웹사이트_스융디_김택림우민국_1")],  # Dribo ("스융디_김택림_1"도 같은 파일)
    "smart-convergence/14": [(UNZ, "웹사이트_스마트융합디자인_신동주_")],  # FADE
    "smart-convergence/15": [(UNZ, "웹사이트_스마트융합디자인_우태균")],  # 談笑
    "smart-convergence/16": [(UNZ, "오현호_웹사이트2차파일제출_최종", "웹사이트_스마트융합디자인_오현호_")],  # WIN
    "smart-convergence/18": [(UNZ, "웹사이트_스마트융합디자인_정성백")],  # CHEVROLET PATH
    "industrial/01": [(SRC, "웹사이트_산디종_김수현_")],  # Park In' Park
    "industrial/02": [(UNZ, "웹사이트_산업디자인종합설계_우태균")],  # HI, BY
    "industrial/03": [(UNZ, "[웹사이트_산업디자인종합설계_김나우_1]")],  # Another Choice For Women
    "industrial/05": [(UNZ, "아카이브 - khid G.E")],  # 노들러 오세요 (안의 파일 = 산업디자인종합설계_김채연_1~28)
    "industrial/10": [(UNZ, "웹사이트_산디종_안영은")],  # CLEA
}
IMG = {".png", ".jpg", ".jpeg", ".gif", ".webp"}
nfc = lambda s: unicodedata.normalize("NFC", s)


def files_for(rules):
    found = []
    for rule in rules:
        base, prefix, *rest = rule
        for p in base.rglob("*"):
            if "__MACOSX" in p.parts or p.name.startswith(".") or p.suffix.lower() not in IMG or not p.is_file():
                continue
            rel = nfc(str(p.relative_to(base)))
            top = rel.split("/")[0]
            if base == SRC:
                ok = nfc(p.name).startswith(nfc(prefix)) and (not rest or p.suffix.lower() == rest[0])
            elif rest:  # (폴더, 파일 이름 앞부분)
                ok = top.startswith(nfc(prefix)) and nfc(p.name).startswith(nfc(rest[0]))
            else:
                ok = top.startswith(nfc(prefix))
            if ok and p.stat().st_size == 0:
                print("  !! 빈 파일(0바이트)이라 뺌:", rel)
            elif ok:
                found.append(p)
    # 순서: 파일 이름(없으면 폴더 이름) 끝 번호
    def num(p):
        for s in (p.stem, p.parent.name):
            m = re.findall(r"(\d+)", re.sub(r"\.png$", "", nfc(s)).split(" - ")[0])
            if m:
                return int(m[-1])
        return 0
    return sorted(found, key=lambda p: (num(p), nfc(p.name)))


result = {}
for key, rules in MAP.items():
    fs = files_for(rules)
    print(f"{key}: {len(fs)}개", "" if fs else "!! 없음")
    if not fs:
        continue
    sizes = []
    for i, f in enumerate(fs, 1):
        im = ImageOps.exif_transpose(Image.open(f)).convert("RGB")
        if im.width > 1920:
            im = im.resize((1920, round(im.height * 1920 / im.width)), Image.LANCZOS)
        sizes.append((im.width, im.height))
        if not dry:
            out = out_root / key / f"{i:02d}.webp"
            out.parent.mkdir(parents=True, exist_ok=True)
            im.save(out, "WEBP", quality=85, method=6)
    result[key] = sizes

if not dry:
    rows = "".join(f'  "{k}": [{", ".join(f"[{w}, {h}]" for w, h in v)}],\n' for k, v in sorted(result.items()))
    index.write_text(
        "// 자동 생성 — scripts/import-panels.py. 직접 고치지 말 것\n"
        "// 상세 판넬 이미지가 있는 작품: \"<과목>/<작품 id>\" → [가로, 세로] 목록 (public/2024/projects/<과목>/<작품 id>/01.webp, 02.webp … 순서)\n"
        "export const WORK_PANELS: Record<string, [number, number][]> = {\n" + rows + "};\n",
        encoding="utf-8",
    )
    print("만듦", index)
print(f"{len(result)}개 작품")
