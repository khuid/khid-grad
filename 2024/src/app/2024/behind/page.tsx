import type { Metadata } from "next";
import Ph from "../_components/Ph";
import { BEHIND } from "../_components/behind";

export const metadata: Metadata = { title: "Behind — KHID 2024 Graduation Exhibition" };

// Behind (/2024/behind) — 전시 준비 과정·현장 사진·영상. 아임웹에 없던 새 페이지 (사용자 결정 2026-11-04)
// 배치: 작품 상세처럼 한 줄로 크게, 위에서부터 틈 없이 이어 붙임 — PC 폭 1250 / 모바일 360(양옆 15)
// 영상: 눌러서 재생, 소리 있음(음소거 안 함), 재생 버튼 등 조작 막대 보임 (사용자 결정 2026-11-04). 유튜브도 같은 폭 16:9
// 사진·영상 목록은 _components/behind.ts
const BOX = "mx-auto w-[calc(100%-30px)] max-w-[1250px]";

export default function BehindPage() {
  return (
    <div className="pb-[15px]">
      <h1 className="sr-only">Behind</h1>
      {BEHIND.length === 0 && <Ph label="Behind 사진·영상" size={[16, 9]} className={BOX} />}
      {BEHIND.map((item, i) => {
        if (item.kind === "image") {
          return <Ph key={i} src={item.src} label={item.alt ?? `Behind 사진 ${i + 1}`} size={item.size} className={`${BOX} h-auto`} />;
        }
        if (item.kind === "youtube") {
          return (
            <div key={i} className={BOX}>
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${item.id}?rel=0`}
                title={item.title ?? `Behind 영상 ${i + 1}`}
                allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                allowFullScreen
                className="block aspect-video w-full border-0"
              />
            </div>
          );
        }
        // #t=0.1 — 아이폰 사파리도 첫 장면을 보여 주게 (preload="metadata"만으로는 검은 화면)
        return (
          <video
            key={i}
            src={`${item.src}#t=0.1`}
            poster={item.poster}
            width={item.size[0]}
            height={item.size[1]}
            controls
            playsInline
            preload="metadata"
            aria-label={item.title}
            className={`${BOX} block h-auto bg-black`}
          />
        );
      })}
    </div>
  );
}
