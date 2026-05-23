// Layout for a single lesson. Both children (the intro at the index and the
// quiz) are full-bleed, so chrome is hidden here for the whole subtree.
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/subject/$subjectId/$lessonId")({
	component: Outlet,
	staticData: { chrome: false },
});
