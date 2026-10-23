import Link from "next/link";
import { projectHref, type Project } from "./projects";

// 작품 카드 (PROJECTS 목록 · DESIGNERS 프로필 아래 작품). DESIGNERS 목록 카드와 같은 양식:
// 4:5 썸네일(없으면 연한 하늘색 pale), 아래 작품 제목 20/500 · 만든 사람 16/500(사이 8), 글자는 썸네일보다 4 안쪽.
// 마우스를 올리면 썸네일 살짝 확대 + 글자 key. project가 없으면 링크 없는 자리 표시(title만)
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
      <p className="mt-4 pl-[4px] text-[20px] leading-[normal] font-medium tracking-[-0.04em] text-ink transition-colors group-hover:text-key min-[1000px]:mt-[18px]">
        {project?.title ?? title}
      </p>
      {!!project?.members.length && (
        <p className="mt-2 flex flex-wrap gap-x-[8px] pl-[4px] text-[16px] leading-[normal] font-medium tracking-[-0.04em] text-ink transition-colors group-hover:text-key">
          {project.members.map((m) => (
            <span key={m}>{m}</span>
          ))}
        </p>
      )}
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
