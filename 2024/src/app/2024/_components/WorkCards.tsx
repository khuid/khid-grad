import Link from "next/link";
import Ph from "./Ph";
import { memberNames, workHref, type Work } from "./works";

// 작품 카드 목록 — 아임웹 갤러리(과목 목록·디자이너 페이지 공통). 마우스 올림 효과 없음(아임웹 그대로)
// PC: 3칸, 칸 410(4:3 이미지, 테두리 1px #eee) + 사이 10 / 모바일: 3칸 그대로, 사이 7.5
// 이미지 아래: 위아래 10, 제목 17/27.2 흰색 + 팀원 13/20.8 #999
export default function WorkCards({ works }: { works: Work[] }) {
  return (
    <ul className="-mx-[3.75px] flex flex-wrap pt-[10px] min-[768px]:-mx-[5px] min-[768px]:pt-[15px]">
      {works.map((w) => (
        <li key={`${w.cat}-${w.id}`} className="w-1/3 px-[3.75px] min-[768px]:p-[5px]">
          <Link href={workHref(w)} className="block">
            <Ph src={w.thumb} label={w.title || memberNames(w)} className="aspect-[4/3] w-full border border-[#eee]" />
            <p className="py-[10px] text-[17px] leading-[27.2px] break-words">
              {w.title}
              <span className="block text-[13px] leading-[20.8px] text-sub">{memberNames(w)}</span>
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
