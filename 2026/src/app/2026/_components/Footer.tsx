// 푸터. 파란 배경(#1980FF) + 흰 글자, 프레임과 같은 폭(1340, 좌우 50)에 위아래 40.
// 1200~은 Figma 배치(1000~1199는 두 칸이 좁아 제목이 꺾여서 태블릿처럼 세로 배치): 왼쪽 전시명·제목·부제 → 52 아래 경희 휘장 + KHID 로고 /
// 오른쪽 위 큰 화살표(58), 오른쪽 아래 WHERE · WHEN · ABOUT KHID 세 칸(칸 사이 24).
// 태블릿(768~1199)은 제목(+오른쪽 화살표) 아래 한 줄에 휘장·로고 ←여백→ 정보.
// 모바일은 프레임 안쪽으로 좌우 여백을 더 줘서(졸준위 사진 격자보다 4 바깥, 같은 비율: 390에서 프레임+8, 넓어지면 늘어난 폭의 6%씩) 제목 → 정보(항목마다 내용 한 줄, 좁으면 줄바꿈) → 로고 순 세로 배치.
//
// Figma 실측(1440): 높이 340 / 전시명 14 → 16 → 제목 40(ExtraBold, 둘째 줄 SemiBold) → 8 → 부제 28 Medium /
// 휘장 40 – 12 – 로고 52×18 / 항목명 16 SemiBold → 8 → 내용 14 Regular(줄 사이 2), WHEN 칸 194 · ABOUT 칸 114.
// 날짜는 [3] 전시안내와 같은 표기로 맞춤. Figma의 "WEHN"은 오타라 WHEN으로.
import { FRAME } from "./SectionBar";

const INFO = [
  { label: "WHERE", lines: ["경희대학교 국제캠퍼스 예술디자인대학", "2층 A&D HALL"], width: "", gap: "gap-x-[6px]" },
  {
    label: "WHEN",
    lines: ["2026. 11. 11(수) → 2026. 11. 16(월)", "10:00 - 20:00"],
    width: "min-[1200px]:w-[194px]",
    gap: "gap-x-[6px]",
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
    gap: "gap-x-[16px]", // 모바일 한 줄일 때 인스타 계정과 사이트 주소가 붙어 보이지 않게
  },
];

export default function Footer() {
  return (
    <footer data-cursor="light" className="bg-key text-white">
      <div
        className={`mx-auto grid gap-y-10 py-10 max-[768px]:px-[calc(8px+(100%-390px)*0.06)] [grid-template-areas:'title'_'info'_'logo'_'note'] min-[768px]:grid-cols-[auto_1fr] min-[768px]:gap-y-12 min-[768px]:[grid-template-areas:'title_title'_'logo_info'_'note_note'] min-[1200px]:grid-cols-[1fr_auto] min-[1200px]:grid-rows-[auto_1fr_auto_auto] min-[1200px]:gap-y-[52px] min-[1200px]:[grid-template-areas:'title_arrow'_'title_info'_'logo_info'_'note_note'] ${FRAME}`}
      >
        {/* 모바일 제목 크기는 화살표와 안 겹치게 폭별로: ~330 20 / 331~359 22 / 360~381 24 / 382~ 26 */}
        {/* 전시명 · 제목 · 부제. ~1199는 화살표를 오른쪽 위 모서리에 띄워 둬서 전시명 → 제목 간격이 데스크탑처럼 16 */}
        <div className="relative flex flex-col gap-4 [grid-area:title]">
          <p className="text-caption">제 35회 경희대학교 산업디자인학과 졸업전시</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/2026/arrow-l.svg"
            alt=""
            aria-hidden
            className="absolute top-0 right-0 block size-[32px] min-[768px]:size-[52px] min-[1200px]:hidden"
          />
          <div className="flex flex-col gap-2">
            <p className="text-display max-[331px]:text-[20px] min-[331px]:max-[360px]:text-[22px] min-[360px]:max-[382px]:text-[24px] min-[382px]:max-[768px]:text-[26px] min-[768px]:max-[1000px]:text-[34px]">
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
        <dl className="flex flex-col gap-5 [grid-area:info] min-[768px]:flex-row min-[768px]:gap-6 min-[768px]:self-end min-[768px]:justify-self-end">
          {INFO.map((item) => (
            <div key={item.label} className={`flex flex-col gap-2 ${item.width}`}>
              <dt className="text-label">{item.label}</dt>
              <dd className={`text-caption flex flex-wrap gap-y-[2px] whitespace-nowrap min-[768px]:flex-col ${item.gap}`}>
                {item.lines.map((l, i) => (
                  <span key={i}>{l}</span>
                ))}
              </dd>
            </div>
          ))}
        </dl>

        {/* 경희 휘장 + KHID 로고. 태블릿·데스크탑(768~)은 4 내림(사용자 결정 2026-10-28) */}
        <div className="flex items-center gap-3 [grid-area:logo] min-[768px]:-mb-1 min-[768px]:self-end">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/2026/footer/khu-emblem.svg" alt="경희대학교" width={40} height={40} className="block size-[40px]" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/2026/footer/khid-logo.svg" alt="KHID" width={52} height={18} className="block h-[18px] w-[52px]" />
        </div>

        {/* 방문 통계 안내: 맨 아래 한 줄(작게, 흰색 60%), 768~ 오른쪽 끝 정렬. 위 줄과의 간격은 grid 줄 간격을 빼서 24 */}
        <p className="-mt-4 text-[11px] leading-[1.4] tracking-[-0.02em] break-keep text-white/60 [grid-area:note] min-[768px]:-mt-6 min-[768px]:justify-self-end min-[768px]:text-right min-[768px]:text-[12px] min-[1200px]:-mt-7">
          이 사이트는 방문 통계를 위해 Google Analytics를 사용합니다.
        </p>
      </div>
    </footer>
  );
}
