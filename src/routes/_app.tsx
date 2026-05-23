// Academy layout route (pathless). Owns the cross-screen state, the bottom
// nav + settings chrome, and the theme/settings overlays; renders the active
// screen through <Outlet />. Screens live in sibling `_app.*` route files.

import {
	createFileRoute,
	Link,
	Outlet,
	useNavigate,
	useRouterState,
} from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { type Academy, AcademyCtx } from "../lca/academy-context";
import { SFX, setSoundEnabled } from "../lca/audio";
import { ThemePicker } from "../lca/themed-extras";
import { buildThemedData, THEMES, type ThemeId } from "../lca/themes";
import {
	type LiveStats,
	loadSettings,
	loadStats,
	resetAll,
	saveSettings,
} from "../lib/store";

// Per-route flag: screens that set `chrome: false` (lesson intro, quiz) render
// full-bleed without the bottom nav / settings gear.
declare module "@tanstack/react-router" {
	interface StaticDataRouteOption {
		chrome?: boolean;
	}
}

export const Route = createFileRoute("/_app")({ component: AppLayout });

function AppLayout() {
	// The academy is a fully client-side app (Web Audio, timers, localStorage).
	// Render a static loading shell during prerender + the first client paint so
	// hydration matches, then mount the real app.
	const [mounted, setMounted] = useState(false);
	useEffect(() => setMounted(true), []);

	// Settings + stats seeded from localStorage (safe on the server: the store
	// degrades to defaults when localStorage is unavailable).
	const [saved] = useState(loadSettings);
	const [themeId, setThemeId] = useState<ThemeId>(
		(saved.themeId as ThemeId) || "pilot",
	);
	const [kidName, setKidName] = useState(saved.name);
	const [soundOn, setSoundOn] = useState(saved.soundOn);
	const [stats, setStats] = useState<LiveStats>(loadStats);
	const [needsName, setNeedsName] = useState(() => !saved.name);
	const [showThemePicker, setShowThemePicker] = useState(false);
	const [showSettings, setShowSettings] = useState(false);

	const theme = THEMES[themeId] || THEMES.pilot;
	const data = useMemo(
		() => buildThemedData(themeId, kidName, stats),
		[themeId, kidName, stats],
	);

	useEffect(() => {
		setSoundEnabled(soundOn);
	}, [soundOn]);

	const navigate = useNavigate();

	const ctx: Academy = useMemo(
		() => ({
			data,
			theme,
			themeId,
			kidName,
			soundOn,
			stats,
			setName: (v) => {
				setKidName(v);
				const t = v.trim();
				if (t) saveSettings({ name: t });
			},
			setSound: (v) => {
				setSoundOn(v);
				saveSettings({ soundOn: v });
			},
			setTheme: (id) => {
				setThemeId(id);
				saveSettings({ themeId: id });
			},
			refreshStats: () => setStats(loadStats()),
			reset: () => {
				resetAll();
				setStats(loadStats());
				const s = loadSettings();
				setKidName(s.name);
				setThemeId((s.themeId as ThemeId) || "pilot");
				setSoundOn(s.soundOn);
				setNeedsName(!s.name);
			},
			openThemePicker: () => setShowThemePicker(true),
		}),
		[data, theme, themeId, kidName, soundOn, stats],
	);

	// Hide the chrome on full-bleed screens (lesson intro, quiz).
	const hideChrome = useRouterState({
		select: (s) => s.matches.some((m) => m.staticData?.chrome === false),
	});

	if (!mounted) return <LoadingShell />;

	if (needsName) {
		return (
			<NicknamePrompt
				onSubmit={(name) => {
					setKidName(name);
					saveSettings({ name });
					setNeedsName(false);
					SFX.badge();
				}}
			/>
		);
	}

	return (
		<AcademyCtx.Provider value={ctx}>
			<div
				style={{
					position: "absolute",
					inset: 0,
					fontFamily:
						'"Baloo 2", "Noto Sans SC", "ZCOOL KuaiLe", system-ui, sans-serif',
					overflow: "hidden",
					background: "#FFF8E7",
					color: "#1A2B4A",
				}}
			>
				<Outlet />

				{!hideChrome && <BottomNav themeAccent={theme.accent} />}

				{!hideChrome && (
					<button
						type="button"
						onClick={() => {
							SFX.pop();
							setShowSettings(true);
						}}
						title="设置"
						style={{
							position: "absolute",
							bottom: 88,
							left: 20,
							width: 52,
							height: 52,
							borderRadius: "50%",
							border: "4px solid #1A2B4A",
							boxShadow: "0 4px 0 #1A2B4A",
							background: "#FFFFFF",
							cursor: "pointer",
							fontSize: 22,
							fontFamily: "inherit",
							zIndex: 100,
						}}
					>
						⚙
					</button>
				)}

				{showThemePicker && (
					<ThemePicker
						current={themeId}
						onPick={(id) => {
							ctx.setTheme(id);
							setShowThemePicker(false);
						}}
						onClose={() => setShowThemePicker(false)}
					/>
				)}

				{showSettings && (
					<SettingsPanel
						kidName={kidName}
						onKidName={ctx.setName}
						soundOn={soundOn}
						onSound={ctx.setSound}
						themeId={themeId}
						onPickTheme={ctx.setTheme}
						onOpenPicker={() => {
							setShowSettings(false);
							setShowThemePicker(true);
						}}
						onReset={() => {
							ctx.reset();
							setShowSettings(false);
							navigate({ to: "/" });
						}}
						onClose={() => setShowSettings(false)}
					/>
				)}
			</div>
		</AcademyCtx.Provider>
	);
}

function LoadingShell() {
	return (
		<div
			className="lca-root"
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				background:
					"linear-gradient(180deg, #BFE4FF 0%, #E8F4FF 60%, #FFF8E7 100%)",
			}}
		>
			<div
				style={{
					fontSize: 28,
					fontWeight: 800,
					color: "#1A2B4A",
					fontFamily: '"ZCOOL KuaiLe", "Baloo 2", system-ui',
					textShadow: "2px 2px 0 #FFD93D",
				}}
			>
				✈ 小小机长学院 · 加载中…
			</div>
		</div>
	);
}

// Shown on the very first visit (no saved nickname yet). Collects the child's
// nickname before the academy opens; the name is then stored locally.
function NicknamePrompt({ onSubmit }: { onSubmit: (name: string) => void }) {
	const [name, setName] = useState("");
	const submit = (e: React.FormEvent) => {
		e.preventDefault();
		const t = name.trim();
		if (t) onSubmit(t);
	};
	return (
		<div
			style={{
				position: "absolute",
				inset: 0,
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				padding: 24,
				overflow: "auto",
				background:
					"linear-gradient(180deg, #BFE4FF 0%, #E8F4FF 55%, #FFF8E7 100%)",
				fontFamily:
					'"Baloo 2", "Noto Sans SC", "ZCOOL KuaiLe", system-ui, sans-serif',
				color: "#1A2B4A",
			}}
		>
			<form
				onSubmit={submit}
				style={{
					background: "#FFF8E7",
					borderRadius: 24,
					padding: 28,
					border: "5px solid #1A2B4A",
					boxShadow: "0 10px 0 #1A2B4A",
					maxWidth: 380,
					width: "100%",
					textAlign: "center",
				}}
			>
				<div style={{ fontSize: 48 }}>✈️</div>
				<h1
					style={{
						margin: "6px 0 2px",
						fontSize: 28,
						fontFamily: '"ZCOOL KuaiLe", "Baloo 2", system-ui',
						textShadow: "2px 2px 0 #FFD93D",
					}}
				>
					小小机长学院
				</h1>
				<p
					style={{
						margin: "0 0 18px",
						fontSize: 15,
						fontWeight: 700,
						color: "#4A6080",
					}}
				>
					你叫什么名字呀？
				</p>
				<input
					value={name}
					onChange={(e) => setName(e.target.value)}
					placeholder="输入你的昵称"
					maxLength={12}
					style={{
						width: "100%",
						fontSize: 20,
						fontWeight: 800,
						textAlign: "center",
						padding: "12px 14px",
						border: "3px solid #1A2B4A",
						borderRadius: 12,
						fontFamily: "inherit",
						color: "#1A2B4A",
						outline: "none",
						boxSizing: "border-box",
						marginBottom: 16,
					}}
				/>
				<button
					type="submit"
					disabled={!name.trim()}
					style={{
						width: "100%",
						padding: "13px",
						borderRadius: 14,
						border: "3px solid #1A2B4A",
						background: name.trim() ? "#FFD93D" : "#EDE4C8",
						boxShadow: `0 5px 0 ${name.trim() ? "#C99800" : "#C9BC95"}`,
						cursor: name.trim() ? "pointer" : "not-allowed",
						fontSize: 18,
						fontWeight: 800,
						color: "#1A2B4A",
						fontFamily: "inherit",
					}}
				>
					开始学习 →
				</button>
			</form>
		</div>
	);
}

function BottomNav({ themeAccent = "#FFD93D" }: { themeAccent?: string }) {
	const items = [
		{ to: "/", icon: "🏠", label: "首页", exact: true },
		{ to: "/rewards", icon: "🏆", label: "勋章", exact: false },
		{ to: "/profile", icon: "🆔", label: "我的", exact: false },
	] as const;
	return (
		<div
			style={{
				position: "absolute",
				bottom: 14,
				left: "50%",
				transform: "translateX(-50%)",
				background: "#FFFFFF",
				borderRadius: 28,
				padding: 6,
				border: "4px solid #1A2B4A",
				boxShadow: "0 6px 0 #1A2B4A",
				display: "flex",
				gap: 4,
				zIndex: 100,
				maxWidth: "calc(100vw - 20px)",
				boxSizing: "border-box",
			}}
		>
			{items.map((it) => (
				<Link
					key={it.to}
					to={it.to}
					activeOptions={{ exact: it.exact }}
					onClick={() => SFX.whoosh()}
					style={{
						border: "none",
						borderRadius: 22,
						padding: "10px clamp(6px, 3vw, 18px)",
						cursor: "pointer",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						gap: 2,
						minWidth: "clamp(44px, 13vw, 64px)",
						textDecoration: "none",
						background: "transparent",
					}}
					activeProps={{ style: { background: themeAccent } }}
				>
					<span style={{ fontSize: 22 }}>{it.icon}</span>
					<span style={{ fontSize: 11, fontWeight: 800, color: "#1A2B4A" }}>
						{it.label}
					</span>
				</Link>
			))}
		</div>
	);
}

function SettingsPanel({
	kidName,
	onKidName,
	soundOn,
	onSound,
	themeId,
	onPickTheme,
	onOpenPicker,
	onReset,
	onClose,
}: {
	kidName: string;
	onKidName: (v: string) => void;
	soundOn: boolean;
	onSound: (v: boolean) => void;
	themeId: ThemeId;
	onPickTheme: (id: ThemeId) => void;
	onOpenPicker: () => void;
	onReset: () => void;
	onClose: () => void;
}) {
	const [confirmReset, setConfirmReset] = useState(false);
	return (
		<div
			style={{
				position: "absolute",
				inset: 0,
				zIndex: 1000,
				background: "rgba(26, 43, 74, 0.6)",
				backdropFilter: "blur(6px)",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				padding: 24,
				animation: "lc-pop 0.25s",
			}}
		>
			<div
				style={{
					background: "#FFF8E7",
					borderRadius: 24,
					padding: 26,
					border: "5px solid #1A2B4A",
					boxShadow: "0 10px 0 #1A2B4A",
					maxWidth: 420,
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
						width: 36,
						height: 36,
						borderRadius: 12,
						background: "#FFFFFF",
						border: "3px solid #1A2B4A",
						boxShadow: "0 3px 0 #1A2B4A",
						cursor: "pointer",
						fontSize: 16,
						fontWeight: 900,
						color: "#1A2B4A",
						fontFamily: "inherit",
					}}
				>
					✕
				</button>
				<h2
					style={{
						margin: "0 0 18px",
						fontSize: 26,
						color: "#1A2B4A",
						fontFamily: '"ZCOOL KuaiLe", "Baloo 2", system-ui',
					}}
				>
					⚙ 设置
				</h2>

				<label
					htmlFor="lca-kid-name"
					style={{ fontSize: 14, fontWeight: 800, color: "#4A6080" }}
				>
					小机长的名字
				</label>
				<input
					id="lca-kid-name"
					value={kidName}
					onChange={(e) => onKidName(e.target.value)}
					style={{
						width: "100%",
						marginTop: 6,
						marginBottom: 18,
						fontSize: 18,
						fontWeight: 700,
						padding: "10px 14px",
						border: "3px solid #1A2B4A",
						borderRadius: 12,
						fontFamily: "inherit",
						color: "#1A2B4A",
						outline: "none",
						boxSizing: "border-box",
					}}
				/>

				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						marginBottom: 18,
					}}
				>
					<span style={{ fontSize: 14, fontWeight: 800, color: "#4A6080" }}>
						声音
					</span>
					<button
						type="button"
						onClick={() => onSound(!soundOn)}
						style={{
							width: 64,
							height: 34,
							borderRadius: 18,
							border: "3px solid #1A2B4A",
							background: soundOn ? "#4ECDC4" : "#E0E0E0",
							position: "relative",
							cursor: "pointer",
							transition: "background 150ms",
						}}
					>
						<span
							style={{
								position: "absolute",
								top: 2,
								left: soundOn ? 32 : 2,
								width: 24,
								height: 24,
								borderRadius: "50%",
								background: "#FFF",
								border: "2px solid #1A2B4A",
								transition: "left 150ms",
							}}
						/>
					</button>
				</div>

				<div
					style={{
						fontSize: 14,
						fontWeight: 800,
						color: "#4A6080",
						marginBottom: 8,
					}}
				>
					世界
				</div>
				<div
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(2, 1fr)",
						gap: 8,
						marginBottom: 14,
					}}
				>
					{Object.values(THEMES).map((t) => (
						<button
							key={t.id}
							type="button"
							onClick={() => {
								SFX.tap();
								onPickTheme(t.id);
							}}
							style={{
								padding: "10px 8px",
								borderRadius: 12,
								border: `3px solid ${themeId === t.id ? t.cta : "#1A2B4A"}`,
								background: themeId === t.id ? "#FFF" : "#FFFFFF",
								boxShadow:
									themeId === t.id ? `0 3px 0 ${t.cta}` : "0 3px 0 #1A2B4A",
								cursor: "pointer",
								fontSize: 15,
								fontWeight: 800,
								color: "#1A2B4A",
								fontFamily: "inherit",
							}}
						>
							{t.emoji} {t.name}
						</button>
					))}
				</div>
				<button
					type="button"
					onClick={onOpenPicker}
					style={{
						width: "100%",
						padding: "10px",
						borderRadius: 12,
						border: "3px solid #1A2B4A",
						background: "#FFD93D",
						boxShadow: "0 4px 0 #C99800",
						cursor: "pointer",
						fontSize: 15,
						fontWeight: 800,
						color: "#1A2B4A",
						fontFamily: "inherit",
					}}
				>
					🎨 打开世界选择器
				</button>

				<div
					style={{
						marginTop: 16,
						paddingTop: 16,
						borderTop: "2px dashed #D9C9A0",
					}}
				>
					{!confirmReset ? (
						<button
							type="button"
							onClick={() => {
								SFX.tap();
								setConfirmReset(true);
							}}
							style={{
								width: "100%",
								padding: "10px",
								borderRadius: 12,
								border: "3px solid #1A2B4A",
								background: "#FFE3E3",
								boxShadow: "0 4px 0 #E0A0A0",
								cursor: "pointer",
								fontSize: 14,
								fontWeight: 800,
								color: "#1A2B4A",
								fontFamily: "inherit",
							}}
						>
							🗑 重置数据
						</button>
					) : (
						<div>
							<div
								style={{
									fontSize: 14,
									fontWeight: 700,
									color: "#4A6080",
									marginBottom: 8,
									textAlign: "center",
								}}
							>
								确定要清空所有学习记录吗？此操作无法撤销。
							</div>
							<div style={{ display: "flex", gap: 8 }}>
								<button
									type="button"
									onClick={() => setConfirmReset(false)}
									style={{
										flex: 1,
										padding: "10px",
										borderRadius: 12,
										border: "3px solid #1A2B4A",
										background: "#FFFFFF",
										boxShadow: "0 4px 0 #1A2B4A",
										cursor: "pointer",
										fontSize: 14,
										fontWeight: 800,
										color: "#1A2B4A",
										fontFamily: "inherit",
									}}
								>
									取消
								</button>
								<button
									type="button"
									onClick={() => {
										SFX.pop();
										setConfirmReset(false);
										onReset();
									}}
									style={{
										flex: 1,
										padding: "10px",
										borderRadius: 12,
										border: "3px solid #1A2B4A",
										background: "#FF6B6B",
										boxShadow: "0 4px 0 #C73E3E",
										cursor: "pointer",
										fontSize: 14,
										fontWeight: 800,
										color: "#FFFFFF",
										fontFamily: "inherit",
									}}
								>
									确定清空
								</button>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
