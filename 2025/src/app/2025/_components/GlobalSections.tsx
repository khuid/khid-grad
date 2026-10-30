import SectionBar from "./SectionBar";
import { GLOBAL_EXPERTS, GLOBAL_JP_WORKS, GLOBAL_VIDEO, GLOBAL_VISITS } from "./global";

// 일본 전공연수 페이지(/2025/projects/global-design)의 나머지 칸 — 프레이머 /projects-global_design
// 순서: 위쪽 소개 → 영상 → 교수진 → 현장 답사 → (참여 프로젝트 카드 = 과목 페이지와 같은 틀) → 일본 학생 작품 → 협력 기관 로고
// 이미지는 사용자가 준 드라이브 "일본관련" 폴더만 씀 (2026-10-31)
// 값은 2026-10-31 프레이머 미리보기 1440·720·390 화면에서 잼 (컴포넌트 안 값을 읽지 못해 화면에서 잰 값)
//   제목 바: Phone에도 보임(sub). 각 칸 패딩 Desktop 60 / Tablet 60 40 / Phone 60 16(교수진)·60(현장 답사)
//   프레이머 Tablet은 교수진 이름이 칸 밖으로 넘쳐 잘림 → 여기서는 줄바꿈으로 보이게 함

// 영상 — 오른쪽 폭 가득 16:9 + 아래 40 (세 화면 같음)
export function GlobalVideo() {
  return (
    <section className="pb-[40px]">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${GLOBAL_VIDEO}`}
        title="Global Design Intelligence Exchange 2025 Japan 영상"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="block aspect-video w-full"
      />
    </section>
  );
}

// 참여 교수진 및 전문가 — 묶음 제목(20 / Tablet 18 / Phone 16) + 16 + 3열 카드(간격 12 / 6 / 8), 묶음 사이 40 (Phone 24)
// 카드: 흰 정사각형 안에 원형 사진(폭 85%), 아래 8 + 이름(검정)·직무(회색) 16 (Tablet·Phone 14). Phone은 이름/직무 두 줄
export function GlobalExperts() {
  return (
    <div>
      <SectionBar ko="참여 교수진 및 전문가" en="Instructors & Experts" variant="sub" />
      <div className="flex flex-col gap-[24px] px-[16px] py-[60px] min-[720px]:gap-[40px] min-[720px]:px-[40px] min-[1440px]:px-[60px]">
        {GLOBAL_EXPERTS.map((g) => (
          <section key={g.group} className="flex flex-col gap-[16px]">
            <h3 className="font-ko text-[16px] leading-[1.4] min-[720px]:text-[18px] min-[1440px]:text-[20px]">{g.group}</h3>
            <ul className="grid grid-cols-3 gap-[8px] min-[720px]:gap-[6px] min-[1440px]:gap-[12px]">
              {g.people.map((p) => (
                <li key={p.name} className="flex flex-col gap-[8px]">
                  <div className="flex aspect-square items-center justify-center bg-white">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.photo} alt={p.name} loading="lazy" className="aspect-square w-[85%] rounded-full object-cover" />
                  </div>
                  <p className="flex flex-col items-center text-center font-ko text-[14px] leading-[1.5] min-[720px]:flex-row min-[720px]:flex-wrap min-[720px]:justify-center min-[720px]:gap-x-[8px] min-[1440px]:text-[16px]">
                    <span className="text-ink">{p.name}</span>
                    <span className="text-gray">{p.role}</span>
                  </p>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}

// 현장 답사 — Desktop: [사진 | 글] 2칸(간격 24), 사진은 원본 비율. Tablet·Phone: 사진 위, 글 아래(간격 16 / 8)
// 제목 20 (Tablet·Phone 16) + 8 + 설명 16/150 회색 (14). 장소 사이 28
export function GlobalVisits() {
  return (
    <div>
      <SectionBar ko="현장 답사" en="Site Visit" variant="sub" />
      <div className="flex flex-col gap-[28px] px-[60px] py-[60px] min-[720px]:px-[40px] min-[1440px]:px-[60px]">
        {GLOBAL_VISITS.map((v) => (
          <section key={v.title} className="flex flex-col gap-[8px] min-[720px]:gap-[16px] min-[1440px]:grid min-[1440px]:grid-cols-2 min-[1440px]:items-start min-[1440px]:gap-[24px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={v.photo} alt={v.title} loading="lazy" className="block h-auto w-full" />
            <div className="flex flex-col gap-[8px]">
              <h3 className="font-ko text-[16px] leading-[1.4] min-[1440px]:text-[20px]">{v.title}</h3>
              <p className="font-ko text-[14px] leading-[1.5] text-gray min-[1440px]:text-[16px]">{v.text}</p>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

// 일본 학생 작품 — 작품 제목(빨강 24 / Tablet 20 / Phone 16) + 이름(14) + 이미지 폭 가득(원본 비율)
// 패딩 100 (Tablet 60 / Phone 60 40), 작품 사이 60 (Phone 56)
export function GlobalJpWorks() {
  return (
    <div>
      <SectionBar ko="일본 학생 작품" en="Japanese Students' Works" variant="sub" />
      <div className="flex flex-col gap-[56px] px-[40px] py-[60px] min-[720px]:gap-[60px] min-[720px]:px-[60px] min-[1440px]:p-[100px]">
        {GLOBAL_JP_WORKS.map((w) => (
          <section key={w.title} className="flex flex-col">
            <h3 className="font-ko text-[16px] leading-[1.4] text-red min-[720px]:text-[20px] min-[1440px]:text-[24px]">{w.title}</h3>
            <p className="mt-[4px] font-ko text-[13px] leading-[1.4] whitespace-pre min-[720px]:mt-[8px] min-[1440px]:text-[14px]">{w.name}</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={w.image} alt={w.title} loading="lazy" className="mt-[12px] block h-auto w-full min-[720px]:mt-[20px]" />
          </section>
        ))}
      </div>
    </div>
  );
}

// 협력 기관 로고 — GK Design Group · 교토공예섬유대학 (빨강). 리플렛(.ai)의 벡터 로고를 고해상도로 그려 잘라 씀
// 가운데 나란히, 폭 402 (Tablet 200 / Phone 132), 간격 80 (40 / 28). 위 200·아래 100 (140·60 / 80·40)
export function GlobalPartners() {
  return (
    <div className="flex items-center justify-center gap-[28px] pt-[80px] pb-[40px] min-[720px]:gap-[40px] min-[720px]:pt-[140px] min-[720px]:pb-[60px] min-[1440px]:gap-[80px] min-[1440px]:pt-[200px] min-[1440px]:pb-[100px]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/2025/global/logo-gk.webp" alt="GK Design Group" className="block h-auto w-[132px] min-[720px]:w-[200px] min-[1440px]:w-[402px]" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/2025/global/logo-kyoto-kit.webp" alt="교토공예섬유대학 Kyoto Institute of Technology" className="block h-auto w-[132px] min-[720px]:w-[200px] min-[1440px]:w-[402px]" />
    </div>
  );
}
