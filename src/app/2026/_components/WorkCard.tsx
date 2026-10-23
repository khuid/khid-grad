import Link from "next/link";
import FitTitle from "./FitTitle";
import { projectHref, type Project } from "./projects";

// 작품 카드 (PROJECTS 목록 · DESIGNERS 프로필 아래 작품). DESIGNERS 목록 카드와 같은 양식:
// 썸네일 4:5(없으면 연한 하늘색 pale) → 작품 제목 → 다음 줄에 만든 사람(1~4명, 사이 8, #777 — 프로필 영문 이름과 같은 회색).
// 글자 크기: 제목 16 · 만든 사람 14 (모바일 ~767) / 제목 20 · 만든 사람 16 (768~). 글자는 썸네일보다 4 안쪽.
// 마우스를 올리면 썸네일 살짝 확대 + 글자 key. 만든 사람이 아직 없으면 "만든 사람" 자리 표시.
// project가 없으면 링크 없는 자리 표시
export default function WorkCard({ project, title }: { project?: Project; title?: string }) {
  const body = (
    <>
      <div className="relative aspect-[4/5] overflow-hidden bg-pale">
        {project?.thumb && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.thumb}
            alt={project.title}
            loading="lazy"
            className="absolute inset-0 size-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
          />
        )}
      </div>
      {/* 긴 제목은 2줄 안에 들어가게 글자 크기를 줄임 (FitTitle) */}
      <FitTitle className="mt-3 pl-[4px] text-[16px] font-medium tracking-[-0.04em] text-ink transition-colors group-hover:text-key min-[768px]:mt-4 min-[768px]:text-[20px] min-[1000px]:mt-[18px]">
        {project?.title ?? title}
      </FitTitle>
      <p className="mt-1.5 flex flex-wrap gap-x-[8px] pl-[4px] text-[14px] leading-[normal] font-medium tracking-[-0.04em] text-[#777] transition-colors group-hover:text-key min-[768px]:mt-2 min-[768px]:text-[16px]">
        {project?.members.length ? project.members.map((m) => <span key={m}>{m}</span>) : "만든 사람"}
      </p>
    </>
  );
  return project ? (
    <Link href={projectHref(project)} className="group block">
      {body}
    </Link>
  ) : (
    <div>{body}</div>
  );
}
