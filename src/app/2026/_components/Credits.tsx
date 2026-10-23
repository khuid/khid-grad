import CommitteeGrid from "./CommitteeGrid";
import { MEMBERS, TEAMS } from "./committee";
import SectionBar, { FRAME } from "./SectionBar";

// [4] 졸업전시준비위원회 + 후원사. [3]처럼 흰 배경 + #1A6AE8 프레임 선, 띠마다 "띠 + 내용"을 감싸 sticky.
// 여백은 데스크탑(1000~)에서 프레임 폭(1340 = 100cqw) 비율, 글자 크기는 고정.
//
// ── 졸준위 ── Figma 실측(1440): 띠 아래 62 / 사진 격자 1151.78 (가운데) / 82 / 팀·이름 두 줄(61, 줄 사이 40) / 120.5
// 팀·이름은 격자 왼쪽에서 0 · 486 · 975에 세 칸, 순서는 위 사진 순서와 같음.
// 팀명 24 SemiBold, 이름 20 Regular(이름 사이 20), 팀명 → 이름 10, 전부 #1A6AE8. P.O.와 AnF는 한 칸에 48 간격으로 나란히.
// 태블릿은 세 칸을 같은 폭으로.
// 모바일은 Figma iPhone 390: 격자(334) 아래 63 / 두 칸, 격자 왼쪽에서 16 · 186.8 / 줄 간격 70(묶음 41.7) /
// 팀명 16.13, 이름 13.44(이름 사이 13.44), 팀명 → 이름 6.72, P.O.–AnF 31.4
//
// ── 후원사 ── Figma 실측(1440): 띠 아래 100 / 로고 300×300 네 개를 붙여서 가운데 / 120
const SPONSORS = [
  { name: "피아바", src: "/2026/sponsors/fiaba.svg" },
  { name: "댄싱사이다", src: "/2026/sponsors/dancingcider.svg" },
  { name: "릭스폰트", src: "/2026/sponsors/fontrix.svg" },
  { name: "3D페이지", src: "/2026/sponsors/3dpage.svg" },
];

// 팀·이름 묶음 (사진 순서와 같은 순서로 채움: 데스크탑·태블릿 3칸, 모바일 2칸)
const CREDITS: string[][] = [["po", "anf"], ["comm"], ["mkt"], ["space"], ["brand"], ["web"]];

function TeamCredit({ team }: { team: string }) {
  const t = TEAMS.find((x) => x.key === team)!;
  return (
    <div className="flex flex-col gap-[6.72px] whitespace-nowrap text-rule min-[768px]:gap-[6px] min-[1000px]:gap-[10px]">
      <p className="text-heading max-[767px]:text-[16.13px]/[19px] min-[768px]:max-[999px]:text-[20px]">{t.title}</p>
      <p className="flex gap-x-[13.44px] text-[13.44px]/[16px] font-normal tracking-[-0.04em] min-[768px]:gap-x-[16px] min-[768px]:text-[17px]/[1.15] min-[1000px]:gap-x-[20px] min-[1000px]:text-[20px]/[1.15]">
        {MEMBERS.filter((m) => m.team === team).map((m) => (
          <span key={m.name}>{m.name}</span>
        ))}
      </p>
    </div>
  );
}

export default function Credits() {
  return (
    <section id="credits" aria-label="졸업전시준비위원회와 후원사" className="relative bg-white">
      {/* 프레임 세로선: 구역 맨 위부터 끝까지 */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 border-x border-rule ${FRAME}`}
      />

      <div>
        <SectionBar id="committee-title" ko="졸업전시준비위원회" en="PREPARATORY COMMITTEE" />
        <div className={`@container relative mx-auto ${FRAME}`}>
          <div className="px-3 pt-8 pb-12 min-[768px]:px-7 min-[768px]:pt-10 min-[768px]:pb-14 min-[1000px]:mx-auto min-[1000px]:w-[calc(1151.78/1340*100cqw)] min-[1000px]:px-0 min-[1000px]:pt-[calc(62/1340*100cqw)] min-[1000px]:pb-[calc(120.5/1340*100cqw)]">
            <CommitteeGrid />
            <ul
              aria-labelledby="committee-title"
              className="mt-[63px] grid grid-cols-[170.84fr_147.16fr] gap-y-[28.28px] pl-4 min-[768px]:mt-10 min-[768px]:grid-cols-3 min-[768px]:gap-x-4 min-[768px]:gap-y-8 min-[768px]:pl-0 min-[1000px]:mt-[calc(82/1340*100cqw)] min-[1000px]:grid-cols-[486fr_489fr_176.78fr] min-[1000px]:gap-x-0 min-[1000px]:gap-y-[40px]"
            >
              {CREDITS.map((teams) => (
                <li key={teams.join()} className="flex gap-[31.4px] min-[768px]:gap-[32px] min-[1000px]:gap-[48px]">
                  {teams.map((t) => (
                    <TeamCredit key={t} team={t} />
                  ))}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div>
        <SectionBar id="sponsor-title" ko="후원사" en="SPONSORSHIP" />
        <div className={`@container relative mx-auto ${FRAME}`}>
          <ul
            aria-labelledby="sponsor-title"
            className="mx-auto grid w-full grid-cols-2 px-4 pt-8 pb-12 min-[768px]:grid-cols-4 min-[768px]:px-7 min-[768px]:pt-10 min-[768px]:pb-14 min-[1000px]:w-[calc(1200/1340*100cqw)] min-[1000px]:px-0 min-[1000px]:pt-[calc(100/1340*100cqw)] min-[1000px]:pb-[calc(120/1340*100cqw)]"
          >
            {SPONSORS.map((s) => (
              <li key={s.name}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.src} alt={s.name} width={300} height={300} className="block aspect-square h-auto w-full" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
