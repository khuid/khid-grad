import Link from "next/link";

// 상단바 — 프레이머 header 컴포넌트. 스크롤해도 맨 위에 붙어 있음(sticky).
// 높이 60 (Phone 45). 왼쪽 로고 칸 폭 103, 오른쪽 메뉴 두 칸 각 140.
// home: 빨간 바탕 + 흰 글자 / 그 밖의 페이지: 흰 바탕 + 아래 검정 선, 지금 보는 메뉴만 빨강
// [추정] 메뉴 글자 크기(14, Phone 12)와 Phone의 로고·메뉴 칸 폭은 프레이머에서 못 읽어 화면을 보고 맞춤
// [데이터] 로고 TNM 이미지 → public/2025/logo-tnm.svg (흰색·검정 두 가지). 그전까지 글자로 표시
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
      <Link href="/2025" aria-label="KHID 2025 홈" className="flex w-[72px] items-center justify-center min-[720px]:w-[103px]">
        <span className="font-en text-[13px] leading-[0.9] font-bold tracking-[0.1em] min-[720px]:text-[16px]">TNM</span>
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
