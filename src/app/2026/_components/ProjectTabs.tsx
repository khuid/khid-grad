import Link from "next/link";
import { CLASSES, type ClassKey } from "./projects";
import { FRAME, Node } from "./SectionBar";

// PROJECTS 수업 탭 4개(가나다 순). 상단바 아래 여백(24/40/50) 뒤에 오고, 스크롤하면 상단바 바로 아래에 붙음.
// Figma projects(1440): 위아래 가로선 y 110 / 182(화면 끝에서 끝까지), 탭 높이 72, 프레임(1340)을 4칸으로.
// 선택된 탭 배경 pale(#E3F0FF), 글자 24/600 deepblue. 선은 메인 양식(deepblue 1px), 프레임 모서리에 9×9 사각형.
// 태블릿 높이 60 · 글자 18 / 모바일은 2×2, 높이 48 · 글자 15
export default function ProjectTabs({ current }: { current: ClassKey }) {
  return (
    <nav
      aria-label="수업"
      className="sticky top-[45px] z-40 mt-[24px] bg-white min-[768px]:mt-[40px] min-[1000px]:top-[53px] min-[1000px]:mt-[50px]"
    >
      <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-deepblue" />
      <span aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-deepblue" />
      <div className={`relative mx-auto py-px ${FRAME}`}>
        {/* 흰 배경이 프레임 세로선을 가리니까 탭 띠 안에서 다시 그림 */}
        <span aria-hidden className="absolute inset-y-0 left-0 z-10 w-px bg-deepblue" />
        <span aria-hidden className="absolute inset-y-0 right-0 z-10 w-px bg-deepblue" />
        <Node className="top-[0.5px] left-[0.5px]" />
        <Node className="top-[0.5px] left-[calc(100%-0.5px)]" />
        <Node className="top-[calc(100%-0.5px)] left-[0.5px]" />
        <Node className="top-[calc(100%-0.5px)] left-[calc(100%-0.5px)]" />
        <ul className="grid grid-cols-2 min-[768px]:grid-cols-4">
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
                  className={`flex h-[48px] items-center justify-center px-2 text-center text-[15px] leading-[normal] font-semibold tracking-[-0.04em] break-keep text-deepblue transition-colors min-[768px]:h-[60px] min-[768px]:text-[18px] min-[1000px]:h-[72px] min-[1000px]:text-[24px] ${on ? "bg-pale" : "hover:bg-pale/50"}`}
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
