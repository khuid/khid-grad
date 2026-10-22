import { readFile } from "node:fs/promises";
import path from "node:path";
import HeroCursor from "./HeroCursor";
import HeroGrid from "./HeroGrid";
import KeyVisual from "./KeyVisual";
import SponsorMarquee from "./SponsorMarquee";

// [1] 메인 히어로. 화면 높이를 꽉 채우고(1440×1024, 1920×1080 프레임과 같은 구성)
// 키비주얼·전시 정보 묶음은 크기 고정(939×653)으로 가운데, 배경 격자만 화면 폭만큼 늘어남.
// 레이아웃 기준: 768부터 Figma 데스크탑 배치(태블릿은 비율 축소), 그 전(모바일)만 세로 배치.
// 모바일 구간 크기는 데스크탑 값 기준 배율(--s)로 통일: 1(~639) → 1.25(640~) → 1.43(768~) → 1.55(1024~)
//
// 아래 수치는 Figma 1440 프레임에서 키비주얼(main_full) 왼쪽 위(261.17, 184)를 원점으로 잰 값
export default async function Hero() {
  // 키비주얼 SVG는 조각별 애니메이션 때문에 문서에 직접 넣어야 해서 파일 내용을 읽어 넘김
  const read = (f: string) => readFile(path.join(process.cwd(), "public/2026/hero", f), "utf8");
  const [fillSvg, lineSvg] = await Promise.all([read("kv-nonline.svg"), read("kv-line.svg")]);

  return (
    <section
      id="top"
      className="relative flex min-h-svh flex-col overflow-hidden bg-white [--s:1] min-[640px]:[--s:1.25] min-[768px]:[--s:1.43] min-[1024px]:[--s:1.55]"
    >
      {/* 격자는 헤더 밑까지 깔리고, 줄자 바닥선은 스폰서 배너 4px 위 */}
      <div className="absolute inset-x-0 top-0 bottom-[37px] min-[768px]:bottom-[48px]">
        <HeroGrid />
      </div>

      {/* 헤더 아래 ~ 줄자(격자 2칸) 위 사이에서 세로 가운데 */}
      <div className="relative z-10 flex flex-1 items-center justify-center px-4 pt-[84px] pb-[72px] min-[768px]:px-10 min-[1280px]:px-0 min-[1280px]:pt-[60px] min-[1280px]:pb-[64px]">
        {/* 768부터는 Figma 데스크탑 배치를 그대로 축소: 묶음 폭(939 = 100cqw) 기준 비율로 크기·간격 지정 */}
        <div className="@container flex w-full max-w-[939px] flex-col gap-[calc(28px*var(--s))] min-[768px]:gap-0 min-[1280px]:w-[939px]">
          {/* 키비주얼 939×524. 문구는 컨테이너 폭 기준(cqw)으로 같이 줄어듦 */}
          <div className="@container relative aspect-[939/524] w-full">
            <KeyVisual fillSvg={fillSvg} lineSvg={lineSvg}>
              <p
                data-kv-tagline
                className="text-tagline absolute top-[calc(257/524*100%)] left-[calc(605/939*100%)] text-key"
              >
                하나의 끝,
                <br />
                새로운 길
              </p>
            </KeyVisual>
          </div>

          {/* 전시 정보: 768부터 왼쪽 아래 정보 3줄 / 오른쪽 아래 날짜(Figma 그대로),
              모바일(~767)만 키비주얼 → 날짜 → 정보 순 세로 배치, 가운데 정렬 */}
          <div className="flex flex-col-reverse items-center min-[768px]:items-start gap-[calc(16px*var(--s))] min-[768px]:mt-[calc(45/939*100cqw)] min-[768px]:flex-row min-[768px]:justify-between min-[768px]:gap-[3cqw] min-[768px]:pr-[calc(57.8/939*100cqw)] min-[768px]:pl-[calc(15/939*100cqw)]">
            <div className="flex flex-col gap-[calc(9px*var(--s))] text-center min-[768px]:mt-[calc(3/939*100cqw)] min-[768px]:gap-[calc(13/939*100cqw)] min-[768px]:text-left">
              <h1 className="text-nav text-key max-[767px]:text-[length:calc(15px*var(--s))] min-[768px]:max-[1279px]:text-[length:max(16px,calc(24/939*100cqw))]">
                경희대학교 산업디자인학과 제 35회 졸업전시회
              </h1>
              <p className="text-caption font-medium text-key max-[767px]:text-[13px] min-[768px]:max-[1279px]:text-[length:max(12px,calc(14/939*100cqw))]">
                경희대학교 국제캠퍼스
                <br />
                예술디자인대학 2층 A&amp;D HALL <span className="ml-[0.3em]">10:00 - 20:00</span>
              </p>
            </div>
            {/* 날짜는 키비주얼보다 덜 줄어듦: 341px의 45%는 고정, 나머지 55%만 묶음 폭(cqw)에 비례
                → 939에서 341, 768 태블릿(688) ≈ 291, 390 모바일(358) ≈ 225 */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/2026/hero/date.svg"
              alt="2026. 11. 11 - 11. 16"
              className="block h-auto w-[calc(341px*0.45+341/939*0.55*100cqw)] shrink-0"
            />
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-auto pt-[4px]">
        <SponsorMarquee />
      </div>

      <HeroCursor areaId="top" />
    </section>
  );
}
