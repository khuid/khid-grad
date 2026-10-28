import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { DESIGNERS, groupOf, QUESTIONS } from "../../../_components/designers";
import Footer from "../../../_components/Footer";
import Header from "../../../_components/Header";
import Ph from "../../../_components/Ph";
import ProfileHero from "../../../_components/ProfileHero";
import { workHref, worksOf } from "../../../_components/works";

// 디자이너 프로필 (/2025/designers/<초성>/<slug>) — 프레이머 /profile-ㄱㄴ/프로필-강한세 등 63개 공통 틀. 값은 분석 문서 4-3장
// 맨 위 큰 이미지(16:9, 작품 이미지 번갈아) → 본문 [프로필 | 작품 정사각형 목록] → 푸터
// 본문: Desktop 패딩 60·간격 24, 프로필 폭 519 + 작품 777 (사이 80) / Tablet 패딩 40, 252 + 364 (사이 52) / Phone 세로, 패딩 40, 간격 60, 작품 폭 가득×310 (사이 24)
// 프로필(profile 컴포넌트 profile / middle(Tablet) / small(Phone)):
//   묶음 간격 72 / 40 / 40, 사진(519:688)–이름 46 / 8 / 20, 이름 한 34/140·영 34/110 (20 / 24)
//   자기소개 Inter Display 20/160% (14 / 16) 검정, 자기소개–질문 Desktop은 위아래로 벌림(높이 777) / 64 / 40, 질문 사이 32 / 48 / 32
//   질문 제목 20/150 빨강 (14 / 16) → 4 → 질문 16/150 검정 (12 / 14) → 8 → 답변 Inter Display 16/160% #73787E (12 / 14)
//   연락처: 라벨 E-MAIL·PORTFOLIO 20/150 검정 + 16 + 값 16/150 회색 (14 / 14), 두 줄 사이 8
export function generateStaticParams() {
  return DESIGNERS.map((d) => ({ group: groupOf(d).slug, slug: d.slug }));
}

const find = (group: string, slug: string) => DESIGNERS.find((d) => d.slug === slug && groupOf(d).slug === group);

export async function generateMetadata({ params }: PageProps<"/2025/designers/[group]/[slug]">): Promise<Metadata> {
  const { group, slug } = await params;
  const d = find(group, slug);
  return { title: `${d ? `${d.ko} ${d.en}` : "DESIGNERS"} — KHID 2025 Graduation Exhibition` };
}

// 주소에서 읽는 값(params)은 Suspense 안에서 읽어야 페이지 이동이 바로 됨 (Next.js 16 instant 검사)
export default function ProfilePage({ params }: PageProps<"/2025/designers/[group]/[slug]">) {
  return (
    <Suspense fallback={null}>
      <ProfileView params={params} />
    </Suspense>
  );
}

async function ProfileView({ params }: { params: PageProps<"/2025/designers/[group]/[slug]">["params"] }) {
  const { group, slug } = await params;
  const d = find(group, slug);
  if (!d) notFound();
  const works = worksOf(d.ko).slice(0, 3);

  return (
    <div className="min-h-screen bg-paper">
      <Header current="designers" />
      <main>
        {/* [데이터] 프레이머는 작품 이미지 3장을 번갈아 보여 줌 — 실제 이미지가 오면 works의 대표 이미지로 */}
        <ProfileHero images={works.length ? works.map((w) => w.thumbnail) : [undefined]} />

        <div className="flex flex-col items-center gap-[60px] bg-white p-[40px] min-[720px]:flex-row min-[720px]:items-start min-[720px]:justify-center min-[720px]:gap-[24px] min-[1440px]:p-[60px]">
          <article className="flex w-full flex-col gap-[40px] min-[720px]:w-[252px] min-[1440px]:w-[519px] min-[1440px]:gap-[72px]">
            <div className="flex flex-col gap-[20px] min-[720px]:gap-[8px] min-[1440px]:gap-[46px]">
              <Ph src={d.photo} label="프로필 사진" className="aspect-[519/688] w-full" />
              <h1 className="flex flex-wrap items-end gap-x-[16px] gap-y-[4px] text-black min-[720px]:gap-[20px]">
                <span className="font-ko text-[24px] leading-[1.4] min-[720px]:text-[20px] min-[1440px]:text-[34px]">{d.ko}</span>
                <span className="font-en text-[24px] leading-[1.1] min-[720px]:text-[20px] min-[1440px]:text-[34px]">{d.en}</span>
              </h1>
            </div>

            <div className="flex flex-col gap-[40px] min-[720px]:gap-[64px] min-[1440px]:min-h-[777px] min-[1440px]:justify-between">
              <p className="font-inter text-[16px] leading-[1.6] text-black min-[720px]:text-[14px] min-[1440px]:text-[20px]">{d.intro}</p>
              <div className="flex flex-col gap-[32px] min-[720px]:gap-[48px] min-[1440px]:gap-[32px]">
                {QUESTIONS.map((q, i) => (
                  <div key={q.title} className="flex flex-col gap-[8px]">
                    <div className="flex flex-col gap-[4px] font-ko leading-[1.5]">
                      <h2 className="text-[16px] text-red min-[720px]:text-[14px] min-[1440px]:text-[20px]">{q.title}</h2>
                      <p className="text-[14px] text-black min-[720px]:text-[12px] min-[1440px]:text-[16px]">{q.text}</p>
                    </div>
                    <p className="font-inter text-[14px] leading-[1.6] text-gray min-[720px]:text-[12px] min-[1440px]:text-[16px]">{d.answers[i]}</p>
                  </div>
                ))}
              </div>
            </div>

            <dl className="flex flex-col gap-[8px] font-en leading-[1.5]">
              {d.email && (
                <div className="flex flex-wrap items-baseline gap-x-[16px] gap-y-[4px]">
                  <dt className="text-[20px] text-black">E-MAIL</dt>
                  <dd className="text-[14px] text-gray min-[1440px]:text-[16px]">{d.email}</dd>
                </div>
              )}
              {d.portfolio && (
                <div className="flex flex-wrap items-baseline gap-x-[16px] gap-y-[4px]">
                  <dt className="text-[20px] text-black">PORTFOLIO</dt>
                  <dd className="text-[14px] text-gray min-[1440px]:text-[16px]">
                    <a href={d.portfolio.href} target="_blank" rel="noreferrer" className="hover:underline">
                      {d.portfolio.text}
                    </a>
                  </dd>
                </div>
              )}
            </dl>
          </article>

          {/* 작품 목록 — 프레이머 project_thumbnail (정사각형). [확인 필요] 썸네일 위 글자·hover 모습은 프레이머에서 못 읽음 */}
          <div className="flex w-full flex-col gap-[24px] min-[720px]:w-[364px] min-[720px]:gap-[52px] min-[1440px]:w-[777px] min-[1440px]:gap-[80px]">
            {works.map((w) => (
              <Link key={w.id + w.cat} href={workHref(w)} aria-label={w.title}>
                <Ph src={w.thumbnail} label={`작품 썸네일 — ${w.title}`} className="h-[310px] w-full min-[720px]:aspect-square min-[720px]:h-auto" />
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
