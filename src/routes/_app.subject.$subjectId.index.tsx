import {
	createFileRoute,
	useNavigate,
	useRouter,
} from "@tanstack/react-router";
import { useAcademy } from "../lca/academy-context";
import { SFX } from "../lca/audio";
import { SubjectScreen } from "../lca/screens";

export const Route = createFileRoute("/_app/subject/$subjectId/")({
	component: SubjectRoute,
});

function SubjectRoute() {
	const { data, theme } = useAcademy();
	const { subjectId } = Route.useParams();
	const router = useRouter();
	const navigate = useNavigate();
	return (
		<SubjectScreen
			data={data}
			theme={theme}
			subjectId={subjectId}
			onBack={() => router.history.back()}
			onPickLesson={(sid, lid) => {
				SFX.whoosh();
				navigate({
					to: "/subject/$subjectId/$lessonId",
					params: { subjectId: sid, lessonId: lid },
				});
			}}
		/>
	);
}
