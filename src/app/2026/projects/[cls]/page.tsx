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
      {/* 끝 처리(2026-10-23 결정): 탭·수업 정보는 고정, 작품 목록은 마지막 줄 윗선이 수업 정보 윗선(--top)까지 올라올 만큼
          아래 여백을 둔 뒤, 그때부터 탭·정보·작품이 한 덩어리로 푸터에 밀려 올라감.
          --top = 고정 영역 아래 끝(모바일 160: 상단바 45 + 여백 24 + 2×2 탭 91 / 태블릿 159 / 데스크탑 185)
          --row = 카드 한 줄(썸네일 폭 --cw × 1.25 + 제목·만든 사람 한 줄씩 약 56/62/72 — 실측), --cw는 열 수·여백으로 화면 폭에서 계산
          목록 아래 여백 = 화면 높이 − --top − --row (최소 24/48/64) → 마지막 줄이 --top에 닿는 순간 목록 끝이 화면 아래 끝
          탭은 묶음 끝에서 (화면 높이 − --top)만큼 일찍 놓이고(mb, 같은 만큼 격자를 -mt로 끌어올려 배치는 그대로),
          수업 정보는 최소 높이를 (화면 높이 − --top)으로 둬서 탭과 같은 순간에 놓임. 정보 아래 여백 최소 40 */}
      <div className="[--top:160px] [--cw:calc((100vw_-_32px)*0.41)] [--row:calc(var(--cw)*1.25_+_56px)] min-[768px]:[--row:calc(var(--cw)*1.25_+_62px)] min-[1000px]:[--row:calc(var(--cw)*1.25_+_72px)] [--release:calc(100dvh_-_var(--top))] min-[600px]:[--cw:calc((100vw_-_32px)*0.27)] min-[768px]:[--top:159px] min-[768px]:[--cw:calc(((100vw_-_80px)*0.66_-_48px)/3)] min-[1000px]:[--top:185px] min-[1000px]:[--cw:calc(min(1340px,100vw_-_100px)*250/1340)]">
        <ProjectTabs current={c.key} release />

        {/* 프레임 폭(100cqw) 기준 — 컨테이너는 격자를 감싼 바깥 div여야 격자 칸 폭에 cqw를 쓸 수 있음 */}
        <div className={`@container mx-auto -mt-(--release) ${FRAME}`}>
          <div className="grid min-[768px]:grid-cols-[34cqw_minmax(0,1fr)] min-[1000px]:grid-cols-[calc(500/1340*100cqw)_minmax(0,1fr)] min-[1000px]:gap-x-[calc(45/1340*100cqw)]">
            {/* 페이지 전체가 스크롤되고, 탭(+아래 흰 띠)은 상단바 아래에 붙음. 태블릿·데스크탑(768~)은 왼쪽 수업 정보도
              탭 아래에 붙어 제자리(상단바 45/53 + 위 여백 40/50 + 탭 50/54 + 흰 띠 24/28 = 159/185) → 오른쪽 작품만 흰 띠 뒤로 지나감.
              모바일은 수업 정보 → 작품 세로 배치, 좌우 여백은 작품 격자와 같게(프레임 폭의 6.5%).
              작품 열: ~599 2열 / 600~ 3열 (한 화면에 더 많이, 2026-10-23 결정). 768~999는 수업 정보 칸을 34%로 좁힘 */}
            {/* 칸 안쪽 폭(100cqw)에 맞춰 수업명 크기 조절: 글자 수(--n) × 0.82em(Freesentation 한글 폭, 자간 포함) + 화살표(--a) + 16이 넘치지 않게, 최대 30/32/44 */}
            <div
              style={{ "--n": c.ko.length } as React.CSSProperties}
              className="@container px-[6.5cqw] pt-10 pb-2 break-keep [--a:56px] min-[768px]:[--a:48px] min-[1000px]:[--a:calc(87/436*100cqw)] min-[768px]:sticky min-[768px]:top-[159px] min-[768px]:min-h-(--release) min-[768px]:self-start min-[768px]:px-6 min-[768px]:pt-0 min-[768px]:pb-[40px] min-[1000px]:top-[185px] min-[1000px]:px-[32px]"
            >
              {/* 화살표는 수업명 윗선에 맞춤 (영문명이 두 줄이 돼도 내려가지 않게) */}
              <div className="flex items-start justify-between gap-4">
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
                {/* "지도교수 김선철 이동민" — 이름 뒤 "교수님"·쉼표 없이 사이 12 (2026-10-23 결정) */}
                <span className="flex flex-wrap gap-x-[12px] font-semibold">
                  {c.professors.map((n) => (
                    <span key={n}>{n}</span>
                  ))}
                </span>
              </p>
              {/* 수업 설명: #777 (2026-10-23 결정), 데이터의 줄바꿈 그대로 */}
              <p className="mt-8 text-[14px] leading-[1.5] font-medium tracking-[-0.04em] whitespace-pre-line text-[#777] min-[1000px]:mt-[56px] min-[1000px]:text-[15px]">
                {c.description ?? (
                  <span className="text-[#a5a5a5]">수업 설명 준비 중</span>
                )}
              </p>
            </div>

            <ul
              aria-label={`${c.ko} 작품 목록`}
              className="grid grid-cols-2 gap-x-[5cqw] gap-y-8 px-[6.5cqw] pt-10 pb-[max(24px,calc(100dvh_-_var(--top)_-_var(--row)))] min-[600px]:grid-cols-3 min-[600px]:gap-x-[3cqw] min-[768px]:gap-x-3 min-[768px]:gap-y-8 min-[768px]:px-0 min-[768px]:pt-0 min-[768px]:pr-6 min-[768px]:pb-[max(48px,calc(100dvh_-_var(--top)_-_var(--row)))] min-[1000px]:gap-x-[calc(10/1340*100cqw)] min-[1000px]:gap-y-[40px] min-[1000px]:pr-[calc(25/1340*100cqw)] min-[1000px]:pb-[max(64px,calc(100dvh_-_var(--top)_-_var(--row)))]"
            >
              {works.map((w) => (
                <li key={w.no}>
                  <WorkCard project={w} compact />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </SubPage>
  );
}
