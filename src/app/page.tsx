import { redirect } from "next/navigation";

// 루트(/)로 들어오면 최신 연도 페이지로 이동. 새 연도를 추가하면 여기만 바꿔주세요.
export default function Home() {
  redirect("/2026");
}
