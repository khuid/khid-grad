import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import WorkCards from "../../_components/WorkCards";
import { CATEGORIES, WORKS, categoryOf } from "../../_components/works";

// 과목별 작품 목록 (/2024/projects/<과목>) — 아임웹 과목 페이지 그대로: 과목 이름 없이 작품 카드만
// 메뉴에만 있고 아임웹 목록에 없던 작품(hidden)은 빼고 보여 줌
export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ cat: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/2024/projects/[cat]">): Promise<Metadata> {
  const c = categoryOf((await params).cat);
  return { title: `${c?.name ?? "Works"} — KHID 2024 Graduation Exhibition` };
}

// 주소에서 읽는 값(params)은 Suspense 안에서 읽어야 페이지 이동이 바로 됨 (Next.js 16 instant 검사)
export default function CategoryPage({ params }: PageProps<"/2024/projects/[cat]">) {
  return (
    <Suspense fallback={null}>
      <CategoryView params={params} />
    </Suspense>
  );
}

async function CategoryView({ params }: { params: PageProps<"/2024/projects/[cat]">["params"] }) {
  const c = categoryOf((await params).cat);
  if (!c) notFound();
  return (
    <div className="mx-auto max-w-[1280px] px-[15px] pb-[15px]">
      <h1 className="sr-only">{c.name}</h1>
      <WorkCards works={WORKS.filter((w) => w.cat === c.slug && !w.hidden)} />
    </div>
  );
}
