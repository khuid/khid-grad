import Link from "next/link";
import type { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";
import CycleTitle from "./CycleTitle";
import SectionBar from "./SectionBar";

// 작품 목록(과목별)·디자이너 목록(초성별)이 같이 쓰는 틀 — 프레이머 /projects-…, /designers-… 페이지
// 바탕 #FDFDFD. 헤더 아래 [왼쪽 탭 | 오른쪽 본문].
//   왼쪽 탭(sidetabs/과목, sidebar/이름): 상단바 아래 붙어 있음(sticky), 폭 382 (Tablet 220), 화면 높이만큼
//   Phone: 왼쪽 탭 대신 본문 위에 가로 탭(2칸 격자)
// 본문: 위쪽 소개(제목 이미지 + 이름·정보) → 제목 바 → 카드 목록
// 탭 한 줄: 높이 60, 글자 16, 왼쪽 여백 Desktop 80 / Tablet 20. 마우스 올림: 회색 바탕 + 화살표, 누름: 검정 바탕 + 흰 글자. Phone 위 가로 탭: 높이 45·글자 12, 상단바 아래 붙음, 개수가 홀수면 마지막 칸은 두 칸 폭
// (2026-10-30 프레이머 미리보기 3개 폭에서 잼)
export type Tab = { key: string; label: string; href: string };

function SideTabs({ tabs, current }: { tabs: Tab[]; current: string }) {
  return (
    <nav className="sticky top-[60px] hidden h-[calc(100vh-60px)] w-[220px] shrink-0 border-r border-ink min-[720px]:block min-[1440px]:w-[382px]">
      {tabs.map((t) => {
        const on = t.key === current;
        return (
          <Link
            key={t.key}
            href={t.href}
            aria-current={on ? "page" : undefined}
            className={`group flex h-[60px] items-center gap-[8px] border-b border-ink px-[20px] font-ko text-[16px] min-[1440px]:px-[80px] ${
              on ? "bg-ink text-white" : "hover:bg-bar active:bg-ink active:text-white"
            }`}
          >
            {/* 지금 과목: 점 화살표 / 나머지: 점 십자 → 올리거나 누르면 화살표 */}
            {on ? (
              <DotArrow />
            ) : (
              <>
                <DotPlus className="group-hover:hidden group-active:hidden" />
                <DotArrow className="hidden group-hover:block group-active:block" />
              </>
            )}
            {t.label}
          </Link>
        );
      })}
    </nav>
  );
}

// 탭 아이콘 — 프레이머 sidetab 컴포넌트의 점(지름 4) 그대로. 색은 글자색을 따름
// 화살표(32×24): 가로 7점 + 화살촉 4점 / 십자(24×24): 가로 5점 + 세로 4점
const ARROW = [[2, 10], [6, 10], [10, 10], [14, 10], [18, 10], [22, 10], [26, 10], [22, 2], [24, 6], [24, 14], [22, 18]];
const PLUS = [[2, 10], [6, 10], [10, 10], [14, 10], [18, 10], [10, 2], [10, 6], [10, 14], [10, 18]];
function Dots({ dots, w, className = "" }: { dots: number[][]; w: number; className?: string }) {
  return (
    <svg viewBox={`0 0 ${w} 24`} aria-hidden className={`block h-[24px] shrink-0 fill-current ${className}`} style={{ width: w }}>
      {dots.map(([l, t]) => (
        <circle key={`${l}-${t}`} cx={l + 2} cy={t + 2} r={2} />
      ))}
    </svg>
  );
}
const DotArrow = ({ className }: { className?: string }) => <Dots dots={ARROW} w={32} className={className} />;
const DotPlus = ({ className }: { className?: string }) => <Dots dots={PLUS} w={24} className={className} />;

function TopTabs({ tabs, current }: { tabs: Tab[]; current: string }) {
  return (
    <nav className="sticky top-[45px] z-40 grid grid-cols-2 border-b border-ink bg-white min-[720px]:hidden">
      {tabs.map((t, i) => {
        const on = t.key === current;
        return (
          <Link
            key={t.key}
            href={t.href}
            aria-current={on ? "page" : undefined}
            className={`flex h-[45px] items-center justify-center border-ink px-2 text-center font-ko text-[12px] ${tabs.length % 2 === 1 && i === tabs.length - 1 ? "col-span-2" : i % 2 === 0 ? "border-r" : ""} ${
              i < tabs.length - (tabs.length % 2 || 2) ? "border-b" : ""
            } ${on ? "bg-ink text-white" : "bg-white"}`}
          >
            {t.label}
          </Link>
        );
      })}
    </nav>
  );
}

export default function ListLayout({
  current,
  tabs,
  tabKey,
  title,
  fullHeightTop = false,
  info,
  bar,
  children,
}: {
  current: "projects" | "designers";
  tabs: Tab[];
  tabKey: string;
  title: { words: { src: string; label: string; hold: number }[]; h: string }; // 빨간 제목 — 단어가 hold초씩 머물다 바뀜 (CycleTitle)
  fullHeightTop?: boolean; // 디자이너 목록: 위쪽 소개가 화면 높이만큼(100vh), 정보는 아래쪽 끝에
  info: ReactNode;
  bar: { ko: string; en?: string };
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-paper">
      <Header current={current} />
      <TopTabs tabs={tabs} current={tabKey} />
      <div className="flex">
        <SideTabs tabs={tabs} current={tabKey} />
        <div className="min-w-0 flex-1">
          {/* 위쪽 소개 — 프레이머 thumbnail: 패딩 60 80·간격 60 / Tablet 60 32·40 / Phone 80 20·40, 왼쪽 정렬(Phone도) */}
          <section
            className={`flex flex-col gap-[40px] px-[20px] py-[80px] min-[720px]:px-[32px] min-[720px]:py-[60px] min-[1440px]:gap-[60px] min-[1440px]:px-[80px] ${
              fullHeightTop ? "min-h-screen min-[720px]:justify-between" : ""
            }`}
          >
            <h1>
              <CycleTitle words={title.words} className={title.h} />
            </h1>
            {info}
          </section>
          <div>
            <SectionBar ko={bar.ko} en={bar.en} variant="list" />
            {children}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
