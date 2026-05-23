import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAcademy } from "../lca/academy-context";
import { SFX } from "../lca/audio";
import { HomeScreen } from "../lca/screens";

export const Route = createFileRoute("/_app/")({ component: Home });

function Home() {
	const { data, theme, openThemePicker } = useAcademy();
	const navigate = useNavigate();
	return (
		<HomeScreen
			data={data}
			theme={theme}
			onPickSubject={(id) => {
				SFX.whoosh();
				navigate({ to: "/subject/$subjectId", params: { subjectId: id } });
			}}
			onNav={(s) => {
				SFX.whoosh();
				navigate({ to: s === "rewards" ? "/rewards" : "/profile" });
			}}
			onChangeTheme={openThemePicker}
		/>
	);
}
