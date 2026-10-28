import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { DesignerCard } from "../../_components/Cards";
import { DESIGNERS, designersIn, GROUPS, groupHref } from "../../_components/designers";
import ListLayout from "../../_components/ListLayout";

// 디자이너 목록 (/2025/designers/<초성>) — 프레이머 /designers/designers-ㄱㄴ 등. 값은 분석 문서 4-2장
// 작품 목록과 같은 틀. 다른 점: 위쪽 소개가 화면 높이만큼, 학과명·전체 이름은 아래쪽 끝에 붙음
// 학과명 한 34/140 · 영 34/110 (Tablet 28 / Phone 22·20), 전체 이름 16/160 회색
// 카드: 가운데, 간격 가로 16·세로 36 (Tablet 16·28 / Phone 12·24), 패딩 100 60 (80 40 / 40 16) → Desktop 4열 / Tablet 2열 / Phone 2열(작은 카드)
export function generateStaticParams() {
  return GROUPS.map((g) => ({ group: g.slug }));
}

export async function generateMetadata({ params }: PageProps<"/2025/designers/[group]">): Promise<Metadata> {
  const { group } = await params;
  const g = GROUPS.find((x) => x.slug === group);
  return { title: `DESIGNERS ${g ? g.label : ""} — KHID 2025 Graduation Exhibition` };
}

// 주소에서 읽는 값(params)은 Suspense 안에서 읽어야 페이지 이동이 바로 됨 (Next.js 16 instant 검사)
export default function GroupPage({ params }: PageProps<"/2025/designers/[group]">) {
  return (
    <Suspense fallback={null}>
      <GroupView params={params} />
    </Suspense>
  );
}

async function GroupView({ params }: { params: PageProps<"/2025/designers/[group]">["params"] }) {
  const { group } = await params;
  const g = GROUPS.find((x) => x.slug === group);
  if (!g) notFound();
  const list = designersIn(g);

  return (
    <ListLayout
      current="designers"
      tabs={GROUPS.map((x) => ({ key: x.slug, label: x.label, href: groupHref(x) }))}
      tabKey={g.slug}
      title={{ label: "(PLAYER)S", w: "w-[219px]", tabletW: "min-[720px]:w-[420px]", desktopW: "min-[1440px]:w-[696px]" }}
      fullHeightTop
      bar={{ ko: g.label }}
      info={
        <div className="flex w-full flex-col gap-[16px] min-[720px]:flex-1 min-[720px]:justify-between">
          <div className="flex flex-col gap-[8px]">
            <p className="font-ko text-[22px] leading-[1.4] min-[720px]:text-[28px] min-[1440px]:text-[34px]">경희대학교 산업디자인학과</p>
            <p className="font-en text-[20px] leading-[1.1] min-[720px]:text-[28px] min-[1440px]:text-[34px]">
              Dep. of Industrial Design,
              <br className="min-[720px]:hidden" /> Kyunghee University
            </p>
          </div>
          <p className="font-ko text-[16px] leading-[1.6] text-gray">{DESIGNERS.map((d) => d.ko).join(", ")}</p>
        </div>
      }
    >
      <div className="flex flex-wrap justify-center gap-x-[12px] gap-y-[24px] px-[16px] py-[40px] min-[720px]:gap-x-[16px] min-[720px]:gap-y-[28px] min-[720px]:px-[40px] min-[720px]:py-[80px] min-[1440px]:gap-y-[36px] min-[1440px]:px-[60px] min-[1440px]:py-[100px]">
        {list.length ? list.map((d) => <DesignerCard key={d.slug} d={d} size="list" />) : <p className="py-20 text-gray">[데이터] 디자이너 없음</p>}
      </div>
    </ListLayout>
  );
}
