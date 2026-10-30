"""공통 부품 복사 — [모든 연도 공통 도구]

common/ 의 공통 부품을 각 연도 앱으로 복사함. 연도마다 Vercel 프로젝트가 따로라
연도 앱은 자기 폴더 안의 파일만 쓸 수 있어서, 공통 부품도 각 연도 폴더 안에 복사본으로 둠.
  common/layout.tsx     → <연도>/src/app/layout.tsx      (가장 바깥 틀)
  common/not-found.tsx  → <연도>/src/app/not-found.tsx   (그 연도 안의 없는 주소, 예: /2026/zzz)
  common/_common/*      → <연도>/src/app/_common/*       (튕김 방지·이미지 저장 방지·방문자 기록)
복사본은 직접 고치지 말 것 — common/에서 고친 뒤 이 스크립트를 돌리면 모든 연도가 같이 바뀜.
그다음 연도마다 빌드해서 확인(scripts/update-all.sh가 빌드까지 해 줌). 복사본이 원본과 다른지는 check-year.py가 알려 줌.

실행 (저장소 맨 위 폴더에서):
  python3 scripts/sync-common.py        # 모든 연도
  python3 scripts/sync-common.py 2027   # 한 연도만
"""
import pathlib
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
COMMON = ROOT / "common"
MARK = "자동 복사본 — 고치지 말고 저장소의 common/에서 고친 뒤 python3 scripts/sync-common.py"


def years():
    return sorted(p.name for p in ROOT.iterdir() if p.name.isdigit() and len(p.name) == 4 and (p / "package.json").exists())


def header(path):
    """복사본 맨 위에 붙는 안내 한 줄 (파일 종류에 맞는 주석)"""
    return f"/* {MARK} */\n" if path.suffix == ".css" else f"// {MARK}\n"


def expected(year):
    """연도 앱 안에 있어야 할 복사본: {복사본 경로: 내용}"""
    app = ROOT / year / "src" / "app"
    pairs = {COMMON / "layout.tsx": app / "layout.tsx", COMMON / "not-found.tsx": app / "not-found.tsx"}
    for f in sorted((COMMON / "_common").iterdir()):
        if f.is_file():
            pairs[f] = app / "_common" / f.name
    return {dst: header(dst) + src.read_text(encoding="utf-8") for src, dst in pairs.items()}


def sync(year):
    want = expected(year)
    for dst, text in want.items():
        dst.parent.mkdir(parents=True, exist_ok=True)
        if not dst.exists() or dst.read_text(encoding="utf-8") != text:
            dst.write_text(text, encoding="utf-8")
            print("복사", dst.relative_to(ROOT))
    # common/_common에서 지운 파일은 연도 쪽 복사본도 지움
    for f in (ROOT / year / "src" / "app" / "_common").iterdir():
        if f not in want:
            f.unlink()
            print("지움", f.relative_to(ROOT))


if __name__ == "__main__":
    targets = sys.argv[1:] or years()
    for y in targets:
        if y not in years():
            sys.exit(f"연도 앱이 없어요: {y}/")
        sync(y)
    print("완료:", ", ".join(targets))
