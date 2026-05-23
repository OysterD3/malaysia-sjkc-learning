// Renders a Chinese character as accurate, animatable SVG strokes for the
// 笔画 (stroke-count) drill. Uses the `hanzi-writer` renderer with baked-in
// Make Me a Hanzi stroke data (see hanzi-data.ts). hanzi-writer is imported
// lazily inside an effect so it never runs during SSR.

import { useEffect, useRef, useState } from "react";
import { SFX } from "./audio";
import { HANZI_DATA } from "./hanzi-data";

interface HanziWriterInstance {
	animateCharacter: () => void;
	showCharacter: () => void;
	hideCharacter: () => void;
}

export function HanziStrokes({
	char,
	size = 168,
	allowAnimate = true,
}: {
	char: string;
	size?: number;
	// When false, the stroke-order replay is locked — the child must count the
	// (static) character first. Flip to true after a wrong answer to unlock it.
	allowAnimate?: boolean;
}) {
	const ref = useRef<HTMLDivElement>(null);
	const writerRef = useRef<HanziWriterInstance | null>(null);
	const [ready, setReady] = useState(false);
	const data = HANZI_DATA[char];

	// biome-ignore lint/correctness/useExhaustiveDependencies: char/size remount via key upstream
	useEffect(() => {
		const el = ref.current;
		if (!el || !data) return;
		let cancelled = false;
		el.innerHTML = "";
		setReady(false);
		import("hanzi-writer").then((mod) => {
			if (cancelled || !ref.current) return;
			const HanziWriter = mod.default;
			writerRef.current = HanziWriter.create(ref.current, char, {
				width: size,
				height: size,
				padding: 6,
				showCharacter: true,
				showOutline: true,
				strokeColor: "#1A2B4A",
				outlineColor: "#E2E9F4",
				strokeAnimationSpeed: 1,
				delayBetweenStrokes: 280,
				// Use our baked-in data instead of fetching from a CDN.
				charDataLoader: () => data,
			}) as unknown as HanziWriterInstance;
			setReady(true);
		});
		return () => {
			cancelled = true;
			writerRef.current = null;
			if (el) el.innerHTML = "";
		};
	}, [char, size]);

	const replay = () => {
		SFX.tap();
		writerRef.current?.animateCharacter();
	};

	// The moment the replay unlocks (child got it wrong), play it once to help.
	useEffect(() => {
		if (allowAnimate && ready) writerRef.current?.animateCharacter();
	}, [allowAnimate, ready]);

	// No stroke data → fall back to the plain glyph so the question still works.
	if (!data) {
		return (
			<div
				style={{
					width: size,
					height: size,
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					fontSize: size * 0.66,
					fontWeight: 800,
					color: "#1A2B4A",
				}}
			>
				{char}
			</div>
		);
	}

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				gap: 12,
			}}
		>
			<div
				style={{
					position: "relative",
					width: size,
					height: size,
					background: "#FFFFFF",
					border: "4px solid #1A2B4A",
					borderRadius: 18,
					boxShadow: "0 6px 0 #1A2B4A",
				}}
			>
				{/* 米字格 guide lines behind the strokes */}
				<svg
					width={size}
					height={size}
					viewBox={`0 0 ${size} ${size}`}
					aria-hidden="true"
					style={{ position: "absolute", inset: 0 }}
				>
					<rect
						x={4}
						y={4}
						width={size - 8}
						height={size - 8}
						fill="none"
						stroke="#F0AAB0"
						strokeWidth={1}
					/>
					<line
						x1={size / 2}
						y1={4}
						x2={size / 2}
						y2={size - 4}
						stroke="#F0AAB0"
						strokeWidth={1}
						strokeDasharray="5 5"
					/>
					<line
						x1={4}
						y1={size / 2}
						x2={size - 4}
						y2={size / 2}
						stroke="#F0AAB0"
						strokeWidth={1}
						strokeDasharray="5 5"
					/>
					<line
						x1={4}
						y1={4}
						x2={size - 4}
						y2={size - 4}
						stroke="#F6CDD0"
						strokeWidth={1}
						strokeDasharray="5 5"
					/>
					<line
						x1={size - 4}
						y1={4}
						x2={4}
						y2={size - 4}
						stroke="#F6CDD0"
						strokeWidth={1}
						strokeDasharray="5 5"
					/>
				</svg>
				<div ref={ref} style={{ position: "relative", zIndex: 1 }} />
			</div>
			{allowAnimate ? (
				<button
					type="button"
					onClick={replay}
					disabled={!ready}
					style={{
						background: "#FFD93D",
						border: "3px solid #1A2B4A",
						borderRadius: 14,
						padding: "8px 18px",
						fontSize: 17,
						fontWeight: 800,
						color: "#1A2B4A",
						cursor: ready ? "pointer" : "default",
						boxShadow: "0 4px 0 #C99800",
						fontFamily: "inherit",
						opacity: ready ? 1 : 0.6,
					}}
				>
					▶ 看笔顺
				</button>
			) : (
				<div style={{ fontSize: 15, fontWeight: 700, color: "#7080A0" }}>
					先数一数有几画 🤔
				</div>
			)}
		</div>
	);
}
