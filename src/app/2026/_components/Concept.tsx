import MovingPoster from "./MovingPoster";
import VideoFrame from "./VideoFrame";

// [2] 기획 소개. 파란 배경(#1980FF) 위에 연한 하늘색(#E3F0FF) 프레임 선.
// 데스크탑(1280~)은 Figma 1440 배치: 프레임 폭 1340(좌우 50) 안에서
//   왼쪽 무빙포스터 | 오른쪽 제목 박스 + 기획 텍스트 / 아래 키비주얼 선(흰색) + 큰 화살표 / 16:9 영상.
//   프레임 안 수치는 전부 프레임 폭(1340 = 100cqw) 비율이라 1280~1439에선 같이 줄어듦, 1440부터 실측 그대로.
// 모바일·태블릿(~1279)은 제목 → 무빙포스터 → 텍스트 → 키비주얼 선·화살표 → 영상 순 세로 배치.
//
// Figma 실측(1440, 구역 위쪽 기준): 위 가로선 50 / 포스터 466×658 (프레임 안 68, 38) /
// 제목 박스 734×234, 제목 (52, 48) / 텍스트 (52, 80) / 아래 띠 211 / 영상 1340×754 / 아래 여백 49
const YOUTUBE_ID: string | undefined = undefined; // 영상 확정되면 유튜브 영상 ID 입력

// 프레임 선이 만나는 곳의 작은 사각형(9×9)
function Node({ className }: { className: string }) {
  return <span aria-hidden className={`absolute z-10 size-[9px] -translate-1/2 bg-pale ${className}`} />;
}

export default function Concept() {
  return (
    <section
      id="concept"
      aria-labelledby="concept-title"
      className="relative bg-key pt-[24px] text-white min-[768px]:pt-[40px] min-[1280px]:pt-[50px]"
    >
      {/* 위 가로선: 화면 끝에서 끝까지 */}
      <div aria-hidden className="absolute inset-x-0 top-[24px] h-px bg-pale min-[768px]:top-[40px] min-[1280px]:top-[50px]" />

      <div className="@container relative mx-auto w-[calc(100%-32px)] border-x border-pale min-[768px]:w-[calc(100%-80px)] min-[1280px]:w-[min(1340px,calc(100%-100px))]">
        <Node className="top-0 left-0" />
        <Node className="top-0 left-full" />
        <Node className="hidden min-[1280px]:block top-0 left-[calc(606/1340*100cqw)]" />
        <Node className="hidden min-[1280px]:block top-[calc(234/1340*100cqw)] left-[calc(606/1340*100cqw)]" />
        <Node className="hidden min-[1280px]:block top-[calc(234/1340*100cqw)] left-full" />

        <div className="grid [grid-template-areas:'title'_'poster'_'text'_'deco'_'video'] min-[1280px]:grid-cols-[calc(606/1340*100cqw)_1fr] min-[1280px]:grid-rows-[calc(234/1340*100cqw)_calc(501/1340*100cqw)_calc(211/1340*100cqw)_auto] min-[1280px]:[grid-template-areas:'poster_title'_'poster_text'_'deco_deco'_'video_video']">
          {/* 제목 박스 */}
          <div className="border-b border-pale bg-pale/10 px-5 py-6 [grid-area:title] min-[768px]:px-8 min-[768px]:py-9 min-[1280px]:px-[calc(52/1340*100cqw)] min-[1280px]:pt-[calc(48/1340*100cqw)] min-[1280px]:pb-0">
            <h2 id="concept-title" className="text-display max-[1279px]:text-[26px] min-[768px]:max-[1279px]:text-[34px]">
              THIS IS NOT GRADUATION
              <br />
              <span className="font-semibold">:THIS IS A NEW PATHWAY</span>
            </h2>
            <p className="text-title mt-2 leading-normal max-[1279px]:text-[18px] min-[768px]:max-[1279px]:text-[24px] min-[1280px]:mt-[calc(10/1340*100cqw)]">
              하나의 끝, 새로운 길
            </p>
          </div>

          {/* 무빙포스터 */}
          <div className="flex justify-center border-b border-pale p-6 [grid-area:poster] min-[768px]:p-10 min-[1280px]:block min-[1280px]:border-r min-[1280px]:border-b-0 min-[1280px]:pt-[calc(38/1340*100cqw)] min-[1280px]:pr-0 min-[1280px]:pb-0 min-[1280px]:pl-[calc(68/1340*100cqw)]">
            <MovingPoster
              src="/2026/concept/moving-poster.mp4"
              className="aspect-[466/658] w-full max-w-[360px] min-[768px]:max-w-[420px] min-[1280px]:w-[calc(466/1340*100cqw)] min-[1280px]:max-w-none"
            />
          </div>

          {/* 기획 텍스트 */}
          <div className="break-keep border-b border-pale px-5 py-8 [grid-area:text] min-[768px]:px-8 min-[768px]:py-10 min-[1280px]:border-b-0 min-[1280px]:px-[calc(52/1340*100cqw)] min-[1280px]:pt-[calc(80/1340*100cqw)] min-[1280px]:pb-0">
            <div className="flex flex-col gap-6 min-[1280px]:gap-[calc(35/1340*100cqw)]">
              <div className="flex flex-col gap-3 min-[1280px]:gap-[calc(12/1340*100cqw)]">
                <p className="text-body max-[767px]:text-[14px] min-[1280px]:max-w-[calc(430/1340*100cqw)]">
                  〈This is not Graduation : THIS IS A NEW PATHWAY〉는
                  <br />
                  졸업을 하나의 완결과 종착점으로 규정하는 익숙한 시선을 부정한다.
                </p>
                <p className="text-body max-[767px]:text-[14px] min-[1280px]:max-w-[calc(430/1340*100cqw)]">
                  이곳에 놓인 작품은 각자가 지나온 시간과 선택이 하나의 형태로 드러난 결과인 동시에, 그 이후로
                  이어질 새로운 길의 출발점이다.
                </p>
              </div>
              <div className="flex flex-col gap-3 min-[1280px]:gap-[calc(12/1340*100cqw)]">
                <p className="text-body max-[767px]:text-[14px] min-[1280px]:max-w-[calc(529/1340*100cqw)]">
                  작품이 만들어지기까지 우리는 문제를 발견하고, 질문하고, 선택하고, 수정하며 저마다의 과정을
                  지나왔다. 그 과정에서 형성된 경험과 태도는 작품의 완성에 머무르지 않는다.
                </p>
                <p className="text-body max-[767px]:text-[14px] min-[1280px]:max-w-[calc(442/1340*100cqw)]">
                  지금까지 축적된 시간은 졸업 이후 새로운 환경과 경험을 만나 또 다른 방향으로 이어진다. 우리의
                  전시는 하나의 마침보다, 그 마침에서 비롯되는 시작을 바라본다.
                </p>
              </div>
            </div>
            <p className="text-lead mt-8 max-[767px]:text-[16px] min-[1280px]:mt-[calc(64/1340*100cqw)] min-[1280px]:max-w-[calc(423/1340*100cqw)]">
              끝과 시작의 교차점. 졸업.
              <br />
              우리는 지나온 시간을 품고, 아직 펼쳐지지 않은 새로운 길을 향한다.
            </p>
          </div>

          {/* 아래 띠: 왼쪽 키비주얼 선(흰색), 오른쪽 칸 큰 화살표(영상 모서리에 걸침) */}
          <div className="relative z-10 grid h-[120px] grid-cols-[1fr_96px] border-pale [grid-area:deco] min-[768px]:h-[160px] min-[768px]:grid-cols-[1fr_140px] min-[1280px]:h-auto min-[1280px]:grid-cols-[calc(1140/1340*100cqw)_1fr] min-[1280px]:border-t">
            <div className="border-r border-pale">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/2026/hero/kv-line.svg"
                alt=""
                aria-hidden
                className="mt-4 ml-3 h-[88px] w-auto brightness-0 invert min-[768px]:mt-5 min-[768px]:ml-6 min-[768px]:h-[118px] min-[1280px]:mt-[calc(23/1340*100cqw)] min-[1280px]:ml-[calc(24/1340*100cqw)] min-[1280px]:h-[calc(167/1340*100cqw)]"
              />
            </div>
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/2026/arrow-l.svg"
                alt=""
                aria-hidden
                className="absolute top-[52px] left-[2px] size-[96px] max-w-none min-[768px]:top-[64px] min-[768px]:left-[6px] min-[768px]:size-[136px] min-[1280px]:top-[calc(158/1340*100cqw)] min-[1280px]:left-[calc(8/1340*100cqw)] min-[1280px]:size-[calc(176/1340*100cqw)]"
              />
            </div>
          </div>

          {/* 16:9 영상 */}
          <div className="border-b border-pale [grid-area:video]">
            <VideoFrame youtubeId={YOUTUBE_ID} />
          </div>
        </div>

        {/* 아래 여백 (프레임 세로선은 구역 끝까지) */}
        <div className="h-[24px] min-[768px]:h-[40px] min-[1280px]:h-[calc(49/1340*100cqw)]" />
      </div>
    </section>
  );
}
