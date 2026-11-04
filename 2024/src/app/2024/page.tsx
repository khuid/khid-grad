// 2024 메인 (/2024) — 아임웹 Main 페이지 구성 그대로: 무빙 포스터 영상 하나
// 영상: 아임웹은 유튜브였지만 아카이브 사이트에 쓴 무빙 포스터 파일로 바꿈 (사용자 결정 2026-11-04)
//   원본 work/data/poster/mp.2024.mp4 (800×1126, H.264, 10초, 소리 있음) → public/2024/moving-poster.mp4
// PC는 양옆 15 띄움 / 모바일은 화면 폭 가득. 자동 재생 · 소리 끔 · 반복 · 조작 버튼 없음
export default function Page() {
  return (
    <div className="min-[768px]:px-[15px]">
      <video
        src="/2024/moving-poster.mp4"
        autoPlay
        muted
        loop
        playsInline
        aria-label="KHID 2024 EXPLORER 무빙 포스터"
        className="block aspect-[800/1126] w-full bg-black object-cover"
      />
    </div>
  );
}
