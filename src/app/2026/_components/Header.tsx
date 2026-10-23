import Link from "next/link";

// 상단바: 흰 배경 + 아래 1px lightgray(#E4E4E4, [1] 격자선과 같은 색). Figma(높이 60)를 52로 줄이고 안의 요소도 같은 비율(52/60)로 축소:
// 로고 높이 24 → 20.8, 메뉴 글자 24 → 20.8, 인스타 버튼 32 → 27.73. 메뉴 간격은 넉넉하게 44(모바일 20).
// 메뉴는 연한 파랑(#75B3FF) → 호버 시 진한 파랑 + 확대(Figma 메모 "호버: 확대").
// 좌우 여백: 데스크탑 50, 1920부터 80(요소는 화면 양 끝으로).
// 모바일 구조(~999)는 높이 44, 좌우 16, 메뉴 글자 16
// 지금 보고 있는 페이지 메뉴(current)는 진한 파랑으로 고정. 로고는 메인 페이지에선 맨 위로, 다른 페이지에선 메인으로
const NAV = [
  { key: "projects", href: "/2026/projects/spatial", label: "PROJECTS" }, // 첫 수업 탭으로 바로 (/2026/projects를 거치면 한 번 더 넘겨져서 느림)
  { key: "designers", href: "/2026/designers", label: "DESIGNERS" },
];

export default function Header({ current }: { current?: "projects" | "designers" }) {
  return (
    <header className="fixed top-0 right-0 left-0 z-50 border-b border-lightgray bg-white">
      <div className="flex h-[44px] items-center justify-between px-4 min-[1000px]:h-[52px] min-[1000px]:px-[50px] min-[1920px]:px-[80px]">
        <Link href={current ? "/2026" : "#top"} aria-label="KHID 2026 홈">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/2026/khid.svg" alt="KHID" className="block h-[18px] w-auto min-[1000px]:h-[20.8px]" />
        </Link>
        <nav className="flex items-center gap-[20px] min-[1000px]:gap-[44px]">
          {NAV.map((n) => (
            <Link
              key={n.key}
              href={n.href}
              aria-current={current === n.key ? "page" : undefined}
              className={`text-nav inline-block origin-center transition-[color,transform] duration-200 hover:scale-110 hover:text-key ${current === n.key ? "text-key" : "text-key-light"}`}
            >
              {n.label}
            </Link>
          ))}
          <a
            href="https://www.instagram.com/khid.2026/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram @khid.2026"
            className="flex size-[24px] items-center justify-center transition-transform duration-200 hover:scale-110 min-[1000px]:size-[27.73px]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/2026/instagram.svg" alt="" className="block size-[18px] min-[1000px]:size-[20.8px]" />
          </a>
        </nav>
      </div>
    </header>
  );
}
