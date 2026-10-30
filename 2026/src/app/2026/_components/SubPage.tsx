import BackButton from "./BackButton";
import Footer from "./Footer";
import Header from "./Header";
import { FRAME, Node } from "./SectionBar";
import SiteCursor from "./SiteCursor";

// DESIGNERS·PROJECTS 같은 메인 밖 페이지의 틀: 상단바 + 흰 바탕 + 프레임 세로선(상단바 아래 ~ 푸터 위) + 푸터.
// 선 디자인은 메인 [3]·[4]와 같음: #1A6AE8(deepblue) 1px, 선이 만나는 곳에 9×9 사각형(SectionBar의 Node).
// body 배경이 파랑(key)이라 main에 흰 배경을 깔아 둠
export default function SubPage({
  current,
  children,
}: {
  current: "projects" | "designers";
  children: React.ReactNode;
}) {
  return (
    <>
      <Header current={current} />
      {/* 상단바 높이(44/52 + 아래선 1)만큼 내려서 시작 */}
      <main className="relative bg-white pt-[45px] text-ink min-[1000px]:pt-[53px]">
        <div
          aria-hidden
          className={`pointer-events-none absolute top-[45px] bottom-0 left-1/2 -translate-x-1/2 border-x border-deepblue min-[1000px]:top-[53px] ${FRAME}`}
        />
        {children}
      </main>
      <Footer />
      <SiteCursor heroId="top" />
    </>
  );
}

// 페이지 맨 위 상자: 상단바 아래 여백(24/40/50, [2]와 같음) → 위 가로선(화면 끝에서 끝까지) → 내용 → 아래 가로선(프레임 안만).
// Figma designers·designers/profiles: 위 가로선 y 110(상단바 60 + 50), 아래 가로선은 프레임 폭(1340)만, 네 모서리에 사각형.
// 프레임 세로선은 FRAME 폭의 첫·마지막 1px이라 사각형 중심은 안쪽으로 0.5
// back: 위 여백(가로선 위) 왼쪽에 뒤로 가기 칸 (상세 페이지용, 링크로 바로 들어왔을 때 갈 목록 주소)
export function TopBox({ children, back }: { children: React.ReactNode; back?: string }) {
  return (
    <div className="relative mt-[24px] min-[768px]:mt-[40px] min-[1000px]:mt-[50px]">
      {back && (
        <div
          className={`absolute bottom-full left-1/2 flex h-[24px] -translate-x-1/2 min-[768px]:h-[40px] min-[1000px]:h-[50px] ${FRAME}`}
        >
          <BackButton fallback={back} />
        </div>
      )}
      <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-deepblue" />
      <div className={`@container relative mx-auto py-px ${FRAME}`}>
        <span aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-deepblue" />
        <Node className="top-[0.5px] left-[0.5px]" />
        <Node className="top-[0.5px] left-[calc(100%-0.5px)]" />
        <Node className="top-[calc(100%-0.5px)] left-[0.5px]" />
        <Node className="top-[calc(100%-0.5px)] left-[calc(100%-0.5px)]" />
        {children}
      </div>
    </div>
  );
}

// 상자 안 세로 칸막이(위·아래 가로선과 만나는 곳에 사각형). 부모는 relative, 칸막이는 부모의 왼쪽 끝 1px
export function Divider() {
  return (
    <>
      <span aria-hidden className="absolute top-[-1px] bottom-[-1px] left-0 w-px bg-deepblue" />
      <Node className="top-[-0.5px] left-[0.5px]" />
      <Node className="top-[calc(100%+0.5px)] left-[0.5px]" />
    </>
  );
}

// 큰 화살표(외곽선, Figma designers 오른쪽 위·profiles 이름 옆). 모양은 public/2026/arrow-outline.svg와 같고,
// 원본은 오른쪽 아래를 가리켜서 좌우반전. 선 굵기는 화살표 크기와 상관없이 화면 기준 px로 고정(--sw, 최대 1.5 — 2026-10-23 결정).
// 원래처럼 크기에 비례하면 작은 화면에서 더 얇아지는데, 그 값(1.1~1.3)은 각 사용처에서 --sw로 그대로 둠
// trim: 아래 빈칸(180.107~202)을 잘라 그림 아래 끝 = 상자 아래 끝(프로필에서 글자 기준선과 맞출 때). 선이 잘리지 않게 overflow-visible
export function OutlineArrow({ className = "", trim = false }: { className?: string; trim?: boolean }) {
  return (
    <svg
      viewBox={trim ? "0 0 202 180.107" : "0 0 202 202"}
      aria-hidden
      className={`block h-auto max-w-none -scale-x-100 ${trim ? "aspect-[202/180.107] overflow-visible" : ""} ${className}`}
    >
      <path
        d="M48.8019 16.1097L131.891 102.178L131.909 26.1915L177.486 70.933L177.613 165.666L177.613 180.107L163.226 180.107L68.4933 180.107L23.6791 134.585L99.756 134.494L16.0133 47.7357L48.8019 16.1097Z"
        fill="none"
        stroke="#1980FF"
        vectorEffect="non-scaling-stroke"
        style={{ strokeWidth: "var(--sw, 1.5px)" }}
      />
    </svg>
  );
}
