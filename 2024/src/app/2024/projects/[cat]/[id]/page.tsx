import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Ph from "../../../_components/Ph";
import { WORKS, memberNames, parsePanel, type Work } from "../../../_components/works";

// 작품 상세 (/2024/projects/<과목>/<id>) — 아임웹 작품 페이지 그대로: 제목·글 없이 판넬 이미지·영상을 위에서부터 틈 없이 이어 붙임
// 판넬 폭: 모두 같게 — 양옆 15 여백, 최대 1270 (아임웹은 첫 판넬만 화면 폭 가득·최대 1250이었지만 여백을 맞춤, 사용자 결정 2026-11-05)
// 이미지는 아직 없음 → 원본 픽셀 비율대로 빈칸 (works.ts panels)
export function generateStaticParams() {
  return WORKS.filter((w) => w.detail).map((w) => ({ cat: w.cat, id: w.id }));
}

// 상세 판넬이 없는 작품은 상세 주소도 없음(404)
const find = (cat: string, id: string) => WORKS.find((w) => w.cat === cat && w.id === id && w.detail);

export async function generateMetadata({ params }: PageProps<"/2024/projects/[cat]/[id]">): Promise<Metadata> {
  const { cat, id } = await params;
  const w = find(cat, id);
  return { title: `${w ? w.title || memberNames(w) : "Works"} — KHID 2024 Graduation Exhibition` };
}

// 주소에서 읽는 값(params)은 Suspense 안에서 읽어야 페이지 이동이 바로 됨 (Next.js 16 instant 검사)
export default function WorkPage({ params }: PageProps<"/2024/projects/[cat]/[id]">) {
  return (
    <Suspense fallback={null}>
      <WorkView params={params} />
    </Suspense>
  );
}

async function WorkView({ params }: { params: PageProps<"/2024/projects/[cat]/[id]">["params"] }) {
  const { cat, id } = await params;
  const w = find(cat, id);
  if (!w) notFound();
  return (
    <article>
      <h1 className="sr-only">{w.title || memberNames(w)}</h1>
      <Panels work={w} />
    </article>
  );
}

function Panels({ work }: { work: Work }) {
  const panels = work.panels.map(parsePanel);
  // 이미지 칸마다 몇 번째 이미지인지 → work.images[순서]
  const imageNo = panels.map((_, i) => panels.slice(0, i).filter((p) => p.kind === "image").length);
  return panels.map((panel, i) => {
    const box = "mx-auto w-[calc(100%-30px)] max-w-[1270px]";
    if (panel.kind === "image") {
      const n = imageNo[i];
      return <Ph key={i} src={work.images?.[n]} label={`판넬 ${n + 1}`} size={[panel.w, panel.h]} className={`${box} h-auto`} />;
    }
    const src =
      panel.kind === "youtube"
        ? `https://www.youtube-nocookie.com/embed/${panel.id}?rel=0`
        : `https://player.vimeo.com/video/${panel.id}`;
    return (
      <div key={i} className={box}>
        <iframe src={src} title={`${work.title} 영상`} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen className="block aspect-video w-full border-0" />
      </div>
    );
  });
}
