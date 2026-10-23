// 푸터. 파란 배경(#1980FF) + 흰 글자, 프레임과 같은 폭(1340, 좌우 50)에 위아래 40.
// 1200~은 Figma 배치(1000~1199는 두 칸이 좁아 제목이 꺾여서 태블릿처럼 세로 배치): 왼쪽 전시명·제목·부제 → 52 아래 경희 휘장 + KHID 로고 /
// 오른쪽 위 큰 화살표(58), 오른쪽 아래 WHERE · WHEN · ABOUT KHID 세 칸(칸 사이 24).
// 그 아래(~1199)는 제목(+오른쪽 화살표) → 정보 → 로고 순 세로 배치, 모바일은 정보도 한 칸씩.
//
// Figma 실측(1440): 높이 340 / 전시명 14 → 16 → 제목 40(ExtraBold, 둘째 줄 SemiBold) → 8 → 부제 28 Medium /
// 휘장 40 – 12 – 로고 52×18 / 항목명 16 SemiBold → 8 → 내용 14 Regular(줄 사이 2), WHEN 칸 194 · ABOUT 칸 114.
// 날짜는 [3] 전시안내와 같은 표기로 맞춤. Figma의 "WEHN"은 오타라 WHEN으로.
import { FRAME } from "./SectionBar";

const INFO = [
  { label: "WHERE", lines: ["경희대학교 국제캠퍼스 예술디자인대학", "2층 A&D HALL"], width: "" },
  {
    label: "WHEN",
    lines: ["2026. 11. 11(수) → 2026. 11. 16(월)", "10:00 - 20:00"],
    width: "min-[1200px]:w-[194px]",
  },
  {
    label: "ABOUT KHID",
    lines: [
      <a key="ig" href="https://www.instagram.com/khid.2026/" target="_blank" rel="noreferrer" className="hover:underline">
        @khid.2026
      </a>,
      <a key="web" href="https://khid.exhibit.khu.ac.kr" target="_blank" rel="noreferrer" className="hover:underline">
        khid.exhibit.khu.ac.kr
      </a>,
    ],
    width: "min-[1200px]:w-[114px]",
  },
];

export default function Footer() {
  return (
    <footer data-cursor="light" className="bg-key text-white">
      <div
        className={`mx-auto grid gap-y-10 py-10 [grid-template-areas:'title'_'info'_'logo'] min-[768px]:gap-y-12 min-[1200px]:grid-cols-[1fr_auto] min-[1200px]:grid-rows-[auto_1fr_auto] min-[1200px]:gap-y-[52px] min-[1200px]:[grid-template-areas:'title_arrow'_'title_info'_'logo_info'] ${FRAME}`}
      >
        {/* 전시명 · 제목 · 부제 (~1199는 화살표를 전시명 줄 오른쪽에 둬서 제목이 폭을 다 쓰게) */}
        <div className="flex flex-col gap-4 [grid-area:title]">
          <div className="flex items-start justify-between gap-6">
            <p className="text-caption">제 35회 경희대학교 산업디자인학과 졸업전시</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/2026/arrow-l.svg"
              alt=""
              aria-hidden
              className="block size-[40px] shrink-0 min-[768px]:size-[52px] min-[1200px]:hidden"
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-display max-[360px]:text-[22px] min-[360px]:max-[768px]:text-[26px] min-[768px]:max-[1000px]:text-[34px]">
              THIS IS NOT GRADUATION
              <br />
              <span className="font-semibold">:THIS IS A NEW PATHWAY</span>
            </p>
            <p className="text-title leading-[normal] max-[768px]:text-[18px] min-[768px]:max-[1000px]:text-[24px]">
              하나의 끝, 새로운 길
            </p>
          </div>
        </div>

        {/* 데스크탑 오른쪽 위 화살표 */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/2026/arrow-l.svg"
          alt=""
          aria-hidden
          className="hidden size-[58px] justify-self-end [grid-area:arrow] min-[1200px]:block"
        />

        {/* WHERE · WHEN · ABOUT KHID */}
        <dl className="flex flex-col gap-5 [grid-area:info] min-[768px]:flex-row min-[768px]:gap-6 min-[1200px]:self-end">
          {INFO.map((item) => (
            <div key={item.label} className={`flex flex-col gap-2 ${item.width}`}>
              <dt className="text-label">{item.label}</dt>
              <dd className="text-caption flex flex-col gap-[2px] whitespace-nowrap">
                {item.lines.map((l, i) => (
                  <span key={i}>{l}</span>
                ))}
              </dd>
            </div>
          ))}
        </dl>

        {/* 경희 휘장 + KHID 로고 */}
        <div className="flex items-center gap-3 [grid-area:logo]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/2026/footer/khu-emblem.svg" alt="경희대학교" width={40} height={40} className="block size-[40px]" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/2026/footer/khid-logo.svg" alt="KHID" width={52} height={18} className="block h-[18px] w-[52px]" />
        </div>
      </div>
    </footer>
  );
}
