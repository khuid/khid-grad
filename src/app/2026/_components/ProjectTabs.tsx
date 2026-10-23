import Link from "next/link";
import { CLASSES, type ClassKey } from "./projects";
import { FRAME, Node } from "./SectionBar";

// PROJECTS 수업 탭 4개(가나다 순). 상단바 아래 여백(24/40/50) 뒤에 오고, 스크롤하면 같이 올라감(붙지 않음).
// Figma projects(1440): 위아래 가로선(화면 끝에서 끝까지), 프레임(1340)을 4칸으로. 선택된 탭 배경 pale(#E3F0FF), 글자 deepblue.
// 높이·글자는 메인 띠(SectionBar)와 같게(2026-10-23 결정): 안쪽 높이 52/48/44, 글자 20.8/18/16 (데스크탑/태블릿/모바일).
// 선은 메인 양식(deepblue 1px), 프레임 모서리에 9×9 사각형. 모바일은 2×2
export default function ProjectTabs({ current }: { current: ClassKey }) {
  return (
    <nav
      aria-label="수업"
      className="relative mt-[24px] min-[768px]:mt-[40px] min-[1000px]:mt-[50px]"
    >
      <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-deepblue" />
      <span aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-deepblue" />
      <div className={`relative mx-auto py-px ${FRAME}`}>
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
