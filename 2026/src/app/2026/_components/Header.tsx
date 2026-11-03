import Link from "next/link";

// 상단바: 흰 배경 + 아래 1px lightgray(#E4E4E4, [1] 격자선과 같은 색). 데스크탑은 Figma 원래 크기(2026-11-04 결정):
// 높이 60, 로고 높이 24, 메뉴 글자 24 ExtraBold(사이트 굵기 4종 중 SemiBold 다음 단계), 인스타 아이콘 28(버튼 32). 메뉴 간격은 넉넉하게 44(모바일 20).
// 메뉴는 연한 파랑(#75B3FF) → 호버 시 진한 파랑 + 확대(Figma 메모 "호버: 확대").
// 좌우 여백: 모든 화면에서 프레임 세로선(FRAME)에 로고 왼쪽·인스타 버튼 오른쪽을 맞춤 = 모바일 16 / 태블릿 40 / 데스크탑 max(50, (화면-1340)/2).
// 모바일 구조(~999)는 높이 44, 메뉴 글자 16(굵기는 데스크탑과 같은 ExtraBold)
// 지금 보고 있는 페이지 메뉴(current)는 진한 파랑으로 고정. 로고는 메인 페이지에선 맨 위로, 다른 페이지에선 메인으로
const NAV = [
  { key: "projects", href: "/2026/projects/spatial", label: "PROJECTS" }, // 첫 수업 탭으로 바로 (/2026/projects를 거치면 한 번 더 넘겨져서 느림)
  { key: "designers", href: "/2026/designers", label: "DESIGNERS" },
];

export default function Header({ current }: { current?: "projects" | "designers" }) {
  return (
    <header className="fixed top-0 right-0 left-0 z-50 border-b border-lightgray bg-white">
      <div className="flex h-[44px] items-center justify-between px-4 min-[768px]:px-[40px] min-[1000px]:h-[60px] min-[1000px]:px-[max(50px,calc((100%-1340px)/2))]">
        <Link href={current ? "/2026" : "#top"} aria-label="KHID 2026 홈">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/2026/khid.svg" alt="KHID" className="block h-[18px] w-auto min-[1000px]:h-[24px]" />
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
            className="flex size-[24px] items-center justify-center transition-transform duration-200 hover:scale-110 min-[1000px]:size-[32px]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/2026/instagram.svg" alt="" className="block size-[18px] min-[1000px]:size-[28px]" />
          </a>
        </nav>
      </div>
    </header>
  );
}
