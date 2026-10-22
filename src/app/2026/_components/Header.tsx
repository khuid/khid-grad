// 상단바: 흰 배경 + 아래 1px #DDD. Figma(높이 60)를 52로 줄이고 안의 요소도 같은 비율(52/60)로 축소:
// 로고 높이 24 → 20.8, 메뉴 글자 24 → 20.8, 인스타 버튼 32 → 27.73. 메뉴 간격은 넉넉하게 44(모바일 20).
// 메뉴는 연한 파랑(#75B3FF) → 호버 시 진한 파랑 + 확대(Figma 메모 "호버: 확대").
// 좌우 여백: 데스크탑 50, 1920부터 80(요소는 화면 양 끝으로).
// 모바일 구조(~999)는 높이 44, 좌우 16, 메뉴 글자 16
const NAV = [
  { href: "#works", label: "WORKS" },
  { href: "#designers", label: "DESIGNERS" },
];

export default function Header() {
  return (
    <header className="fixed top-0 right-0 left-0 z-50 border-b border-line bg-white">
      <div className="flex h-[44px] items-center justify-between px-4 min-[1000px]:h-[52px] min-[1000px]:px-[50px] min-[1920px]:px-[80px]">
        <a href="#top" aria-label="KHID 2026 홈">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/2026/khid.svg" alt="KHID" className="block h-[18px] w-auto min-[1000px]:h-[20.8px]" />
        </a>
        <nav className="flex items-center gap-[20px] min-[1000px]:gap-[44px]">
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
