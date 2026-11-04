"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CATEGORIES, WORKS, categoryHref, workHref, workMenuName } from "./works";

// 상단바 — 아임웹 header 그대로. 메뉴는 Designer · Works 두 개만 (아임웹의 Main · 2023은 뺌, 사용자 결정 2026-11-04)
// PC(768~): 높이 90, 양옆 42, 로고 118×41, 메뉴 글자 20(Poppins) #9b9b9b · 칸 양옆 18 · 지금 보는 메뉴는 굵게 · 올리면 검정.
//   바탕 투명, 스크롤해도 맨 위에 붙어 있음(sticky). 메뉴에 올리면 펼침 메뉴(바탕 #282828, 폭 160, 글자 13 · 흰색 60%, 칸 10 20)
//   Works → 과목 4개 → (과목에 올리면) 그 과목 작품(팀원 이름). Designer는 펼침 메뉴 없음 (아임웹엔 이름 45개가 있었지만 뺌, 사용자 결정 2026-11-04)
// 모바일(~767): 높이 49, 왼쪽 메뉴 버튼, 가운데 로고 81×28 → 누르면 왼쪽에서 흰 서랍 메뉴(폭 300)
const NAV = [
  { key: "designers", label: "Designer", href: "/2024/designers" },
  { key: "projects", label: "Works", href: "/2024/projects" },
] as const;
type NavKey = (typeof NAV)[number]["key"];

const LOGO = "/2024/logo-khid.png"; // 아임웹 로고 원본(흰색 PNG 355×123)

export default function Header() {
  const path = usePathname();
  const current: NavKey | undefined = NAV.find((n) => path.startsWith(n.href))?.key;
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 flex h-[49px] items-center justify-center min-[768px]:h-[90px] min-[768px]:justify-between min-[768px]:px-[42px]">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="메뉴 열기"
          className="absolute top-0 left-[10px] flex h-[49px] w-[29px] items-center justify-center text-[#363636] min-[768px]:hidden"
        >
          <svg viewBox="0 0 19 19" aria-hidden className="block size-[19px] stroke-current" strokeWidth="1.5">
            <path d="M0 3.5h19M0 9.5h19M0 15.5h19" />
          </svg>
        </button>
        <Link href="/2024" aria-label="KHID 2024 홈" className="block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={LOGO} alt="" width={355} height={123} className="block h-[28px] w-auto min-[768px]:h-[41px]" />
        </Link>
        <nav className="hidden h-full min-[768px]:flex">
          {NAV.map((n) => (
            <div key={n.key} className="group relative h-full">
              <Link
                href={n.href}
                aria-current={current === n.key ? "page" : undefined}
                className={`flex h-full items-center px-[18px] text-[20px] text-menu hover:text-black ${current === n.key ? "font-bold" : ""}`}
              >
                {n.label}
              </Link>
              {n.key === "projects" && (
                <ul className="invisible absolute top-full left-[18px] w-[160px] bg-dropdown group-hover:visible">
                  {CATEGORIES.map((c) => (
                    <li key={c.slug} className="group/cat relative">
                      <Link href={categoryHref(c)} className="flex items-center justify-between py-[10px] pr-[12px] pl-[20px] text-[13px] leading-[19px] text-white/60 hover:text-white">
                        {c.name}
                        <Chevron className="size-[8px] -rotate-90" />
                      </Link>
                      <ul className="invisible absolute top-0 right-full w-[160px] bg-dropdown group-hover/cat:visible">
                        {WORKS.filter((w) => w.cat === c.slug).map((w) => (
                          <DropItem key={w.id} href={workHref(w)} label={workMenuName(w)} />
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </nav>
      </header>
      {open && <Drawer current={current} onClose={() => setOpen(false)} />}
    </>
  );
}

function DropItem({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link href={href} className="block px-[20px] py-[10px] text-[13px] leading-[19px] text-white/60 hover:text-white">
        {label}
      </Link>
    </li>
  );
}

// 모바일 서랍 메뉴 — 아임웹 slide menu: 흰 바탕 폭 300, 뒤 검정 60%, 닫기 X(흰색 32)는 서랍 오른쪽 바깥.
// 1단(Designer·Works) 글자 22 #9b9b9b 칸 13 50 14 20 — 지금 보는 메뉴는 #111 + 바탕 #f5f5f5 (Works는 펼친 채로 시작)
// Designer는 이름 목록 없이 바로 이동 (아임웹엔 있었지만 뺌, 사용자 결정 2026-11-04)
// Works 아래 과목: 글자 21 #9b9b9b 칸 8 50 8 30, 그 아래 작품은 한 단 더 들여씀
function Drawer({ current, onClose }: { current?: NavKey; onClose: () => void }) {
  const [openKey, setOpenKey] = useState<string | undefined>(current);
  const [openCat, setOpenCat] = useState<string>();
  return (
    <div className="fixed inset-0 z-[60] min-[768px]:hidden">
      <button type="button" aria-label="메뉴 닫기" onClick={onClose} className="absolute inset-0 bg-black/60" />
      <button type="button" aria-label="메뉴 닫기" onClick={onClose} className="absolute top-[17px] left-[310px] size-[32px] text-white">
        <svg viewBox="0 0 32 32" aria-hidden className="block size-full stroke-current" strokeWidth="1.5">
          <path d="M9 9l14 14M23 9L9 23" />
        </svg>
      </button>
      <nav className="absolute inset-y-0 left-0 w-[300px] overflow-y-auto bg-white">
        <ul>
          {NAV.map((n) => {
            const sub = n.key === "projects"; // Designer는 아래 목록 없이 바로 이동
            const on = sub && openKey === n.key;
            return (
              <li key={n.key}>
                <div className={`flex items-center ${current === n.key ? "bg-[#f5f5f5]" : ""}`}>
                  <Link href={n.href} onClick={onClose} className={`flex-1 pt-[13px] pr-[10px] pb-[14px] pl-[20px] text-[22px] leading-[22px] ${current === n.key ? "text-[#111]" : "text-menu"}`}>
                    {n.label}
                  </Link>
                  {sub && (
                    <button type="button" aria-label={`${n.label} ${on ? "접기" : "펼치기"}`} aria-expanded={on} onClick={() => setOpenKey(on ? undefined : n.key)} className="flex h-[49px] w-[50px] items-center justify-center text-[#111]">
                      <Chevron className={`size-[18px] ${on ? "rotate-180" : ""}`} />
                    </button>
                  )}
                </div>
                {on && (
                  <ul>
                    {CATEGORIES.map((c) => {
                          const catOn = openCat === c.slug;
                          return (
                            <li key={c.slug}>
                              <div className="flex items-center">
                                <Link href={categoryHref(c)} onClick={onClose} className="flex-1 py-[8px] pr-[10px] pl-[30px] text-[21px] leading-[21px] text-menu">
                                  {c.name}
                                </Link>
                                <button type="button" aria-label={`${c.name} ${catOn ? "접기" : "펼치기"}`} aria-expanded={catOn} onClick={() => setOpenCat(catOn ? undefined : c.slug)} className="flex h-[37px] w-[50px] items-center justify-center text-menu">
                                  <Chevron className={`size-[14px] ${catOn ? "rotate-180" : ""}`} />
                                </button>
                              </div>
                              {catOn && (
                                <ul>
                                  {WORKS.filter((w) => w.cat === c.slug).map((w) => (
                                    <DrawerItem key={w.id} href={workHref(w)} label={workMenuName(w)} onClose={onClose} />
                                  ))}
                                </ul>
                              )}
                            </li>
                          );
                        })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

function DrawerItem({ href, label, onClose }: { href: string; label: string; onClose: () => void }) {
  return (
    <li>
      <Link href={href} onClick={onClose} className="block py-[8px] pr-[50px] pl-[40px] text-[17px] leading-[21px] text-menu">
        {label}
      </Link>
    </li>
  );
}

// 펼침 표시 ∨ (아임웹은 ∧·∨, PC 펼침 메뉴의 과목 옆은 ›)
function Chevron({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden className={`block fill-none stroke-current ${className}`} strokeWidth="1.2">
      <path d="M2 5l6 6 6-6" />
    </svg>
  );
}
