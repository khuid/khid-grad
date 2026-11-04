// 자동 복사본 — 고치지 말고 저장소의 common/에서 고친 뒤 python3 scripts/sync-common.py
// [모든 연도 공통] 없는 주소(예: 아직 만들지 않은 /2025, 잘못 입력한 주소)로 들어왔을 때 보이는 안내 화면.
// 어느 연도에도 속하지 않는 화면이라 일부러 특정 연도의 색·글꼴을 쓰지 않음(기본 글꼴·흑백). 연도 디자인을 여기 넣지 말 것

const box = {
  position: "fixed" as const, // 화면 전체를 덮음(바깥 여백과 상관없이 스크롤 없이 한 화면)
  inset: 0,
  overflow: "auto",
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "center",
  justifyContent: "center",
  gap: 24,
  padding: 24,
  background: "#fff",
  color: "#121212",
  fontFamily: "system-ui, -apple-system, sans-serif",
  textAlign: "center" as const,
};
const link = { color: "inherit", textDecoration: "underline", textUnderlineOffset: 4 };

export default function NotFound() {
  return (
    <main style={box}>
      <p style={{ margin: 0, fontSize: 20, fontWeight: 600 }}>페이지를 찾을 수 없어요</p>
      <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: "#777" }}>
        주소가 바뀌었거나 아직 준비되지 않은 페이지예요.
        <br />
        This page could not be found.
      </p>
      <div style={{ display: "flex", gap: 24, fontSize: 15 }}>
        {/* 최신 연도 사이트(/ 가 최신 연도로 보내 줌). 연도 사이를 오가는 링크라 <Link> 대신 <a>로 새로 불러옴(README) */}
        <a href="/" style={link}>
          졸업전시 보러 가기
        </a>
        {/* 역대 졸업전시를 모아 둔 아카이브 사이트(별도 프로젝트 archive-site) */}
        <a href="https://khid.exhibit.khu.ac.kr" style={link}>
          전체 아카이브
        </a>
      </div>
    </main>
  );
}
