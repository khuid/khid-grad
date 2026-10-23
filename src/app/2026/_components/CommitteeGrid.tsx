"use client";

import { useEffect, useRef, useState } from "react";
import { MEMBERS, TEAMS } from "./committee";

// [4] 졸준위 프로필 사진 격자 + 팀 덮개.
// 데스크탑·태블릿(768~)은 Figma 그대로 7칸 × 2줄, 빈칸(3·5·11·13번)은 비워 둠.
// 모바일(~767)은 Figma iPhone 390 배치: 4칸 × 4줄, 빈칸 유지(격자 334, 칸 사이 가로 3.21 / 세로 5.05).
// 팀 덮개: 마우스는 팀 구역에 올리면, 터치는 누르면(다시 누르거나 바깥 누르면 닫힘)
// 반투명 블루(#1980FF 80%) 위에 흰 글자로 팀 이름만. 여러 명인 팀은 사람 사이 여백까지 한 덩어리로 덮음.
// 1명인 팀은 "Team." 줄바꿈 "팀명", 가운데 정렬.
//
// Figma 실측(격자 폭 1151.78): 칸 158.76×198.16, 칸 사이 가로 6.75 / 세로 11.25, 사진 없는 칸 배경 #EDEDED,
// 덮개 글자 27(2명 이상 팀, 칸 폭의 17%, 칸 사이 포함해 격자 폭 기준 16.4cqw/칸수). 1명 팀은 두 줄이라 칸 폭의 13.5%
// 팀이 차지하는 칸 범위 (같은 줄에 붙어 있다는 전제)
function span(team: string, k: "d" | "m") {
  const ms = MEMBERS.filter((m) => m.team === team);
  const cols = ms.map((m) => m[k][0]);
  const from = Math.min(...cols);
  return { col: `${from} / span ${Math.max(...cols) - from + 1}`, row: `${ms[0][k][1]}` };
}

type Vars = React.CSSProperties & Record<`--${string}`, string>;

const PLACE =
  "[grid-column:var(--mc)] [grid-row:var(--mr)] min-[768px]:[grid-column:var(--dc)] min-[768px]:[grid-row:var(--dr)]";

export default function CommitteeGrid() {
  const [open, setOpen] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  // 터치로 연 덮개는 격자 바깥을 누르면 닫힘
  useEffect(() => {
    if (!open) return;
    const close = (e: PointerEvent) => !ref.current?.contains(e.target as Node) && setOpen(null);
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [open]);

  return (
    // 격자 폭(100cqw) 기준으로 칸 사이·덮개 글자 크기를 잼. --cols는 칸 개수
    <div ref={ref} className="@container [--cols:4] min-[768px]:[--cols:7]">
      <div className="grid grid-cols-[repeat(var(--cols),minmax(0,1fr))] gap-x-[calc(3.21/334*100cqw)] gap-y-[calc(5.05/334*100cqw)] min-[768px]:gap-x-[max(4px,calc(6.75/1151.78*100cqw))] min-[768px]:gap-y-[max(4px,calc(11.25/1151.78*100cqw))]">
        {MEMBERS.map((m) => (
          <div
            key={m.name}
            style={{ "--dc": `${m.d[0]}`, "--dr": `${m.d[1]}`, "--mc": `${m.m[0]}`, "--mr": `${m.m[1]}` } as Vars}
            className={`relative aspect-[158.76/198.16] overflow-hidden bg-[#ededed] ${PLACE}`}
          >
            {m.photo && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={m.photo} alt={m.name} className="absolute inset-0 size-full object-cover" />
            )}
          </div>
        ))}

        {TEAMS.map((t) => {
          const d = span(t.key, "d");
          const mo = span(t.key, "m");
          const solo = MEMBERS.filter((m) => m.team === t.key).length === 1;
          const on = open === t.key;
          return (
            <button
              key={t.key}
              type="button"
              aria-label={t.title}
              aria-pressed={on}
              onClick={(e) => {
                // 마우스 클릭은 호버로 이미 보이니 터치(손가락·펜)일 때만 열고 닫기
                if ((e.nativeEvent as PointerEvent).pointerType === "mouse") return;
                setOpen(on ? null : t.key);
              }}
              style={{ "--dc": d.col, "--dr": d.row, "--mc": mo.col, "--mr": mo.row } as Vars}
              className={`z-10 flex items-center justify-center bg-key/80 text-center font-semibold leading-[1.15] tracking-[-0.04em] text-white transition-opacity duration-200 [@media(hover:hover)]:hover:opacity-100 ${
                solo ? "text-[length:calc(13.5cqw/var(--cols))]" : "text-[length:calc(16.4cqw/var(--cols))]"
              } ${on ? "opacity-100" : "opacity-0"} ${PLACE}`}
            >
              <span aria-hidden>{t.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
