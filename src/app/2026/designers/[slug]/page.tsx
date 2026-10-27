import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import CopyText from "../../_components/CopyText";
import { DESIGNERS, posePhoto } from "../../_components/designers";
import { worksOf } from "../../_components/projects";
import { FRAME } from "../../_components/SectionBar";
import SiteGate from "../../_components/SiteGate";
import SubPage, { OutlineArrow, TopBox } from "../../_components/SubPage";
import WorkCard from "../../_components/WorkCard";

// 개인 프로필 (/2026/designers/<slug>). 위 상자: 왼쪽 자유컷 크게 + 국문·영문 이름, CONTACT, PORTFOLIO + 큰 화살표.
// 아래: 이 사람의 작품 카드(WorkCard) — projects.ts에서 members에 이 사람 이름이 있는 작품(제목 가나다-abc 순). 3개보다 적으면 남는 자리는 "작품 제목" 빈 카드.
// 데스크탑(1000~)은 Figma designers/profiles(1440) 배치, 프레임(1340 = 100cqw) 비율.
//
// Figma 실측(1440): 위 상자 높이 724(위아래 50), 사진 500×623.85(프레임 왼쪽에서 49), 사진 → 정보 58, 정보 줄은 사진 아래에 맞춤.
// 이름 국문 44/600 – 16 – 영문 32/500 #777(2026-10-23 결정, 국문은 ink), 45 아래 CONTACT·PORTFOLIO(20/600 #1980FF, 값은 라벨 왼쪽에서 116, 16/400, 줄 사이 17·8).
// 화살표 202는 정보 오른쪽 끝(프레임 오른쪽에서 48). 600~(사진 옆 배치)은 사진 아래 끝에 정보 마지막 줄 글자 바닥(기준선)과 화살표 그림 아래 끝을 맞춤(2026-10-27 결정)
// — 글자는 줄 높이 아래 여백(글자 크기의 약 22%)만큼, 화살표는 SVG 아래 빈칸(21.9/202 = 10.84%)만큼 내림.
// 작품: 위 상자 아래선 → 106, 3열 357.14×446.43(좌우 50, 사이 84), 그림 → 제목 → 이름들. 2026-10-23 결정: Figma(제목 28.57·이름 20)보다 줄여 제목 20/500 · 이름 16/500(사이 8), 글자는 그림보다 4 안쪽에서 시작.
// 600~999도 데스크탑처럼 사진 왼쪽 | 정보 오른쪽. 사진을 프레임 폭의 34%로 줄이고 여백 24, 사진 → 정보 28, 이름 32/24, 화살표 88.
// 모바일(~599)은 사진 → 정보 세로 배치(좌우 여백 20, 위아래 40, 사진은 최대 480 가로 가운데, 정보 줄도 사진 폭에 맞추고 글자는 사진보다 4 안쪽), 작품은 모바일 1열(사진과 같은 폭: 최대 480 가운데) / 600~ 3열
export function generateStaticParams() {
  return DESIGNERS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/2026/designers/[slug]">): Promise<Metadata> {
  const slug = decodeURIComponent((await params).slug);
  const p = DESIGNERS.find((d) => d.slug === slug);
  return {
    title: `${p ? `${p.ko} ${p.en}` : "DESIGNERS"} — KHID 2026 Graduation Exhibition`,
    description: "경희대학교 산업디자인학과 2026 졸업전시 디자이너",
  };
}

export const viewport: Viewport = {
  themeColor: "#1980FF",
};

export default function ProfilePage({ params }: PageProps<"/2026/designers/[slug]">) {
  return (
    <SiteGate>
      <Profile params={params} />
    </SiteGate>
  );
}

const LABEL = "text-[16px] leading-[normal] font-semibold tracking-[-0.04em] text-key min-[768px]:text-[18px] min-[1000px]:text-[20px]";
const VALUE = "text-[14px] leading-[normal] tracking-[-0.04em] break-all min-[768px]:text-[15px] min-[1000px]:text-[16px]";
const EMPTY = <span className="text-[#a5a5a5]">준비 중</span>;

// CONTACT 이메일은 누르면 복사(CopyText — 2026 사이트 메일은 전부 복사). 포트폴리오(선택)는 안 쓴 사람이면 PORTFOLIO 줄 자체를 뺌. 값: http로 시작하면 그대로, @계정은 인스타그램, 나머지 주소는 https:// 붙여서 링크
function href(v: string) {
  if (/^https?:\/\//.test(v)) return v;
  if (v.startsWith("@")) return `https://www.instagram.com/${v.slice(1)}/`;
  return `https://${v}`;
}

async function Profile({ params }: { params: PageProps<"/2026/designers/[slug]">["params"] }) {
  const slug = decodeURIComponent((await params).slug);
  const p = DESIGNERS.find((d) => d.slug === slug);
  if (!p) notFound();
  const works = worksOf(p.ko);

  return (
    <SubPage current="designers">
      <TopBox back="/2026/designers">
        <div className="grid gap-y-8 px-5 py-10 min-[600px]:grid-cols-[34cqw_minmax(0,1fr)] min-[600px]:gap-x-[28px] min-[600px]:max-[1000px]:p-[24px] min-[1000px]:grid-cols-[calc(500/1340*100cqw)_minmax(0,1fr)] min-[1000px]:gap-x-[calc(58/1340*100cqw)] min-[1000px]:pt-[49px] min-[1000px]:pr-[calc(48/1340*100cqw)] min-[1000px]:pb-[49px] min-[1000px]:pl-[calc(49/1340*100cqw)]">
          <div className="relative mx-auto aspect-[500/623.85] w-full max-w-[480px] overflow-hidden bg-[#ededed] min-[600px]:mx-0 min-[600px]:max-w-none">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={posePhoto(p)} alt={p.ko} className="absolute inset-0 size-full object-cover object-top" />
          </div>

          <div className="mx-auto flex w-full max-w-[480px] items-end justify-between gap-4 pl-[4px] min-[600px]:mx-0 min-[600px]:max-w-none min-[600px]:self-end min-[600px]:pl-0">
            <div className="min-w-0 min-[600px]:translate-y-[3.3px] min-[1000px]:translate-y-[3.5px]">
              <h1 className="flex flex-wrap items-baseline gap-x-3 leading-[normal] tracking-[-0.04em] min-[1000px]:gap-x-4">
                <span className="text-[30px] font-semibold text-ink min-[600px]:text-[32px] min-[1000px]:text-[44px]">{p.ko}</span>
                <span lang="en" className="text-[20px] font-medium text-[#777] min-[600px]:text-[24px] min-[1000px]:text-[32px]">
                  {p.en}
                </span>
              </h1>
              <dl className="mt-6 grid grid-cols-[auto_minmax(0,1fr)] items-baseline gap-x-[14px] gap-y-[14px] min-[1000px]:mt-[45px] min-[1000px]:gap-x-[18px] min-[1000px]:gap-y-[17px]">
                <dt lang="en" className={LABEL}>CONTACT</dt>
                <dd className={VALUE}>{p.contact ? <CopyText text={p.contact} /> : EMPTY}</dd>
                {p.portfolio.length > 0 && (
                  <>
                    <dt lang="en" className={LABEL}>PORTFOLIO</dt>
                    <dd className={`${VALUE} flex flex-col gap-2`}>
                      {p.portfolio.map((v) => (
                        <a key={v} href={href(v)} target="_blank" rel="noreferrer" className="hover:text-key">
                          {v}
                        </a>
                      ))}
                    </dd>
                  </>
                )}
              </dl>
            </div>
            <OutlineArrow className="w-[72px] shrink-0 min-[600px]:translate-y-[10.84%] [--sw:1.1px] min-[600px]:w-[88px] min-[600px]:[--sw:1.3px] min-[1000px]:w-[calc(202/1340*100cqw)] min-[1000px]:[--sw:1.5px]" />
          </div>
        </div>
      </TopBox>

      <section aria-label={`${p.ko}의 작품`} className={`@container mx-auto ${FRAME}`}>
        <ul className="grid gap-y-10 px-5 pt-10 pb-[52px] min-[600px]:grid-cols-3 min-[600px]:gap-x-5 min-[600px]:px-6 min-[600px]:pt-[60px] min-[600px]:pb-[80px] min-[1000px]:gap-x-[calc(84/1340*100cqw)] min-[1000px]:px-[calc(50/1340*100cqw)] min-[1000px]:pt-[106px] min-[1000px]:pb-[120px]">
          {[...works, ...Array(Math.max(0, 3 - works.length)).fill(null)].map((w, i) => (
            <li key={i} className="mx-auto w-full max-w-[480px] min-[600px]:max-w-none">
              {w ? <WorkCard project={w} /> : <WorkCard title="작품 제목" />}
            </li>
          ))}
        </ul>
      </section>
    </SubPage>
  );
}
