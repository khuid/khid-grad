// 메인 히어로 아래 화살표 — 프레이머 main_arrow 컴포넌트(점으로 된 V자, 움직임 있음). 크기 100×100 (Tablet·Phone은 축소)
// [추정] 프레이머 애니메이션 값을 못 읽어서, 점 9개 V자가 위아래로 천천히 움직이는 것으로 임시 구현. 원본 확인 후 맞출 것
const DOTS = [
  [14, 34],
  [24, 46],
  [34, 58],
  [44, 70],
  [50, 78],
  [56, 70],
  [66, 58],
  [76, 46],
  [86, 34],
];

export default function HeroArrow() {
  return (
    <svg viewBox="0 0 100 100" aria-hidden className="block size-[100px] animate-bounce fill-white [animation-duration:2s]">
      {DOTS.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={5.5} />
      ))}
    </svg>
  );
}
