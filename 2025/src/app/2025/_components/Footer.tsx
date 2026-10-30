import { FOOTER } from "./home";

// 푸터 — 프레이머 footer 컴포넌트. 2026-10-30 프레이머 미리보기를 3개 폭(1440·720·390)에서 재서 맞춤
// Desktop(1440~): 빨간 바탕, 패딩 40, 위 줄 ↔ 아래 줄 80, 높이 336
//   위: "제 34회 …" 20/130 → 16 → 전시 제목 타이틀(449×31) | 오른쪽 THE NEXT MOVE 로고(높이 72)
//   아래(아래쪽 맞춤): WHEN·WHERE·INSTAGRAM 줄 간격 41(라벨 14 굵게 + 12 → 값 12) | 오른쪽 경희대(56) + 32 + KHID(44) 가로
// Tablet(720~1439): Desktop과 같고, 아래 오른쪽 로고만 세로로 쌓임(경희대 위 · KHID 아래, 오른쪽 맞춤, 간격 10), 위쪽 맞춤. 높이 338.5
// Phone(~719): 전부 세로. 패딩 20 20 16, 묶음 간격 24. 문구 12 → 타이틀(폭에 맞춤) → 4 → 로고(높이 36)
//   줄 간격 18(라벨 10 굵게 + 8 → 값 10) → 아래: 경희대(왼쪽) · KHID(오른쪽)
//   프레이머 Phone은 타이틀이 화면 밖으로 잘려 있어(넘침) 폭에 맞춰 줄임
// 타이틀·로고는 프레이머 footer 컴포넌트에서 뽑은 SVG (public/2025/footer-*.svg, logo-*.svg)
export default function Footer() {
  return (
    <footer className="flex flex-col gap-[24px] bg-red px-[20px] pt-[20px] pb-[16px] text-white min-[720px]:gap-[80px] min-[720px]:p-[40px]">
      <div className="flex flex-col gap-[4px] min-[720px]:flex-row min-[720px]:items-start min-[720px]:justify-between min-[720px]:gap-[20px]">
        <div className="flex flex-col gap-[8px] min-[720px]:gap-[16px]">
          <p className="font-ko text-[12px] leading-[1.5] min-[720px]:text-[20px] min-[720px]:leading-[1.3]">제 34회 경희대학교 산업디자인학과 졸업전시</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/2025/footer-title.svg"
            alt="THE NEXT MOVE : 공존의 설계"
            className="block h-auto w-full max-w-[449px] min-[720px]:h-[31px] min-[720px]:w-auto min-[720px]:max-w-none min-[720px]:shrink-0"
          />
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/2025/footer-tnm.svg" alt="THE NEXT MOVE" className="block h-[36px] w-auto self-start shrink-0 min-[720px]:h-[72px]" />
      </div>
      <div className="flex flex-col gap-[24px] min-[720px]:flex-row min-[720px]:items-start min-[720px]:justify-between min-[1440px]:items-end">
        <dl className="flex flex-col gap-[3px] min-[720px]:gap-[20px]">
          {(
            [
              ["WHEN", FOOTER.when],
              ["WHERE", FOOTER.where],
              ["INSTAGRAM", FOOTER.instagram],
            ] as const
          ).map(([k, v]) => (
            <div key={k} className="flex items-baseline gap-[8px] leading-[1.5] min-[720px]:gap-[12px]">
              <dt className="font-en text-[10px] font-bold min-[720px]:text-[14px]">{k}</dt>
              <dd className="font-ko text-[10px] min-[720px]:text-[12px]">{v}</dd>
            </div>
          ))}
        </dl>
        {/* eslint-disable @next/next/no-img-element */}
        <div className="flex items-center justify-between min-[720px]:flex-col min-[720px]:items-end min-[720px]:gap-[10px] min-[1440px]:flex-row min-[1440px]:items-center min-[1440px]:gap-[32px]">
          <span className="flex h-[26px] items-center gap-[5px] min-[720px]:h-[56px] min-[720px]:gap-[10px]">
            <img src="/2025/logo-khu-emblem.svg" alt="" className="block h-full w-auto" />
            <img src="/2025/logo-khu-text.svg" alt="경희대학교" className="block h-[51%] w-auto" />
          </span>
          <img src="/2025/logo-khid.svg" alt="KHID" className="block h-[18px] w-auto min-[720px]:h-[44px]" />
        </div>
        {/* eslint-enable @next/next/no-img-element */}
      </div>
    </footer>
  );
}
