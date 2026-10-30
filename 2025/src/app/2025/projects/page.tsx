import { redirect } from "next/navigation";
import { CATEGORIES } from "../_components/categories";

// /2025/projects → 첫 번째 과목 탭으로
export default function ProjectsIndex() {
  redirect(`/2025/projects/${CATEGORIES[0].slug}`);
}
