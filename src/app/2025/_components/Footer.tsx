import { FOOTER } from "./home";
import Ph from "./Ph";

// 푸터 — 프레이머 footer 컴포넌트 (desktop / small 두 가지)
// desktop: 빨간 바탕, 패딩 40, 위 줄 ↔ 아래 줄 간격 80. 위: "제 34회 …" 20/150 + 전시 제목 타이틀(449×31) | THE NEXT MOVE 로고(높이 72)
//          아래: WHEN·WHERE·INSTAGRAM | 경희대학교·KHID 로고
// small(Phone): 패딩 20 20 16 20, 줄 간격 24, 문구 12/150, 로고 폭 95
// Tablet은 프레이머에 별도 variant가 있으나 안쪽 값을 못 읽음 → desktop 배치에 줄 간격만 줄여 전체 높이(338.5)를 맞춤 [추정]
// [추정] WHEN 등 라벨·값 크기, 아래 로고 크기는 화면을 보고 맞춤. 전체 높이만 프레이머와 같게(Desktop 336 / Phone 199.5)
// [데이터] 타이틀·로고 이미지 3개 (public/2025/footer-*.svg)
export default function Footer() {
  return (
    <footer className="flex flex-col gap-[24px] bg-red px-[20px] pt-[20px] pb-[16px] text-white min-[720px]:gap-[32px] min-[720px]:p-[40px] min-[1440px]:gap-[80px]">
      <div className="flex items-start justify-between gap-[20px]">
        <div className="flex flex-col gap-[8px] min-[720px]:gap-[16px]">
          <p className="font-ko text-[12px] leading-[1.5] min-[720px]:text-[20px]">제 34회 경희대학교 산업디자인학과 졸업전시</p>
          <Ph label="타이틀 THE NEXT MOVE : 공존의 설계" className="h-[15px] w-[212px] text-[8px] min-[720px]:h-[31px] min-[720px]:w-[449px]" />
        </div>
        <Ph label="THE NEXT MOVE 로고" className="h-[36px] w-[95px] shrink-0 text-[8px] min-[720px]:h-[72px] min-[720px]:w-[157px]" />
      </div>
      <div className="flex flex-wrap items-end justify-between gap-x-[40px] gap-y-[16px]">
        <dl className="grid grid-cols-[auto_1fr] items-baseline gap-x-[8px] gap-y-[4px] min-[720px]:gap-x-[12px] min-[720px]:gap-y-[12px] min-[1440px]:gap-y-[18px]">
          {(
            [
              ["WHEN", FOOTER.when],
              ["WHERE", FOOTER.where],
              ["INSTAGRAM", FOOTER.instagram],
            ] as const
          ).map(([k, v]) => (
            <div key={k} className="contents">
              <dt className="font-en text-[10px] font-bold min-[720px]:text-[14px]">{k}</dt>
              <dd className="font-ko text-[10px] min-[720px]:text-[12px]">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="flex items-center gap-[12px] min-[720px]:gap-[24px]">
          <Ph label="경희대학교 로고" className="h-[26px] w-[96px] text-[8px] min-[720px]:h-[48px] min-[720px]:w-[176px]" />
          <Ph label="KHID 로고" className="h-[18px] w-[52px] text-[8px] min-[720px]:h-[36px] min-[720px]:w-[100px]" />
        </div>
      </div>
    </footer>
  );
}
