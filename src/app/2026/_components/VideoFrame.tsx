// [2] 하단 16:9 영상 자리. 영상이 확정되면 youtubeId(유튜브 주소의 v= 뒤 값)만 넣으면 됨.
// 아직 없으면 Figma처럼 빈 프레임 + "영상" 표시
export default function VideoFrame({ youtubeId, className }: { youtubeId?: string; className?: string }) {
  return (
    <div className={`relative aspect-video w-full overflow-hidden bg-[#555] ${className ?? ""}`}>
      {youtubeId ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0`}
          title="제35회 졸업전시 영상"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 size-full"
        />
      ) : (
        <p className="text-title absolute inset-0 flex items-center justify-center text-white">영상</p>
      )}
    </div>
  );
}
