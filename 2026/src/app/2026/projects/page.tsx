import { redirect } from "next/navigation";
import { CLASSES } from "../_components/projects";

// /2026/projects → 첫 번째 수업 탭으로
export default function ProjectsIndex() {
  redirect(`/2026/projects/${CLASSES[0].key}`);
}
