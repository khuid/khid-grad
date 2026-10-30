"use client";

import { useEffect, useState } from "react";

// [2] 하단 16:9 영상 자리. 영상이 확정되면 youtubeId(유튜브 주소의 v= 뒤 값)만 넣으면 됨.
// 유튜브 플레이어(스크립트 약 1MB)는 처음엔 불러오지 않고 썸네일 + 재생 버튼만 보여줌 →
// 누른 사람만 그때 플레이어를 불러와 바로 재생. 아직 영상이 없으면 빈 프레임만
export default function VideoFrame({ youtubeId, className }: { youtubeId?: string; className?: string }) {
  const [active, setActive] = useState(false);
  // 다른 페이지로 넘어가면 유튜브 플레이어를 닫음(숨겨진 이전 페이지에서 소리가 계속 나지 않게) — 돌아오면 썸네일부터
  useEffect(() => () => setActive(false), []);

  return (
    <div className={`relative aspect-video w-full overflow-hidden bg-[#555] ${className ?? ""}`}>
      {youtubeId &&
        (active ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0&autoplay=1`}
            title="제35회 졸업전시 영상"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 size-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setActive(true)}
            aria-label="영상 재생"
            className="group absolute inset-0 flex size-full items-center justify-center"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`}
              alt=""
              loading="lazy"
              className="absolute inset-0 size-full object-cover"
            />
            <span className="relative flex size-16 items-center justify-center rounded-full bg-key/90 transition-transform duration-200 group-hover:scale-110 min-[1000px]:size-20">
              <svg viewBox="0 0 24 24" aria-hidden className="ml-1 size-7 fill-white min-[1000px]:size-8">
                <path d="M7 4.5v15l12-7.5z" />
              </svg>
            </span>
          </button>
        ))}
    </div>
  );
}
