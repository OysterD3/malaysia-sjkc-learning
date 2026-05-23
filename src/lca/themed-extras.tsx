// Additional mascots (Explorer, Inventor, Wizard) + themed background variants
// and the theme picker overlay.

import { type CSSProperties, type ReactNode, useState } from "react";
import { SFX } from "./audio";
import { THEMES, type Theme, type ThemeId } from "./themes";
import { Cloud, PilotKid, SkyBackground } from "./ui";

interface MascotProps {
	size?: number;
	waving?: boolean;
	style?: CSSProperties;
}

/* ============ EXPLORER KID (Dinosaur theme) ============ */
export function ExplorerKid({
	size = 140,
	waving = true,
	style = {},
}: MascotProps) {
	return (
		<svg viewBox="0 0 200 220" width={size} height={size * 1.1} style={style}>
			<title>Explorer kid mascot</title>
			<defs>
				<radialGradient id="ek-skin" cx="0.5" cy="0.4" r="0.7">
					<stop offset="0" stopColor="#FFE0C2" />
					<stop offset="1" stopColor="#F4C28B" />
				</radialGradient>
			</defs>
			<path
				d="M55 175 Q55 130 100 130 Q145 130 145 175 L145 210 L55 210 Z"
				fill="#8B6F3A"
			/>
			<path d="M100 130 L88 175 L100 180 L112 175 Z" fill="#5E8B3A" />
			<rect x="68" y="155" width="18" height="14" rx="2" fill="#5E4A24" />
			<rect x="114" y="155" width="18" height="14" rx="2" fill="#5E4A24" />
			<circle cx="77" cy="162" r="1.5" fill="#FFD93D" />
			<circle cx="123" cy="162" r="1.5" fill="#FFD93D" />
			<path
				d="M75 140 Q100 155 125 140"
				stroke="#2D2018"
				strokeWidth="2.5"
				fill="none"
			/>
			<g transform="translate(100 158)">
				<rect x="-14" y="-6" width="10" height="12" rx="2" fill="#2D2018" />
				<rect x="4" y="-6" width="10" height="12" rx="2" fill="#2D2018" />
				<circle cx="-9" cy="0" r="2.5" fill="#7EC4FF" />
				<circle cx="9" cy="0" r="2.5" fill="#7EC4FF" />
			</g>
			<rect x="92" y="115" width="16" height="20" fill="url(#ek-skin)" />
			<circle cx="100" cy="88" r="44" fill="url(#ek-skin)" />
			<circle cx="58" cy="92" r="7" fill="url(#ek-skin)" />
			<circle cx="142" cy="92" r="7" fill="url(#ek-skin)" />
			<path
				d="M65 70 Q80 60 100 60 Q120 60 135 70 L135 80 L65 80 Z"
				fill="#3B2614"
			/>
			<ellipse cx="100" cy="78" rx="62" ry="9" fill="#A8884A" />
			<path d="M58 78 Q58 42 100 42 Q142 42 142 78 Z" fill="#C8A56A" />
			<rect x="58" y="72" width="84" height="6" fill="#5E4A24" />
			<path d="M140 72 L155 60 L150 75 Z" fill="#E63946" />
			<circle cx="83" cy="98" r="5" fill="#2D2018" />
			<circle cx="117" cy="98" r="5" fill="#2D2018" />
			<circle cx="85" cy="96" r="1.6" fill="#FFFFFF" />
			<circle cx="119" cy="96" r="1.6" fill="#FFFFFF" />
			<circle cx="74" cy="110" r="6" fill="#FF9AA2" opacity="0.7" />
			<circle cx="126" cy="110" r="6" fill="#FF9AA2" opacity="0.7" />
			<path
				d="M88 115 Q100 124 112 115"
				stroke="#2D2018"
				strokeWidth="2.5"
				fill="none"
				strokeLinecap="round"
			/>
			{waving ? (
				<g className="lc-wave">
					<path d="M150 145 L172 110 L182 115 L160 155 Z" fill="#8B6F3A" />
					<circle cx="178" cy="108" r="10" fill="url(#ek-skin)" />
				</g>
			) : (
				<g>
					<path d="M145 175 L160 200 L150 205 L135 180 Z" fill="#8B6F3A" />
					<circle cx="155" cy="200" r="8" fill="url(#ek-skin)" />
				</g>
			)}
			<path d="M55 175 L40 200 L50 205 L65 180 Z" fill="#8B6F3A" />
			<circle cx="45" cy="200" r="8" fill="url(#ek-skin)" />
			{/* Tiny dino friend at feet */}
			<g transform="translate(150 195)">
				<ellipse cx="0" cy="0" rx="14" ry="9" fill="#5E8B3A" />
				<circle cx="-12" cy="-3" r="6" fill="#5E8B3A" />
				<circle cx="-14" cy="-5" r="1.2" fill="#FFFFFF" />
				<path d="M10 -2 L18 -8 L14 0 Z" fill="#5E8B3A" />
				<path d="M-5 5 L-5 10 L-3 10 L-3 5 Z" fill="#3F5E26" />
				<path d="M3 5 L3 10 L5 10 L5 5 Z" fill="#3F5E26" />
				<path
					d="M-3 -7 L0 -10 L3 -7"
					stroke="#FFD93D"
					strokeWidth="1"
					fill="none"
				/>
			</g>
		</svg>
	);
}

/* ============ INVENTOR KID (Robot theme) ============ */
export function InventorKid({
	size = 140,
	waving = true,
	style = {},
}: MascotProps) {
	return (
		<svg viewBox="0 0 200 220" width={size} height={size * 1.1} style={style}>
			<title>Inventor kid mascot</title>
			<defs>
				<radialGradient id="ik-skin" cx="0.5" cy="0.4" r="0.7">
					<stop offset="0" stopColor="#FFE0C2" />
					<stop offset="1" stopColor="#F4C28B" />
				</radialGradient>
			</defs>
			<path
				d="M55 175 Q55 130 100 130 Q145 130 145 175 L145 210 L55 210 Z"
				fill="#F5F5FA"
			/>
			<path d="M100 130 L86 210 L114 210 Z" fill="#E8E8F0" />
			<rect
				x="68"
				y="150"
				width="14"
				height="20"
				rx="2"
				fill="#FFFFFF"
				stroke="#D0D0DC"
				strokeWidth="1.5"
			/>
			<rect
				x="118"
				y="150"
				width="14"
				height="20"
				rx="2"
				fill="#FFFFFF"
				stroke="#D0D0DC"
				strokeWidth="1.5"
			/>
			<rect x="55" y="178" width="90" height="10" fill="#7C4DFF" />
			<rect x="93" y="178" width="14" height="14" rx="2" fill="#FFD93D" />
			<circle cx="93" cy="150" r="2" fill="#7C4DFF" />
			<circle cx="93" cy="165" r="2" fill="#7C4DFF" />
			<rect x="92" y="115" width="16" height="20" fill="url(#ik-skin)" />
			<circle cx="100" cy="88" r="44" fill="url(#ik-skin)" />
			<circle cx="58" cy="92" r="7" fill="url(#ik-skin)" />
			<circle cx="142" cy="92" r="7" fill="url(#ik-skin)" />
			<path
				d="M62 75 L68 50 L78 70 L86 45 L98 68 L108 42 L118 68 L128 48 L138 75 Z"
				fill="#1F1F2E"
			/>
			<rect x="55" y="76" width="90" height="14" rx="6" fill="#2D2D3D" />
			<circle
				cx="80"
				cy="83"
				r="9"
				fill="#00E5FF"
				stroke="#2D2D3D"
				strokeWidth="2"
			/>
			<circle
				cx="120"
				cy="83"
				r="9"
				fill="#00E5FF"
				stroke="#2D2D3D"
				strokeWidth="2"
			/>
			<circle cx="80" cy="83" r="3" fill="#FFFFFF" opacity="0.7" />
			<circle cx="120" cy="83" r="3" fill="#FFFFFF" opacity="0.7" />
			<line
				x1="100"
				y1="50"
				x2="100"
				y2="38"
				stroke="#2D2D3D"
				strokeWidth="2.5"
			/>
			<circle cx="100" cy="35" r="4" fill="#FF3D9A" />
			<circle cx="83" cy="103" r="4" fill="#2D2018" />
			<circle cx="117" cy="103" r="4" fill="#2D2018" />
			<circle cx="84.5" cy="101.5" r="1.4" fill="#FFFFFF" />
			<circle cx="118.5" cy="101.5" r="1.4" fill="#FFFFFF" />
			<circle cx="74" cy="113" r="5" fill="#FF9AA2" opacity="0.7" />
			<circle cx="126" cy="113" r="5" fill="#FF9AA2" opacity="0.7" />
			<path
				d="M88 118 Q100 126 112 118"
				stroke="#2D2018"
				strokeWidth="2.5"
				fill="none"
				strokeLinecap="round"
			/>
			{waving ? (
				<g className="lc-wave">
					<path d="M150 145 L172 110 L182 115 L160 155 Z" fill="#F5F5FA" />
					<circle cx="178" cy="108" r="10" fill="url(#ik-skin)" />
					<rect x="174" y="100" width="10" height="14" rx="3" fill="#7C4DFF" />
				</g>
			) : (
				<g>
					<path d="M145 175 L160 200 L150 205 L135 180 Z" fill="#F5F5FA" />
					<circle cx="155" cy="200" r="8" fill="url(#ik-skin)" />
				</g>
			)}
			<path d="M55 175 L40 200 L50 205 L65 180 Z" fill="#F5F5FA" />
			<circle cx="45" cy="200" r="8" fill="url(#ik-skin)" />
			<g transform="translate(150 195)">
				<rect x="-10" y="-8" width="20" height="16" rx="3" fill="#7C4DFF" />
				<circle cx="-4" cy="-2" r="2" fill="#00E5FF" />
				<circle cx="4" cy="-2" r="2" fill="#00E5FF" />
				<rect x="-2" y="4" width="4" height="1.5" fill="#FFD93D" />
				<line
					x1="0"
					y1="-8"
					x2="0"
					y2="-14"
					stroke="#2D2D3D"
					strokeWidth="1.5"
				/>
				<circle cx="0" cy="-15" r="2" fill="#FF3D9A" />
			</g>
		</svg>
	);
}

/* ============ WIZARD KID (Magic theme) ============ */
export function WizardKid({
	size = 140,
	waving = true,
	style = {},
}: MascotProps) {
	return (
		<svg viewBox="0 0 200 220" width={size} height={size * 1.1} style={style}>
			<title>Wizard kid mascot</title>
			<defs>
				<radialGradient id="wk-skin" cx="0.5" cy="0.4" r="0.7">
					<stop offset="0" stopColor="#FFE0C2" />
					<stop offset="1" stopColor="#F4C28B" />
				</radialGradient>
				<linearGradient id="wk-robe" x1="0" y1="0" x2="0" y2="1">
					<stop offset="0" stopColor="#A78BFA" />
					<stop offset="1" stopColor="#7C4DFF" />
				</linearGradient>
				<linearGradient id="wk-hat" x1="0" y1="0" x2="0" y2="1">
					<stop offset="0" stopColor="#5B3FA8" />
					<stop offset="1" stopColor="#7C4DFF" />
				</linearGradient>
			</defs>
			<path
				d="M50 175 Q50 130 100 130 Q150 130 150 175 L155 210 L45 210 Z"
				fill="url(#wk-robe)"
			/>
			<path d="M100 130 L80 145 L100 158 L120 145 Z" fill="#FFD93D" />
			<g fill="#FFD93D" opacity="0.85">
				<path d="M70 170 L72 174 L76 174 L73 177 L74 181 L70 179 L66 181 L67 177 L64 174 L68 174 Z" />
				<path d="M130 175 L132 179 L136 179 L133 182 L134 186 L130 184 L126 186 L127 182 L124 179 L128 179 Z" />
				<path d="M95 195 L97 199 L101 199 L98 202 L99 206 L95 204 L91 206 L92 202 L89 199 L93 199 Z" />
			</g>
			<rect x="60" y="175" width="80" height="6" fill="#5B3FA8" />
			<path
				d="M96 175 L100 167 L104 175 L100 183 Z"
				fill="#E94B8E"
				stroke="#FFD93D"
				strokeWidth="1"
			/>
			<rect x="92" y="115" width="16" height="20" fill="url(#wk-skin)" />
			<circle cx="100" cy="88" r="44" fill="url(#wk-skin)" />
			<circle cx="58" cy="92" r="7" fill="url(#wk-skin)" />
			<circle cx="142" cy="92" r="7" fill="url(#wk-skin)" />
			<path
				d="M68 76 Q80 65 100 65 Q120 65 132 76 L132 80 L68 80 Z"
				fill="#3B2614"
			/>
			<path d="M55 78 L100 12 L145 78 Z" fill="url(#wk-hat)" />
			<ellipse cx="100" cy="78" rx="50" ry="8" fill="#3D2A78" />
			<path d="M85 50 Q92 47 92 56 Q88 53 85 50 Z" fill="#FFD93D" />
			<circle cx="95" cy="35" r="1.5" fill="#FFD93D" />
			<circle cx="78" cy="65" r="1.5" fill="#FFD93D" />
			<circle cx="100" cy="12" r="4" fill="#E94B8E" />
			<circle cx="83" cy="100" r="5" fill="#2D2018" />
			<circle cx="117" cy="100" r="5" fill="#2D2018" />
			<circle cx="85" cy="98" r="1.6" fill="#FFFFFF" />
			<circle cx="119" cy="98" r="1.6" fill="#FFFFFF" />
			<circle cx="74" cy="112" r="6" fill="#FF9AA2" opacity="0.7" />
			<circle cx="126" cy="112" r="6" fill="#FF9AA2" opacity="0.7" />
			<path
				d="M88 117 Q100 126 112 117"
				stroke="#2D2018"
				strokeWidth="2.5"
				fill="none"
				strokeLinecap="round"
			/>
			{waving ? (
				<g className="lc-wave">
					<path
						d="M150 145 L172 105 L182 110 L160 155 Z"
						fill="url(#wk-robe)"
					/>
					<circle cx="178" cy="103" r="10" fill="url(#wk-skin)" />
					<rect
						x="175"
						y="60"
						width="3"
						height="50"
						fill="#5E4A24"
						transform="rotate(20 178 90)"
					/>
					<path
						d="M192 50 L196 58 L204 58 L198 64 L200 72 L192 67 L184 72 L186 64 L180 58 L188 58 Z"
						fill="#FFD93D"
						stroke="#E94B8E"
						strokeWidth="1"
					/>
				</g>
			) : (
				<g>
					<path
						d="M145 175 L160 200 L150 205 L135 180 Z"
						fill="url(#wk-robe)"
					/>
					<circle cx="155" cy="200" r="8" fill="url(#wk-skin)" />
				</g>
			)}
			<path d="M50 175 L40 200 L50 205 L65 180 Z" fill="url(#wk-robe)" />
			<circle cx="45" cy="200" r="8" fill="url(#wk-skin)" />
		</svg>
	);
}

/* ============ ThemedMascot — picks the right SVG ============ */
export function ThemedMascot({
	themeId = "pilot",
	size = 140,
	waving = true,
	style = {},
}: {
	themeId?: ThemeId;
	size?: number;
	waving?: boolean;
	style?: CSSProperties;
}) {
	// PilotKid lives in ui.tsx; re-imported lazily here to avoid a cycle.
	if (themeId === "dino")
		return <ExplorerKid size={size} waving={waving} style={style} />;
	if (themeId === "robot")
		return <InventorKid size={size} waving={waving} style={style} />;
	if (themeId === "magic")
		return <WizardKid size={size} waving={waving} style={style} />;
	return <PilotKid size={size} waving={waving} style={style} />;
}

/* ============ Themed backgrounds ============ */
export function ThemedBackground({
	themeId = "pilot",
	children,
}: {
	themeId?: ThemeId;
	children?: ReactNode;
}) {
	if (themeId === "dino")
		return <JungleBackground>{children}</JungleBackground>;
	if (themeId === "robot") return <TechBackground>{children}</TechBackground>;
	if (themeId === "magic")
		return <DreamyBackground>{children}</DreamyBackground>;
	return <SkyBackground>{children}</SkyBackground>;
}

function JungleBackground({ children }: { children?: ReactNode }) {
	return (
		<div
			style={{
				position: "absolute",
				inset: 0,
				background:
					"linear-gradient(180deg, #FFE5B4 0%, #C8E6A0 50%, #FFF1D6 100%)",
				overflow: "hidden",
			}}
		>
			<div
				style={{
					position: "absolute",
					top: 30,
					right: 50,
					width: 70,
					height: 70,
					background: "#FFB300",
					borderRadius: "50%",
					boxShadow: "0 0 60px rgba(255,179,0,0.4)",
				}}
			/>
			<svg
				viewBox="0 0 800 400"
				preserveAspectRatio="none"
				style={{
					position: "absolute",
					bottom: 0,
					left: 0,
					width: "100%",
					height: 200,
					opacity: 0.8,
				}}
			>
				<title>Jungle foliage</title>
				<path d="M0 400 Q60 280 30 200 Q90 270 120 380 Z" fill="#3F7A2F" />
				<path d="M120 400 Q180 260 220 280 Q200 360 260 400 Z" fill="#5E8B3A" />
				<path d="M560 400 Q610 280 580 200 Q650 270 680 400 Z" fill="#3F7A2F" />
				<path d="M700 400 Q740 280 800 240 L800 400 Z" fill="#5E8B3A" />
			</svg>
			<svg
				viewBox="0 0 800 200"
				preserveAspectRatio="none"
				style={{
					position: "absolute",
					top: 80,
					left: 0,
					width: "100%",
					height: 150,
					opacity: 0.35,
				}}
			>
				<title>Mountains</title>
				<path
					d="M0 200 L150 80 L280 160 L420 60 L560 140 L720 70 L800 200 Z"
					fill="#5E8B3A"
				/>
			</svg>
			<Cloud x={50} y={50} scale={0.8} opacity={0.8} />
			<Cloud x={500} y={30} scale={0.7} opacity={0.7} />
			{children}
		</div>
	);
}

function TechBackground({ children }: { children?: ReactNode }) {
	return (
		<div
			style={{
				position: "absolute",
				inset: 0,
				background:
					"linear-gradient(180deg, #0A1530 0%, #1A2B4A 40%, #2D1B69 100%)",
				overflow: "hidden",
			}}
		>
			<div
				style={{
					position: "absolute",
					inset: 0,
					opacity: 0.25,
					backgroundImage:
						"linear-gradient(rgba(0,229,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.4) 1px, transparent 1px)",
					backgroundSize: "40px 40px",
					maskImage: "linear-gradient(180deg, transparent 0%, black 60%)",
					WebkitMaskImage: "linear-gradient(180deg, transparent 0%, black 60%)",
				}}
			/>
			<div
				style={{
					position: "absolute",
					top: 60,
					right: 60,
					width: 200,
					height: 200,
					background:
						"radial-gradient(circle, rgba(0,229,255,0.3) 0%, transparent 70%)",
					borderRadius: "50%",
				}}
			/>
			<div
				style={{
					position: "absolute",
					bottom: 80,
					left: 40,
					width: 240,
					height: 240,
					background:
						"radial-gradient(circle, rgba(255,61,154,0.25) 0%, transparent 70%)",
					borderRadius: "50%",
				}}
			/>
			{Array.from({ length: 25 }).map((_, i) => (
				<div
					// biome-ignore lint/suspicious/noArrayIndexKey: static decorative dots
					key={i}
					style={{
						position: "absolute",
						left: `${(i * 37) % 100}%`,
						top: `${(i * 53) % 100}%`,
						width: 3,
						height: 3,
						borderRadius: "50%",
						background: i % 2 ? "#00E5FF" : "#FF3D9A",
						opacity: 0.5 + (i % 3) * 0.15,
						boxShadow: "0 0 6px currentColor",
					}}
				/>
			))}
			{children}
		</div>
	);
}

function DreamyBackground({ children }: { children?: ReactNode }) {
	return (
		<div
			style={{
				position: "absolute",
				inset: 0,
				background:
					"linear-gradient(180deg, #FFE0F0 0%, #E0D0FF 50%, #FFE8F5 100%)",
				overflow: "hidden",
			}}
		>
			<svg
				viewBox="0 0 800 400"
				preserveAspectRatio="none"
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					width: "100%",
					height: 280,
					opacity: 0.4,
				}}
			>
				<title>Rainbow</title>
				<path
					d="M-50 380 Q400 -100 850 380"
					stroke="#FF6B6B"
					strokeWidth="22"
					fill="none"
				/>
				<path
					d="M-50 380 Q400 -100 850 380"
					stroke="#FFB347"
					strokeWidth="22"
					fill="none"
					transform="translate(0 22)"
				/>
				<path
					d="M-50 380 Q400 -100 850 380"
					stroke="#FFD93D"
					strokeWidth="22"
					fill="none"
					transform="translate(0 44)"
				/>
				<path
					d="M-50 380 Q400 -100 850 380"
					stroke="#A8E6A3"
					strokeWidth="22"
					fill="none"
					transform="translate(0 66)"
				/>
				<path
					d="M-50 380 Q400 -100 850 380"
					stroke="#7EC4FF"
					strokeWidth="22"
					fill="none"
					transform="translate(0 88)"
				/>
				<path
					d="M-50 380 Q400 -100 850 380"
					stroke="#A78BFA"
					strokeWidth="22"
					fill="none"
					transform="translate(0 110)"
				/>
			</svg>
			{Array.from({ length: 30 }).map((_, i) => {
				const colors = ["#FFD93D", "#FFFFFF", "#E94B8E", "#A78BFA"];
				return (
					<div
						// biome-ignore lint/suspicious/noArrayIndexKey: static decorative sparkles
						key={i}
						style={{
							position: "absolute",
							left: `${(i * 41) % 100}%`,
							top: `${(i * 67) % 90}%`,
							fontSize: 10 + (i % 4) * 4,
							color: colors[i % colors.length],
							opacity: 0.7,
							textShadow: "0 0 8px currentColor",
						}}
					>
						✦
					</div>
				);
			})}
			<Cloud x={-20} y={140} scale={1.1} opacity={0.7} />
			<Cloud x={600} y={100} scale={0.9} opacity={0.6} />
			{children}
		</div>
	);
}

/* ============ Theme Picker overlay ============ */
export function ThemePicker({
	current,
	onPick,
	onClose,
}: {
	current: ThemeId;
	onPick: (id: ThemeId) => void;
	onClose: () => void;
}) {
	return (
		<div
			style={{
				position: "absolute",
				inset: 0,
				zIndex: 1000,
				background: "rgba(26, 43, 74, 0.75)",
				backdropFilter: "blur(8px)",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				padding: 24,
				animation: "lc-pop 0.3s",
			}}
		>
			<div
				style={{
					background: "#FFF8E7",
					borderRadius: 28,
					padding: 28,
					border: "5px solid #1A2B4A",
					boxShadow: "0 12px 0 #1A2B4A",
					maxWidth: 720,
					width: "100%",
					position: "relative",
				}}
			>
				<button
					type="button"
					onClick={onClose}
					style={{
						position: "absolute",
						top: 14,
						right: 14,
						width: 38,
						height: 38,
						borderRadius: 12,
						background: "#FFFFFF",
						border: "3px solid #1A2B4A",
						boxShadow: "0 3px 0 #1A2B4A",
						cursor: "pointer",
						fontSize: 18,
						fontWeight: 900,
						color: "#1A2B4A",
						fontFamily: "inherit",
					}}
				>
					✕
				</button>

				<div style={{ textAlign: "center", marginBottom: 22 }}>
					<div
						style={{
							fontSize: 14,
							color: "#FF6B6B",
							fontWeight: 900,
							letterSpacing: 3,
						}}
					>
						✨ 选择你的世界 ✨
					</div>
					<h1
						style={{
							fontSize: 36,
							margin: "4px 0 4px",
							color: "#1A2B4A",
							fontFamily: '"ZCOOL KuaiLe", "Baloo 2", system-ui',
							textShadow: "3px 3px 0 #FFD93D",
						}}
					>
						选一个你喜欢的世界！
					</h1>
					<div style={{ fontSize: 15, color: "#4A6080", fontWeight: 700 }}>
						随时都可以换一个世界哦
					</div>
				</div>

				<div
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(2, 1fr)",
						gap: 16,
					}}
				>
					{Object.values(THEMES).map((t) => (
						<ThemeCard
							key={t.id}
							theme={t}
							current={current === t.id}
							onPick={() => {
								SFX.badge();
								onPick(t.id);
							}}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

function ThemeCard({
	theme,
	current,
	onPick,
}: {
	theme: Theme;
	current: boolean;
	onPick: () => void;
}) {
	const [h, setH] = useState(false);
	const previewBg = {
		pilot: "linear-gradient(180deg, #BFE4FF 0%, #FFF8E7 100%)",
		dino: "linear-gradient(180deg, #FFE5B4 0%, #C8E6A0 100%)",
		robot: "linear-gradient(180deg, #1A2B4A 0%, #2D1B69 100%)",
		magic: "linear-gradient(180deg, #FFE0F0 0%, #E0D0FF 100%)",
	}[theme.id];
	return (
		<div
			onClick={onPick}
			onMouseEnter={() => setH(true)}
			onMouseLeave={() => setH(false)}
			style={{
				background: "#FFFFFF",
				borderRadius: 20,
				padding: 14,
				border: `4px solid ${current ? theme.cta : "#1A2B4A"}`,
				boxShadow: h
					? `0 10px 0 ${current ? theme.cta : "#1A2B4A"}`
					: `0 6px 0 ${current ? theme.cta : "#1A2B4A"}`,
				transform: h ? "translateY(-4px)" : "translateY(0)",
				transition: "all 180ms",
				cursor: "pointer",
				position: "relative",
			}}
		>
			{current && (
				<div
					style={{
						position: "absolute",
						top: -12,
						right: -12,
						background: theme.cta,
						color: "#FFF",
						padding: "4px 10px",
						borderRadius: 10,
						fontSize: 11,
						fontWeight: 900,
						border: "2px solid #1A2B4A",
						boxShadow: "0 3px 0 #1A2B4A",
					}}
				>
					使用中
				</div>
			)}
			<div
				style={{
					height: 130,
					borderRadius: 14,
					marginBottom: 10,
					background: previewBg,
					position: "relative",
					overflow: "hidden",
					border: "2px solid #1A2B4A",
				}}
			>
				<div
					style={{
						position: "absolute",
						bottom: -10,
						left: "50%",
						transform: "translateX(-50%)",
					}}
				>
					<ThemedMascot themeId={theme.id} size={130} waving={h} />
				</div>
				<div style={{ position: "absolute", top: 8, left: 8, fontSize: 26 }}>
					{theme.emoji}
				</div>
			</div>
			<div
				style={{
					fontSize: 22,
					fontWeight: 900,
					color: "#1A2B4A",
					fontFamily: '"ZCOOL KuaiLe", "Baloo 2", system-ui',
				}}
			>
				{theme.emoji} {theme.name}
			</div>
			<div
				style={{
					fontSize: 13,
					color: "#4A6080",
					fontWeight: 700,
					marginTop: 2,
				}}
			>
				{theme.tagline}
			</div>
		</div>
	);
}
