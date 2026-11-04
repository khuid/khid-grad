import type { Metadata } from "next";
import Link from "next/link";
import { WORKS_INDEX_ORDER, categoryHref, categoryOf } from "../_components/works";

export const metadata: Metadata = { title: "Works — KHID 2024 Graduation Exhibition" };

// Works 첫 화면 (/2024/projects) — 아임웹 Works 페이지 그대로: 과목 이름 4줄(파랑 #2662bc, 굵게), 누르면 그 과목 작품 목록
// PC 글자 96/105.6, 줄 사이 30 / 모바일 40/44, 줄 사이 15
export default function ProjectsPage() {
  return (
    <ul className="mx-auto flex max-w-[1280px] flex-col gap-[15px] px-[15px] pt-[8px] pb-[15px] min-[768px]:gap-[30px] min-[768px]:pt-[15px]">
      {WORKS_INDEX_ORDER.map((slug) => {
        const c = categoryOf(slug)!;
        return (
          <li key={slug}>
            <Link href={categoryHref(c)} className="inline-block text-[40px] leading-[44px] font-bold text-blue min-[768px]:text-[96px] min-[768px]:leading-[105.6px]">
              {c.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
