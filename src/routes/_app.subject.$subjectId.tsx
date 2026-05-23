// Layout for a subject. Renders whichever child matches (the lesson list at
// the index, a lesson intro, or a quiz) through <Outlet />.
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/subject/$subjectId")({
	component: Outlet,
});
