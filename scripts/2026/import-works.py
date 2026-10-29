"""[2026 전용 도구] 작품 구글폼 응답 시트(csv) → src/app/2026/_components/projects.ts WORKS.
팀원 이름 집합이 정확히 같은 작품 하나에 제목·소개글을 시트 원문 그대로(오타·공백도 손대지 않음) 넣음.
일치하는 작품이 0개·2개 이상이면 넣지 않고 "!!"로 알림 → 사용자에게 확인.
시트는 csv로 받기: https://docs.google.com/spreadsheets/d/<ID>/export?format=csv

실행 (site.2026 폴더에서):
  python3 scripts/2026/import-works.py src/app/2026/_components/projects.ts 시트1.csv 시트2.csv ...
수업별 시트는 앞에 "수업키=" 를 붙이면 그 수업 안에서만 찾음 (같은 팀이 여러 수업에 작품이 있을 때 필수):
  python3 scripts/2026/import-works.py src/app/2026/_components/projects.ts smart=스융디.csv
"""
import csv, json, re, sys
from pathlib import Path
ts = Path(sys.argv[1]); t = ts.read_text()
for arg in sys.argv[2:]:
    cls, _, f = arg.rpartition("=")
    rows = list(csv.reader(open(f, encoding="utf-8")))
    h = rows[0]
    im = next(i for i, x in enumerate(h) if x.startswith("1."))
    it = next(i for i, x in enumerate(h) if x.startswith("2."))
    idsc = next(i for i, x in enumerate(h) if x.startswith("3."))
    for r in rows[1:]:
        members = {m for m in re.split(r"[,\s]+", r[im]) if m}  # 쉼표 없이 띄어 쓴 응답도 있음
        title, desc = r[it], r[idsc]
        # WORKS 한 줄 또는 이미 펼친 여러 줄 항목
        pat = re.compile(r'^    (?:\[("(?:[^"\\]|\\.)*"), (\[[^\]]*\])\],|\[\n      ("(?:[^"\\]|\\.)*"),\n      (\[[^\]]*\]),\n      "(?:[^"\\]|\\.)*",\n    \],)$', re.M)
        # 수업을 정했으면 WORKS의 그 수업 블록("  smart: [" ~ "  ],") 안에서만
        lo, hi = (t.index(f"\n  {cls}: [\n"), t.index("\n  ],", t.index(f"\n  {cls}: [\n"))) if cls else (0, len(t))
        hits = [m for m in pat.finditer(t, lo, hi) if set(json.loads(m.group(2) or m.group(4))) == members]
        if len(hits) != 1:
            print(f"!! {f}: {sorted(members)} '{title}' → 일치 {len(hits)}개"); continue
        m = hits[0]
        mem = m.group(2) or m.group(4)
        old_title = json.loads(m.group(1) or m.group(3))
        new = f'    [\n      {json.dumps(title, ensure_ascii=False)},\n      {mem},\n      {json.dumps(desc, ensure_ascii=False)},\n    ],'
        t = t[:m.start()] + new + t[m.end():]
        print(f"ok {sorted(members)} '{old_title}' → '{title}' ({len(desc)}자)")
ts.write_text(t)
