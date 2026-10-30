// 메인 히어로 아래 스크롤 안내 — 프레이머 main_arrow 컴포넌트 그대로. 자리는 100×100, 보이는 크기는 Scale 1 (Tablet 0.7 / Phone 0.5)
// 점 9개(지름 100/7, #F7F8FA)가 V자로 하나씩 나타남: 처음 3초 비어 있다가 0.2초마다 한 개씩 → 다 그려지면 그대로 멈춤(반복 없음)
// 프레이머: 빈 Variant → 3초 뒤 Variant 1 → 0.2초마다 Variant 2…9, 바뀔 때 스프링 0.4초(튐 0.2). 2026-10-30 미리보기로 확인
// 움직임 줄이기 설정이면 처음부터 V자 전체를 보여 줌 (애니메이션은 2025.css의 hero-dot)
const D = 100 / 7;
const DOTS = [
  [3, 45],
  [13, 55],
  [23, 65],
  [33, 76],
  [43, 86],
  [53, 76],
  [63, 65],
  [73, 55],
  [83, 45],
]; // 프레이머 Ellipse 위치(왼쪽 위 꼭짓점 L, T)

export default function HeroArrow() {
  return (
    <svg viewBox="0 0 100 100" aria-hidden className="block size-[100px] shrink-0 scale-50 overflow-visible fill-[#F7F8FA] min-[720px]:scale-70 min-[1440px]:scale-100">
      {DOTS.map(([l, t], i) => (
        <circle key={i} cx={l + D / 2} cy={t + D / 2} r={D / 2} className="hero-dot" style={{ animationDelay: `${3 + 0.2 * i}s` }} />
      ))}
    </svg>
  );
}
