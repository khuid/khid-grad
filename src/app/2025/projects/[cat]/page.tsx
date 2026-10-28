import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { WorkCard } from "../../_components/Cards";
import { CATEGORIES, categoryHref, categoryOf } from "../../_components/categories";
import ListLayout from "../../_components/ListLayout";
import { worksIn } from "../../_components/works";

// 과목별 작품 목록 (/2025/projects/<과목>) — 프레이머 /projects/projects-futuristic_space 등. 값은 분석 문서 3장
// 위쪽: "(MOVE)S" 제목 이미지(606×140) → 과목명 한 34/140 · 영 34/110 (Tablet·Phone 24 / 20) → 지도교수 줄 20/150 (16) → 과목 소개 16/160 회색
// 카드: 패딩 60 (Phone 16 16 40 16), 가운데, 간격 0 → Desktop 2열 / Tablet 1열 / Phone 2열(작은 카드)
export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ cat: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/2025/projects/[cat]">): Promise<Metadata> {
  const { cat } = await params;
  const c = categoryOf(cat);
  return { title: `${c ? c.ko : "PROJECTS"} — KHID 2025 Graduation Exhibition` };
}

// 주소에서 읽는 값(params)은 Suspense 안에서 읽어야 페이지 이동이 바로 됨 (Next.js 16 instant 검사)
export default function CategoryPage({ params }: PageProps<"/2025/projects/[cat]">) {
  return (
    <Suspense fallback={null}>
      <CategoryView params={params} />
    </Suspense>
  );
}

async function CategoryView({ params }: { params: PageProps<"/2025/projects/[cat]">["params"] }) {
  const { cat } = await params;
  const c = categoryOf(cat);
  if (!c) notFound();
  const works = worksIn(c.slug);

  return (
    <ListLayout
      current="projects"
      tabs={CATEGORIES.map((x) => ({ key: x.slug, label: x.ko, href: categoryHref(x) }))}
      tabKey={c.slug}
      title={{ words: [{ src: "/2025/titles/moves.svg", label: "(MOVE)S" }, { src: "/2025/titles/projects.svg", label: "(PROJECT)S" }, { src: "/2025/titles/traces.svg", label: "(TRACE)S" }], h: "h-[60px] min-[720px]:h-[97px] min-[1440px]:h-[140px]" }}
      bar={{ ko: c.ko, en: c.barEn }}
      info={
        <div className="flex w-full flex-col gap-[24px] min-[720px]:gap-[28px] min-[1440px]:gap-[32px]">
          <div className="flex flex-col gap-[8px]">
            <p className="font-ko text-[24px] leading-[1.4] min-[1440px]:text-[34px]">{c.ko}</p>
            <p className="font-en text-[20px] leading-[1.1] min-[1440px]:text-[34px]">{c.en}</p>
          </div>
          <div className="flex flex-col gap-[8px] text-[16px] leading-[1.5] min-[1440px]:text-[20px]">
            <p className="flex flex-wrap justify-center gap-x-[16px] gap-y-[8px] min-[720px]:justify-start min-[720px]:gap-x-[20px] min-[1440px]:gap-x-[28px]">
              <span className="font-ko">지도교수</span>
              <span className="flex flex-wrap gap-x-[16px] gap-y-[8px] font-ko min-[1440px]:gap-x-[20px]">
                {c.professors.map((p) => (
                  <span key={p.ko}>{p.ko}</span>
                ))}
              </span>
            </p>
            <p className="flex flex-wrap justify-center gap-x-[16px] gap-y-[8px] min-[720px]:justify-start min-[720px]:gap-x-[20px] min-[1440px]:gap-x-[28px]">
              <span className="font-en">Professor</span>
              <span className="flex flex-wrap gap-x-[16px] gap-y-[8px] font-en min-[1440px]:gap-x-[20px]">
                {c.professors.map((p) => (
                  <span key={p.en}>{p.en}</span>
                ))}
              </span>
            </p>
          </div>
          <p className="font-ko text-[16px] leading-[1.6] text-gray">{c.description}</p>
        </div>
      }
    >
      <div className="flex flex-wrap justify-center px-[16px] pt-[16px] pb-[40px] min-[720px]:p-[60px]">
        {works.length ? works.map((w) => <WorkCard key={w.id} w={w} />) : <p className="py-20 text-gray">[데이터] 작품 없음</p>}
      </div>
    </ListLayout>
  );
}
