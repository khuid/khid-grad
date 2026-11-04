import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import WorkCards from "../../_components/WorkCards";
import { DESIGNERS } from "../../_components/designers";
import { worksOf } from "../../_components/works";

// 디자이너 페이지 (/2024/designers/<번호>) — 아임웹 디자이너 페이지 그대로: 이름·사진 없이 그 사람이 팀원인 작품 카드만
// 아임웹에는 앞의 8명(강민지~김소현)만 채워져 있고 나머지는 빈 페이지였음 → 작품 팀원 이름으로 45명 모두 채움
export function generateStaticParams() {
  return DESIGNERS.map((d) => ({ slug: d.slug }));
}

const find = (slug: string) => DESIGNERS.find((d) => d.slug === slug);

export async function generateMetadata({ params }: PageProps<"/2024/designers/[slug]">): Promise<Metadata> {
  const d = find((await params).slug);
  return { title: `${d ? (d.menu ?? d.ko) : "Designer"} — KHID 2024 Graduation Exhibition` };
}

// 주소에서 읽는 값(params)은 Suspense 안에서 읽어야 페이지 이동이 바로 됨 (Next.js 16 instant 검사)
export default function DesignerPage({ params }: PageProps<"/2024/designers/[slug]">) {
  return (
    <Suspense fallback={null}>
      <DesignerView params={params} />
    </Suspense>
  );
}

async function DesignerView({ params }: { params: PageProps<"/2024/designers/[slug]">["params"] }) {
  const d = find((await params).slug);
  if (!d) notFound();
  return (
    <div className="mx-auto max-w-[1280px] px-[15px] pb-[15px]">
      <h1 className="sr-only">{d.menu ?? d.ko}</h1>
      <WorkCards works={worksOf(d.ko)} />
    </div>
  );
}
