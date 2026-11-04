"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CATEGORIES, WORKS, categoryHref, workHref, workMenuName } from "./works";

// 상단바 — 아임웹 header 그대로. 메뉴는 Behind · Designer · Works (아임웹의 Main · 2023은 뺌, Behind는 새로 추가 — 사용자 결정 2026-11-04)
// PC(768~): 높이 90, 양옆 42, 로고 118×41, 메뉴 글자 20(Poppins) #9b9b9b · 칸 양옆 18 · 지금 보는 메뉴는 굵게.
//   올리면 아임웹은 검정이라 글자가 안 보였음 → Works 과목 이름과 같은 파랑(#2662bc)으로 바꿈, 크기는 그대로 (사용자 결정 2026-11-04)
//   맨 오른쪽 인스타그램 아이콘(20, 메뉴와 같은 색) → 학과 인스타 — 아임웹은 푸터에 있었는데 상단바로 옮김 (사용자 결정 2026-11-04)
//   바탕 2024 바탕색(거의 검정) — 아임웹은 투명이라 스크롤하면 아래 이미지와 글자가 겹쳐 보여서 칠함 (사용자 결정 2026-11-04). 스크롤해도 맨 위에 붙어 있음(sticky). 메뉴에 올리면 펼침 메뉴(바탕 #282828, 폭 160, 글자 13 · 흰색 60%, 칸 10 20)
//   Works → 과목 4개 → (과목에 올리면) 그 과목 작품(팀원 이름). Designer는 펼침 메뉴 없음 (아임웹엔 이름 45개가 있었지만 뺌, 사용자 결정 2026-11-04)
// 모바일(~767): 높이 49, 왼쪽 메뉴 버튼, 가운데 로고 81×28, 오른쪽 인스타그램 → 메뉴 버튼 누르면 왼쪽에서 흰 서랍 메뉴(폭 300)
//   모바일은 마우스 올림이 없어서 누르는 동안(active) 같은 파랑
const NAV = [
  { key: "behind", label: "Behind", href: "/2024/behind" },
  { key: "designers", label: "Designer", href: "/2024/designers" },
  { key: "projects", label: "Works", href: "/2024/projects" },
] as const;
type NavKey = (typeof NAV)[number]["key"];

const LOGO = "/2024/logo-khid.png"; // 아임웹 로고 원본(흰색 PNG 355×123)
const INSTAGRAM = "https://www.instagram.com/khu.id_/";
// 누르는 동안 파랑(active:) — iOS Safari는 터치 이벤트가 걸려 있어야 :active가 먹어서 빈 onTouchStart를 붙임
const noop = () => {};

export default function Header() {
  const path = usePathname();
  const current: NavKey | undefined = NAV.find((n) => path.startsWith(n.href))?.key;
  const [open, setOpen] = useState(false);

  return (
    <>
      <header onTouchStart={noop} className="sticky top-0 z-50 flex bg-bg h-[49px] items-center justify-center min-[768px]:h-[90px] min-[768px]:justify-between min-[768px]:px-[42px]">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="메뉴 열기"
          className="absolute top-0 left-[10px] flex h-[49px] w-[29px] items-center justify-center text-[#363636] active:text-blue min-[768px]:hidden"
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
                className={`flex h-full items-center px-[18px] text-[20px] text-menu hover:text-blue ${current === n.key ? "font-bold" : ""}`}
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
          <InstagramLink className="flex h-full items-center px-[18px] text-menu hover:text-blue" />
        </nav>
        <InstagramLink className="absolute top-0 right-[10px] flex h-[49px] w-[29px] items-center justify-center text-menu active:text-blue min-[768px]:hidden" />
      </header>
      {open && <Drawer current={current} onClose={() => setOpen(false)} />}
    </>
  );
}

function InstagramLink({ className }: { className: string }) {
  return (
    <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" aria-label="경희대학교 산업디자인학과 인스타그램" className={className}>
      <svg viewBox="0 0 24 24" aria-hidden className="block size-[20px] fill-current">
        <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63a5.9 5.9 0 0 0-2.13 1.38A5.9 5.9 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.79.72 1.46 1.38 2.13a5.9 5.9 0 0 0 2.13 1.38c.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.9 5.9 0 0 0 2.13-1.38 5.9 5.9 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.9 5.9 0 0 0-1.38-2.13A5.9 5.9 0 0 0 19.86.63C19.1.33 18.22.13 16.95.07 15.67.01 15.26 0 12 0Zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.4-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88Z" />
      </svg>
    </a>
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
      <nav onTouchStart={noop} className="absolute inset-y-0 left-0 w-[300px] overflow-y-auto bg-white">
        <ul>
          {NAV.map((n) => {
            const sub = n.key === "projects"; // Behind · Designer는 아래 목록 없이 바로 이동
            const on = sub && openKey === n.key;
            return (
              <li key={n.key}>
                <div className={`flex items-center ${current === n.key ? "bg-[#f5f5f5]" : ""}`}>
                  <Link href={n.href} onClick={onClose} className={`flex-1 pt-[13px] pr-[10px] pb-[14px] pl-[20px] text-[22px] leading-[22px] active:text-blue ${current === n.key ? "text-[#111]" : "text-menu"}`}>
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
                                <Link href={categoryHref(c)} onClick={onClose} className="flex-1 py-[8px] pr-[10px] pl-[30px] text-[21px] leading-[21px] text-menu active:text-blue">
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
      <Link href={href} onClick={onClose} className="block py-[8px] pr-[50px] pl-[40px] text-[17px] leading-[21px] text-menu active:text-blue">
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
