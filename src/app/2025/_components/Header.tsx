import Link from "next/link";

// 상단바 — 프레이머 header 컴포넌트. 스크롤해도 맨 위에 붙어 있음(sticky).
// 높이 60 (Phone 45). 왼쪽 로고 칸: 패딩 12 32, 로고 38.5×36 (Phone 패딩 12, 칸 폭 50.5). 오른쪽 메뉴 두 칸 각 140.
// home: 빨간 바탕 + 흰 글자 / 그 밖의 페이지: 흰 바탕 + 아래 검정 선, 지금 보는 메뉴만 빨강
// 로고 TNM(프레이머 logo2·logo1 컴포넌트에서 뽑은 SVG)은 글자색(currentColor)을 따름
//   home: 흰 로고, 마우스를 올리면 흰 바탕 + 빨간 로고 / 그 밖: 검정 로고, 마우스를 올리면 빨간 바탕 + 흰 로고
// [추정] 메뉴 글자 크기(14, Phone 12)와 Phone의 메뉴 칸 폭은 프레이머에서 못 읽어 화면을 보고 맞춤
const NAV = [
  { key: "projects", href: "/2025/projects/futuristic-space", label: "PROJECTS" },
  { key: "designers", href: "/2025/designers/gn", label: "DESIGNERS" },
] as const;

export default function Header({ current }: { current?: "projects" | "designers" }) {
  const home = !current;
  return (
    <header
      className={`sticky top-0 z-50 flex h-[45px] items-stretch justify-between min-[720px]:h-[60px] ${
        home ? "bg-red text-white" : "border-b border-ink bg-white text-ink"
      }`}
    >
      <Link
        href="/2025"
        aria-label="KHID 2025 홈"
        className={`flex items-center justify-center p-[12px] transition-colors min-[720px]:px-[32px] ${
          home ? "hover:bg-white hover:text-red" : "hover:bg-red hover:text-white"
        }`}
      >
        <TnmLogo className="h-[24.7px] w-auto min-[720px]:h-[36px]" />
      </Link>
      <nav className="flex">
        {NAV.map((n) => (
          <Link
            key={n.key}
            href={n.href}
            aria-current={current === n.key ? "page" : undefined}
            className={`flex w-[96px] items-center justify-center font-en text-[12px] min-[720px]:w-[140px] min-[720px]:text-[14px] ${
              current === n.key ? "text-red" : ""
            }`}
          >
            {n.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

function TnmLogo({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 38.588 36" aria-hidden className={`block fill-current ${className}`}>
      <path d="M 3.902 17.635 L 3.902 3.956 L 0 3.956 L 0 0 L 12.511 0 L 12.511 3.956 L 8.395 3.956 L 8.395 17.633 L 3.899 17.633 Z" />
      <path d="M 34.687 17.635 L 27.932 6.863 L 28.052 17.635 L 23.746 17.635 L 23.746 0 L 27.624 0 L 34.475 11.153 L 34.283 0 L 38.588 0 L 38.588 17.635 Z" />
      <path d="M 23.598 36 L 23.598 25.492 L 23.551 25.492 L 16.201 36 L 12.466 36 L 12.466 25.492 L 12.419 25.492 L 5.592 36 L 0.428 36 L 12.511 18.365 L 16.96 18.365 L 16.96 28.063 L 17.007 28.063 L 23.645 18.365 L 28.094 18.365 L 28.094 36 Z" />
    </svg>
  );
}
