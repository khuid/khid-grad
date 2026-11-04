import type { Metadata } from "next";
import Link from "next/link";
import Ph from "../_components/Ph";
import { DESIGNERS, designerHref } from "../_components/designers";

export const metadata: Metadata = { title: "Designer — KHID 2024 Graduation Exhibition" };

// 디자이너 목록 (/2024/designers) — 아임웹 Designer 페이지 그대로: 정사각형 사진 격자(이름 글자 없음) + 아래 졸준위 단체 사진
// PC: 6칸, 칸 192 + 사이 20 / 모바일: 3칸, 칸 113 + 사이 10. 마우스 올리면 사진 위에 검정 50%
// 단체 사진: 1250×833 (아임웹 그림 설명 "제 33기 졸업전시준비위원회")
// 사진: designers.ts의 photo · 단체 사진 = 아임웹에 올라가 있던 원본(1920×1280) → public/2024/committee.webp (2026-11-04)
const COMMITTEE = "/2024/committee.webp";

export default function DesignersPage() {
  return (
    <div className="mx-auto max-w-[1280px] px-[15px] pt-[8px] pb-[15px] min-[768px]:pt-[15px]">
      <ul className="-mx-[5px] grid grid-cols-3 min-[768px]:-mx-[10px] min-[768px]:grid-cols-6">
        {DESIGNERS.map((d) => (
          <li key={d.slug} className="p-[5px] min-[768px]:p-[10px]">
            <Link href={designerHref(d)} aria-label={d.menu ?? d.ko} className="relative block">
              <Ph src={d.photo} label={d.menu ?? d.ko} size={[747, 934]} className="aspect-square w-full" />
              <span className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100" />
            </Link>
          </li>
        ))}
      </ul>
      <Ph src={COMMITTEE} label="제 33기 졸업전시준비위원회" size={[1250, 833]} className="mt-[13px] aspect-[1250/833] w-full min-[768px]:mt-[31px]" />
    </div>
  );
}
