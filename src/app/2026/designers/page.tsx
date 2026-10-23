import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { DESIGNERS, frontPhoto } from "../_components/designers";
import { FRAME } from "../_components/SectionBar";
import SiteGate from "../_components/SiteGate";
import SubPage, { Divider, OutlineArrow, TopBox } from "../_components/SubPage";

export const metadata: Metadata = {
  title: "DESIGNERS — KHID 2026 Graduation Exhibition",
  description: "경희대학교 산업디자인학과 2026 졸업전시 디자이너",
};

export const viewport: Viewport = {
  themeColor: "#1980FF",
};

// DESIGNERS 목록. 졸전자 55명(졸준위만 한 사람 제외)을 가나다 순으로, 정면 사진 + 국문·영문 이름. 누르면 개인 프로필.
// 데스크탑(1000~)은 Figma designers(1440) 배치, 프레임(1340 = 100cqw) 비율이라 1000~1439에선 같이 줄고 글자는 그대로.
//
// Figma 실측(1440): 제목 상자 높이 225(위아래 50) — 제목 DESIGNERS 44/600, 24 아래 학과명 20/500, 8 아래 영문 16/500 #A5A5A5,
// 글자는 프레임 왼쪽에서 64 / 오른쪽 칸막이(프레임 왼쪽에서 1094) 뒤 246 칸 가운데 화살표 202.
// 사진 격자: 4열, 칸 250×312.5, 칸 사이 24, 좌우 134, 제목 상자 아래선 → 첫 줄 82, 줄 사이 52.
// 사진 → 이름 18.5, 국문 20/500 – 11 – 영문 16/500(밑줄 맞춤).
// 태블릿(768~999) 3열, 모바일 2열 — 4열이면 이름이 칸보다 길어져서
export default function DesignersPage() {
  return (
    <SiteGate>
      <SubPage current="designers">
        <TopBox>
          <div className="grid grid-cols-[minmax(0,1fr)_var(--a)] [--a:96px] min-[768px]:[--a:150px] min-[1000px]:[--a:calc(246/1340*100cqw)]">
            <div className="px-5 py-6 min-[768px]:px-8 min-[768px]:py-9 min-[1000px]:px-[calc(64/1340*100cqw)] min-[1000px]:py-[49px]">
              <h1 lang="en" className="text-[28px] leading-[normal] font-semibold tracking-[-0.04em] min-[768px]:text-[36px] min-[1000px]:text-[44px]">
                DESIGNERS
              </h1>
              <p className="mt-3 text-[16px] leading-[normal] font-medium tracking-[-0.04em] min-[768px]:mt-4 min-[768px]:text-[18px] min-[1000px]:mt-6 min-[1000px]:text-[20px]">
                경희대학교 산업디자인학과
              </p>
              {/* #A5A5A5: Figma 회색 보조 글자 (영문 학과명·프로필 영문 이름) */}
              <p lang="en" className="mt-1 text-[13px] leading-[normal] font-medium tracking-[-0.04em] text-[#a5a5a5] min-[768px]:text-[14px] min-[1000px]:mt-2 min-[1000px]:text-[16px]">
                Dep. of Industrial Design
              </p>
            </div>
            <div className="relative flex items-center justify-center">
              <Divider />
              <OutlineArrow className="w-[82%]" />
            </div>
          </div>
        </TopBox>

        <div className={`@container mx-auto ${FRAME}`}>
          <ul className="grid grid-cols-2 gap-x-3 gap-y-8 px-3 pt-10 pb-[52px] min-[768px]:grid-cols-3 min-[768px]:gap-x-5 min-[768px]:gap-y-10 min-[768px]:px-[calc(94.11/1340*100cqw)] min-[768px]:pt-[60px] min-[768px]:pb-[80px] min-[1000px]:grid-cols-4 min-[1000px]:gap-x-[calc(24/1340*100cqw)] min-[1000px]:gap-y-[52px] min-[1000px]:px-[calc(134/1340*100cqw)] min-[1000px]:pt-[82px] min-[1000px]:pb-[120px]">
            {DESIGNERS.map((p) => (
              <li key={p.slug}>
                <Link href={`/2026/designers/${p.slug}`} className="group block">
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#ededed]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={frontPhoto(p)}
                      alt={p.ko}
                      loading="lazy"
                      className="absolute inset-0 size-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.04]"
                    />
                  </div>
                  <p className="mt-3 flex flex-wrap items-baseline gap-x-[8px] leading-[normal] font-medium tracking-[-0.04em] min-[1000px]:mt-[18px] min-[1000px]:gap-x-[11px]">
                    <span className="text-[16px] transition-colors group-hover:text-key min-[768px]:text-[18px] min-[1000px]:text-[20px]">{p.ko}</span>
                    <span lang="en" className="text-[13px] transition-colors group-hover:text-key min-[768px]:text-[14px] min-[1000px]:text-[16px]">
                      {p.en}
                    </span>
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </SubPage>
    </SiteGate>
  );
}
