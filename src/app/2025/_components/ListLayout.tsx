import Link from "next/link";
import type { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Ph from "./Ph";
import SectionBar from "./SectionBar";

// 작품 목록(과목별)·디자이너 목록(초성별)이 같이 쓰는 틀 — 프레이머 /projects-…, /designers-… 페이지
// 바탕 #FDFDFD. 헤더 아래 [왼쪽 탭 | 오른쪽 본문].
//   왼쪽 탭(sidetabs/과목, sidebar/이름): 상단바 아래 붙어 있음(sticky), 폭 382 (Tablet 220), 화면 높이만큼
//   Phone: 왼쪽 탭 대신 본문 위에 가로 탭(2칸 격자)
// 본문: 위쪽 소개(제목 이미지 + 이름·정보) → 제목 바 → 카드 목록
// [추정] 탭 한 줄 높이·글자 크기는 프레이머에서 못 읽어 화면을 보고 맞춤 (Desktop 48·16 / Phone 36·12)
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
            className={`flex h-[48px] items-center gap-[12px] border-b border-ink px-[20px] font-ko text-[14px] min-[1440px]:px-[24px] min-[1440px]:text-[16px] ${
              on ? "bg-ink text-white" : "hover:bg-bar"
            }`}
          >
            <span aria-hidden className="w-[16px] font-en">{on ? "→" : "+"}</span>
            {t.label}
          </Link>
        );
      })}
    </nav>
  );
}

function TopTabs({ tabs, current }: { tabs: Tab[]; current: string }) {
  return (
    <nav className="grid grid-cols-2 border-b border-ink min-[720px]:hidden">
      {tabs.map((t, i) => {
        const on = t.key === current;
        return (
          <Link
            key={t.key}
            href={t.href}
            aria-current={on ? "page" : undefined}
            className={`flex h-[36px] items-center justify-center border-ink px-2 text-center font-ko text-[12px] ${i % 2 === 0 ? "border-r" : ""} ${
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
  title: { label: string; w: string; tabletW: string; desktopW: string }; // 빨간 제목 이미지 "(MOVE)S" / "(PLAYER)S"
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
          {/* 위쪽 소개 — 프레이머 thumbnail: 패딩 60 80·간격 60 / Tablet 60 32·40 / Phone 80 20·40, 가운데 정렬 */}
          <section
            className={`flex flex-col items-center gap-[40px] px-[20px] py-[80px] text-center min-[720px]:items-stretch min-[720px]:px-[32px] min-[720px]:py-[60px] min-[720px]:text-left min-[1440px]:gap-[60px] min-[1440px]:px-[80px] ${
              fullHeightTop ? "min-h-screen min-[720px]:justify-between" : ""
            }`}
          >
            <h1>
              <Ph
                label={`제목 이미지 ${title.label}`}
                className={`aspect-[606/140] ${title.w} ${title.tabletW} ${title.desktopW} text-red`}
              />
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
