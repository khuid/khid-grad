// 2024 메인 (/2024) — 아임웹 Main 페이지 그대로: 무빙 포스터 유튜브 영상 하나
// 영상 칸 비율 1680:2351(≈5:7), PC는 양옆 15 띄움 / 모바일은 화면 폭 가득
// 아임웹에서처럼 자동 재생 · 소리 끔 · 반복 · 조작 버튼 숨김
const VIDEO_ID = "q4FzAVEEWhs";

export default function Page() {
  return (
    <div className="min-[768px]:px-[15px]">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${VIDEO_ID}&controls=0&playsinline=1&rel=0`}
        title="KHID 2024 EXPLORER 무빙 포스터"
        allow="autoplay; encrypted-media; picture-in-picture"
        className="block aspect-[1680/2351] w-full border-0"
      />
    </div>
  );
}
