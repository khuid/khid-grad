import SectionBar from "./SectionBar";

// [3] 전시안내. 흰 배경 + #1A6AE8 프레임 선, 제목 띠는 스크롤 시 상단바 아래에 붙음(SectionBar).
// 데스크탑(1000~)은 Figma 1440 배치: 프레임(1340 = 100cqw) 안 왼쪽 정보 538 | 세로선 | 오른쪽 약도.
//   여백은 프레임 폭 비율이라 1000~1439에선 같이 줄고, 글자 크기는 그대로.
// 모바일·태블릿(~999)은 약도 위, 정보 아래 세로 배치이고 가운데 세로선 없음 (태블릿 768~는 정보 두 묶음을 나란히).
//
// Figma 실측(1440): 구역 위 ~ 띠 45 / 약도 712×520, 띠 아래 45·오른쪽 45·아래 95 /
// 정보는 프레임 왼쪽에서 70, 약도와 세로 가운데 맞춤. 화살표 20(arrow/S 좌우반전) – 제목 간격 8,
// 제목 → 날짜 27, 날짜 → 주소 10, 날짜–시간 10, 두 묶음 사이 65
const MAP_QUERY = "경희대학교 국제캠퍼스 예술디자인대학";
const MAP_SRC = `https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&hl=ko&z=16&output=embed`;

const ADDRESS = ["경기도 용인시 기흥구 덕영대로 1732", "경희대학교 국제캠퍼스 예술디자인대학 2층 A&D HALL"];
const EVENTS = [
  { title: "EXHIBITION", date: "2026. 11. 11(수) → 2026. 11. 16(월)", time: "10:00 - 20:00" },
  { title: "OPENING CEREMONY", date: "2026. 11. 11(수)", time: "17:30" },
];

// 프레임 폭: 모바일 좌우 16 / 768~ 40 / 1000~ 50(최대 1340) — [2]·SectionBar와 같음
const FRAME = "w-[calc(100%-32px)] min-[768px]:w-[calc(100%-80px)] min-[1000px]:w-[min(1340px,calc(100%-100px))]";

export default function ExhibitionInfo() {
  return (
    <section id="info" aria-labelledby="info-title" className="relative bg-white text-[#111]">
      {/* 프레임 세로선: 구역 맨 위부터 끝까지 */}
      <div aria-hidden className={`pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 border-x border-rule ${FRAME}`} />

      <div className="h-[24px] min-[768px]:h-[40px] min-[1000px]:h-[45px]" />
      <SectionBar id="info-title" ko="전시안내" en="EXHIBITION INFORMATION" />

      <div className={`@container relative mx-auto ${FRAME}`}>
        <div className="grid [grid-template-areas:'map'_'info'] min-[1000px]:grid-cols-[calc(538/1340*100cqw)_minmax(0,1fr)] min-[1000px]:[grid-template-areas:'info_map']">
          {/* 약도 */}
          <div className="p-4 [grid-area:map] min-[768px]:p-7 min-[1000px]:p-[calc(45/1340*100cqw)] min-[1000px]:pb-[calc(95/1340*100cqw)]">
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
          <div className="break-keep px-5 pt-3 pb-12 [grid-area:info] min-[768px]:px-7 min-[768px]:pt-4 min-[768px]:pb-14 min-[1000px]:flex min-[1000px]:items-center min-[1000px]:border-r min-[1000px]:border-rule min-[1000px]:pt-[calc(45/1340*100cqw)] min-[1000px]:pr-0 min-[1000px]:pb-[calc(95/1340*100cqw)] min-[1000px]:pl-[calc(70/1340*100cqw)]">
            <div className="flex flex-col gap-[40px] min-[768px]:grid min-[768px]:grid-cols-2 min-[768px]:gap-[28px] min-[1000px]:flex min-[1000px]:gap-[65px]">
              {EVENTS.map((e) => (
                <div key={e.title}>
                  <h3
                    lang="en"
                    className="text-heading flex items-center gap-[8px] text-key max-[767px]:text-[20px] min-[768px]:max-[999px]:text-[22px]"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/2026/arrow-s.svg" alt="" aria-hidden className="block size-[20px] -scale-x-100" />
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
    </section>
  );
}
