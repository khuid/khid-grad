import type { CSSProperties } from "react";
import Footer from "./_components/Footer";
import Header from "./_components/Header";
import HeroArrow from "./_components/HeroArrow";
import OverviewBoard from "./_components/OverviewBoard";
import { COMMITTEE, EXHIBITION, PROFESSORS, SPONSORS, VIDEO_ID } from "./_components/home";
import Ph from "./_components/Ph";
import SectionBar from "./_components/SectionBar";

// 2025 메인 — 프레이머 Home (Desktop 1440 / Tablet 720~ / Phone ~719). 값은 work/docs/09 분석 문서 1장
// 순서: 상단바 → 히어로(빨강) → 소개 이미지 2장 → 영상 → 전시 안내 → 졸업전시준비위원회 → 지도교수 → 후원 → 푸터

function Hero() {
  // 프레이머: 패딩 120 200 80 200 (Tablet 80 60 40 60 / Phone 240 40 120 40, 간격 80)
  // 로고 Desktop: 자리 694×480, 보이는 크기는 0.75배(521×360) — 프레이머에서 자리 안에 그 크기로 놓여 있음 / Tablet 305×210 / Phone 217×150
  //   (2026-10-30 프레이머 미리보기를 3개 폭에서 재서 맞춤. 분석 문서의 405×280·높이 200은 틀 크기였음)
  // 로고–문구 60 (40 / 32), 문구 40/150 (20 / 20/140)
  return (
    <section className="flex flex-col items-center gap-[80px] bg-red px-[40px] pt-[240px] pb-[120px] min-[720px]:gap-0 min-[720px]:px-[60px] min-[720px]:pt-[80px] min-[720px]:pb-[40px] min-[1440px]:px-[200px] min-[1440px]:pt-[120px] min-[1440px]:pb-[80px]">
      <div className="flex flex-col items-center gap-[32px] min-[720px]:gap-[40px] min-[1440px]:gap-[60px]">
        {/* THE NEXT MOVE 로고 — 프레이머 logo2에서 뽑은 SVG. 스크롤해도 따로 움직이지 않음 (2026-10-30 미리보기로 확인) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/2025/logo-thenextmove.svg" alt="THE NEXT MOVE" className="block aspect-[694/480] h-[150px] min-[720px]:h-[210px] min-[1440px]:h-[480px] min-[1440px]:scale-75" />
        <p className="text-center font-en text-[20px] leading-[1.4] text-white min-[720px]:leading-[1.5] min-[1440px]:text-[40px]">
          where is the NEXT MOVE,
          <br className="min-[720px]:hidden" /> what is the BEST MOVE?
        </p>
      </div>
      <HeroArrow />
    </section>
  );
}

function Overview() {
  // 프레이머: 소개 2칸, 각 정사각형 (Desktop 720·Tablet 360~) / Phone은 세로로 쌓임. 그림 내용은 OverviewBoard
  return (
    <section className="flex flex-col min-[720px]:flex-row">
      <OverviewBoard index={0} />
      <OverviewBoard index={1} />
    </section>
  );
}

function Video() {
  // 프레이머: YouTube 폭 가득 16:9 + 아래 40
  return (
    <section className="pb-[40px]">
      {VIDEO_ID ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}`}
          title="THE NEXT MOVE 영상"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="block aspect-video w-full"
        />
      ) : (
        <Ph label="메인 영상 (YouTube)" className="aspect-video w-full" />
      )}
    </section>
  );
}

function Exhibition() {
  // 프레이머: 패딩 60 80 (Tablet 40 / Phone 40 16), 지도–정보 28. 지도 3:2 (1280×853.5 / 640×426.5 / 358×238.5)
  // 정보 2칸 간격 24 (Phone 12): 제목 24/150 (20 / 14) → 12 (8) → 날짜 20/150 (16 / 12), 주소 20/150 (16 / 12)
  return (
    <section>
      <SectionBar ko="전시 안내" en="Exhibition Information" />
      <div className="flex flex-col gap-[28px] px-[16px] py-[40px] min-[720px]:px-[40px] min-[1440px]:px-[80px] min-[1440px]:py-[60px]">
        <iframe
          src="https://www.google.com/maps?q=%EA%B2%BD%ED%9D%AC%EB%8C%80%ED%95%99%EA%B5%90+%EA%B5%AD%EC%A0%9C%EC%BA%A0%ED%8D%BC%EC%8A%A4+%EC%98%88%EC%88%A0%EB%94%94%EC%9E%90%EC%9D%B8%EB%8C%80%ED%95%99&output=embed"
          title="경희대학교 국제캠퍼스 예술디자인대학 지도"
          loading="lazy"
          className="block aspect-[3/2] w-full border-0"
        />
        <div className="flex gap-[12px] min-[720px]:gap-[24px]">
          {EXHIBITION.map((e) => (
            <div key={e.title} className="flex flex-1 flex-col gap-[8px] min-[720px]:gap-[12px]">
              <h3 className="font-en text-[14px] leading-[1.5] min-[720px]:text-[20px] min-[1440px]:text-[24px]">{e.title}</h3>
              <div className="flex flex-col gap-[8px] min-[720px]:gap-[12px]">
                <p className="font-en text-[12px] leading-[1.5] min-[720px]:text-[16px] min-[1440px]:text-[20px]">{e.date}</p>
                <p className="font-ko text-[12px] leading-[1.5] whitespace-pre-line min-[720px]:text-[16px] min-[1440px]:text-[20px]">{e.place}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Committee() {
  // 프레이머: 패딩 60 80 100 80 (Tablet 32 40 60 40 / Phone 20 16 40 16), 사진–목록 28
  // 목록 줄 간격 24, 한 줄에 두 팀(간격 10). 팀명 24/150 (20 / 14) → 8 → 이름 20/150 (16 / 12), 이름 사이 16 (Phone 8)
  // 글자색 #121212, Tablet만 검정(black) — 프레이머 그대로
  return (
    <section>
      <SectionBar ko="졸업전시준비위원회" en="Preparatory Committee" />
      <div className="flex flex-col gap-[28px] px-[16px] pt-[20px] pb-[40px] min-[720px]:px-[40px] min-[720px]:pt-[32px] min-[720px]:pb-[60px] min-[1440px]:px-[80px] min-[1440px]:pt-[60px] min-[1440px]:pb-[100px]">
        {/* 단체 사진: 이전 기수 원본 파일이 없어 프레이머에 올라가 있던 원본(3464×2340)을 받아 씀 (사용자 요청 2026-10-31) */}
        <Ph src="/2025/committee.webp" label="졸업전시준비위원회 단체 사진" className="aspect-[1280/864.5] w-full" />
        <div className="flex flex-col gap-[24px] text-ink min-[720px]:text-black min-[1440px]:text-ink">
          {COMMITTEE.map((row) => (
            <div key={row[0].team} className="flex gap-[10px]">
              {row.map((t) => (
                <div key={t.team} className="flex flex-1 flex-col gap-[8px]">
                  <h3 className="font-en text-[14px] leading-[1.5] min-[720px]:text-[20px] min-[1440px]:text-[24px]">{t.team}</h3>
                  <p className="flex flex-wrap gap-x-[8px] gap-y-[2px] font-ko text-[12px] leading-[1.5] min-[720px]:gap-x-[16px] min-[720px]:text-[16px] min-[1440px]:text-[20px]">
                    {t.names.map((n) => (
                      <span key={n}>{n}</span>
                    ))}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Professors() {
  // 프레이머: 패딩 120 80 (Tablet 80 40 / Phone 40 16), 사이 60 (40 / 32), 가운데
  // 한글 "○○○ 교수님" 24/150 #121212 (20 / 14) + 16 + 영문 20/150 #73787E (16 / 12)
  return (
    <section>
      <SectionBar ko="지도교수" en="Professor" />
      <ul className="flex flex-col items-center gap-[32px] px-[16px] py-[40px] min-[720px]:gap-[40px] min-[720px]:px-[40px] min-[720px]:py-[80px] min-[1440px]:gap-[60px] min-[1440px]:px-[80px] min-[1440px]:py-[120px]">
        {PROFESSORS.map((p) => (
          <li key={p.ko} className="flex items-center justify-center gap-[16px]">
            <span className="font-ko text-[14px] leading-[1.5] min-[720px]:text-[20px] min-[1440px]:text-[24px]">{p.ko} 교수님</span>
            <span className="font-en text-[12px] leading-[1.5] text-gray min-[720px]:text-[16px] min-[1440px]:text-[20px]">{p.en}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Sponsors() {
  // 프레이머: 패딩 120 80 (Tablet 80 40 / Phone 60 16), 가운데, 줄바꿈. 간격 가로 20·세로 10 (16·8 / 8·4)
  // 로고 칸 정사각형 240 (180 / 100). 프레이머 칸 바탕 #FDFDFD는 흰 페이지 위에서 옅은 회색 상자로 보여 뺌(사용자 결정 2026-10-30). 로고 폭은 칸 대비 % (w), 마우스를 올리면 hw로 커짐 — 프레이머 sponsorship/* Hover, 스프링 0.4초(튐 0.2)
  return (
    <section>
      <SectionBar ko="후원" en="Sponsorship" />
      <div className="flex flex-wrap justify-center gap-x-[8px] gap-y-[4px] px-[16px] py-[60px] min-[720px]:gap-x-[16px] min-[720px]:gap-y-[8px] min-[720px]:px-[40px] min-[720px]:py-[80px] min-[1440px]:gap-x-[20px] min-[1440px]:gap-y-[10px] min-[1440px]:px-[80px] min-[1440px]:py-[120px]">
        {SPONSORS.map((s) => (
          <div key={s.name} className="group flex size-[100px] items-center justify-center min-[720px]:size-[180px] min-[1440px]:size-[240px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={s.src}
              alt={s.name}
              style={{ "--w": s.w, "--hw": s.hw } as CSSProperties}
              className="block h-auto w-(--w) transition-[width] duration-[400ms] ease-spring group-hover:w-(--hw)"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Overview />
        <Video />
        <Exhibition />
        <Committee />
        <Professors />
        <Sponsors />
      </main>
      <Footer />
    </>
  );
}
