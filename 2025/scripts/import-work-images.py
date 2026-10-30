"""[2025 전용 도구] 작품 이미지(구글 드라이브 폼 업로드 폴더) → public/2025/projects/<과목>/<작품 id>/ + _components/work-images.ts
원본: 드라이브에서 zip으로 받아 푼 폴더들 (드라이브 파일은 받기만, 고치지 않음)
  <폴더>/[미래공간디자인] … (File responses)/4. …정방형 썸네일…/<파일>   ← 수업별 제출
  <폴더>/프로젝트의 웹판넬 (16_9의 …)/<파일>                            ← 수정 재제출 (수업 폴더 없음 → 파일 이름 앞 "인지디_" 등으로 수업을 정함)
  문항: 4·정방형 → thumb.webp(1200) / 5·가로형 → wide.webp(1920) / 6·웹판넬 → 01.webp, 02.webp …(폭 1920, 높이는 원본 비율)
작품 찾기: 파일 이름(" - 제출자" 포함)에 든 그 수업 팀원 이름으로. 애매하면 "!!"로 알리고 OVERRIDE에 적어 정함
수정 재제출(뒤에 주는 폴더)에 같은 작품·같은 문항이 있으면 그 문항 이미지를 통째로 바꿈 (최종본)
웹판넬 순서: 파일 이름 끝 번호(-1, _2 …), 번호가 같으면 "수정"이 든 것·나중 것

실행 (저장소의 2025 폴더에서):
  python3 scripts/import-work-images.py --dry ../../work/data/2025_projects_src ../../work/data/2025_projects_fix   # 매칭만 확인
  python3 scripts/import-work-images.py ../../work/data/2025_projects_src ../../work/data/2025_projects_fix
  python3 scripts/import-work-images.py --index   # 변환 없이 public/의 파일로 work-images.ts만 다시 만듦
"""
import json, re, sys, unicodedata
from pathlib import Path
from PIL import Image

Image.MAX_IMAGE_PIXELS = None  # 웹판넬은 아주 긺 (예: 6158×32768)

dry = "--dry" in sys.argv
roots = [Path(a) for a in sys.argv[1:] if not a.startswith("--")]
app = Path("src/app/2025/_components")
out_root = Path("public/2025/projects")


def write_index(images):
    rows = []
    for k, v in images.items():
        parts = []
        if v.get("wide"):
            parts.append("wide: true")
        if v.get("panels"):
            parts.append("panels: [" + ", ".join(f'["{n}", {w}, {h}]' for n, w, h in v["panels"]) + "]")
        rows.append(f'  "{k}": {{ {", ".join(parts)} }},')
    (app / "work-images.ts").write_text(
        "// [자동 생성] scripts/import-work-images.py — 직접 고치지 말고 스크립트를 다시 실행\n"
        '// "<과목>/<작품 id>": 정사각형 썸네일(thumb.webp)은 항상, wide = 가로형 썸네일(wide.webp), panels = 웹 판넬 [파일 이름(01.webp …), 폭, 높이] 순서대로\n'
        "export const WORK_IMAGES: Record<string, { wide?: boolean; panels?: [string, number, number][] }> = {\n" + "\n".join(rows) + "\n};\n"
    )
    print(f"작품 {len(images)}개 → work-images.ts")


if "--index" in sys.argv:  # 변환은 건너뛰고 public/에 있는 파일로 목록만 다시 만듦
    from PIL import Image as _I
    idx = {}
    for d in sorted(out_root.glob("*/*")):
        if (d / "thumb.webp").exists():
            e = {}
            if (d / "wide.webp").exists():
                e["wide"] = True
            pn = sorted(f for f in d.glob("[0-9][0-9].webp"))
            if pn:
                e["panels"] = [[f.stem, *_I.open(f).size] for f in pn]
            idx[f"{d.parent.name}/{d.name}"] = e
    order = [f"{m[1]}/{m[0]}" for m in re.findall(r'id: "([^"]+)", cat: "([^"]+)"', (app / "works.ts").read_text())]
    write_index({k: idx[k] for k in order if k in idx})
    sys.exit()

# works.ts에서 작품 목록(과목·id·팀원) 읽기
RAW = re.findall(r'id: "([^"]+)", cat: "([^"]+)", title: "((?:[^"\\]|\\.)*)",(?: card: "(?:[^"\\]|\\.)*",)? members: \[([^\]]*)\]', (app / "works.ts").read_text())
WORKS = [(m[1], m[0], json.loads(f"[{m[3]}]")) for m in RAW]  # (cat, id, members)
TITLES = {(m[1], m[0]): m[2] for m in RAW}

CLASS = [  # 폴더·파일 이름에 든 말 → 과목
    (("미래공간", "미공디"), "futuristic-space"),
    (("산업디자인종합", "산디종", "산종"), "comprehensive-industrial"),
    (("스마트융합", "스융디"), "smart-convergence"),
    (("인공지능", "인지디", "인지능"), "ai-augmented"),
]
KIND = [(("4.", "정방형", "정방향"), "thumb"), (("5.", "가로형"), "wide"), (("6.", "웹판넬", "웹 판넬"), "panel")]

# 파일 이름만으로 정할 수 없을 때 직접 정함: "파일 이름 일부": "과목/작품 id"
OVERRIDE: dict[str, str] = {}


def pick(text, table):
    for keys, v in table:
        if any(k in text for k in keys):
            return v
    return None


def match(name, cat):
    base = name.rsplit(".", 1)[0]
    for k, v in OVERRIDE.items():
        if k in name:
            return v.split("/")
    head = base.rsplit(" - ", 1)[0]  # 제출자 빼고
    cands = [(c, i, ms) for c, i, ms in WORKS if cat is None or c == cat]
    for text in (head, base):  # 팀원 이름이 파일 이름 앞부분에 없으면 제출자 이름까지 봄
        found = {n for c, i, ms in cands for n in ms if n in text}
        if not found:
            continue
        hits = [(c, i) for c, i, ms in cands if found <= set(ms)]
        if len(hits) == 1:
            return hits[0]
        if len(hits) > 1:
            best = max(len(found & set(ms)) for c, i, ms in cands if (c, i) in hits)
            hits = [(c, i) for c, i, ms in cands if (c, i) in hits and len(found & set(ms)) == best and len(ms) == len(found)]
            if len(hits) == 1:
                return hits[0]
    # 팀원 이름이 없으면 작품 제목으로 (수정본은 "…_toléa-수정본"처럼 제목만 쓴 것이 많음). 영문·숫자만 남겨 비교, 가장 긴 제목
    flat = norm(head)
    hits = [(len(norm(TITLES[(c, i)].split(":")[0])), c, i) for c, i, ms in cands if len(norm(TITLES[(c, i)].split(":")[0])) >= 3 and norm(TITLES[(c, i)].split(":")[0]) in flat]
    if hits:
        hits.sort(reverse=True)
        if len(hits) == 1 or hits[0][0] > hits[1][0]:
            return hits[0][1], hits[0][2]
    return None


def norm(s):
    return re.sub(r"[^0-9a-z가-힣]", "", unicodedata.normalize("NFC", s).lower())


def num(f):  # 웹판넬 번호: 파일 이름(제출자 앞) 끝쪽 숫자. 없으면 0
    base = f.name.rsplit(" - ", 1)[0]
    nums = re.findall(r"(\d+)", re.sub(r"16_9|1_1|\d{4,}", "", base))
    return int(nums[-1]) if nums else 0


def newest(fs):  # 같은 자리에 여러 개면 "최종"이 든 것 → 나중에 올린 것
    return max(fs, key=lambda f: ("최종" in f.name, f.stat().st_mtime))


# 모으기: (cat, id, kind) → {번호: 파일}
#   한 폴더 안에서 같은 번호가 여러 개면(다시 올림) newest
#   뒤 폴더(수정 재제출)는 앞 폴더를 덮음: 웹판넬은 양쪽 다 번호가 있으면 같은 번호만 바꾸고, 아니면 통째로 바꿈
picked: dict[tuple, dict] = {}
for root in roots:
    found: dict[tuple, dict] = {}
    for f in sorted(root.rglob("*")):
        if not f.is_file() or f.name.startswith(".") or "__MACOSX" in f.parts:
            continue
        rel = unicodedata.normalize("NFC", str(f.relative_to(root)))
        kind = pick(rel.split("/")[-2] if "/" in rel else rel, KIND) or pick(f.name, KIND)
        cat = pick(rel.split("/")[0], CLASS) if rel.count("/") >= 2 else None
        cat = cat or pick(unicodedata.normalize("NFC", f.name), CLASS)
        hit = match(unicodedata.normalize("NFC", f.name), cat)
        if not kind or not hit:
            print(f"!! 못 정함 ({kind}, {cat}): {rel}")
            continue
        found.setdefault((hit[0], hit[1], kind), {}).setdefault(num(f) if kind == "panel" else 0, []).append(f)
    for k, slots in found.items():
        for n, fs in slots.items():
            if len(fs) > 1:
                print(f"   {k[0]}/{k[1]} {k[2]} {n}번 {len(fs)}개 중 {newest(fs).name}")
        new = {n: newest(fs) for n, fs in slots.items()}
        if k in picked:
            old = picked[k]
            if k[2] == "panel" and 0 not in new and 0 not in old:
                print(f"   수정본: {k[0]}/{k[1]} 웹판넬 {sorted(new)}번 바꿈 (원래 {sorted(old)}번)")
                new = {**old, **new}
            else:
                print(f"   수정본: {k[0]}/{k[1]} {k[2]} 통째로 바꿈 ({len(old)}→{len(new)}개)")
        picked[k] = new


def load(src, width):
    im = Image.open(src).convert("RGB")
    if im.width > width:
        im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
    return im


def webp(src, dst, width):
    load(src, width).save(dst, "WEBP", quality=82, method=6)


SLICE = 8000  # webp는 한 변 16383px까지 → 긴 웹판넬은 위에서부터 8000px씩 잘라 여러 장으로 (화면에서 틈 없이 이어 붙음)


def panel_slices(src, width):
    im = load(src, width)
    n = -(-im.height // SLICE)
    h = -(-im.height // n)  # 고르게 나눔
    return [im.crop((0, y, im.width, min(y + h, im.height))) for y in range(0, im.height, h)]


images = {}
for c, i, ms in WORKS:
    key = f"{c}/{i}"
    th, wd = picked.get((c, i, "thumb"), {}).get(0), picked.get((c, i, "wide"), {}).get(0)
    pn = [f for n, f in sorted(picked.get((c, i, "panel"), {}).items())]
    print(f"{key}: 정방형 {int(bool(th))} 가로형 {int(bool(wd))} 웹판넬 {len(pn)}" + ("" if th else "  ← 정방형 없음"))
    for f in pn:
        print(f"      {f.name}")
    if dry or not th:
        continue
    d = out_root / c / i
    d.mkdir(parents=True, exist_ok=True)
    for old in d.glob("*.webp"):
        old.unlink()
    webp(th, d / "thumb.webp", 1200)
    entry = {}
    if wd:
        webp(wd, d / "wide.webp", 1920)
        entry["wide"] = True
    if pn:
        names = []
        for f in pn:
            for part in panel_slices(f, 1920):
                names.append([f"{len(names) + 1:02d}", part.width, part.height])  # 크기는 화면에서 자리를 미리 잡는 데 씀
                part.save(d / f"{names[-1][0]}.webp", "WEBP", quality=82, method=6)
        entry["panels"] = names
    images[key] = entry

if not dry:
    write_index(images)
