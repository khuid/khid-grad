// 상단바 (Figma Desktop-49 상단 60px): 흰 배경 + 아래 1px #DDD.
// 로고 높이 24, 메뉴는 연한 파랑(#75B3FF) → 호버 시 진한 파랑 + 확대(Figma 메모 "호버: 확대").
// 모바일 구조(~1279)는 archive-site 헤더와 같은 0.786배 축소(높이 44, 좌우 16).
// 1920은 1440 헤더 그대로에 좌우 여백만 60 (Figma 1920 프레임 로고 위치)
const NAV = [
  { href: "#works", label: "WORKS" },
  { href: "#designers", label: "DESIGNERS" },
];

export default function Header() {
  return (
    <header className="fixed top-0 right-0 left-0 z-50 border-b border-line bg-white">
      <div className="mx-auto flex h-[44px] max-w-[1920px] items-center justify-between px-4 min-[1280px]:h-[60px] min-[1280px]:px-[50px] min-[1920px]:px-[60px]">
        <a href="#top" aria-label="KHID 2026 홈">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/2026/khid.svg" alt="KHID" className="block h-[18.86px] w-auto min-[1280px]:h-[24px]" />
        </a>
        <nav className="flex items-center gap-[18px] min-[1280px]:gap-[35px]">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-nav inline-block origin-center text-key-light transition-[color,transform] duration-200 hover:scale-110 hover:text-key"
            >
              {n.label}
            </a>
          ))}
          <a
            href="https://www.instagram.com/khid.2026/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram @khid.2026"
            className="flex size-[25px] items-center justify-center transition-transform duration-200 hover:scale-110 min-[1280px]:size-[32px]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/2026/instagram.svg" alt="" className="block size-[18.86px] min-[1280px]:size-[24px]" />
          </a>
        </nav>
      </div>
    </header>
  );
}
