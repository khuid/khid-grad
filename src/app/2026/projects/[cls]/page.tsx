import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import ProjectTabs from "../../_components/ProjectTabs";
import { CLASSES, classOf, projectsOf } from "../../_components/projects";
import { FRAME } from "../../_components/SectionBar";
import SiteGate from "../../_components/SiteGate";
import SubPage from "../../_components/SubPage";
import WorkCard from "../../_components/WorkCard";

// PROJECTS 수업별 목록 (/2026/projects/<수업>). 위 탭 4개, 아래 왼쪽 수업 정보(스크롤해도 제자리) | 오른쪽 작품 카드(스크롤).
// 데스크탑(1000~)은 Figma projects(1440) 배치, 프레임(1340 = 100cqw) 비율.
//
// Figma 실측(1440): 탭 아래선 → 72 / 왼쪽 칸 500(안쪽 좌우 32): 수업명 44/600 – 8 – 영문 24/500 #A5A5A5, 오른쪽 화살표 87(채운 key),
// 24 아래 "지도교수 16 이름"(20, 500 / 이름 굵게 → 사이트 굵기 600), 56 아래 설명 15/500 행간 1.5.
// 작품: 프레임 왼쪽 545부터 3열, 칸 250(4:5) 사이 10, 줄 사이 40, 오른쪽 여백 25.
// 태블릿(768~999)은 왼쪽 40% | 오른쪽 2열. 모바일(~767)은 수업 정보 → 작품 2열(DESIGNERS 목록과 같은 여백) 세로 배치
export function generateStaticParams() {
  return CLASSES.map((c) => ({ cls: c.key }));
}

export async function generateMetadata({
  params,
}: PageProps<"/2026/projects/[cls]">): Promise<Metadata> {
  const c = classOf((await params).cls);
  return {
    title: `${c ? c.ko : "PROJECTS"} — KHID 2026 Graduation Exhibition`,
    description: "경희대학교 산업디자인학과 2026 졸업전시 작품",
  };
}

export const viewport: Viewport = {
  themeColor: "#1980FF",
};

export default function ClassPage({
  params,
}: PageProps<"/2026/projects/[cls]">) {
  return (
    <SiteGate>
      <ClassView params={params} />
    </SiteGate>
  );
}

async function ClassView({
  params,
}: {
  params: PageProps<"/2026/projects/[cls]">["params"];
}) {
  const c = classOf((await params).cls);
  if (!c) notFound();
  const works = projectsOf(c.key);

  return (
    <SubPage current="projects">
      <ProjectTabs current={c.key} />

      {/* 프레임 폭(100cqw) 기준 — 컨테이너는 격자를 감싼 바깥 div여야 격자 칸 폭에 cqw를 쓸 수 있음 */}
      <div className={`@container mx-auto ${FRAME}`}>
        <div className="grid min-[768px]:h-[max(480px,calc(100dvh-135px))] min-[768px]:grid-cols-[40cqw_minmax(0,1fr)] min-[1000px]:h-[max(520px,calc(100dvh-157px))] min-[1000px]:grid-cols-[calc(500/1340*100cqw)_minmax(0,1fr)] min-[1000px]:gap-x-[calc(45/1340*100cqw)]">
          {/* 태블릿·데스크탑(768~): 탭 아래 영역을 화면 높이에 맞추고(상단바 45/53 + 위 여백 40/50 + 탭 50/54 뺀 만큼)
              오른쪽 작품 목록만 그 안에서 스크롤 → 탭·수업 정보는 계속 보임. 목록 끝에서 더 내리면 페이지가 내려가 푸터가 나옴.
              모바일은 페이지 전체 스크롤(안쪽 스크롤은 휴대폰 인앱 브라우저에서 덜컹거려서 안 씀).
              수업 정보도 화면이 낮아 넘치면 그 칸 안에서 스크롤 */}
          {/* 칸 안쪽 폭(100cqw)에 맞춰 수업명 크기 조절: 글자 수(--n) × 0.82em(Freesentation 한글 폭, 자간 포함) + 화살표(--a) + 16이 넘치지 않게, 최대 30/32/44 */}
          <div
            style={{ "--n": c.ko.length } as React.CSSProperties}
            className="@container px-5 pt-10 pb-2 break-keep [--a:56px] min-[768px]:[--a:48px] min-[1000px]:[--a:calc(87/436*100cqw)] min-[768px]:overflow-y-auto min-[768px]:[scrollbar-width:none] min-[768px]:px-6 min-[768px]:pt-[60px] min-[1000px]:px-[32px] min-[1000px]:pt-[72px]"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <h1 className="text-[length:min(30px,calc((100cqw_-_var(--a)_-_16px)/(var(--n)*0.82)))] leading-[normal] font-semibold tracking-[-0.04em] text-ink min-[768px]:text-[length:min(32px,calc((100cqw_-_var(--a)_-_16px)/(var(--n)*0.82)))] min-[1000px]:text-[length:min(44px,calc((100cqw_-_var(--a)_-_16px)/(var(--n)*0.82)))]">
                  {c.ko}
                </h1>
                <p
                  lang="en"
                  className="mt-1 text-[16px] leading-[normal] font-medium tracking-[-0.04em] text-[#a5a5a5] min-[768px]:mt-2 min-[768px]:text-[16px] min-[1000px]:text-[length:clamp(18px,calc(24/436*100cqw),24px)]"
                >
                  {c.en}
                </p>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/2026/arrow-fill.svg"
                alt=""
                aria-hidden
                className="block size-(--a) shrink-0"
              />
            </div>
            <p className="mt-5 flex gap-4 text-[17px] leading-[normal] font-medium tracking-[-0.04em] text-ink min-[1000px]:mt-6 min-[1000px]:text-[20px]">
              <span>지도교수</span>
              <span className="font-semibold">
                {c.professor ?? (
                  <span className="font-medium text-[#a5a5a5]">준비 중</span>
                )}
              </span>
            </p>
            <p className="mt-8 text-[14px] leading-[1.5] font-medium tracking-[-0.04em] text-ink min-[1000px]:mt-[56px] min-[1000px]:text-[15px]">
              {c.description ?? (
                <span className="text-[#a5a5a5]">수업 설명 준비 중</span>
              )}
            </p>
          </div>

          <ul
            tabIndex={0}
            aria-label={`${c.ko} 작품 목록`}
            className="grid grid-cols-2 content-start outline-none min-[768px]:overflow-y-auto min-[768px]:overscroll-auto min-[768px]:[scrollbar-width:none] min-[768px]:[&::-webkit-scrollbar]:hidden gap-x-[5cqw] gap-y-8 px-[6.5cqw] pt-10 pb-[52px] min-[768px]:gap-x-4 min-[768px]:gap-y-10 min-[768px]:px-0 min-[768px]:pt-[60px] min-[768px]:pr-6 min-[768px]:pb-[80px] min-[1000px]:grid-cols-3 min-[1000px]:gap-x-[calc(10/1340*100cqw)] min-[1000px]:gap-y-[40px] min-[1000px]:pt-[72px] min-[1000px]:pr-[calc(25/1340*100cqw)] min-[1000px]:pb-[120px]"
          >
            {works.map((w) => (
              <li key={w.no}>
                <WorkCard project={w} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SubPage>
  );
}
