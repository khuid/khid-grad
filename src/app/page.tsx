import { redirect } from "next/navigation";

// [모든 연도 공통] 주소만 입력하면(/ 로 들어오면) 가장 최신 연도 페이지로 이동.
// 새 연도를 추가하면 여기만 그 연도로 바꿔 주세요. 지난 연도(예: 2025)를 나중에 추가할 때는 바꾸지 않음
export default function Home() {
  redirect("/2026");
}
