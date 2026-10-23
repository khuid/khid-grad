import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DESIGNERS } from "../../../_components/designers";
import { classOf, PROJECTS, type Media, type Project } from "../../../_components/projects";
import { FRAME, Node } from "../../../_components/SectionBar";
import SiteGate from "../../../_components/SiteGate";
import SubPage from "../../../_components/SubPage";
import VideoFrame from "../../../_components/VideoFrame";

// 작품 상세 (/2026/projects/<수업>/<번호>). 왼쪽 작품 이미지·영상을 세로로(사이 여백 0) 스크롤, 오른쪽 정보는 제자리.
// 미디어는 1920×1080 가로(16:9) 이미지 + 영상 최대 1개, 합쳐서 3~7개. 아직 없으면 16:9 빈칸 7개(최대 개수).
//
// Figma 실측(1440): 상단바 아래 50에 위 가로선(화면 끝에서 끝까지, 여백째로 상단바 밑에 붙음 — 정보 칸은 그 아래 86/104에 붙음), 그 아래 왼쪽 미디어 800(프레임 왼쪽 선 바로 옆부터) | 오른쪽 정보 540.
// 정보 안쪽 좌우 32 · 위 44: 수업명 20/500 key → 24 → 제목 32/600 → 12 → 만든 사람 16/500(사이 11) → 44 → 설명 14/500 행간 1.5 → 44 →
// 링크 15/500 #797979 밑줄(사이 24, "Behance ↗"). 미디어 끝 → 푸터 50.
// 태블릿(768~999)도 좌우 배치(미디어 60%), 모바일(~767)은 정보 → 미디어 세로 배치
export function generateStaticParams() {
  return PROJECTS.map((p) => ({ cls: p.cls, no: p.no }));
}

function find(cls: string, no: string) {
  return PROJECTS.find((p) => p.cls === cls && p.no === no);
}

export async function generateMetadata({ params }: PageProps<"/2026/projects/[cls]/[no]">): Promise<Metadata> {
  const { cls, no } = await params;
  const p = find(cls, no);
  return {
    title: `${p ? `${p.title} · ${classOf(p.cls)?.ko}` : "PROJECTS"} — KHID 2026 Graduation Exhibition`,
    description: "경희대학교 산업디자인학과 2026 졸업전시 작품",
  };
}

export const viewport: Viewport = {
  themeColor: "#1980FF",
};

export default function ProjectPage({ params }: PageProps<"/2026/projects/[cls]/[no]">) {
  return (
    <SiteGate>
      <ProjectView params={params} />
    </SiteGate>
  );
}

async function ProjectView({ params }: { params: PageProps<"/2026/projects/[cls]/[no]">["params"] }) {
  const { cls, no } = await params;
  const p = find(cls, no);
  if (!p) notFound();

  return (
    <SubPage current="projects">
      {/* 상단바 아래 여백(24/40/50) + 위 가로선을 한 덩어리로 상단바 밑에 붙임(흰 배경) → 작품 이미지가 그 뒤로 지나감.
          흰 배경이 가린 프레임 세로선은 이 띠 안에서 다시 그리고, 가로선과 만나는 곳에 사각형 */}
      <div className="sticky top-[45px] z-30 h-[25px] bg-white min-[768px]:h-[41px] min-[1000px]:top-[53px] min-[1000px]:h-[51px]">
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 border-x border-deepblue ${FRAME}`}
        />
        <span aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-deepblue" />
        <div className={`absolute bottom-0 left-1/2 h-px -translate-x-1/2 ${FRAME}`}>
          <Node className="top-[0.5px] left-[0.5px]" />
          <Node className="top-[0.5px] left-[calc(100%-0.5px)]" />
        </div>
      </div>
      <div className="relative">
        <div className={`@container relative mx-auto ${FRAME}`}>
          <div className="grid min-[768px]:grid-cols-[60cqw_minmax(0,1fr)] min-[1000px]:grid-cols-[calc(800/1340*100cqw)_minmax(0,1fr)]">
            {/* 미디어: 프레임 왼쪽 선은 가리지 않게 1px 띄움. 사이 여백 0 (각 항목 block) */}
            <div className="order-2 ml-px pb-[24px] max-[768px]:mr-px min-[768px]:order-1 min-[768px]:pb-[50px]">
              {(p.media.length ? p.media : PLACEHOLDER).map((m, i) => (
                <MediaItem key={i} media={m} index={i} alt={`${p.title} ${i + 1}`} />
              ))}
            </div>
            <Info project={p} />
          </div>
        </div>
      </div>
    </SubPage>
  );
}

// 미디어가 들어오기 전 자리 표시: 최대 개수인 16:9 빈칸 7개 (구분되게 pale / 회색 번갈아)
const PLACEHOLDER: (Media | null)[] = Array(7).fill(null);

function MediaItem({ media, index, alt }: { media: Media | null; index: number; alt: string }) {
  if (!media) return <div className={`block aspect-video w-full ${index % 2 ? "bg-[#ededed]" : "bg-pale"}`} />;
  if (media.type === "youtube") return <VideoFrame youtubeId={media.id} />;
  if (media.type === "video")
    return <video src={media.src} autoPlay muted loop playsInline className="block aspect-video w-full object-cover" />;
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={media.src} alt={alt} loading={index ? "lazy" : "eager"} className="block aspect-video w-full object-cover" />;
}

function Info({ project: p }: { project: Project }) {
  const c = classOf(p.cls)!;
  return (
    <aside className="order-1 flex flex-col gap-8 px-5 py-8 break-keep min-[768px]:sticky min-[768px]:top-[86px] min-[768px]:order-2 min-[768px]:self-start min-[768px]:px-6 min-[768px]:py-10 min-[1000px]:top-[104px] min-[1000px]:gap-[44px] min-[1000px]:px-[32px] min-[1000px]:py-[44px]">
      <div>
        <Link
          href={`/2026/projects/${c.key}`}
          className="text-[16px] leading-[normal] font-medium tracking-[-0.04em] text-key hover:underline min-[1000px]:text-[20px]"
        >
          {c.ko}
        </Link>
        <h1 className="mt-4 text-[26px] leading-[1.25] font-semibold tracking-[-0.04em] text-ink min-[1000px]:mt-6 min-[1000px]:text-[32px]">
          {p.title}
        </h1>
        {!!p.members.length && (
          <p className="mt-3 flex flex-wrap gap-x-[11px] text-[16px] leading-[normal] font-medium tracking-[-0.04em] text-ink">
            {p.members.map((m) => {
              const d = DESIGNERS.find((x) => x.ko === m);
              return d ? (
                <Link key={m} href={`/2026/designers/${d.slug}`} className="hover:text-key">
                  {m}
                </Link>
              ) : (
                <span key={m}>{m}</span>
              );
            })}
          </p>
        )}
      </div>
      <p className="text-[14px] leading-[1.5] font-medium tracking-[-0.04em] text-ink">
        {p.description ?? <span className="text-[#a5a5a5]">작품 설명 준비 중</span>}
      </p>
      {!!p.links.length && (
        <p className="flex flex-wrap gap-x-[24px] gap-y-2 text-[15px] leading-[normal] font-medium tracking-[-0.04em] text-[#797979]">
          {p.links.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="underline hover:text-key">
              {l.label} ↗
            </a>
          ))}
        </p>
      )}
    </aside>
  );
}
