// Pilot-kid mascot + aircraft + shared UI primitives.
// All SVGs are simple shapes (head, body, hat) — friendly chunky illustration style.

import { type CSSProperties, type ReactNode, useEffect, useState } from "react";
import { SFX } from "./audio";

// True on phone-sized screens. Safe here because the app mounts client-only.
export function useIsMobile(breakpoint = 640): boolean {
	const [mobile, setMobile] = useState(
		() => typeof window !== "undefined" && window.innerWidth < breakpoint,
	);
	useEffect(() => {
		const onResize = () => setMobile(window.innerWidth < breakpoint);
		window.addEventListener("resize", onResize);
		return () => window.removeEventListener("resize", onResize);
	}, [breakpoint]);
	return mobile;
}

export function shadeColor(hex: string, percent: number): string {
	const num = Number.parseInt(hex.replace("#", ""), 16);
	const amt = Math.round(2.55 * percent);
	const R = (num >> 16) + amt;
	const G = ((num >> 8) & 0x00ff) + amt;
	const B = (num & 0x0000ff) + amt;
	return `#${(
		0x1000000 +
		(Math.max(0, Math.min(255, R)) << 16) +
		(Math.max(0, Math.min(255, G)) << 8) +
		Math.max(0, Math.min(255, B))
	)
		.toString(16)
		.slice(1)}`;
}

interface MascotProps {
	size?: number;
	waving?: boolean;
	style?: CSSProperties;
}

/* ---------- Mascot: Pilot Kid ---------- */
export function PilotKid({
	size = 140,
	waving = true,
	style = {},
}: MascotProps) {
	return (
		<svg viewBox="0 0 200 220" width={size} height={size * 1.1} style={style}>
			<title>Pilot kid mascot</title>
			<defs>
				<radialGradient id="lc-skin" cx="0.5" cy="0.4" r="0.7">
					<stop offset="0" stopColor="#FFE0C2" />
					<stop offset="1" stopColor="#F4C28B" />
				</radialGradient>
			</defs>
			{/* Body — navy pilot jacket */}
			<path
				d="M55 175 Q55 130 100 130 Q145 130 145 175 L145 210 L55 210 Z"
				fill="#1F3A6E"
			/>
			{/* Jacket lapel */}
			<path d="M100 130 L80 175 L100 180 L120 175 Z" fill="#FFFFFF" />
			{/* Tie */}
			<path d="M97 138 L103 138 L106 165 L100 175 L94 165 Z" fill="#E63946" />
			{/* Gold buttons */}
			<circle cx="80" cy="155" r="3" fill="#FFD93D" />
			<circle cx="80" cy="170" r="3" fill="#FFD93D" />
			<circle cx="120" cy="155" r="3" fill="#FFD93D" />
			<circle cx="120" cy="170" r="3" fill="#FFD93D" />
			{/* Wings badge */}
			<g transform="translate(100 150)">
				<path d="M-10 0 L-18 -3 L-22 0 L-18 3 L-10 0 Z" fill="#FFD93D" />
				<path d="M10 0 L18 -3 L22 0 L18 3 L10 0 Z" fill="#FFD93D" />
				<circle cx="0" cy="0" r="3" fill="#E63946" />
			</g>
			{/* Neck */}
			<rect x="92" y="115" width="16" height="20" fill="url(#lc-skin)" />
			{/* Head */}
			<circle cx="100" cy="88" r="44" fill="url(#lc-skin)" />
			{/* Ears */}
			<circle cx="58" cy="92" r="7" fill="url(#lc-skin)" />
			<circle cx="142" cy="92" r="7" fill="url(#lc-skin)" />
			{/* Hair peek (under hat) */}
			<path
				d="M65 70 Q80 60 100 60 Q120 60 135 70 L135 80 L65 80 Z"
				fill="#2B1810"
			/>
			{/* Pilot hat — top */}
			<path
				d="M52 70 Q52 38 100 38 Q148 38 148 70 L150 78 L50 78 Z"
				fill="#FFFFFF"
			/>
			{/* Hat band */}
			<rect x="50" y="74" width="100" height="14" rx="2" fill="#1F3A6E" />
			{/* Hat brim */}
			<ellipse cx="100" cy="92" rx="56" ry="6" fill="#1A2B4A" />
			{/* Hat badge */}
			<g transform="translate(100 56)">
				<circle r="9" fill="#FFD93D" stroke="#1A2B4A" strokeWidth="1.5" />
				<path
					d="M0 -4 L1 -1 L4 -1 L1.5 1 L2.5 4 L0 2 L-2.5 4 L-1.5 1 L-4 -1 L-1 -1 Z"
					fill="#E63946"
				/>
			</g>
			{/* Eyes — happy */}
			<g>
				<circle cx="83" cy="98" r="5" fill="#1A2B4A" />
				<circle cx="117" cy="98" r="5" fill="#1A2B4A" />
				<circle cx="85" cy="96" r="1.6" fill="#FFFFFF" />
				<circle cx="119" cy="96" r="1.6" fill="#FFFFFF" />
			</g>
			{/* Cheeks */}
			<circle cx="74" cy="110" r="6" fill="#FF9AA2" opacity="0.7" />
			<circle cx="126" cy="110" r="6" fill="#FF9AA2" opacity="0.7" />
			{/* Smile */}
			<path
				d="M88 115 Q100 124 112 115"
				stroke="#1A2B4A"
				strokeWidth="2.5"
				fill="none"
				strokeLinecap="round"
			/>
			{/* Arm — waving */}
			{waving ? (
				<g className="lc-wave">
					<path d="M150 145 L172 110 L182 115 L160 155 Z" fill="#1F3A6E" />
					<circle cx="178" cy="108" r="10" fill="url(#lc-skin)" />
				</g>
			) : (
				<g>
					<path d="M145 175 L160 200 L150 205 L135 180 Z" fill="#1F3A6E" />
					<circle cx="155" cy="200" r="8" fill="url(#lc-skin)" />
				</g>
			)}
			{/* Other arm */}
			<path d="M55 175 L40 200 L50 205 L65 180 Z" fill="#1F3A6E" />
			<circle cx="45" cy="200" r="8" fill="url(#lc-skin)" />
		</svg>
	);
}

/* ---------- Aircraft silhouettes ---------- */
export function Aircraft({
	type = "A380",
	size = 80,
	color = "#1F3A6E",
	style = {},
}: {
	type?: string;
	size?: number;
	color?: string;
	style?: CSSProperties;
}) {
	if (type === "🚀" || type === "rocket") {
		return (
			<svg viewBox="0 0 100 100" width={size} height={size} style={style}>
				<title>Rocket</title>
				<path
					d="M50 10 Q60 30 60 60 L55 80 L45 80 L40 60 Q40 30 50 10 Z"
					fill={color}
				/>
				<circle cx="50" cy="40" r="5" fill="#FFD93D" />
				<path d="M40 60 L30 80 L40 75 Z" fill="#FF6B6B" />
				<path d="M60 60 L70 80 L60 75 Z" fill="#FF6B6B" />
				<path d="M45 82 L50 92 L55 82 Z" fill="#FFB300" />
			</svg>
		);
	}
	return (
		<svg viewBox="0 0 120 60" width={size} height={size * 0.5} style={style}>
			<title>Aircraft</title>
			{/* Body */}
			<ellipse cx="60" cy="30" rx="50" ry="9" fill={color} />
			{/* Tail */}
			<path d="M105 30 L118 12 L114 30 Z" fill={color} />
			{/* Wing */}
			<path d="M55 30 L45 45 L75 45 L80 30 Z" fill={color} opacity="0.85" />
			{/* Upper wing */}
			<path d="M55 30 L48 18 L78 18 L82 30 Z" fill={color} opacity="0.6" />
			{/* Windows */}
			<g fill="#FFD93D" opacity="0.9">
				<circle cx="30" cy="28" r="1.8" />
				<circle cx="40" cy="28" r="1.8" />
				<circle cx="50" cy="28" r="1.8" />
				<circle cx="60" cy="28" r="1.8" />
				<circle cx="70" cy="28" r="1.8" />
				<circle cx="80" cy="28" r="1.8" />
				<circle cx="90" cy="28" r="1.8" />
			</g>
			{/* Cockpit */}
			<path
				d="M10 30 Q5 27 10 25 L18 25 Q20 28 18 32 L10 32 Z"
				fill="#7EC4FF"
			/>
		</svg>
	);
}

/* ---------- Cloud decorations ---------- */
export function Cloud({
	x = 0,
	y = 0,
	scale = 1,
	opacity = 1,
	style = {},
}: {
	x?: number;
	y?: number;
	scale?: number;
	opacity?: number;
	style?: CSSProperties;
}) {
	return (
		<svg
			viewBox="0 0 100 50"
			width={100 * scale}
			height={50 * scale}
			style={{ position: "absolute", left: x, top: y, opacity, ...style }}
		>
			<title>Cloud</title>
			<ellipse cx="25" cy="32" rx="22" ry="14" fill="#FFFFFF" />
			<ellipse cx="55" cy="25" rx="26" ry="18" fill="#FFFFFF" />
			<ellipse cx="80" cy="32" rx="18" ry="12" fill="#FFFFFF" />
		</svg>
	);
}

/* ---------- Star + heart ---------- */
export function Star({
	size = 18,
	filled = true,
	color = "#FFD93D",
}: {
	size?: number;
	filled?: boolean;
	color?: string;
}) {
	return (
		<svg viewBox="0 0 24 24" width={size} height={size}>
			<title>Star</title>
			<path
				d="M12 2 L14.9 8.8 L22 9.3 L16.5 14 L18.3 21 L12 17.3 L5.7 21 L7.5 14 L2 9.3 L9.1 8.8 Z"
				fill={filled ? color : "none"}
				stroke={color}
				strokeWidth="1.8"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

export function Heart({
	size = 18,
	color = "#FF6B6B",
}: {
	size?: number;
	color?: string;
}) {
	return (
		<svg viewBox="0 0 24 24" width={size} height={size}>
			<title>Heart</title>
			<path d="M12 21 C-4 12 5 1 12 8 C19 1 28 12 12 21 Z" fill={color} />
		</svg>
	);
}

/* ---------- Stat chip (stars) ---------- */
export function StatChip({ icon, label }: { icon: string; label: string }) {
	return (
		<div
			style={{
				background: "#FFFFFF",
				border: "3px solid #1A2B4A",
				borderRadius: 16,
				padding: "8px 14px",
				display: "flex",
				alignItems: "center",
				gap: 6,
				boxShadow: "0 4px 0 #1A2B4A",
				fontWeight: 800,
				fontSize: 18,
				color: "#1A2B4A",
			}}
		>
			<span style={{ fontSize: 22 }}>{icon}</span>
			<span>{label}</span>
		</div>
	);
}

/* ---------- Big chunky button ---------- */
type BtnSize = "sm" | "md" | "lg";
export function BigButton({
	children,
	onClick,
	color = "#FF6B6B",
	shadow = "#C73E3E",
	style = {},
	disabled = false,
	size = "md",
}: {
	children: ReactNode;
	onClick?: (e: React.MouseEvent) => void;
	color?: string;
	shadow?: string;
	style?: CSSProperties;
	disabled?: boolean;
	size?: BtnSize;
}) {
	const [pressed, setPressed] = useState(false);
	const sizes: Record<
		BtnSize,
		{ padding: string; font: number; radius: number; sh: number }
	> = {
		sm: { padding: "10px 18px", font: 16, radius: 14, sh: 4 },
		md: { padding: "14px 26px", font: 18, radius: 18, sh: 6 },
		lg: { padding: "18px 36px", font: 22, radius: 22, sh: 8 },
	};
	const s = sizes[size];
	return (
		<button
			type="button"
			onClick={(e) => {
				if (!disabled) {
					SFX.tap();
					onClick?.(e);
				}
			}}
			onMouseDown={() => setPressed(true)}
			onMouseUp={() => setPressed(false)}
			onMouseLeave={() => setPressed(false)}
			onTouchStart={() => setPressed(true)}
			onTouchEnd={() => setPressed(false)}
			disabled={disabled}
			style={{
				background: disabled ? "#CCCCCC" : color,
				color: "#FFFFFF",
				border: "none",
				padding: s.padding,
				borderRadius: s.radius,
				fontSize: s.font,
				fontWeight: 800,
				cursor: disabled ? "not-allowed" : "pointer",
				boxShadow:
					pressed || disabled
						? `0 1px 0 ${disabled ? "#888" : shadow}`
						: `0 ${s.sh}px 0 ${disabled ? "#888" : shadow}`,
				transform:
					pressed && !disabled ? `translateY(${s.sh - 1}px)` : "translateY(0)",
				transition: "transform 80ms, box-shadow 80ms",
				fontFamily: "inherit",
				letterSpacing: "0.02em",
				...style,
			}}
		>
			{children}
		</button>
	);
}

/* ---------- Progress bar (chunky) ---------- */
export function ProgressBar({
	value = 0,
	color = "#FFD93D",
	bg = "#1A2B4A",
	height = 14,
	showLabel = false,
}: {
	value?: number;
	color?: string;
	bg?: string;
	height?: number;
	showLabel?: boolean;
}) {
	return (
		<div
			style={{
				background: bg,
				borderRadius: height,
				height,
				overflow: "hidden",
				position: "relative",
				boxShadow: "inset 0 2px 0 rgba(0,0,0,0.2)",
			}}
		>
			<div
				style={{
					width: `${Math.max(0, Math.min(1, value)) * 100}%`,
					background: `linear-gradient(180deg, ${color}, ${shadeColor(color, -15)})`,
					height: "100%",
					borderRadius: height,
					transition: "width 500ms cubic-bezier(.2,.9,.3,1.2)",
					boxShadow: `inset 0 -3px 0 ${shadeColor(color, -25)}`,
				}}
			/>
			{showLabel && (
				<div
					style={{
						position: "absolute",
						inset: 0,
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						color: "#FFFFFF",
						fontWeight: 800,
						fontSize: height * 0.7,
						textShadow: "0 1px 2px rgba(0,0,0,0.3)",
					}}
				>
					{Math.round(value * 100)}%
				</div>
			)}
		</div>
	);
}

/* ---------- Sky background ---------- */
export function SkyBackground({
	children,
	intensity = 1,
}: {
	children?: ReactNode;
	intensity?: number;
}) {
	return (
		<div
			style={{
				position: "absolute",
				inset: 0,
				background:
					"linear-gradient(180deg, #BFE4FF 0%, #E8F4FF 60%, #FFF8E7 100%)",
				overflow: "hidden",
			}}
		>
			{/* Sun */}
			<div
				style={{
					position: "absolute",
					top: 30,
					right: 40,
					width: 90,
					height: 90,
					background:
						"radial-gradient(circle, #FFD93D 30%, rgba(255,217,61,0) 70%)",
					borderRadius: "50%",
				}}
			/>
			<div
				style={{
					position: "absolute",
					top: 50,
					right: 60,
					width: 50,
					height: 50,
					background: "#FFD93D",
					borderRadius: "50%",
					boxShadow: "0 0 30px rgba(255,217,61,0.6)",
				}}
			/>
			<Cloud x={-30} y={120} scale={1.1 * intensity} opacity={0.9} />
			<Cloud x={620} y={80} scale={0.9 * intensity} opacity={0.85} />
			<Cloud x={300} y={40} scale={0.7 * intensity} opacity={0.7} />
			<Cloud x={150} y={260} scale={0.6 * intensity} opacity={0.6} />
			<Cloud x={700} y={300} scale={0.8 * intensity} opacity={0.7} />
			{children}
		</div>
	);
}

/* ---------- Card ---------- */
export function Card({
	children,
	style = {},
	onClick,
	bg = "#FFFFFF",
	accent = null,
	hover = true,
}: {
	children: ReactNode;
	style?: CSSProperties;
	onClick?: () => void;
	bg?: string;
	accent?: string | null;
	hover?: boolean;
}) {
	const [h, setH] = useState(false);
	return (
		<div
			onClick={onClick}
			onMouseEnter={() => setH(true)}
			onMouseLeave={() => setH(false)}
			style={{
				background: bg,
				borderRadius: 22,
				padding: 18,
				border: `3px solid ${accent || "#1A2B4A"}`,
				boxShadow:
					h && hover
						? `0 10px 0 ${accent || "#1A2B4A"}`
						: `0 6px 0 ${accent || "#1A2B4A"}`,
				transform: h && hover ? "translateY(-4px)" : "translateY(0)",
				transition: "transform 150ms, box-shadow 150ms",
				cursor: onClick ? "pointer" : "default",
				...style,
			}}
		>
			{children}
		</div>
	);
}

/* ---------- Confetti burst ---------- */
export function Confetti({ run = false }: { run?: boolean }) {
	if (!run) return null;
	const pieces = Array.from({ length: 30 }).map((_, i) => i);
	const colors = ["#FFD93D", "#FF6B6B", "#4ECDC4", "#4A9EFF", "#A78BFA"];
	return (
		<div
			style={{
				position: "absolute",
				inset: 0,
				pointerEvents: "none",
				overflow: "hidden",
			}}
		>
			{pieces.map((i) => {
				const left = Math.random() * 100;
				const delay = Math.random() * 0.4;
				const dur = 1.2 + Math.random() * 0.8;
				const rot = Math.random() * 720;
				const color = colors[i % colors.length];
				return (
					<div
						key={i}
						style={{
							position: "absolute",
							left: `${left}%`,
							top: "-20px",
							width: 10,
							height: 14,
							background: color,
							borderRadius: 2,
							animation: `lc-fall ${dur}s ${delay}s cubic-bezier(.2,.6,.5,1) forwards`,
							transform: `rotate(${rot}deg)`,
						}}
					/>
				);
			})}
		</div>
	);
}
