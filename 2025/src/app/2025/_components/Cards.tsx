import Link from "next/link";
import { designerHref, type Designer } from "./designers";
import Ph from "./Ph";
import { workHref, type Work } from "./works";

// 작품 카드 — 프레이머 project_card (Variant 1: 318×392 / S: Phone 134 폭)
// 흰 바탕, 패딩 20(S 12), 간격 16(S 8). 썸네일 정사각형. 제목 20/150(S 14), 팀원 13/140(S 11, 이름 사이 가로 8·세로 8 / S 4·4)
//   이름 사이 간격: 프레이머 화면에서 Dixel 6명이 한 줄(폭 242)에 들어감 → 8 (2026-10-31 미리보기에서 잼. 전에 적은 20은 화면과 달랐음)
// 마우스를 올리거나 누르면: 바탕 빨강, 글자 흰색, 썸네일 모서리 0 → 600(원) — 프레이머 Variant 1 · Hover 값
// 바뀌는 속도: 프레이머에 따로 정한 전환이 없어 기본값 스프링 0.4초(튐 0.2) = ease-spring (2026-10-31 컴포넌트에서 확인)
export function WorkCard({ w }: { w: Work }) {
  return (
    <Link
      href={workHref(w)}
      className="group flex w-[134px] flex-col gap-[8px] bg-white p-[12px] text-black transition-colors duration-[400ms] ease-spring hover:bg-red hover:text-white active:bg-red active:text-white min-[720px]:w-[318px] min-[720px]:gap-[16px] min-[720px]:p-[20px]"
    >
      <Ph
        src={w.thumbnail}
        label="작품 썸네일"
        className="aspect-square w-full rounded-none transition-[border-radius] duration-[400ms] ease-spring group-hover:rounded-[600px] group-active:rounded-[600px]"
      />
      <div className="flex flex-col gap-[4px] min-[720px]:gap-[8px]">
        <p className="font-ko text-[14px] leading-[1.5] min-[720px]:text-[20px]">{w.card ?? w.title}</p>
        <p className="flex flex-wrap gap-x-[4px] gap-y-[4px] font-ko text-[11px] leading-[1.4] min-[720px]:gap-x-[8px] min-[720px]:gap-y-[8px] min-[720px]:text-[13px]">
          {w.members.map((m) => (
            <span key={m}>{m}</span>
          ))}
        </p>
      </div>
    </Link>
  );
}

// 디자이너 카드 — 프레이머 designer_card (Variant 1: 폭 200 / small: 120)
// Variant 1: 사진 200×270, 아래 한글 18/150 + 영문 16/150 나란히(간격 8), 사진–이름 12
// 마우스 올리면 사진만 7% 커짐(위로 13·아래로 6, 이름은 그대로) — 2026-10-31 프레이머 미리보기에서 잼. 사진은 바뀌지 않음. 속도는 프레이머 기본 스프링 0.4초
// small: 사진 120×160, 한글 12 + 영문 10 (줄바꿈)
// size: "list" = Phone small / Tablet·Desktop 큰 카드 (디자이너 목록)
//       "team" = Phone 폭 24% small / Tablet small / Desktop 폭 14% 큰 카드 (작품 상세 아래 팀원)
export function DesignerCard({ d, size }: { d: Designer; size: "list" | "team" }) {
  const cls =
    size === "list"
      ? {
          box: "w-[120px] gap-[8px] min-[720px]:w-[200px] min-[720px]:gap-[12px]",
          zoom: "min-[720px]:group-hover:scale-[1.07]",
          name: "flex-col min-[720px]:flex-row min-[720px]:items-baseline",
          ko: "text-[12px] min-[720px]:text-[18px]",
          en: "text-[10px] min-[720px]:text-[16px]",
          photo: "aspect-[3/4] min-[720px]:aspect-[200/270]",
        }
      : {
          box: "w-[24%] gap-[8px] min-[720px]:w-[120px] min-[1440px]:w-[14%] min-[1440px]:gap-[12px]",
          zoom: "min-[1440px]:group-hover:scale-[1.07]",
          name: "flex-col min-[1440px]:flex-row min-[1440px]:items-baseline",
          ko: "text-[12px] min-[1440px]:text-[18px]",
          en: "text-[10px] min-[1440px]:text-[16px]",
          photo: "aspect-[3/4] min-[1440px]:aspect-[200/270]",
        };
  return (
    <Link href={designerHref(d)} className={`group flex flex-col ${cls.box}`}>
      <Ph src={d.photo} label="프로필 사진" className={`w-full origin-[50%_69%] transition-transform duration-[400ms] ease-spring ${cls.photo} ${cls.zoom}`} />
      <p className={`flex items-center justify-center gap-x-[8px] text-center ${cls.name}`}>
        <span className={`font-ko leading-[1.5] ${cls.ko}`}>{d.ko}</span>
        <span className={`font-en leading-[1.5] ${cls.en}`}>{d.en}</span>
      </p>
    </Link>
  );
}
