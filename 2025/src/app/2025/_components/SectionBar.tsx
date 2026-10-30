// 섹션 제목 바 (전시 안내 EXHIBITION INFORMATION, 미래공간디자인 FUTURISTIC SPATIAL DESIGN …)
// 스크롤하면 상단바 바로 아래(60, Phone 45)에 붙음 → 반드시 "제목 바 + 그 내용"을 감싼 요소의 첫 자식으로 둘 것
// 프레이머 값: 높이 60, 배경 #DDDFE3, 아래 선, 글자 24/100%
//   home(메인): 패딩 좌우 80, 한–영 간격 36 / Tablet 간격 24·글자 20 / Phone 높이 45·top 45·패딩 16·간격 20·한 16·영 14
//   list(작품·디자이너 목록): 간격 24 / Tablet 패딩 좌우 20·간격 16·글자 18 / Phone 숨김
//   sub(일본 전공연수 페이지의 교수진·현장 답사·참여 프로젝트·일본 학생 작품): Tablet·Desktop은 list와 같고, Phone에도 보임 —
//     높이 45·패딩 16·간격 8·한 16·영 14, 위쪽 가로 탭(3줄 135) 아래 180에 붙음 (2026-10-31 프레이머 미리보기 390에서 잼)
export default function SectionBar({ ko, en, variant = "home" }: { ko: string; en?: string; variant?: "home" | "list" | "sub" }) {
  const box =
    variant === "home"
      ? "flex h-[45px] gap-[20px] px-[16px] min-[720px]:h-[60px] min-[720px]:gap-[24px] min-[720px]:px-[80px] min-[1440px]:gap-[36px]"
      : variant === "sub"
        ? "flex h-[45px] gap-[8px] px-[16px] max-[719px]:top-[180px] min-[720px]:h-[60px] min-[720px]:gap-[16px] min-[720px]:px-[20px] min-[1440px]:gap-[24px] min-[1440px]:px-[80px]"
        : "hidden min-[720px]:flex min-[720px]:h-[60px] min-[720px]:gap-[16px] min-[720px]:px-[20px] min-[1440px]:gap-[24px] min-[1440px]:px-[80px]";
  const size =
    variant === "home"
      ? "min-[720px]:text-[20px] min-[1440px]:text-[24px]"
      : "min-[720px]:text-[18px] min-[1440px]:text-[24px]";
  return (
    <div className={`sticky top-[45px] z-40 items-center border-b border-ink bg-bar min-[720px]:top-[60px] ${box}`}>
      <h2 className={`font-ko text-[16px] leading-none ${size}`}>{ko}</h2>
      {en && <span className={`font-en text-[14px] leading-none uppercase ${size}`}>{en}</span>}
    </div>
  );
}
