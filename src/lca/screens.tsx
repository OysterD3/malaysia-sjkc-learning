// Main screens: Home, Subject (lesson list), Lesson intro, Rewards, Profile.

import { type CSSProperties, type ReactNode, useState } from "react";
import { SFX } from "./audio";
import type { AppData, Badge, Lesson, Subject, Unlockable } from "./data";
import { resolveQuizId } from "./data";
import { ThemedBackground, ThemedMascot } from "./themed-extras";
import type { Theme } from "./themes";
import {
	Aircraft,
	BigButton,
	Card,
	ProgressBar,
	Star,
	StatChip,
	shadeColor,
	useIsMobile,
} from "./ui";

/* ===================== HOME SCREEN ===================== */
export function HomeScreen({
	data,
	theme,
	onPickSubject,
	onNav,
	onChangeTheme,
}: {
	data: AppData;
	theme: Theme;
	onPickSubject: (id: string) => void;
	onNav: (s: string) => void;
	onChangeTheme: () => void;
}) {
	const { pilot, subjects, daily } = data;
	const t = theme;
	const isMobile = useIsMobile();
	const isDark = t.bgVariant === "tech";
	const headerTitleColor = isDark ? "#FFD93D" : "#1A2B4A";
	const headerSubColor = isDark ? "#9FBEF0" : "#4A6080";

	return (
		<div style={{ position: "absolute", inset: 0, overflow: "auto" }}>
			<ThemedBackground themeId={t.id} />
			{/* Animated cruising vehicle (sky theme only) */}
			{t.id === "pilot" && (
				<div
					className="lc-fly"
					style={{ position: "absolute", top: 90, left: "-120px", zIndex: 1 }}
				>
					<Aircraft type="A380" size={110} color="#FFFFFF" />
				</div>
			)}

			<div
				style={{
					position: "relative",
					zIndex: 2,
					padding: "20px clamp(14px, 4vw, 32px) 100px",
					maxWidth: 1100,
					margin: "0 auto",
				}}
			>
				{/* Header */}
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "flex-start",
						gap: 20,
						marginBottom: 24,
					}}
				>
					<div>
						<div
							style={{
								fontSize: 16,
								fontWeight: 700,
								color: headerSubColor,
								marginBottom: 4,
							}}
						>
							欢迎回来，{t.briefingNoun} {t.emoji}
						</div>
						<h1
							style={{
								fontSize: "clamp(26px, 7vw, 44px)",
								margin: 0,
								fontFamily: '"ZCOOL KuaiLe", "Baloo 2", system-ui',
								color: headerTitleColor,
								textShadow: `3px 3px 0 ${t.titleShadow}`,
								lineHeight: 1.05,
							}}
						>
							{pilot.name}，{t.welcomeTitle}
						</h1>
					</div>
					<div style={{ display: "flex", gap: 10, alignItems: "center" }}>
						<StatChip icon="⭐" label={`${pilot.stars}`} />
						{/* Theme picker button */}
						<button
							type="button"
							onClick={() => {
								SFX.pop();
								onChangeTheme();
							}}
							style={{
								width: 60,
								height: 60,
								borderRadius: "50%",
								border: "4px solid #1A2B4A",
								boxShadow: "0 4px 0 #1A2B4A",
								background: "#FFFFFF",
								cursor: "pointer",
								fontSize: 26,
								fontFamily: "inherit",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
							}}
							title="换个世界"
						>
							🎨
						</button>
						<button
							type="button"
							onClick={() => onNav("profile")}
							style={{
								width: 60,
								height: 60,
								borderRadius: "50%",
								border: "4px solid #1A2B4A",
								boxShadow: "0 4px 0 #1A2B4A",
								background: t.accent,
								cursor: "pointer",
								fontSize: 30,
								fontFamily: "inherit",
							}}
						>
							{t.emoji}
						</button>
					</div>
				</div>

				{/* Hero strip — mascot + today's mission */}
				<div
					style={{
						display: "grid",
						gridTemplateColumns: isMobile ? "1fr" : "200px 1fr",
						gap: isMobile ? 12 : 24,
						alignItems: "center",
						justifyItems: isMobile ? "center" : "stretch",
						background: "linear-gradient(135deg, #FFFFFF 0%, #F0F7FF 100%)",
						borderRadius: 28,
						padding: "20px clamp(16px, 5vw, 28px)",
						border: "4px solid #1A2B4A",
						boxShadow: "0 8px 0 #1A2B4A",
						marginBottom: 30,
					}}
				>
					<ThemedMascot themeId={t.id} size={isMobile ? 110 : 170} />
					<div>
						<div
							style={{
								fontSize: 14,
								fontWeight: 800,
								color: t.cta,
								textTransform: "uppercase",
								letterSpacing: 2,
								marginBottom: 4,
							}}
						>
							今日{t.distanceLabel}
						</div>
						<h2 style={{ fontSize: 28, color: "#1A2B4A", margin: "0 0 12px" }}>
							每日任务还差一个就完成！
						</h2>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								gap: 8,
								marginBottom: 14,
							}}
						>
							{daily.map((d) => (
								<div
									key={d.id}
									style={{ display: "flex", alignItems: "center", gap: 10 }}
								>
									<div
										style={{
											width: 24,
											height: 24,
											borderRadius: 12,
											border: "3px solid #1A2B4A",
											background: d.done ? "#4ECDC4" : "#FFF",
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
											fontSize: 14,
											fontWeight: 900,
											color: "#FFF",
										}}
									>
										{d.done ? "✓" : ""}
									</div>
									<div
										style={{
											flex: 1,
											fontSize: 16,
											fontWeight: 700,
											color: d.done ? "#7080A0" : "#1A2B4A",
											textDecoration: d.done ? "line-through" : "none",
										}}
									>
										{d.name}
									</div>
									<div
										style={{ fontSize: 14, fontWeight: 800, color: "#C99800" }}
									>
										+{d.reward}⭐
									</div>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Subjects grid as gates / sites / labs / realms */}
				<div
					style={{
						display: "flex",
						alignItems: "center",
						gap: 12,
						marginBottom: 16,
					}}
				>
					<h2 style={{ fontSize: 28, color: headerTitleColor, margin: 0 }}>
						选择今天的{t.distanceLabel} {t.emoji}
					</h2>
					<div
						style={{
							flex: 1,
							height: 3,
							background: `repeating-linear-gradient(90deg, ${isDark ? "#FFD93D" : "#1A2B4A"} 0 8px, transparent 8px 14px)`,
						}}
					/>
				</div>
				<div
					style={{
						display: "grid",
						gridTemplateColumns:
							"repeat(auto-fill, minmax(min(100%, 260px), 1fr))",
						gap: 18,
					}}
				>
					{subjects.map((s) => (
						<SubjectGate
							key={s.id}
							subject={s}
							onClick={() => onPickSubject(s.id)}
							gateLabel={t.gateLabel}
						/>
					))}
				</div>

				{/* Bottom nav row */}
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						gap: 14,
						marginTop: 36,
						flexWrap: "wrap",
					}}
				>
					<BigButton
						color="#A78BFA"
						shadow="#6B4FBC"
						onClick={() => onNav("rewards")}
						size="lg"
					>
						🏆 我的勋章
					</BigButton>
				</div>
			</div>
		</div>
	);
}

function SubjectGate({
	subject,
	onClick,
	gateLabel = "GATE",
}: {
	subject: Subject;
	onClick: () => void;
	gateLabel?: string;
}) {
	const [hover, setHover] = useState(false);
	const soon = subject.comingSoon === true;
	return (
		<div
			onClick={soon ? undefined : onClick}
			onMouseEnter={() => !soon && setHover(true)}
			onMouseLeave={() => setHover(false)}
			aria-disabled={soon}
			style={{
				background: soon ? "#EFEFEF" : subject.colorSoft,
				borderRadius: 22,
				padding: 18,
				border: `4px solid ${soon ? "#C9C9C9" : subject.color}`,
				boxShadow: soon
					? "0 6px 0 #B5B5B5"
					: hover
						? `0 10px 0 ${shadeColor(subject.color, -20)}`
						: `0 6px 0 ${shadeColor(subject.color, -20)}`,
				transform: hover && !soon ? "translateY(-4px)" : "translateY(0)",
				transition: "all 180ms",
				cursor: soon ? "not-allowed" : "pointer",
				position: "relative",
				overflow: "hidden",
			}}
		>
			<div
				style={{
					position: "absolute",
					top: 10,
					right: 10,
					background: soon ? "#8A94A6" : subject.color,
					color: "#FFF",
					padding: "4px 10px",
					borderRadius: 10,
					fontSize: 12,
					fontWeight: 800,
				}}
			>
				{soon ? "敬请期待" : gateLabel}
			</div>

			<div
				style={{
					fontSize: 50,
					marginBottom: 6,
					filter: soon ? "grayscale(1)" : "none",
					opacity: soon ? 0.8 : 1,
				}}
			>
				{subject.icon}
			</div>
			<h3
				style={{
					fontSize: 26,
					color: soon ? "#6B7280" : "#1A2B4A",
					margin: "0 0 2px",
					fontFamily: '"ZCOOL KuaiLe", "Baloo 2", system-ui',
				}}
			>
				{subject.name}
			</h3>
			{soon ? (
				<div
					style={{
						fontSize: 14,
						color: "#6B7280",
						fontWeight: 700,
						marginTop: 10,
						marginBottom: 6,
					}}
				>
					🚧 内容即将上线，敬请期待！
				</div>
			) : (
				<>
					<div
						style={{
							fontSize: 14,
							color: shadeColor(subject.color, -30),
							fontWeight: 700,
							marginBottom: 12,
						}}
					>
						{subject.tagline}
					</div>
					<div
						style={{
							fontSize: 12,
							color: "#4A6080",
							fontWeight: 700,
							marginBottom: 6,
						}}
					>
						✈ {subject.aircraft} · {subject.destination}
					</div>
					<ProgressBar
						value={subject.progress}
						color={subject.color}
						height={12}
					/>
					<div
						style={{
							fontSize: 13,
							color: "#4A6080",
							marginTop: 6,
							textAlign: "right",
							fontWeight: 700,
						}}
					>
						{Math.round(subject.progress * 100)}% 完成
					</div>
				</>
			)}
		</div>
	);
}

/* ===================== SUBJECT (LESSON LIST) ===================== */
export function SubjectScreen({
	data,
	theme,
	subjectId,
	onBack,
	onPickLesson,
}: {
	data: AppData;
	theme: Theme;
	subjectId: string;
	onBack: () => void;
	onPickLesson: (sid: string, lid: string) => void;
}) {
	const subject = data.subjects.find((s) => s.id === subjectId);
	const t = theme;
	if (!subject) return null;

	return (
		<div
			style={{
				position: "absolute",
				inset: 0,
				overflow: "auto",
				background: `linear-gradient(180deg, ${subject.colorSoft} 0%, #FFF8E7 100%)`,
			}}
		>
			<div
				style={{
					padding: "20px clamp(14px, 4vw, 32px) 100px",
					maxWidth: 900,
					margin: "0 auto",
				}}
			>
				{/* Header */}
				<div
					style={{
						display: "flex",
						alignItems: "center",
						gap: 14,
						marginBottom: 18,
					}}
				>
					<BackButton onClick={onBack} />
					<div style={{ flex: 1 }}>
						<div
							style={{ fontSize: 14, fontWeight: 800, color: subject.color }}
						>
							{subject.tagline.toUpperCase()}
						</div>
						<h1
							style={{
								fontSize: 38,
								margin: 0,
								color: "#1A2B4A",
								fontFamily: '"ZCOOL KuaiLe", "Baloo 2", system-ui',
							}}
						>
							{subject.icon} {subject.name}
						</h1>
					</div>
					{t.id === "pilot" ? (
						<Aircraft type={subject.aircraft} size={90} color={subject.color} />
					) : (
						<div style={{ fontSize: 70 }}>{subject.icon}</div>
					)}
				</div>

				{/* Boarding / mission banner */}
				<div
					style={{
						background: "#FFFFFF",
						borderRadius: 20,
						border: "4px solid #1A2B4A",
						boxShadow: "0 6px 0 #1A2B4A",
						padding: "14px 20px",
						marginBottom: 26,
						display: "flex",
						alignItems: "center",
						gap: 14,
					}}
				>
					<div
						style={{
							background: subject.color,
							color: "#FFF",
							padding: "10px 14px",
							borderRadius: 14,
							fontWeight: 900,
							fontSize: 18,
							letterSpacing: 1,
						}}
					>
						{t.verbStart}
					</div>
					<div
						style={{ flex: 1, fontSize: 18, color: "#1A2B4A", fontWeight: 700 }}
					>
						{subject.destination} ·{" "}
						{subject.lessons.filter((l) => l.stars > 0).length}/
						{subject.lessons.length} 课程完成
					</div>
					<div style={{ fontSize: 14, fontWeight: 800, color: "#4A6080" }}>
						目标 ⭐ {subject.lessons.reduce((a, l) => a + l.stars, 0)}/
						{subject.lessons.length * 3}
					</div>
				</div>

				{/* Lessons as a flight path */}
				<div style={{ position: "relative" }}>
					<div
						style={{
							position: "absolute",
							left: 36,
							top: 50,
							bottom: 50,
							width: 4,
							background: `repeating-linear-gradient(180deg, ${subject.color} 0 14px, transparent 14px 24px)`,
						}}
					/>
					{subject.lessons.map((lesson, i) => (
						<LessonNode
							key={lesson.id}
							lesson={lesson}
							subject={subject}
							index={i}
							onClick={() =>
								!lesson.locked && onPickLesson(subjectId, lesson.id)
							}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

function LessonNode({
	lesson,
	subject,
	index,
	onClick,
}: {
	lesson: Lesson;
	subject: Subject;
	index: number;
	onClick: () => void;
}) {
	const [h, setH] = useState(false);
	const isMobile = useIsMobile();
	const lift = h && !lesson.locked;
	return (
		<div
			onClick={onClick}
			onMouseEnter={() => setH(true)}
			onMouseLeave={() => setH(false)}
			style={{
				display: "flex",
				alignItems: "center",
				gap: isMobile ? 10 : 18,
				marginBottom: 14,
				cursor: lesson.locked ? "not-allowed" : "pointer",
				opacity: lesson.locked ? 0.55 : 1,
			}}
		>
			<div
				style={{
					width: isMobile ? 52 : 72,
					height: isMobile ? 52 : 72,
					borderRadius: "50%",
					background: lesson.locked ? "#CCC" : subject.color,
					border: "4px solid #1A2B4A",
					boxShadow: lift ? "0 8px 0 #1A2B4A" : "0 4px 0 #1A2B4A",
					transform: lift ? "translateY(-4px)" : "translateY(0)",
					transition: "all 180ms",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					color: "#FFF",
					fontSize: 24,
					fontWeight: 900,
					flexShrink: 0,
					zIndex: 2,
				}}
			>
				{lesson.locked ? "🔒" : lesson.stars > 0 ? "✓" : index + 1}
			</div>
			<div
				style={{
					flex: 1,
					minWidth: 0,
					background: "#FFFFFF",
					borderRadius: 18,
					padding: isMobile ? "12px 14px" : "14px 20px",
					border: "3px solid #1A2B4A",
					boxShadow: lift ? "0 8px 0 #1A2B4A" : "0 4px 0 #1A2B4A",
					transform: lift ? "translateY(-4px)" : "translateY(0)",
					transition: "all 180ms",
					display: "flex",
					flexDirection: isMobile ? "column" : "row",
					alignItems: isMobile ? "stretch" : "center",
					gap: isMobile ? 8 : 12,
				}}
			>
				<div style={{ flex: 1, minWidth: 0 }}>
					<div
						style={{
							fontSize: isMobile ? 17 : 22,
							fontWeight: 800,
							color: "#1A2B4A",
						}}
					>
						{index + 1}. {lesson.name}
					</div>
					<div style={{ fontSize: 14, color: "#7080A0", fontWeight: 700 }}>
						{lesson.sub}
					</div>
				</div>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						gap: 12,
						justifyContent: isMobile ? "space-between" : "flex-end",
						flexShrink: 0,
					}}
				>
					<div style={{ display: "flex", gap: 4 }}>
						{[0, 1, 2].map((i) => (
							<Star
								key={i}
								size={isMobile ? 22 : 26}
								filled={i < lesson.stars}
								color={i < lesson.stars ? "#FFD93D" : "#DDD"}
							/>
						))}
					</div>
					{!lesson.locked && (
						<div
							style={{
								background: subject.color,
								color: "#FFF",
								padding: "8px 14px",
								borderRadius: 12,
								fontWeight: 800,
								fontSize: 16,
								whiteSpace: "nowrap",
							}}
						>
							{lesson.stars > 0 ? "再玩" : "开始"} →
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

/* ===================== LESSON INTRO (story) ===================== */
export function LessonIntro({
	data,
	theme,
	subjectId,
	lessonId,
	onStart,
	onBack,
}: {
	data: AppData;
	theme: Theme;
	subjectId: string;
	lessonId: string;
	onStart: (quizId: string) => void;
	onBack: () => void;
}) {
	const subject = data.subjects.find((s) => s.id === subjectId);
	const lesson = subject?.lessons.find((l) => l.id === lessonId);
	const t = theme;
	if (!subject || !lesson) return null;

	const quizId = resolveQuizId(lessonId);

	return (
		<div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
			<ThemedBackground themeId={t.id} />
			<div
				style={{
					position: "relative",
					zIndex: 1,
					height: "100%",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					padding: 30,
					textAlign: "center",
				}}
			>
				<BackButton
					onClick={onBack}
					style={{ position: "absolute", top: 20, left: 20 }}
				/>

				<ThemedMascot themeId={t.id} size={160} />
				<div
					style={{
						background: "#FFFFFF",
						borderRadius: 26,
						padding: "28px 40px",
						border: "4px solid #1A2B4A",
						boxShadow: "0 8px 0 #1A2B4A",
						maxWidth: 600,
						marginTop: 8,
						marginBottom: 26,
						position: "relative",
					}}
				>
					<div
						style={{
							position: "absolute",
							top: -16,
							left: 60,
							width: 30,
							height: 30,
							background: "#FFFFFF",
							border: "4px solid #1A2B4A",
							borderRight: "none",
							borderBottom: "none",
							transform: "rotate(45deg)",
						}}
					/>
					<div
						style={{
							fontSize: 14,
							color: t.cta,
							fontWeight: 900,
							letterSpacing: 2,
							marginBottom: 8,
						}}
					>
						{t.emoji} {t.briefingLabel}
					</div>
					<h1
						style={{
							fontSize: 36,
							color: "#1A2B4A",
							margin: "0 0 10px",
							fontFamily: '"ZCOOL KuaiLe", "Baloo 2", system-ui',
						}}
					>
						{lesson.name}
					</h1>
					<p
						style={{
							fontSize: 18,
							color: "#2D3F5E",
							margin: "0 0 4px",
							lineHeight: 1.5,
						}}
					>
						{t.briefingNoun}，今天我们带上{" "}
						<strong style={{ color: subject.color }}>{subject.aircraft}</strong>{" "}
						前往
						<strong style={{ color: subject.color }}>
							{" "}
							{subject.destination.split(" → ")[1]}
						</strong>
						！
					</p>
					<p
						style={{
							fontSize: 16,
							color: "#4A6080",
							margin: 0,
							lineHeight: 1.5,
						}}
					>
						一路上你要完成几道题，加油吧，{t.briefingNoun}！{t.emoji}
					</p>
				</div>
				<BigButton
					color={t.cta}
					shadow={t.ctaShadow}
					size="lg"
					onClick={() => {
						SFX.takeoff();
						onStart(quizId);
					}}
				>
					{t.emoji} {t.verbStart}！
				</BigButton>
			</div>
		</div>
	);
}

/* ===================== REWARDS ===================== */
export function RewardsScreen({
	data,
	theme,
	onBack,
}: {
	data: AppData;
	theme: Theme;
	onBack: () => void;
}) {
	const [tab, setTab] = useState<"badges" | "outfit">("badges");
	const earned = data.badges.filter((b) => b.earned).length;
	const t = theme;

	return (
		<div
			style={{
				position: "absolute",
				inset: 0,
				overflow: "auto",
				background: "linear-gradient(180deg, #FFF1D6 0%, #FFE5B4 100%)",
			}}
		>
			<div
				style={{
					maxWidth: 1000,
					margin: "0 auto",
					padding: "20px clamp(14px, 4vw, 32px) 100px",
				}}
			>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						gap: 14,
						marginBottom: 20,
					}}
				>
					<BackButton onClick={onBack} />
					<h1
						style={{
							fontSize: 40,
							margin: 0,
							color: "#1A2B4A",
							fontFamily: '"ZCOOL KuaiLe", "Baloo 2", system-ui',
							textShadow: "3px 3px 0 #FF6B6B",
						}}
					>
						🏆 我的勋章库
					</h1>
				</div>

				{/* Tabs */}
				<div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
					<TabBtn active={tab === "badges"} onClick={() => setTab("badges")}>
						{t.emoji} 收藏 ({earned}/{data.badges.length})
					</TabBtn>
					<TabBtn active={tab === "outfit"} onClick={() => setTab("outfit")}>
						👨‍✈️ 装扮商店
					</TabBtn>
				</div>

				{tab === "badges" && (
					<div
						style={{
							display: "grid",
							gridTemplateColumns:
								"repeat(auto-fill, minmax(min(100%, 150px), 1fr))",
							gap: 18,
						}}
					>
						{data.badges.map((b) => (
							<BadgeCard key={b.id} badge={b} />
						))}
					</div>
				)}

				{tab === "outfit" && (
					<div>
						<Card
							bg="#FFFFFF"
							accent="#1A2B4A"
							style={{
								marginBottom: 18,
								display: "flex",
								gap: 20,
								alignItems: "center",
							}}
						>
							<div style={{ fontSize: 80 }}>👨‍✈️</div>
							<div style={{ flex: 1 }}>
								<div
									style={{ fontSize: 14, fontWeight: 800, color: "#FF6B6B" }}
								>
									当前装扮
								</div>
								<h2
									style={{
										fontSize: 26,
										margin: "2px 0 6px",
										color: "#1A2B4A",
									}}
								>
									飞行员{data.pilot.name}
								</h2>
								<div
									style={{ fontSize: 14, color: "#4A6080", fontWeight: 700 }}
								>
									解锁更多装扮，让 {data.pilot.name} 变得更酷！
								</div>
							</div>
							<StatChip icon="⭐" label={`${data.pilot.stars}`} />
						</Card>
						<div
							style={{
								display: "grid",
								gridTemplateColumns:
									"repeat(auto-fill, minmax(min(100%, 140px), 1fr))",
								gap: 16,
							}}
						>
							{data.unlockables.map((u) => (
								<OutfitCard key={u.id} item={u} stars={data.pilot.stars} />
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

function TabBtn({
	children,
	active,
	onClick,
}: {
	children: ReactNode;
	active: boolean;
	onClick: () => void;
}) {
	return (
		<button
			type="button"
			onClick={() => {
				SFX.tap();
				onClick();
			}}
			style={{
				background: active ? "#1A2B4A" : "#FFFFFF",
				color: active ? "#FFD93D" : "#1A2B4A",
				border: "3px solid #1A2B4A",
				borderRadius: 16,
				padding: "12px 22px",
				fontSize: 18,
				fontWeight: 800,
				cursor: "pointer",
				boxShadow: active ? "0 2px 0 #1A2B4A" : "0 4px 0 #1A2B4A",
				transform: active ? "translateY(2px)" : "none",
				fontFamily: "inherit",
			}}
		>
			{children}
		</button>
	);
}

function BadgeCard({ badge }: { badge: Badge }) {
	const rarityColor =
		badge.rarity === "gold"
			? "#FFD93D"
			: badge.rarity === "silver"
				? "#C0C0C0"
				: "#CD7F32";
	return (
		<Card
			bg={badge.earned ? "#FFFFFF" : "#F5F0E0"}
			accent={badge.earned ? rarityColor : "#BBB"}
			style={{
				textAlign: "center",
				padding: 18,
				opacity: badge.earned ? 1 : 0.65,
			}}
		>
			<div
				style={{
					width: 110,
					height: 110,
					margin: "0 auto 10px",
					borderRadius: "50%",
					background: badge.earned
						? `radial-gradient(circle at 30% 30%, ${rarityColor}, ${shadeColor(rarityColor, -30)})`
						: "#DDD",
					border: "4px solid #1A2B4A",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					fontSize: 56,
					filter: badge.earned ? "none" : "grayscale(1)",
				}}
			>
				{badge.earned ? badge.icon : "🔒"}
			</div>
			<div style={{ fontSize: 18, fontWeight: 800, color: "#1A2B4A" }}>
				{badge.name}
			</div>
			<div
				style={{
					fontSize: 13,
					color: "#4A6080",
					fontWeight: 700,
					marginTop: 4,
				}}
			>
				{badge.sub}
			</div>
			<div
				style={{
					marginTop: 8,
					display: "inline-block",
					padding: "2px 10px",
					borderRadius: 10,
					fontSize: 11,
					fontWeight: 800,
					background: rarityColor,
					color: "#1A2B4A",
					textTransform: "uppercase",
					letterSpacing: 1,
				}}
			>
				{badge.rarity === "gold"
					? "金牌"
					: badge.rarity === "silver"
						? "银牌"
						: "铜牌"}
			</div>
		</Card>
	);
}

function OutfitCard({ item, stars }: { item: Unlockable; stars: number }) {
	const canBuy = !item.unlocked && stars >= (item.cost || 0);
	return (
		<Card
			bg={item.current ? "#FFD93D" : "#FFFFFF"}
			accent={item.current ? "#C99800" : "#1A2B4A"}
			style={{ textAlign: "center", padding: 16 }}
		>
			<div style={{ fontSize: 60, margin: "4px 0" }}>{item.icon}</div>
			<div style={{ fontSize: 16, fontWeight: 800, color: "#1A2B4A" }}>
				{item.name}
			</div>
			<div style={{ marginTop: 10 }}>
				{item.current && (
					<span style={{ fontSize: 13, fontWeight: 800, color: "#1A2B4A" }}>
						✓ 使用中
					</span>
				)}
				{!item.current && item.unlocked && (
					<button
						type="button"
						onClick={() => SFX.pop()}
						style={{
							background: "#1A2B4A",
							color: "#FFD93D",
							border: "none",
							borderRadius: 12,
							padding: "6px 14px",
							fontWeight: 800,
							fontSize: 14,
							cursor: "pointer",
							fontFamily: "inherit",
						}}
					>
						选用
					</button>
				)}
				{!item.unlocked && (
					<div
						style={{
							display: "inline-flex",
							alignItems: "center",
							gap: 4,
							padding: "6px 12px",
							background: canBuy ? "#FFD93D" : "#EEE",
							borderRadius: 12,
							fontSize: 14,
							fontWeight: 800,
							color: canBuy ? "#1A2B4A" : "#888",
						}}
					>
						🔒 {item.cost}⭐
					</div>
				)}
			</div>
		</Card>
	);
}

/* ===================== PROFILE (Pilot license) ===================== */
export function ProfileScreen({
	data,
	theme,
	onBack,
	onNav,
}: {
	data: AppData;
	theme: Theme;
	onBack: () => void;
	onNav: (s: string) => void;
}) {
	const p = data.pilot;
	const earned = data.badges.filter((b) => b.earned).length;
	const t = theme;

	return (
		<div
			style={{
				position: "absolute",
				inset: 0,
				overflow: "auto",
				background: "linear-gradient(180deg, #1A2B4A 0%, #2A4570 100%)",
			}}
		>
			{/* Decorative stars */}
			<div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
				{Array.from({ length: 30 }).map((_, i) => (
					<div
						// biome-ignore lint/suspicious/noArrayIndexKey: static decorative stars
						key={i}
						style={{
							position: "absolute",
							left: `${(i * 37) % 100}%`,
							top: `${(i * 53) % 100}%`,
							width: 3,
							height: 3,
							borderRadius: "50%",
							background: "#FFF",
							opacity: 0.6 + (i % 3) * 0.15,
						}}
					/>
				))}
			</div>

			<div
				style={{
					position: "relative",
					maxWidth: 800,
					margin: "0 auto",
					padding: "20px clamp(14px, 4vw, 32px) 100px",
				}}
			>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						gap: 14,
						marginBottom: 20,
					}}
				>
					<BackButton onClick={onBack} shadow="#0A1530" />
					<h1
						style={{
							fontSize: 36,
							margin: 0,
							color: "#FFD93D",
							fontFamily: '"ZCOOL KuaiLe", "Baloo 2", system-ui',
						}}
					>
						{t.emoji} {t.rankShort}档案
					</h1>
				</div>

				{/* Pilot License */}
				<div
					style={{
						background: "linear-gradient(135deg, #FFFFFF, #FFF8E7)",
						borderRadius: 24,
						border: "5px solid #FFD93D",
						boxShadow: "0 10px 0 #C99800",
						padding: 24,
						marginBottom: 24,
						position: "relative",
						overflow: "hidden",
					}}
				>
					<div
						style={{
							position: "absolute",
							right: -20,
							bottom: -20,
							fontSize: 200,
							opacity: 0.08,
							color: "#1A2B4A",
							pointerEvents: "none",
						}}
					>
						✈
					</div>

					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "flex-start",
							marginBottom: 18,
						}}
					>
						<div>
							<div
								style={{
									fontSize: 12,
									fontWeight: 900,
									color: "#C99800",
									letterSpacing: 2,
								}}
							>
								{t.licenseTitle}
							</div>
							<div style={{ fontSize: 11, color: "#7080A0", fontWeight: 700 }}>
								编号 LC-2026-0042
							</div>
						</div>
						<div
							style={{
								background: "#1A2B4A",
								color: "#FFD93D",
								padding: "6px 12px",
								borderRadius: 10,
								fontSize: 12,
								fontWeight: 900,
							}}
						>
							已认证 ✓
						</div>
					</div>

					<div
						style={{
							display: "grid",
							gridTemplateColumns: "clamp(96px, 28vw, 160px) minmax(0, 1fr)",
							gap: "clamp(14px, 4vw, 24px)",
							alignItems: "center",
						}}
					>
						<div
							style={{
								width: "100%",
								aspectRatio: "1 / 1",
								borderRadius: 18,
								background: "#F0F7FF",
								border: "4px solid #1A2B4A",
								display: "flex",
								alignItems: "flex-end",
								justifyContent: "center",
								overflow: "hidden",
							}}
						>
							<ThemedMascot
								themeId={t.id}
								size={150}
								waving={false}
								style={{ height: "94%", width: "auto" }}
							/>
						</div>
						<div style={{ minWidth: 0 }}>
							<div style={{ fontSize: 14, fontWeight: 800, color: "#7080A0" }}>
								姓名
							</div>
							<h2
								style={{
									fontSize: "clamp(24px, 7vw, 36px)",
									margin: "0 0 6px",
									color: "#1A2B4A",
									fontFamily: '"ZCOOL KuaiLe", "Baloo 2", system-ui',
									overflowWrap: "anywhere",
									lineHeight: 1.1,
								}}
							>
								{p.name}
							</h2>
							<div
								style={{
									fontSize: 14,
									fontWeight: 800,
									color: "#7080A0",
									marginTop: 8,
								}}
							>
								等级
							</div>
							<div style={{ fontSize: 18, fontWeight: 800, color: "#1A2B4A" }}>
								{p.title}
							</div>
						</div>
					</div>

					{/* Stats row */}
					<div
						style={{
							marginTop: 20,
							display: "grid",
							gridTemplateColumns:
								"repeat(auto-fit, minmax(min(100%, 120px), 1fr))",
							gap: 12,
							background: "#F0F7FF",
							padding: 16,
							borderRadius: 14,
							border: "2px dashed #94B8E0",
						}}
					>
						<ProfileStat
							icon="⏱"
							label={t.timeUnit}
							value={`${p.flightHours}${t.timeUnitShort}`}
						/>
						<ProfileStat icon="⭐" label="星星" value={p.stars} />
						<ProfileStat
							icon="📚"
							label="完成课程"
							value={`${data.subjects.reduce(
								(a, s) => a + s.lessons.filter((l) => l.stars > 0).length,
								0,
							)}`}
						/>
						<ProfileStat
							icon="🏆"
							label="勋章"
							value={`${earned}/${data.badges.length}`}
						/>
					</div>

					{/* Progress to next rank */}
					<div style={{ marginTop: 18 }}>
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								fontSize: 14,
								fontWeight: 800,
								color: "#1A2B4A",
								marginBottom: 6,
							}}
						>
							<span>晋升进度 → {p.nextRank}</span>
							<span>
								{p.flightHours}/{p.nextRankAt} {t.timeUnit}
							</span>
						</div>
						<ProgressBar
							value={p.flightHours / p.nextRankAt}
							color="#FFD93D"
							height={16}
						/>
					</div>
				</div>

				{/* Quick actions */}
				<div
					style={{
						display: "flex",
						gap: 12,
						justifyContent: "center",
						flexWrap: "wrap",
					}}
				>
					<BigButton
						color="#FFD93D"
						shadow="#C99800"
						onClick={() => onNav("rewards")}
						size="md"
						style={{ color: "#1A2B4A" }}
					>
						🏆 看勋章
					</BigButton>
					<BigButton
						color="#4ECDC4"
						shadow="#2A8E89"
						onClick={() => onNav("home")}
						size="md"
					>
						✈ 回首页
					</BigButton>
				</div>
			</div>
		</div>
	);
}

function ProfileStat({
	icon,
	label,
	value,
}: {
	icon: string;
	label: string;
	value: string | number;
}) {
	return (
		<div style={{ textAlign: "center" }}>
			<div style={{ fontSize: 24 }}>{icon}</div>
			<div style={{ fontSize: 22, fontWeight: 900, color: "#1A2B4A" }}>
				{value}
			</div>
			<div
				style={{
					fontSize: 11,
					fontWeight: 800,
					color: "#7080A0",
					textTransform: "uppercase",
					letterSpacing: 1,
				}}
			>
				{label}
			</div>
		</div>
	);
}

/* ===================== Shared little bits ===================== */
function BackButton({
	onClick,
	style = {},
	shadow = "#1A2B4A",
}: {
	onClick: () => void;
	style?: CSSProperties;
	shadow?: string;
}) {
	return (
		<button
			type="button"
			onClick={onClick}
			style={{
				background: "#FFF",
				border: "3px solid #1A2B4A",
				borderRadius: 14,
				padding: "8px 14px",
				fontSize: 18,
				fontWeight: 800,
				cursor: "pointer",
				boxShadow: `0 4px 0 ${shadow}`,
				fontFamily: "inherit",
				...style,
			}}
		>
			← 返回
		</button>
	);
}
