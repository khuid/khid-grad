import SectionBar, { FRAME } from "./SectionBar";

// [3] 전시안내 + 지도교수. 흰 배경 + #1A6AE8 프레임 선, 제목 띠는 스크롤 시 상단바 아래에 붙음(SectionBar).
// 띠마다 "띠 + 내용"을 div로 감싸서, 내용이 끝나면 다음 띠가 앞 띠를 밀어 올림.
//
// ── 전시안내 ──
// 데스크탑(1000~)은 Figma 1440 배치: 프레임(1340 = 100cqw) 안 왼쪽 정보 538 | 세로선 | 오른쪽 약도.
//   여백은 프레임 폭 비율이라 1000~1439에선 같이 줄고, 글자 크기는 그대로.
// 모바일·태블릿(~999)은 약도 위, 정보 아래 세로 배치이고 가운데 세로선 없음.
// 태블릿(768~)은 약도·정보·교수님 줄을 [4] 졸준위 사진 격자와 같은 폭(프레임의 1151.78/1340, 좌우 94.11씩)에 맞춤:
// 정보 두 묶음은 왼쪽·오른쪽 끝에, 교수님 네 분도 첫 분 화살표 ~ 마지막 분 글자 끝이 그 폭 양 끝에 오고 사이만 늘고 줆.
// 약도 위(띠 아래)·아래(정보 제목 위) 여백은 같게: 모바일 20, 태블릿 32.
// 태블릿 교수님 줄 위아래 여백은 [4] 후원사 칸(위 40 + 로고 + 아래 56)과 같은 높이가 되게.
//
// Figma 실측(1440): 구역 위 ~ 띠 45 / 약도 712×520, 띠 아래 45·오른쪽 45·아래 95 /
// 정보는 프레임 왼쪽에서 70, 약도와 세로 가운데 맞춤. 화살표 20(arrow/S 좌우반전) – 제목 간격 8,
// 제목 → 날짜 27, 날짜 → 주소 10, 날짜–시간 10, 두 묶음 사이 65
//
// ── 지도교수 ──
// Figma 실측(1440): 띠 아래 내용 높이 440, 네 분을 폭 263짜리 칸 4개(가운데 정렬, 1052)에 한 분씩 칸 가운데.
// 화살표 20 – 이름 간격 12, 이름(24, #1A6AE8) 아래 2 띄우고 영문(20, #ADC9FF). 태블릿 4열 / 모바일 2열
const MAP_QUERY = "경희대학교 국제캠퍼스 예술디자인대학";
const MAP_SRC = `https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&hl=ko&z=16&output=embed`;

const ADDRESS = [
  "경기도 용인시 기흥구 덕영대로 1732",
  "경희대학교 국제캠퍼스 예술디자인대학 2층 A&D HALL",
];
const PROFESSORS = [
  { ko: "김선철", en: "Kim Sunchul" },
  { ko: "김유빈", en: "Kim Youbin" },
  { ko: "이동민", en: "Lee Dongmin" },
  { ko: "최유식", en: "Choi Yoosik" },
];
const EVENTS = [
  {
    title: "EXHIBITION",
    date: "2026. 11. 11(수) → 2026. 11. 16(월)",
    time: "10:00 - 20:00",
  },
  { title: "OPENING CEREMONY", date: "2026. 11. 11(수)", time: "17:30" },
];


export default function ExhibitionInfo() {
  return (
    <section
      id="info"
      aria-labelledby="info-title"
      className="relative bg-white text-ink"
    >
      {/* 프레임 세로선: 구역 맨 위부터 끝까지 */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 border-x border-rule ${FRAME}`}
      />

      <div className="h-[24px] min-[768px]:h-[40px] min-[1000px]:h-[45px]" />
      <div>
        <SectionBar id="info-title" ko="전시안내" en="EXHIBITION INFORMATION" />

        <div className={`@container relative mx-auto ${FRAME}`}>
          <div className="grid [grid-template-areas:'map'_'info'] min-[1000px]:grid-cols-[calc(538/1340*100cqw)_minmax(0,1fr)] min-[1000px]:[grid-template-areas:'info_map']">
            {/* 약도 */}
            <div className="p-4 pb-5 [grid-area:map] min-[768px]:px-[calc(94.11/1340*100cqw)] min-[768px]:pt-7 min-[768px]:pb-8 min-[1000px]:p-[calc(45/1340*100cqw)] min-[1000px]:px-[calc(45/1340*100cqw)] min-[1000px]:pb-[calc(95/1340*100cqw)]">
              <div className="relative aspect-[712/520] w-full overflow-hidden bg-pale">
                <iframe
                  src={MAP_SRC}
                  title={`약도: ${MAP_QUERY}`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 size-full border-0"
                />
              </div>
            </div>

            {/* 전시 정보 */}
            <div className="relative break-keep px-5 pt-0 pb-12 [grid-area:info] min-[768px]:px-[calc(94.11/1340*100cqw)] min-[768px]:pt-0 min-[768px]:pb-14 min-[1000px]:flex min-[1000px]:items-center min-[1000px]:pt-[calc(45/1340*100cqw)] min-[1000px]:pr-0 min-[1000px]:pb-[calc(95/1340*100cqw)] min-[1000px]:pl-[calc(70/1340*100cqw)]">
              {/* 가운데 세로선: 띠의 4px 바깥 여백까지 늘려서 위·아래 띠 선에 딱 붙게 */}
              <span aria-hidden className="absolute top-[-5px] right-0 bottom-[-5px] hidden w-px bg-rule min-[1000px]:block" />
              <div className="flex flex-col gap-[40px] min-[768px]:flex-row min-[768px]:justify-between min-[768px]:gap-6 min-[1000px]:flex-col min-[1000px]:justify-start min-[1000px]:gap-[65px]">
                {EVENTS.map((e) => (
                  <div key={e.title}>
                    <h3
                      lang="en"
                      className="text-heading flex items-center gap-[8px] text-rule max-[768px]:text-[18px] min-[768px]:max-[1000px]:text-[22px]"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/2026/arrow-s.svg"
                        alt=""
                        aria-hidden
                        className="block size-[20px] -scale-x-100"
                      />
                      {e.title}
                    </h3>
                    <div className="text-info mt-[16px] min-[1000px]:mt-[27px]">
                      <p className="flex flex-wrap gap-x-[10px]">
                        <span>{e.date}</span>
                        <span>{e.time}</span>
                      </p>
                      <p className="mt-[10px]">
                        {ADDRESS.map((l) => (
                          <span key={l} className="block">
                            {l}
                          </span>
                        ))}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <SectionBar id="professor-title" ko="지도교수" en="PROFESSOR" />
        <div className={`@container relative mx-auto ${FRAME}`}>
          <ul
            aria-labelledby="professor-title"
            className="grid grid-cols-2 gap-y-8 py-10 min-[768px]:grid-cols-[repeat(4,auto)] min-[768px]:justify-between min-[768px]:px-[calc(94.11/1340*100cqw)] min-[768px]:py-[calc((100cqw-56px)/8+22px)] min-[1000px]:grid-cols-4 min-[1000px]:justify-normal min-[1000px]:px-0 min-[1000px]:mx-auto min-[1000px]:w-[calc(1052/1340*100cqw)] min-[1000px]:pt-[calc(194/1340*100cqw)] min-[1000px]:pb-[calc(190/1340*100cqw)]"
          >
            {PROFESSORS.map((p) => (
              <li key={p.en} className="flex justify-center">
                <div className="flex items-start gap-[8px] min-[768px]:gap-[12px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/2026/arrow-s.svg"
                    alt=""
                    aria-hidden
                    className="mt-[3px] block size-[18px] -scale-x-100 min-[768px]:size-[20px] min-[1000px]:mt-[4px]"
                  />
                  <div>
                    <p className="text-heading text-rule max-[768px]:text-[18px] min-[768px]:max-[1000px]:text-[22px]">
                      {p.ko} 교수님
                    </p>
                    <p
                      lang="en"
                      className="text-lead mt-[2px] leading-[1.31] text-[#adc9ff] max-[768px]:text-[16px] min-[768px]:max-[1000px]:text-[18px]"
                    >
                      {p.en}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
