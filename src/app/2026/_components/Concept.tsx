import MovingPoster from "./MovingPoster";
import VideoFrame from "./VideoFrame";

// [2] 기획 소개. 파란 배경(#1980FF) 위에 흰 프레임 선.
// 데스크탑(1000~)은 Figma 1440 배치: 프레임 폭 1340(좌우 50) 안에서
//   왼쪽 무빙포스터 | 오른쪽 제목 박스 + 기획 텍스트 / 아래 THIS IS·NOT·GRADUATION 선 그래픽 + 큰 화살표 / 16:9 영상.
//   프레임 안 수치는 전부 프레임 폭(1340 = 100cqw) 비율이라 1000~1439에선 같이 줄어듦, 1440부터 실측 그대로.
//   글자도 같은 비율로 줄되 85%까지만 (그래야 Figma 줄바꿈 그대로 한 줄에 들어감)
// 모바일·태블릿(~999)은 제목 → 무빙포스터 → 텍스트 → 선 그래픽·화살표 → 영상 순 세로 배치.
//
// Figma 실측(1440, 구역 위쪽 기준): 위 가로선 50 / 포스터 466×658 (프레임 안 68, 38) /
// 제목 박스 734×234, 제목 (52, 48) / 텍스트는 칸 안 세로 가운데, 왼쪽은 제목 시작점(52)에 맞춤 / 아래 띠 211 / 영상 1340×754 / 아래 여백 49
const YOUTUBE_ID: string | undefined = undefined; // 영상 확정되면 유튜브 영상 ID 입력

// 기획 텍스트: Figma에서 의도한 줄바꿈 그대로(데스크탑은 줄 안에서 다시 줄바꿈 안 함)
const PARAGRAPHS = [
  [
    ["〈This is not Graduation : THIS IS A NEW PATHWAY〉는", "졸업을 하나의 완결과 종착점으로 규정하는 익숙한 시선을 부정한다."],
    ["이곳에 놓인 작품은 각자가 지나온 시간과 선택이 하나의 형태로 드러난 결과인 동시에,", "그 이후로 이어질 새로운 길의 출발점이다."],
  ],
  [
    [
      "작품이 만들어지기까지 우리는 문제를 발견하고, 질문하고, 선택하고, 수정하며 저마다의 과정을 지나왔다.",
      "그 과정에서 형성된 경험과 태도는 작품의 완성에 머무르지 않는다.",
    ],
    [
      "지금까지 축적된 시간은 졸업 이후 새로운 환경과 경험을 만나 또 다른 방향으로 이어진다.",
      "우리의 전시는 하나의 마침보다, 그 마침에서 비롯되는 시작을 바라본다.",
    ],
  ],
];
// 좁은 화면에서 줄이 넘어가면 "새로운 길을 향한다."는 통째로 다음 줄로
const CLOSING: React.ReactNode[] = [
  "끝과 시작의 교차점. 졸업.",
  <>
    우리는 지나온 시간을 품고, 아직 펼쳐지지 않은 <span className="whitespace-nowrap">새로운 길을 향한다.</span>
  </>,
];

function Lines({ lines }: { lines: React.ReactNode[] }) {
  return lines.map((l, i) => (
    <span key={i} className="block min-[1000px]:whitespace-nowrap">
      {l}
    </span>
  ));
}

// 프레임 선이 만나는 곳의 작은 사각형(9×9)
function Node({ className }: { className: string }) {
  return <span aria-hidden className={`absolute z-10 size-[9px] -translate-1/2 bg-white ${className}`} />;
}

export default function Concept() {
  return (
    <section
      id="concept"
      aria-labelledby="concept-title"
      data-cursor="light"
      className="relative bg-key text-white"
    >
      {/* 위 가로선: 화면 끝에서 끝까지 */}
      <div aria-hidden className="absolute inset-x-0 top-[24px] h-px bg-white min-[768px]:top-[40px] min-[1000px]:top-[50px]" />

      {/* 프레임 세로선은 구역 맨 위부터 끝까지 (위 가로선 위쪽 여백까지 포함) */}
      <div className="@container relative mx-auto w-[calc(100%-32px)] border-x border-white pt-[24px] min-[768px]:w-[calc(100%-80px)] min-[768px]:pt-[40px] min-[1000px]:w-[min(1340px,calc(100%-100px))] min-[1000px]:pt-[50px]">
        <div className="relative">
          <Node className="top-[0.5px] left-[-0.5px]" />
          <Node className="top-[0.5px] left-[calc(100%+0.5px)]" />
          <Node className="hidden min-[1000px]:block top-[0.5px] left-[calc(606/1340*100cqw-0.5px)]" />
          <Node className="hidden min-[1000px]:block top-[calc(234/1340*100cqw-0.5px)] left-[calc(606/1340*100cqw-0.5px)]" />
          <Node className="hidden min-[1000px]:block top-[calc(234/1340*100cqw-0.5px)] left-[calc(100%+0.5px)]" />

          <div className="grid [grid-template-areas:'title'_'poster'_'text'_'deco'_'video'] min-[1000px]:grid-cols-[calc(606/1340*100cqw)_minmax(0,1fr)] min-[1000px]:grid-rows-[calc(234/1340*100cqw)_calc(501/1340*100cqw)_calc(211/1340*100cqw)_auto] min-[1000px]:[grid-template-areas:'poster_title'_'poster_text'_'deco_deco'_'video_video']">
            {/* 제목 박스 */}
            <div className="relative border-b border-white bg-pale/10 px-5 py-6 [grid-area:title] min-[768px]:px-8 min-[768px]:py-9 min-[1000px]:pr-0 min-[1000px]:pl-[calc(52/1340*100cqw)] min-[1000px]:pt-[calc(48/1340*100cqw)] min-[1000px]:pb-0">
              {/* 모바일·태블릿: 제목 박스 아래선 × 프레임 세로선에 사각형 (데스크탑은 위 Node들이 따로 있음) */}
              <Node className="top-[calc(100%+0.5px)] left-[-0.5px] min-[1000px]:hidden" />
              <Node className="top-[calc(100%+0.5px)] left-[calc(100%+0.5px)] min-[1000px]:hidden" />
              <h2
                id="concept-title"
                className="text-display max-[1000px]:text-[26px] min-[768px]:max-[1000px]:text-[34px] min-[1000px]:max-[1440px]:text-[length:max(34px,calc(40/1340*100cqw))]"
              >
                THIS IS NOT GRADUATION
                <br />
                <span className="font-semibold">:THIS IS A NEW PATHWAY</span>
              </h2>
              <p className="text-title mt-2 leading-[normal] max-[1000px]:text-[18px] min-[768px]:max-[1000px]:text-[24px] min-[1000px]:mt-[calc(10/1340*100cqw)] min-[1000px]:max-[1440px]:text-[length:max(23.8px,calc(28/1340*100cqw))]">
                하나의 끝, 새로운 길
              </p>
            </div>

            {/* 무빙포스터 */}
            <div className="flex justify-center border-b border-white p-6 [grid-area:poster] min-[768px]:p-10 min-[1000px]:block min-[1000px]:border-r min-[1000px]:border-b-0 min-[1000px]:pt-[calc(38/1340*100cqw)] min-[1000px]:pr-0 min-[1000px]:pb-0 min-[1000px]:pl-[calc(68/1340*100cqw)]">
              <MovingPoster
                src="/2026/concept/moving-poster.mp4"
                className="aspect-[466/658] w-full max-w-[360px] min-[768px]:max-w-[420px] min-[1000px]:w-[calc(466/1340*100cqw)] min-[1000px]:max-w-none"
              />
            </div>

            {/* 기획 텍스트 */}
            <div className="break-keep border-b border-white px-5 py-8 [grid-area:text] min-[768px]:px-8 min-[768px]:py-10 min-[1000px]:flex min-[1000px]:items-center min-[1000px]:border-b-0 min-[1000px]:py-0 min-[1000px]:pr-0 min-[1000px]:pl-[calc(52/1340*100cqw)]">
              <div>
                <div className="flex flex-col gap-6 min-[1000px]:gap-[calc(35/1340*100cqw)]">
                  {PARAGRAPHS.map((group, g) => (
                    <div key={g} className="flex flex-col gap-3 min-[1000px]:gap-[calc(12/1340*100cqw)]">
                      {group.map((lines, i) => (
                        <p
                          key={i}
                          className="text-body max-[768px]:text-[14px] min-[1000px]:max-[1440px]:text-[length:max(14px,calc(16/1340*100cqw))]"
                        >
                          <Lines lines={lines} />
                        </p>
                      ))}
                    </div>
                  ))}
                </div>
                <p className="text-lead mt-8 max-[768px]:text-[16px] min-[1000px]:mt-[calc(64/1340*100cqw)] min-[1000px]:max-[1440px]:text-[length:max(17px,calc(20/1340*100cqw))]">
                  <Lines lines={CLOSING} />
                </p>
              </div>
            </div>

            {/* 아래 띠: 왼쪽 THIS IS / NOT / GRADUATION 선 그래픽(main_whiteline, 흰색), 오른쪽 칸 큰 화살표.
                띠 높이(--h)를 기준으로 화살표 칸은 항상 정사각형(폭 = 높이), 선 그래픽도 띠 높이에 비례
                (데스크탑 띠 211에서 그래픽 높이 168 = 원본 크기). 그래픽은 왼쪽 선에서 24, 세로 가운데.
                화살표는 칸 정가운데 (화살표 SVG 자체 여백 포함 칸 폭의 88%) */}
            <div className="grid h-(--h) grid-cols-[1fr_var(--h)] [--h:96px] [grid-area:deco] min-[768px]:[--h:150px] min-[1000px]:border-t min-[1000px]:border-white min-[1000px]:[--h:calc(211/1340*100cqw)]">
              <div className="flex min-w-0 items-center border-r border-white pl-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/2026/concept/main-whiteline.svg"
                  alt=""
                  aria-hidden
                  className="h-auto w-[min(calc(var(--h)*168/211*482/168),calc(100%-24px))] max-w-none"
                />
              </div>
              <div className="flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/2026/arrow-l.svg" alt="" aria-hidden className="block h-auto w-[88%] max-w-none" />
              </div>
            </div>

            {/* 16:9 영상 */}
            <div className="border-b border-white [grid-area:video] max-[1000px]:border-t">
              <VideoFrame youtubeId={YOUTUBE_ID} />
            </div>
          </div>

        </div>

        {/* 아래 여백 (프레임 세로선은 구역 끝까지) */}
        <div className="h-[24px] min-[768px]:h-[40px] min-[1000px]:h-[calc(49/1340*100cqw)]" />
      </div>
    </section>
  );
}
