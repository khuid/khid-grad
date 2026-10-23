// [3]부터 쓰는 구역 제목 띠 (전시안내 EXHIBITION INFORMATION, 지도교수 PROFESSOR …).
// 스크롤하면 상단바 바로 아래에 붙어 있다가(sticky), 감싼 구역이 끝나면 다음 띠에 밀려 올라감.
// → 띠는 반드시 "제목 + 그 내용"을 감싼 요소의 첫 자식으로 둘 것.
//
// Figma 실측(1440, 띠 높이 70): 위·아래 가로선 y 4 / 65 (화면 끝에서 끝까지, #1A6AE8),
// 그 사이 프레임 폭(1340) 안만 연한 하늘색, 글자는 프레임 왼쪽에서 40, 한글–영문 간격 24.
// 선이 만나는 곳(프레임 세로선 × 가로선)에 9×9 사각형. 띠 바깥(위아래 4px, 프레임 밖)은 배경 없음 — 흰 틈이 안 보이게.
// 글자는 deepblue(#1A6AE8).
// 2026-10-23 결정: 상단바처럼 Figma 대비 52/60로 줄임 — 안쪽 높이 60 → 52, 글자 24 → 20.8(상단바 메뉴와 같은 크기), 한글–영문 24 → 20.8.
// 모바일·태블릿: 안쪽 높이 44(~767) / 48(768~), 글자 16 / 18
// 프레임 폭: 모바일 좌우 16 / 768~ 40 / 1000~ 50(최대 1340) — [2]와 같음. [3]부터 구역들이 같이 씀
export const FRAME =
  "w-[calc(100%-32px)] min-[768px]:w-[calc(100%-80px)] min-[1000px]:w-[min(1340px,calc(100%-100px))]";

function Node({ className }: { className: string }) {
  return <span aria-hidden className={`absolute z-10 size-[9px] -translate-1/2 bg-deepblue ${className}`} />;
}

export default function SectionBar({ ko, en, id }: { ko: string; en: string; id?: string }) {
  return (
    <div className="sticky top-[45px] z-40 py-[4px] min-[1000px]:top-[53px]">
      <div className="border-y border-deepblue">
        <div className={`relative mx-auto flex min-h-[44px] items-center py-2 border-x border-deepblue bg-pale px-4 min-[768px]:min-h-[48px] min-[768px]:px-7 min-[1000px]:min-h-[52px] min-[1000px]:py-0 min-[1000px]:px-[40px] ${FRAME}`}>
          <Node className="top-[-0.5px] left-[0.5px]" />
          <Node className="top-[-0.5px] left-[calc(100%-0.5px)]" />
          <Node className="top-[calc(100%+0.5px)] left-[0.5px]" />
          <Node className="top-[calc(100%+0.5px)] left-[calc(100%-0.5px)]" />
          <h2
            id={id}
            className="text-heading flex flex-wrap items-baseline gap-x-[8px] text-[16px] text-deepblue min-[768px]:gap-x-[14px] min-[768px]:text-[18px] min-[1000px]:gap-x-[20.8px] min-[1000px]:text-[20.8px]"
          >
            <span>{ko}</span>
            <span lang="en">{en}</span>
          </h2>
        </div>
      </div>
      {/* 띠 위아래 4px 흰 여백에도 프레임 세로선이 끊기지 않게 */}
      <div aria-hidden className={`pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 border-x border-deepblue ${FRAME}`} />
    </div>
  );
}
