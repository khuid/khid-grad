import { redirect } from "next/navigation";
import { GROUPS } from "../_components/designers";

// /2025/designers → 첫 번째 초성 탭(ㄱ · ㄴ)으로
export default function DesignersIndex() {
  redirect(`/2025/designers/${GROUPS[0].slug}`);
}
