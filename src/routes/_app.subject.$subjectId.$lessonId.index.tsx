import {
	createFileRoute,
	useNavigate,
	useRouter,
} from "@tanstack/react-router";
import { useAcademy } from "../lca/academy-context";
import { SFX } from "../lca/audio";
import { LessonIntro } from "../lca/screens";

export const Route = createFileRoute("/_app/subject/$subjectId/$lessonId/")({
	component: IntroRoute,
});

function IntroRoute() {
	const { data, theme } = useAcademy();
	const { subjectId, lessonId } = Route.useParams();
	const router = useRouter();
	const navigate = useNavigate();
	return (
		<LessonIntro
			data={data}
			theme={theme}
			subjectId={subjectId}
			lessonId={lessonId}
			onBack={() => router.history.back()}
			onStart={() => {
				SFX.whoosh();
				navigate({
					to: "/subject/$subjectId/$lessonId/quiz",
					params: { subjectId, lessonId },
				});
			}}
		/>
	);
}
