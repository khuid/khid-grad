// 이미지 자리. src가 있으면 이미지를 채워 보여 주고, 없으면 짙은 회색 빈칸 + 무엇이 들어갈지 글자로 표시.
// 짙은 회색 빈칸은 디자인이 아니라 "아직 이미지 없음" 표시 — 사진·작품 이미지는 사용자가 따로 줌(2026-11-04), 다 넣으면 화면에서 사라짐
// size: 이미지 픽셀 크기를 알면 넘김 → 불러오기 전에 비율대로 자리를 잡음
export default function Ph({ src, label, className = "", size }: { src?: string; label: string; className?: string; size?: [number, number] }) {
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={label} loading="lazy" decoding="async" width={size?.[0]} height={size?.[1]} className={`block object-cover ${className}`} />;
  }
  return (
    <div
      role="img"
      aria-label={label}
      style={size && { aspectRatio: `${size[0]} / ${size[1]}` }}
      className={`flex items-center justify-center overflow-hidden bg-[#1e1e1e] p-2 text-center text-[11px] leading-[1.3] text-[#6e6e6e] ${className}`}
    >
      {label}
    </div>
  );
}
