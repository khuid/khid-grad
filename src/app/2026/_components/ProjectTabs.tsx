import Link from "next/link";
import { CLASSES, type ClassKey } from "./projects";
import { FRAME, Node } from "./SectionBar";

// PROJECTS 수업 탭 4개(가나다 순). 상단바 아래 여백(24/40/50) 뒤에 오고, 스크롤하면 상단바 바로 아래에 붙음(sticky, 흰 배경).
// Figma projects(1440): 위아래 가로선(화면 끝에서 끝까지), 프레임(1340)을 4칸으로. 선택된 탭 배경 pale(#E3F0FF), 글자 deepblue.
// 높이·글자는 메인 띠(SectionBar)와 같게(2026-10-23 결정): 안쪽 높이 52/48/44, 글자 20.8/18/16 (데스크탑/태블릿/모바일).
// 선은 메인 양식(deepblue 1px), 프레임 모서리에 9×9 사각형.
// 모바일(~767)은 2×2이고, 위 여백 24 + 위 선까지 한 덩어리로 붙음.
// 768~도 위 여백(40/50)째로 붙음 → 스크롤해도 탭·위 선이 처음 자리에서 전혀 움직이지 않음.
// 탭 아래 흰 띠(24/28)까지 한 덩어리 → 작품이 탭 선에 닿지 않고 흰 여백 뒤로 사라짐
export default function ProjectTabs({ current }: { current: ClassKey }) {
  return (
    <nav
      aria-label="수업"
      className="sticky top-[45px] z-40 bg-white pt-[24px] min-[768px]:pt-[40px] min-[768px]:pb-[24px] min-[1000px]:top-[53px] min-[1000px]:pt-[50px] min-[1000px]:pb-[28px]"
    >
      {/* 흰 배경이 가린 위 여백·아래 흰 띠 구간의 프레임 세로선을 다시 그림 */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 border-x border-deepblue ${FRAME}`}
      />
      <span aria-hidden className="absolute inset-x-0 top-[24px] h-px bg-deepblue min-[768px]:top-[40px] min-[1000px]:top-[50px]" />
      <span aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-deepblue min-[768px]:bottom-[24px] min-[1000px]:bottom-[28px]" />
      <div className={`relative mx-auto py-px ${FRAME}`}>
        <Node className="top-[0.5px] left-[0.5px]" />
        <Node className="top-[0.5px] left-[calc(100%-0.5px)]" />
        <Node className="top-[calc(100%-0.5px)] left-[0.5px]" />
        <Node className="top-[calc(100%-0.5px)] left-[calc(100%-0.5px)]" />
        {/* 프레임 세로선도 탭 띠 자체의 선(border-x)으로 — 선택·호버 배경이 선을 가리지 않음 */}
        <ul className="grid grid-cols-2 border-x border-deepblue min-[768px]:grid-cols-4">
          {CLASSES.map((c, i) => {
            const on = c.key === current;
            return (
              <li
                key={c.key}
                className={`border-deepblue ${i % 2 ? "border-l" : ""} ${i >= 2 ? "border-t min-[768px]:border-t-0" : ""} ${i === 2 ? "min-[768px]:border-l" : ""}`}
              >
                <Link
                  href={`/2026/projects/${c.key}`}
                  aria-current={on ? "page" : undefined}
                  className={`text-heading flex h-[44px] items-center justify-center px-2 text-center text-[16px] break-keep text-deepblue transition-colors min-[768px]:h-[48px] min-[768px]:text-[18px] min-[1000px]:h-[52px] min-[1000px]:text-[20.8px] ${on ? "bg-pale" : "hover:bg-pale/50"}`}
                >
                  {c.ko}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
