import {
	createFileRoute,
	useNavigate,
	useRouter,
} from "@tanstack/react-router";
import { useAcademy } from "../lca/academy-context";
import { SFX } from "../lca/audio";
import { ProfileScreen } from "../lca/screens";

export const Route = createFileRoute("/_app/profile")({ component: Profile });

function Profile() {
	const { data, theme } = useAcademy();
	const router = useRouter();
	const navigate = useNavigate();
	return (
		<ProfileScreen
			data={data}
			theme={theme}
			onBack={() => router.history.back()}
			onNav={(s) => {
				SFX.whoosh();
				navigate({ to: s === "rewards" ? "/rewards" : "/" });
			}}
		/>
	);
}
