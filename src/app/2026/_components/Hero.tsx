"use client";

import { useRef } from "react";
import HeroCursor from "./HeroCursor";
import HeroGrid from "./HeroGrid";
import KeyVisual from "./KeyVisual";
import SponsorMarquee from "./SponsorMarquee";

// [1] 메인 히어로. 화면 높이를 꽉 채우고(1440×1024, 1920×1080 프레임과 같은 구성)
// 키비주얼·전시 정보 묶음은 크기 고정(944×655)으로 가운데, 배경 격자만 화면 폭만큼 늘어남.
// 레이아웃 기준: 1280부터 데스크탑, 그 전은 세로 배치(모바일 구조).
// 모바일 구간 크기는 데스크탑 값 기준 배율(--s)로 통일: 1(~639) → 1.25(640~) → 1.43(768~) → 1.55(1024~)
//
// 아래 수치는 Figma 1440 프레임에서 키비주얼 왼쪽 위(259.17, 182)를 원점으로 잰 값
export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-svh flex-col overflow-hidden bg-white [--s:1] min-[640px]:[--s:1.25] min-[768px]:[--s:1.43] min-[1024px]:[--s:1.55]"
    >
      {/* 격자는 헤더 밑까지 깔리고, 줄자 바닥선은 스폰서 배너 4px 위 */}
      <div className="absolute inset-x-0 top-0 bottom-[37px] min-[768px]:bottom-[48px]">
        <HeroGrid />
      </div>

      {/* 헤더 아래 ~ 줄자(격자 2칸) 위 사이에서 세로 가운데 */}
      <div className="relative z-10 flex flex-1 items-center justify-center px-4 pt-[84px] pb-[72px] min-[768px]:px-10 min-[1280px]:px-0 min-[1280px]:pt-[60px] min-[1280px]:pb-[64px]">
        <div className="flex w-full max-w-[944px] flex-col gap-[calc(28px*var(--s))] min-[1280px]:w-[944px] min-[1280px]:gap-0">
          {/* 키비주얼 943.98×530.24. 문구는 컨테이너 폭 기준(cqw)으로 같이 줄어듦 */}
          <div className="@container relative aspect-[943.98/530.24] w-full">
            <KeyVisual className="absolute inset-0 [&>svg]:block [&>svg]:h-full [&>svg]:w-full" />
            <p className="text-tagline absolute top-[48.85%] left-[64.3%] text-key">
              하나의 끝,
              <br />
              새로운 길
            </p>
          </div>

          {/* 전시 정보: 데스크탑은 왼쪽 정보 / 오른쪽 날짜(Figma 그대로),
              모바일은 날짜 → 정보 순 세로 배치 */}
          <div className="flex flex-col-reverse items-start gap-[calc(16px*var(--s))] min-[1280px]:mt-[40.76px] min-[1280px]:flex-row min-[1280px]:justify-between min-[1280px]:gap-0 min-[1280px]:pr-[60.78px] min-[1280px]:pl-[17px]">
            <div className="flex flex-col gap-[calc(9px*var(--s))] min-[1280px]:mt-[3px] min-[1280px]:gap-[13.4px]">
              <h1 className="text-nav text-key max-[1279px]:text-[length:calc(15px*var(--s))]">경희대학교 산업디자인학과 제 35회 졸업전시회</h1>
              <div className="flex items-end gap-[calc(4.4px*var(--s))] min-[1280px]:gap-[6.76px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/2026/hero/venue.svg"
                  alt="경희대학교 국제캠퍼스 예술디자인대학 2층 A&D HALL"
                  className="block h-auto w-[calc(122.25px*var(--s))] min-[1280px]:w-[189.48px]"
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/2026/hero/hours.svg"
                  alt="10:00 - 20:00"
                  className="mb-[0.3px] block h-auto w-[calc(46.95px*var(--s))] min-[1280px]:w-[72.77px]"
                />
              </div>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/2026/hero/date.svg"
              alt="2026. 11. 11 - 11. 16"
              className="block h-auto w-[calc(219.5px*var(--s))] min-[1280px]:w-[340.2px]"
            />
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-auto pt-[4px]">
        <SponsorMarquee />
      </div>

      <HeroCursor areaRef={ref} />
    </section>
  );
}
