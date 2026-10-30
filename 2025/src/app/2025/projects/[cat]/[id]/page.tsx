import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { DesignerCard } from "../../../_components/Cards";
import { categoryOf } from "../../../_components/categories";
import Footer from "../../../_components/Footer";
import Header from "../../../_components/Header";
import Ph from "../../../_components/Ph";
import { membersOf, WORKS } from "../../../_components/works";

// 작품 상세 (/2025/projects/<과목>/<작품>) — 프레이머 /futuristic_space/미공디_dcro 등 73개 공통 틀. 값은 분석 문서 4장
// 1) 작품 정보(projects_title): Desktop 패딩 100 80, [왼쪽 정보 | 오른쪽 썸네일 716×716], 간격 40
//    왼쪽 위: 팀원 20/150(간격 16) → 32 → 제목 48/110 → 20 → 과목명 34/140 빨강 / 왼쪽 아래: 소개 16/160 #93999D
//    small(Phone·Tablet): 패딩 40 16, 썸네일(폭 가득 정사각형) 위 → 40 → 팀원 14(8) → 16 → 제목 24 → 8 → 과목명 16 → 24 → 소개 12
//    Tablet: 프레이머도 small 그대로 폭만 늘어남(컴포넌트 variant는 Variant 1·small 둘뿐). 썸네일은 폭 가득 정사각형 (Phone 358 = 390-32)
// 2) 웹 판넬: 위 80, 긴 이미지들을 폭 가득 세로로 이어 붙임
// 3) 팀원 카드: 가운데·줄바꿈, 간격 40·20 (Tablet·Phone 16·8), 패딩 160 80 (Tablet 80 16 / Phone 60 16)
export function generateStaticParams() {
  return WORKS.map((w) => ({ cat: w.cat, id: w.id }));
}

const find = (cat: string, id: string) => WORKS.find((w) => w.cat === cat && w.id === id);

export async function generateMetadata({ params }: PageProps<"/2025/projects/[cat]/[id]">): Promise<Metadata> {
  const { cat, id } = await params;
  const w = find(cat, id);
  return { title: `${w ? w.title : "PROJECTS"} — KHID 2025 Graduation Exhibition` };
}

// 주소에서 읽는 값(params)은 Suspense 안에서 읽어야 페이지 이동이 바로 됨 (Next.js 16 instant 검사)
export default function WorkPage({ params }: PageProps<"/2025/projects/[cat]/[id]">) {
  return (
    <Suspense fallback={null}>
      <WorkView params={params} />
    </Suspense>
  );
}

async function WorkView({ params }: { params: PageProps<"/2025/projects/[cat]/[id]">["params"] }) {
  const { cat, id } = await params;
  const w = find(cat, id);
  if (!w) notFound();
  const c = categoryOf(w.cat);
  const members = membersOf(w);

  return (
    <div className="min-h-screen bg-paper">
      <Header current="projects" />
      <main>
        <section className="flex flex-col gap-[40px] px-[16px] py-[40px] min-[1440px]:flex-row min-[1440px]:px-[80px] min-[1440px]:py-[100px]">
          <Ph
            src={w.thumbnail}
            label="작품 썸네일"
            className="aspect-square w-full min-[1440px]:order-2 min-[1440px]:size-[716px] min-[1440px]:shrink-0"
          />
          <div className="flex flex-col gap-[24px] min-[1440px]:flex-1 min-[1440px]:justify-between">
            <div className="flex flex-col gap-[16px] min-[1440px]:gap-[32px]">
              <p className="flex flex-wrap gap-x-[8px] font-ko text-[14px] leading-[1.5] min-[1440px]:gap-x-[16px] min-[1440px]:text-[20px]">
                {w.members.map((m) => (
                  <span key={m}>{m}</span>
                ))}
              </p>
              <div className="flex flex-col gap-[8px] min-[1440px]:gap-[20px]">
                <h1 className="font-ko text-[24px] leading-[1.1] min-[1440px]:text-[48px]">{w.title}</h1>
                <p className="font-ko text-[16px] leading-[1.4] text-red min-[1440px]:text-[34px]">{c?.ko}</p>
              </div>
            </div>
            <p className="font-ko text-[12px] leading-[1.6] whitespace-pre-line text-gray2 min-[1440px]:text-[16px]">{w.description}</p>
          </div>
        </section>

        <section className="flex flex-col pt-[80px]">
          {w.panels.map((src, i) => (
            // 이미지가 있으면 폭 가득 + 원본 비율 높이, 없으면 회색 빈칸(1440×2400)
            <Ph key={i} src={src} size={w.panelSizes?.[i]} label={`웹 판넬 ${i + 1}`} className={src ? "h-auto w-full" : "aspect-[1440/2400] w-full"} />
          ))}
        </section>

        <section className="flex flex-wrap justify-center gap-x-[16px] gap-y-[8px] px-[16px] py-[60px] min-[720px]:py-[80px] min-[1440px]:gap-x-[40px] min-[1440px]:gap-y-[20px] min-[1440px]:px-[80px] min-[1440px]:py-[160px]">
          {members.map(({ ko, d }) =>
            d ? (
              <DesignerCard key={ko} d={d} size="team" />
            ) : (
              <p key={ko} className="font-ko text-[14px]">
                {ko}
              </p>
            ),
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
