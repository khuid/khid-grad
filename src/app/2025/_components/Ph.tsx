// 이미지 자리. src가 있으면 이미지를 채워 보여 주고, 없으면 회색 빈칸 + 무엇이 들어갈지 글자로 표시.
// 회색 빈칸은 디자인이 아니라 "아직 이미지 없음" 표시 — 이미지를 다 넣으면 화면에서 사라짐
export default function Ph({ src, label, className = "" }: { src?: string; label: string; className?: string }) {
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={label} className={`block object-cover ${className}`} />;
  }
  return (
    <div
      role="img"
      aria-label={label}
      className={`flex items-center justify-center overflow-hidden bg-[#e2e3e5] p-2 text-center text-[11px] leading-[1.3] text-[#8a8f94] ${className}`}
    >
      {label}
    </div>
  );
}
