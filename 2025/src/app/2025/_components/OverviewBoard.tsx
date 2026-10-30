import { OVERVIEW } from "./home";

// 메인 소개 2칸 — 프레이머 overview1·2. 원본은 바둑판(가로 A~T, 세로 19~1) 격자 위에 글이 그려진 이미지(2880×2880)인데,
// 이미지 대신 격자는 선으로, 글은 진짜 글자(Pretendard)로 다시 그림. 값은 원본 이미지를 720 기준으로 잰 것.
// 칸 크기가 바뀌어도 이미지처럼 통째로 같은 비율로 커지고 작아짐(viewBox 720). 화면 읽기용 글은 sr-only로 따로 둠
const LINE = "#DFE0E4"; // 격자 선
const LABEL = "#D8D9DB"; // A~T, 19~1
const COLS = "ABCDEFGHJKLMNOPQRST"; // 바둑판 표기라 I가 없음
const EDGE = [56.25, 662.5]; // 격자 바깥선 (가로·세로 같음), 선 20개 = 19칸
const GAP = (EDGE[1] - EDGE[0]) / 19;
const TEXT_X = 88.5; // 글 왼쪽 끝 = 두 번째 세로선
const TEXT_W = 631 - TEXT_X; // 양쪽 맞춤 줄의 폭
const PARA_Y = [237.5, 404.5, 546.5]; // 문단 첫 줄 글자 바닥선(baseline). 줄 간격 26
const LEAD = 26;

export default function OverviewBoard({ index }: { index: 0 | 1 }) {
  const o = OVERVIEW[index];
  return (
    <div className="relative aspect-square w-full bg-paper min-[720px]:w-1/2">
      <div className="sr-only">
        <h2>
          {o.title} {o.sub}
        </h2>
        {o.paras.map((p, i) => (
          <p key={i}>{p.map((l) => l.t).join(" ")}</p>
        ))}
      </div>
      <svg viewBox="0 0 720 720" aria-hidden className="absolute inset-0 block size-full font-ko">
        {/* 격자 — 바깥선 1.5, 안쪽 0.75 */}
        {Array.from({ length: 20 }, (_, i) => {
          const v = EDGE[0] + GAP * i;
          const w = i === 0 || i === 19 ? 1.5 : 0.75;
          return (
            <g key={i} stroke={LINE} strokeWidth={w}>
              <line x1={v} y1={EDGE[0]} x2={v} y2={EDGE[1]} />
              <line x1={EDGE[0]} y1={v} x2={EDGE[1]} y2={v} />
            </g>
          );
        })}
        {/* 좌표 — 글자 19개를 바깥선 사이에 고르게 (선 간격과 조금 다름, 원본 그대로) */}
        <g fill={LABEL} textAnchor="middle" fontSize={19}>
          {[...COLS].map((c, i) => {
            const x = 57.75 + ((661.9 - 57.75) / 18) * i;
            return (
              <g key={c}>
                <text x={x} y={39.5}>{c}</text>
                <text x={x} y={694.5}>{c}</text>
              </g>
            );
          })}
        </g>
        <g fill={LABEL} textAnchor="middle" fontSize={17.5}>
          {Array.from({ length: 19 }, (_, i) => {
            const y = 62 + ((668.5 - 62) / 18) * i;
            return (
              <g key={i}>
                <text x={31.25} y={y}>{19 - i}</text>
                <text x={689} y={y}>{19 - i}</text>
              </g>
            );
          })}
        </g>
        {/* 제목 29 Bold 빨강, 부제 21.3 Bold, 본문 17.3 / 줄 간격 26 — 원본 글 폭에 맞춘 크기 */}
        <text x={TEXT_X} y={116} fontSize={29} fontWeight={700} className="fill-red">
          {o.title}
        </text>
        <text x={TEXT_X} y={148.5} fontSize={21.3} fontWeight={700} className="fill-ink">
          {o.sub}
        </text>
        <g fontSize={17.3} className="fill-ink">
          {o.paras.map((p, i) =>
            p.map((l, k) => (
              <text
                key={`${i}-${k}`}
                x={TEXT_X}
                y={PARA_Y[i] + LEAD * k}
                {...(l.j ? { textLength: TEXT_W, lengthAdjust: "spacing" } : {})}
              >
                {l.t}
              </text>
            )),
          )}
        </g>
      </svg>
    </div>
  );
}
