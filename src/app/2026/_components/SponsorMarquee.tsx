// 히어로 하단 스폰서 배너: 배너 이미지(665×44, 2배율 1330×88)를 가로로 이어 붙여
// 왼쪽으로 계속 흐르게 함. 이미지 한 장 폭만큼 이동하면 처음 위치와 같아져서 끊김 없이 반복.
// 화면 폭이 넓어도 빈틈이 없도록 넉넉히 복제 (1920 / 665 → 3장 + 이동분 1장)
const COPIES = 5;

export default function SponsorMarquee() {
  return (
    <div className="relative h-[33px] overflow-hidden bg-white min-[768px]:h-[44px]" aria-label="후원사: FIABA, DANCING CIDER, 3DPAGE, RixFont">
      <div className="flex h-full w-max animate-[marquee_24s_linear_infinite] motion-reduce:animate-none">
        {Array.from({ length: COPIES }, (_, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src="/2026/hero/sponsorship-banner.jpg"
            alt=""
            aria-hidden
            className="block h-full w-auto max-w-none shrink-0"
            draggable={false}
          />
        ))}
      </div>
    </div>
  );
}
