// Themes — pick the kid-friendly world to learn in.
// Each theme swaps mascot, subject metaphors, badges, background + accent colors.
// Learning content (questions) stays the same regardless of theme.

import { EMPTY_STATS, type LiveStats } from "../lib/store";
import {
	type AppData,
	BASE_PILOT,
	BASE_SUBJECTS,
	type Badge,
	type DailyTask,
	QUIZZES,
	UNLOCKABLES,
} from "./data";

export type ThemeId = "pilot" | "dino" | "robot" | "magic";

export type MascotId = "PilotKid" | "ExplorerKid" | "RobotKid" | "WizardKid";
export type BgVariant = "sky" | "jungle" | "tech" | "dreamy";

interface SubjectOverride {
	icon: string;
	aircraft: string;
	destination: string;
	tagline: string;
}

export interface Theme {
	id: ThemeId;
	name: string;
	nameEn: string;
	emoji: string;
	tagline: string;
	mascot: MascotId;
	bgVariant: BgVariant;
	accent: string;
	cta: string;
	ctaShadow: string;
	accentDark: string;
	titleShadow: string;
	primary: string;
	gateLabel: string;
	verbStart: string;
	verbStartEn: string;
	timeUnit: string;
	timeUnitShort: string;
	distanceLabel: string;
	welcomeTitle: string;
	briefingLabel: string;
	briefingNoun: string;
	briefingVehicle: string;
	rankShort: string;
	licenseTitle: string;
	subjectOverrides: Record<string, SubjectOverride>;
	badges: Badge[];
}

export const THEMES: Record<ThemeId, Theme> = {
	pilot: {
		id: "pilot",
		name: "飞行员",
		nameEn: "Pilot",
		emoji: "✈",
		tagline: "驾驶飞机环游世界",
		mascot: "PilotKid",
		bgVariant: "sky",
		accent: "#FFD93D",
		cta: "#FF6B6B",
		ctaShadow: "#C73E3E",
		accentDark: "#C99800",
		titleShadow: "#FFD93D",
		primary: "#4A9EFF",
		gateLabel: "登机口",
		verbStart: "起飞",
		verbStartEn: "TAKEOFF",
		timeUnit: "飞行时数",
		timeUnitShort: "时",
		distanceLabel: "航班",
		welcomeTitle: "准备起飞！",
		briefingLabel: "任务说明",
		briefingNoun: "机长",
		briefingVehicle: "飞机",
		rankShort: "机长",
		licenseTitle: "小小机长学院 · 飞行员证",
		subjectOverrides: {
			math: {
				icon: "✈",
				aircraft: "A380",
				destination: "吉隆坡 → 新加坡",
				tagline: "飞行计算员训练",
			},
			en: {
				icon: "🛬",
				aircraft: "B787",
				destination: "槟城 → 伦敦",
				tagline: "机长广播训练",
			},
			bm: {
				icon: "🛫",
				aircraft: "A330",
				destination: "亚庇 → 古晋",
				tagline: "本地机场播报",
			},
			sci: {
				icon: "🚀",
				aircraft: "航天飞机",
				destination: "地球 → 月球",
				tagline: "飞机原理研究",
			},
			zh: {
				icon: "🛩",
				aircraft: "B737",
				destination: "北京 → 上海",
				tagline: "机舱广播员",
			},
		},
		badges: [
			{
				id: "a380",
				name: "空客 A380",
				sub: "完成 10 个数学任务",
				icon: "🛬",
				earned: true,
				rarity: "gold",
			},
			{
				id: "b787",
				name: "波音 787",
				sub: "完成 5 个英文任务",
				icon: "✈",
				earned: true,
				rarity: "silver",
			},
			{
				id: "a330",
				name: "空客 A330",
				sub: "累积 15 颗星",
				icon: "🛫",
				earned: true,
				rarity: "silver",
			},
			{
				id: "b737",
				name: "波音 737",
				sub: "答对 20 道题",
				icon: "🛩",
				earned: true,
				rarity: "bronze",
			},
			{
				id: "rocket",
				name: "猎鹰火箭",
				sub: "完成科学任务",
				icon: "🚀",
				earned: false,
				rarity: "gold",
			},
			{
				id: "heli",
				name: "直升机",
				sub: "完成马来文 3 课",
				icon: "🚁",
				earned: false,
				rarity: "bronze",
			},
			{
				id: "concorde",
				name: "协和客机",
				sub: "一日答对 30 题",
				icon: "🛰",
				earned: false,
				rarity: "gold",
			},
			{
				id: "jet",
				name: "战斗机",
				sub: "挑战「专家」难度",
				icon: "🛸",
				earned: false,
				rarity: "silver",
			},
		],
	},

	dino: {
		id: "dino",
		name: "小探险家",
		nameEn: "Explorer",
		emoji: "🦖",
		tagline: "寻找消失的恐龙",
		mascot: "ExplorerKid",
		bgVariant: "jungle",
		accent: "#FFB300",
		cta: "#E67E22",
		ctaShadow: "#A85A0F",
		accentDark: "#8B6914",
		titleShadow: "#FFB300",
		primary: "#5E8B3A",
		gateLabel: "探险点",
		verbStart: "出发",
		verbStartEn: "EXPLORE",
		timeUnit: "探险时数",
		timeUnitShort: "时",
		distanceLabel: "探险",
		welcomeTitle: "出发探险吧！",
		briefingLabel: "探险简报",
		briefingNoun: "探险家",
		briefingVehicle: "恐龙伙伴",
		rankShort: "探险家",
		licenseTitle: "小小探险家学院 · 探险家证",
		subjectOverrides: {
			math: {
				icon: "🦕",
				aircraft: "雷龙",
				destination: "化石谷 → 数字湖",
				tagline: "化石计数员",
			},
			en: {
				icon: "🦖",
				aircraft: "暴龙",
				destination: "字母山 → 英文岛",
				tagline: "咆哮学习",
			},
			bm: {
				icon: "🦴",
				aircraft: "三角龙",
				destination: "沙巴森林 → 婆罗洲",
				tagline: "热带丛林行",
			},
			sci: {
				icon: "🌋",
				aircraft: "翼龙",
				destination: "火山口 → 远古海",
				tagline: "远古秘密",
			},
			zh: {
				icon: "🥚",
				aircraft: "龙蛋",
				destination: "蛋窝 → 拼音树",
				tagline: "孵化文字",
			},
		},
		badges: [
			{
				id: "trex",
				name: "暴龙",
				sub: "完成 10 个数学任务",
				icon: "🦖",
				earned: true,
				rarity: "gold",
			},
			{
				id: "tri",
				name: "三角龙",
				sub: "完成 5 个英文任务",
				icon: "🦴",
				earned: true,
				rarity: "silver",
			},
			{
				id: "brachi",
				name: "雷龙",
				sub: "累积 15 颗星",
				icon: "🦕",
				earned: true,
				rarity: "silver",
			},
			{
				id: "ptero",
				name: "翼龙",
				sub: "答对 20 道题",
				icon: "🦅",
				earned: true,
				rarity: "bronze",
			},
			{
				id: "stego",
				name: "剑龙",
				sub: "完成科学任务",
				icon: "🦎",
				earned: false,
				rarity: "gold",
			},
			{
				id: "raptor",
				name: "迅猛龙",
				sub: "完成马来文 3 课",
				icon: "🐊",
				earned: false,
				rarity: "bronze",
			},
			{
				id: "egg",
				name: "龙蛋",
				sub: "一日答对 30 题",
				icon: "🥚",
				earned: false,
				rarity: "gold",
			},
			{
				id: "fossil",
				name: "金化石",
				sub: "挑战「专家」难度",
				icon: "🦴",
				earned: false,
				rarity: "silver",
			},
		],
	},

	robot: {
		id: "robot",
		name: "小发明家",
		nameEn: "Inventor",
		emoji: "🤖",
		tagline: "组装属于你的机器人",
		mascot: "RobotKid",
		bgVariant: "tech",
		accent: "#00E5FF",
		cta: "#FF3D9A",
		ctaShadow: "#B81F6B",
		accentDark: "#00838F",
		titleShadow: "#00E5FF",
		primary: "#7C4DFF",
		gateLabel: "实验室",
		verbStart: "启动",
		verbStartEn: "BOOT",
		timeUnit: "编程时数",
		timeUnitShort: "时",
		distanceLabel: "任务",
		welcomeTitle: "准备启动机器人！",
		briefingLabel: "任务简报",
		briefingNoun: "发明家",
		briefingVehicle: "机器人",
		rankShort: "发明家",
		licenseTitle: "小小发明家实验室 · 发明家证",
		subjectOverrides: {
			math: {
				icon: "⚙",
				aircraft: "计算机器人",
				destination: "数据中心 → 公式工厂",
				tagline: "计算引擎",
			},
			en: {
				icon: "📡",
				aircraft: "词语机器人",
				destination: "词库 → 英文宇宙",
				tagline: "翻译模组",
			},
			bm: {
				icon: "🛠",
				aircraft: "马来机器人",
				destination: "工坊 → 马来岛",
				tagline: "本地协议",
			},
			sci: {
				icon: "🧪",
				aircraft: "科学机器人",
				destination: "实验室 → 银河",
				tagline: "科学引擎",
			},
			zh: {
				icon: "💾",
				aircraft: "汉字机器人",
				destination: "字典 → 拼音核心",
				tagline: "汉字编码",
			},
		},
		badges: [
			{
				id: "sqbot",
				name: "方块机器人",
				sub: "完成 10 个数学任务",
				icon: "🤖",
				earned: true,
				rarity: "gold",
			},
			{
				id: "mech",
				name: "机甲",
				sub: "完成 5 个英文任务",
				icon: "🦾",
				earned: true,
				rarity: "silver",
			},
			{
				id: "drone",
				name: "无人机",
				sub: "累积 15 颗星",
				icon: "📡",
				earned: true,
				rarity: "silver",
			},
			{
				id: "bolt",
				name: "闪电号",
				sub: "答对 20 道题",
				icon: "⚡",
				earned: true,
				rarity: "bronze",
			},
			{
				id: "alien",
				name: "星际机器人",
				sub: "完成科学任务",
				icon: "👽",
				earned: false,
				rarity: "gold",
			},
			{
				id: "gear",
				name: "齿轮骑士",
				sub: "完成马来文 3 课",
				icon: "⚙",
				earned: false,
				rarity: "bronze",
			},
			{
				id: "spider",
				name: "蛛形机器人",
				sub: "一日答对 30 题",
				icon: "🕷",
				earned: false,
				rarity: "gold",
			},
			{
				id: "satellite",
				name: "卫星",
				sub: "挑战「专家」难度",
				icon: "🛰",
				earned: false,
				rarity: "silver",
			},
		],
	},

	magic: {
		id: "magic",
		name: "小巫师",
		nameEn: "Wizard",
		emoji: "🦄",
		tagline: "施展魔法学习",
		mascot: "WizardKid",
		bgVariant: "dreamy",
		accent: "#FFB347",
		cta: "#E94B8E",
		ctaShadow: "#A22361",
		accentDark: "#D4811C",
		titleShadow: "#FFB347",
		primary: "#A78BFA",
		gateLabel: "魔法门",
		verbStart: "施法",
		verbStartEn: "CAST",
		timeUnit: "魔法时数",
		timeUnitShort: "时",
		distanceLabel: "冒险",
		welcomeTitle: "准备施法吧！",
		briefingLabel: "魔法卷轴",
		briefingNoun: "小巫师",
		briefingVehicle: "魔法生物",
		rankShort: "巫师",
		licenseTitle: "小小巫师学院 · 巫师证",
		subjectOverrides: {
			math: {
				icon: "🦄",
				aircraft: "独角兽",
				destination: "彩虹桥 → 数字花园",
				tagline: "数字咒语",
			},
			en: {
				icon: "🧚",
				aircraft: "花仙子",
				destination: "字母森林 → 童话岛",
				tagline: "童话翻译",
			},
			bm: {
				icon: "🐉",
				aircraft: "小龙",
				destination: "山顶城堡 → 秘境",
				tagline: "古老语言",
			},
			sci: {
				icon: "⭐",
				aircraft: "星灵",
				destination: "月亮塔 → 星河",
				tagline: "星辰奥秘",
			},
			zh: {
				icon: "📜",
				aircraft: "卷轴",
				destination: "古卷宫 → 诗词河",
				tagline: "汉字魔法",
			},
		},
		badges: [
			{
				id: "unicorn",
				name: "独角兽",
				sub: "完成 10 个数学任务",
				icon: "🦄",
				earned: true,
				rarity: "gold",
			},
			{
				id: "fairy",
				name: "花仙子",
				sub: "完成 5 个英文任务",
				icon: "🧚",
				earned: true,
				rarity: "silver",
			},
			{
				id: "dragon",
				name: "小龙",
				sub: "累积 15 颗星",
				icon: "🐉",
				earned: true,
				rarity: "silver",
			},
			{
				id: "wand",
				name: "星杖",
				sub: "答对 20 道题",
				icon: "✨",
				earned: true,
				rarity: "bronze",
			},
			{
				id: "phoenix",
				name: "凤凰",
				sub: "完成科学任务",
				icon: "🔥",
				earned: false,
				rarity: "gold",
			},
			{
				id: "mermaid",
				name: "美人鱼",
				sub: "完成马来文 3 课",
				icon: "🧜",
				earned: false,
				rarity: "bronze",
			},
			{
				id: "crown",
				name: "魔法王冠",
				sub: "一日答对 30 题",
				icon: "👑",
				earned: false,
				rarity: "gold",
			},
			{
				id: "crystal",
				name: "水晶球",
				sub: "挑战「专家」难度",
				icon: "🔮",
				earned: false,
				rarity: "silver",
			},
		],
	},
};

// Rank tiers by real study time (hours). Thresholds are deliberately small so
// a beginner sees the promotion bar move within the first sessions.
function deriveRank(flightHours: number): {
	title: string;
	nextRank: string;
	nextRankAt: number;
} {
	if (flightHours < 1)
		return { title: "见习飞行员", nextRank: "副机长", nextRankAt: 1 };
	if (flightHours < 5)
		return { title: "副机长", nextRank: "机长", nextRankAt: 5 };
	if (flightHours < 20)
		return { title: "机长", nextRank: "王牌机长", nextRankAt: 20 };
	return { title: "王牌机长", nextRank: "王牌机长", nextRankAt: 20 };
}

// Canonical unlock rules, in lockstep with badgeEarned() below. buildThemedData
// stamps these onto every theme's badges so the text a child reads always
// matches what actually unlocks the badge (the per-theme `sub` was decorative).
const BADGE_CRITERIA = [
	"完成首个任务", // 0: totalStars >= 1
	"完成 3 个任务", // 1: lessonsCompleted >= 3
	"累积 15 颗星", // 2: totalStars >= 15
	"累积学习 30 分钟", // 3: studyMinutes >= 30
	"任意任务满分通关", // 4: hasThreeStar
	"完成 8 个任务", // 5: lessonsCompleted >= 8
	"累积 40 颗星", // 6: totalStars >= 40
	"完成 12 个任务", // 7: lessonsCompleted >= 12
];

// Whether each themed badge is earned, decided by real stats. The eight rules
// apply by position to whatever badge set the active theme provides.
function badgeEarned(index: number, s: LiveStats): boolean {
	switch (index) {
		case 0:
			return s.totalStars >= 1; // 首次起飞
		case 1:
			return s.lessonsCompleted >= 3;
		case 2:
			return s.totalStars >= 15;
		case 3:
			return s.studyMinutes >= 30; // 累积学习 30 分钟
		case 4:
			return s.hasThreeStar; // 满分通关
		case 5:
			return s.lessonsCompleted >= 8;
		case 6:
			return s.totalStars >= 40;
		case 7:
			return s.lessonsCompleted >= 12;
		default:
			return false;
	}
}

// Today's three daily missions, computed from real activity.
function buildDaily(s: LiveStats): DailyTask[] {
	const { quizzes, correct, minutes } = s.today;
	return [
		{ id: "d1", name: "完成 1 个学习任务", done: quizzes >= 1, reward: 10 },
		{
			id: "d2",
			name: "答对 5 道题",
			done: correct >= 5,
			reward: 10,
			progress: Math.min(1, correct / 5),
		},
		{
			id: "d3",
			name: "学习 10 分钟",
			done: minutes >= 10,
			reward: 15,
			progress: Math.min(1, minutes / 10),
		},
	];
}

// Build a fresh, themed copy of the app data. The palette stays per-subject;
// only the metaphor (icon / aircraft / destination / tagline) and the badge
// collection swap with the theme. Learning content (quizzes) is shared.
// Every number (stars, study hours, badges, daily tasks) comes from `stats`.
export function buildThemedData(
	themeId: ThemeId,
	kidName: string,
	stats: LiveStats = EMPTY_STATS,
): AppData {
	const theme = THEMES[themeId] || THEMES.pilot;
	const subjects = BASE_SUBJECTS.map((s) => {
		const o = theme.subjectOverrides[s.id];
		const lessons = s.lessons.map((l) => ({
			...l,
			stars: stats.progressMap[`${s.id}:${l.id}`] ?? 0,
		}));
		// Subject progress reflects how many lessons have at least one star.
		const completed = lessons.filter((l) => l.stars > 0).length;
		return {
			...s,
			lessons,
			progress: lessons.length ? completed / lessons.length : 0,
			icon: o?.icon ?? s.icon,
			aircraft: o?.aircraft ?? s.aircraft,
			destination: o?.destination ?? s.destination,
			tagline: o?.tagline ?? s.tagline,
		};
	});
	// Show playable subjects first; "coming soon" ones drop to the end.
	subjects.sort(
		(a, b) => Number(a.comingSoon ?? false) - Number(b.comingSoon ?? false),
	);
	const flightHours = Math.round((stats.studyMinutes / 60) * 10) / 10;
	const rank = deriveRank(flightHours);
	return {
		subjects,
		quizzes: QUIZZES,
		badges: theme.badges.map((b, i) => ({
			...b,
			sub: BADGE_CRITERIA[i] ?? b.sub,
			earned: badgeEarned(i, stats),
		})),
		pilot: {
			...BASE_PILOT,
			name: kidName || BASE_PILOT.name,
			stars: stats.totalStars,
			flightHours,
			title: rank.title,
			nextRank: rank.nextRank,
			nextRankAt: rank.nextRankAt,
		},
		unlockables: UNLOCKABLES.map((u) => ({ ...u })),
		daily: buildDaily(stats),
		currentTheme: themeId,
	};
}
