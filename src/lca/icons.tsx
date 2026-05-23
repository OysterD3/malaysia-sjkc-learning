// Picture icons for the 看图 / 配对 / 量词 questions.
//
// Each key maps to /public/icons/{key}.png (outlined kid-friendly art — see
// IMAGE-ASSETS.md). Until that PNG exists, PicIcon shows the emoji fallback
// below, so the app keeps working while the artwork is being generated. Drop
// the PNGs into public/icons/ and they replace the emoji automatically.

import { useState } from "react";

export const ICON_FALLBACK: Record<string, string> = {
	tiger: "🐯",
	banana: "🍌",
	bee: "🐝",
	"bee-group": "🐝",
	moon: "🌙",
	swan: "🦢",
	"swan-group": "🦢",
	ant: "🐜",
	cat: "🐱",
	tree: "🌳",
	mountain: "⛰️",
	tooth: "🦷",
	photo: "🖼️",
	rain: "🌧️",
	book: "📖",
	rice: "🍚",
	blocks: "🧱",
	umbrella: "☔",
	piano: "🎹",
	toycar: "🚗",
	sunrise: "🌅",
	watering: "🌼",
	slide: "🛝",
	"lineup-food": "🍚",
};

export function hasIcon(name: string): boolean {
	return name in ICON_FALLBACK;
}

// Renders the outline PNG if present, otherwise the emoji fallback.
export function PicIcon({ name, size = 72 }: { name: string; size?: number }) {
	const [failed, setFailed] = useState(false);
	const fallback = ICON_FALLBACK[name];

	if (failed || !name) {
		return (
			<span
				role="img"
				aria-hidden
				style={{ fontSize: Math.round(size * 0.82), lineHeight: 1 }}
			>
				{fallback ?? "❓"}
			</span>
		);
	}

	return (
		<img
			src={`/icons/${name}.png`}
			alt=""
			width={size}
			height={size}
			onError={() => setFailed(true)}
			style={{ objectFit: "contain", display: "block" }}
		/>
	);
}
