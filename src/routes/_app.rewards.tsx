import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useAcademy } from "../lca/academy-context";
import { RewardsScreen } from "../lca/screens";

export const Route = createFileRoute("/_app/rewards")({ component: Rewards });

function Rewards() {
	const { data, theme } = useAcademy();
	const router = useRouter();
	return (
		<RewardsScreen
			data={data}
			theme={theme}
			onBack={() => router.history.back()}
		/>
	);
}
