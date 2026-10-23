// [3]부터 쓰는 구역 제목 띠 (전시안내 EXHIBITION INFORMATION, 지도교수 PROFESSOR …).
// 스크롤하면 상단바 바로 아래에 붙어 있다가(sticky), 감싼 구역이 끝나면 다음 띠에 밀려 올라감.
// → 띠는 반드시 "제목 + 그 내용"을 감싼 요소의 첫 자식으로 둘 것.
//
// Figma 실측(1440, 띠 높이 70): 위·아래 가로선 y 4 / 65 (화면 끝에서 끝까지, #1A6AE8),
// 그 사이 프레임 폭(1340) 안만 연한 하늘색, 글자는 프레임 왼쪽에서 40, 한글–영문 간격 24.
// 선이 만나는 곳(프레임 세로선 × 가로선)에 9×9 사각형. 띠 바깥 부분은 흰색이라 아래 내용이 비치지 않음.
// 모바일·태블릿은 띠와 글자만 줄임: 안쪽 높이 48(~767) / 56(768~) / 60(1000~)
function Node({ className }: { className: string }) {
  return <span aria-hidden className={`absolute z-10 size-[9px] -translate-1/2 bg-rule ${className}`} />;
}

export default function SectionBar({ ko, en, id }: { ko: string; en: string; id?: string }) {
  return (
    <div className="sticky top-[45px] z-40 bg-white py-[4px] min-[1000px]:top-[53px]">
      <div className="border-y border-rule">
        <div className="relative mx-auto flex h-[48px] w-[calc(100%-32px)] items-center border-x border-rule bg-pale px-4 min-[768px]:h-[56px] min-[768px]:w-[calc(100%-80px)] min-[768px]:px-7 min-[1000px]:h-[60px] min-[1000px]:w-[min(1340px,calc(100%-100px))] min-[1000px]:px-[40px]">
          <Node className="top-[-0.5px] left-[0.5px]" />
          <Node className="top-[-0.5px] left-[calc(100%-0.5px)]" />
          <Node className="top-[calc(100%+0.5px)] left-[0.5px]" />
          <Node className="top-[calc(100%+0.5px)] left-[calc(100%-0.5px)]" />
          <h2
            id={id}
            className="text-heading flex flex-wrap items-baseline gap-x-[10px] text-key max-[767px]:text-[18px] min-[768px]:gap-x-[16px] min-[768px]:max-[999px]:text-[21px] min-[1000px]:gap-x-[24px]"
          >
            <span>{ko}</span>
            <span lang="en">{en}</span>
          </h2>
        </div>
      </div>
      {/* 띠 위아래 4px 흰 여백에도 프레임 세로선이 끊기지 않게 */}
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-1/2 w-[calc(100%-32px)] -translate-x-1/2 border-x border-rule min-[768px]:w-[calc(100%-80px)] min-[1000px]:w-[min(1340px,calc(100%-100px))]" />
    </div>
  );
}
