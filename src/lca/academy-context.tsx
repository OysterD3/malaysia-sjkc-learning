// Shared academy state, provided once by the `_app` layout route and consumed
// by every screen route. This replaces the old in-component navigation stack:
// navigation is now the router's job (the URL reflects the screen), while this
// context carries the cross-screen state (theme, nickname, sound, live stats).

import { createContext, useContext } from "react";
import type { LiveStats } from "../lib/store";
import type { AppData } from "./data";
import type { Theme, ThemeId } from "./themes";

export interface Academy {
	data: AppData;
	theme: Theme;
	themeId: ThemeId;
	kidName: string;
	soundOn: boolean;
	stats: LiveStats;
	setName: (v: string) => void;
	setSound: (v: boolean) => void;
	setTheme: (id: ThemeId) => void;
	// Re-read stats from the store (call after recording a finished quiz).
	refreshStats: () => void;
	// Wipe all data and return to the first-run state.
	reset: () => void;
	// Open the theme picker overlay (rendered by the layout).
	openThemePicker: () => void;
}

export const AcademyCtx = createContext<Academy | null>(null);

export function useAcademy(): Academy {
	const v = useContext(AcademyCtx);
	if (!v)
		throw new Error("useAcademy must be used within the _app layout route");
	return v;
}
