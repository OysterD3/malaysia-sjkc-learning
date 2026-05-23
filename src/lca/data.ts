// Sample content for Little Captain Academy.
// Standard 1 Malaysian (KSSR) syllabus — Chinese, English, BM, Math, Science.
// Theme: aerospace / aviation for the 7-year-old pilot fan.

export type Rarity = "gold" | "silver" | "bronze";

export interface Lesson {
	id: string;
	name: string;
	sub: string;
	stars: number;
	locked: boolean;
}

export interface Subject {
	id: string;
	name: string;
	nameEn: string;
	tagline: string;
	color: string;
	colorSoft: string;
	icon: string;
	aircraft: string;
	destination: string;
	progress: number;
	lessons: Lesson[];
	// When true, the subject has no content yet and is shown as "敬请期待".
	comingSoon?: boolean;
}

export interface Badge {
	id: string;
	name: string;
	sub: string;
	icon: string;
	earned: boolean;
	rarity: Rarity;
}

export interface Pilot {
	name: string;
	title: string;
	rank: string;
	flightHours: number;
	stars: number;
	avatarId: string;
	nextRank: string;
	nextRankAt: number;
}

export interface Unlockable {
	id: string;
	name: string;
	icon: string;
	unlocked: boolean;
	current?: boolean;
	cost?: number;
}

export interface DailyTask {
	id: string;
	name: string;
	done: boolean;
	reward: number;
	progress?: number;
}

export type QuestionType = "mc" | "match" | "fill" | "spell" | "tap" | "memory";

export interface MatchPair {
	left: string;
	right: string;
}

export interface TapItem {
	label: string;
	correct: boolean;
}

export interface Question {
	type: QuestionType;
	q?: string;
	choices?: string[];
	answer?: number | string;
	pairs?: MatchPair[] | string[];
	word?: string;
	hint?: string;
	items?: TapItem[];
	time?: number;
	// Shown as a friendly hint when the child picks a wrong answer (retry mode).
	explain?: string;
	// When set, the question renders this character as animated SVG strokes
	// (used by the 笔画 / stroke-count drill). See lca/hanzi.tsx.
	hanzi?: string;
	// Picture icon key (looks up /icons/{image}.png; falls back to an emoji
	// until that file exists). See lca/icons.tsx and IMAGE-ASSETS.md.
	image?: string;
}

export interface Quiz {
	title: string;
	subtitle: string;
	questions: Question[];
}

export interface AppData {
	subjects: Subject[];
	quizzes: Record<string, Quiz>;
	badges: Badge[];
	pilot: Pilot;
	unlockables: Unlockable[];
	daily: DailyTask[];
	currentTheme?: string;
}

export const BASE_SUBJECTS: Subject[] = [
	{
		id: "math",
		comingSoon: true,
		name: "数学",
		nameEn: "Mathematics",
		tagline: "飞行计算员训练",
		color: "#4A9EFF",
		colorSoft: "#DCEEFF",
		icon: "✈",
		aircraft: "A380",
		destination: "吉隆坡 → 新加坡",
		progress: 0.62,
		lessons: [
			{
				id: "m1",
				name: "加法 1–20",
				sub: "二十以内加法",
				stars: 3,
				locked: false,
			},
			{
				id: "m2",
				name: "减法 1–20",
				sub: "二十以内减法",
				stars: 2,
				locked: false,
			},
			{ id: "m3", name: "认识形状", sub: "认识图形", stars: 3, locked: false },
			{
				id: "m4",
				name: "比较大小",
				sub: "比一比大小",
				stars: 1,
				locked: false,
			},
			{
				id: "m5",
				name: "时间与钟表",
				sub: "认识钟表",
				stars: 0,
				locked: false,
			},
			{ id: "m6", name: "钱与计算", sub: "认识钱币", stars: 0, locked: true },
		],
	},
	{
		id: "en",
		comingSoon: true,
		name: "英文",
		nameEn: "English",
		tagline: "机长广播训练",
		color: "#FF6B6B",
		colorSoft: "#FFE0E0",
		icon: "🛬",
		aircraft: "B787",
		destination: "槟城 → 伦敦",
		progress: 0.45,
		lessons: [
			{ id: "e1", name: "常见单字", sub: "看字读音", stars: 3, locked: false },
			{ id: "e2", name: "动物", sub: "认识动物", stars: 2, locked: false },
			{ id: "e3", name: "数字", sub: "1 到 20", stars: 2, locked: false },
			{ id: "e4", name: "颜色", sub: "认识颜色", stars: 0, locked: false },
			{ id: "e5", name: "家人", sub: "认识家人", stars: 0, locked: true },
		],
	},
	{
		id: "bm",
		comingSoon: true,
		name: "马来文",
		nameEn: "Bahasa Malaysia",
		tagline: "本地机场播报",
		color: "#4ECDC4",
		colorSoft: "#D4F5F2",
		icon: "🛫",
		aircraft: "A330",
		destination: "亚庇 → 古晋",
		progress: 0.3,
		lessons: [
			{ id: "b1", name: "字母表", sub: "认识字母", stars: 2, locked: false },
			{ id: "b2", name: "动物", sub: "认识动物", stars: 1, locked: false },
			{ id: "b3", name: "颜色", sub: "认识颜色", stars: 0, locked: false },
			{ id: "b4", name: "家人", sub: "认识家人", stars: 0, locked: true },
		],
	},
	{
		id: "sci",
		comingSoon: true,
		name: "科学",
		nameEn: "Sains",
		tagline: "飞机原理研究",
		color: "#A78BFA",
		colorSoft: "#EDE4FF",
		icon: "🚀",
		aircraft: "航天飞机",
		destination: "地球 → 月球",
		progress: 0.2,
		lessons: [
			{ id: "s1", name: "五官感觉", sub: "五种感官", stars: 2, locked: false },
			{
				id: "s2",
				name: "动物分类",
				sub: "给动物分类",
				stars: 0,
				locked: false,
			},
			{ id: "s3", name: "天气", sub: "认识天气", stars: 0, locked: false },
			{
				id: "s4",
				name: "飞机原理",
				sub: "飞机为什么会飞",
				stars: 0,
				locked: true,
			},
		],
	},
	{
		id: "zh",
		name: "华文",
		nameEn: "Chinese",
		tagline: "机舱广播员",
		color: "#FFB347",
		colorSoft: "#FFEBCC",
		icon: "🛩",
		aircraft: "B737",
		destination: "北京 → 上海",
		progress: 0,
		lessons: [
			{
				id: "za",
				name: "A 阅读短文",
				sub: "读课文，回答问题",
				stars: 0,
				locked: false,
			},
			{
				id: "zb",
				name: "B 数笔画",
				sub: "数一数有几画",
				stars: 0,
				locked: false,
			},
			{
				id: "zc",
				name: "C 标点符号",
				sub: "填上 。？！",
				stars: 0,
				locked: false,
			},
			{
				id: "zd",
				name: "D 选词填充",
				sub: "选词语填空",
				stars: 0,
				locked: false,
			},
			{
				id: "ze",
				name: "E 圈正确的字",
				sub: "分辨形近字",
				stars: 0,
				locked: false,
			},
			{
				id: "zf",
				name: "F 圈正确的拼音",
				sub: "多音字读音",
				stars: 0,
				locked: false,
			},
			{
				id: "zg",
				name: "G 看图选词",
				sub: "看图选词语",
				stars: 0,
				locked: false,
			},
			{ id: "zh1", name: "H 填量词", sub: "选对量词", stars: 0, locked: false },
			{
				id: "zi",
				name: "I 句子连图",
				sub: "句子连图画",
				stars: 0,
				locked: false,
			},
			{
				id: "zj",
				name: "J 看图完成句子",
				sub: "看图把句子补完整",
				stars: 0,
				locked: false,
			},
			{
				id: "zk",
				name: "K 看图写话",
				sub: "看图说话写话",
				stars: 0,
				locked: false,
			},
		],
	},
];

export const QUIZZES: Record<string, Quiz> = {
	math_add: {
		title: "加法挑战",
		subtitle: "加法任务 · 飞往新加坡",
		questions: [
			{
				type: "mc",
				q: "7 + 5 = ?",
				choices: ["11", "12", "13", "14"],
				answer: 1,
			},
			{
				type: "mc",
				q: "9 + 6 = ?",
				choices: ["14", "15", "16", "17"],
				answer: 1,
			},
			{
				type: "mc",
				q: "8 + 8 = ?",
				choices: ["15", "16", "17", "18"],
				answer: 1,
			},
			{
				type: "fill",
				q: "飞机上有 6 位乘客，又上来 4 位。\n现在共有 __ 位？",
				answer: "10",
			},
			{
				type: "mc",
				q: "12 + 7 = ?",
				choices: ["18", "19", "20", "21"],
				answer: 1,
			},
		],
	},
	en_animals: {
		title: "动物任务",
		subtitle: "看图配对 · 飞往伦敦",
		questions: [
			{
				type: "match",
				pairs: [
					{ left: "🐘", right: "Elephant" },
					{ left: "🦁", right: "Lion" },
					{ left: "🐯", right: "Tiger" },
					{ left: "🐒", right: "Monkey" },
				],
			},
			{
				type: "mc",
				q: "Which animal can fly?",
				choices: ["Fish", "Eagle", "Snake", "Cat"],
				answer: 1,
			},
			{ type: "spell", q: "拼出这只鸟", word: "EAGLE", hint: "🦅" },
		],
	},
	sci_senses: {
		title: "五官小任务",
		subtitle: "用眼睛、耳朵、鼻子……",
		questions: [
			{
				type: "mc",
				q: "我们用什么来看东西？",
				choices: ["耳朵", "眼睛 👀", "鼻子", "舌头"],
				answer: 1,
			},
			{
				type: "mc",
				q: "飞机起飞的声音，我们用什么听？",
				choices: ["手", "脚", "耳朵 👂", "舌头"],
				answer: 2,
			},
			{
				type: "tap",
				q: "点一点所有的「感觉器官」!",
				items: [
					{ label: "👁 眼睛", correct: true },
					{ label: "👂 耳朵", correct: true },
					{ label: "✈ 飞机", correct: false },
					{ label: "👃 鼻子", correct: true },
					{ label: "⚽ 足球", correct: false },
					{ label: "👅 舌头", correct: true },
					{ label: "✋ 皮肤", correct: true },
					{ label: "🍎 苹果", correct: false },
				],
				time: 12,
			},
		],
	},
	zh_pinyin: {
		title: "拼音挑战",
		subtitle: "拼音任务",
		questions: [
			{
				type: "mc",
				q: "「飞机」 的拼音是?",
				choices: ["fēi jī", "fē jì", "fēn jí", "fěi jī"],
				answer: 0,
			},
			{
				type: "mc",
				q: "「机长」 的拼音是?",
				choices: ["jí cháng", "jī zhǎng", "jì zhāng", "jī cháng"],
				answer: 1,
			},
			{
				type: "mc",
				q: "「云」 的拼音是?",
				choices: ["yún", "yùn", "yǔn", "yuán"],
				answer: 0,
			},
		],
	},
	memory_aircraft: {
		title: "飞机记忆配对",
		subtitle: "翻牌找一对",
		questions: [
			{ type: "memory", pairs: ["A380", "B787", "A330", "B737", "A320", "🚁"] },
		],
	},

	/* ============================================================
	 * 一年级华文 期末复习 — drill sets mirroring exam sections A–K.
	 * Vocabulary & sentences drawn from the Grade 1 textbook (8 units +
	 * 3 识字 units). Wrong answers are NOT revealed — the child gets a
	 * friendly `explain` hint and keeps trying until they find it.
	 * ============================================================ */

	// A — 阅读短文后回答 (read a课文 line, choose the right answer)
	zh_a: {
		title: "A 阅读短文",
		subtitle: "读一读，圈出正确的答案",
		questions: [
			{
				type: "mc",
				q: "读一读：\n「雨停了，天更蓝了，山更青了，花更红了。」\n雨停了以后，花儿怎么样？",
				choices: ["更红了", "更绿了", "不见了"],
				answer: 0,
				explain: "再读一读句子，找出写「花」的那一句：花，更红了。",
			},
			{
				type: "mc",
				q: "读一读：\n「小蚂蚁，搬小虫，一个搬，搬不动，两个搬，有点儿重。」\n一只蚂蚁搬小虫，结果怎样？",
				choices: ["搬进洞了", "搬不动", "很轻松"],
				answer: 1,
				explain: "只有一只蚂蚁，力气小。句子说「一个搬，搬不动」。",
			},
			{
				type: "mc",
				q: "读一读：\n「一个大，一个小，一只老虎一只猫。」\n谁比较大？",
				choices: ["小猫", "小鸟", "老虎"],
				answer: 2,
				explain: "「一个大」说的是老虎，「一个小」说的是猫。",
			},
			{
				type: "mc",
				q: "读一读：\n「香蕉黄，香蕉绿，香蕉弯弯像滑梯。」\n香蕉的样子像什么？",
				choices: ["滑梯", "飞机", "小山"],
				answer: 0,
				explain: "句子里有「像滑梯」三个字哦。",
			},
			{
				type: "mc",
				q: "读一读：\n「森林会唱歌吗？是的，那是小鸟在唱歌。」\n是谁在森林里唱歌？",
				choices: ["小猫", "小鸟", "蚂蚁"],
				answer: 1,
				explain: "句子说「那是小鸟在唱歌」。",
			},
			{
				type: "mc",
				q: "读一读：\n「太阳出来了，月亮不见了，星星也不见了。」\n太阳出来后，月亮怎么样？",
				choices: ["更亮了", "在唱歌", "不见了"],
				answer: 2,
				explain: "白天太阳出来，月亮就不见了。",
			},
		],
	},

	// B — 数笔画 (count the strokes of a 习写生字)
	zh_b: {
		title: "B 数笔画",
		subtitle: "这个字有几画？",
		questions: [
			{
				type: "mc",
				hanzi: "口",
				q: "数一数，这个字有几画？",
				choices: ["2", "3", "4", "5"],
				answer: 1,
				explain: "按「▶ 看笔顺」数一数：竖、横折、横 —— 一共 3 画。",
			},
			{
				type: "mc",
				hanzi: "飞",
				q: "数一数，这个字有几画？",
				choices: ["3", "4", "5", "6"],
				answer: 0,
				explain: "按「▶ 看笔顺」数一数：横斜钩、撇、点 —— 一共 3 画。",
			},
			{
				type: "mc",
				hanzi: "月",
				q: "数一数，这个字有几画？",
				choices: ["3", "4", "5", "6"],
				answer: 1,
				explain: "按「▶ 看笔顺」数一数：撇、横折钩、横、横 —— 一共 4 画。",
			},
			{
				type: "mc",
				hanzi: "不",
				q: "数一数，这个字有几画？",
				choices: ["3", "4", "5", "6"],
				answer: 1,
				explain: "按「▶ 看笔顺」数一数：横、撇、竖、点 —— 一共 4 画。",
			},
			{
				type: "mc",
				hanzi: "鸟",
				q: "数一数，这个字有几画？",
				choices: ["4", "5", "6", "7"],
				answer: 1,
				explain:
					"按「▶ 看笔顺」数一数：撇、横折钩、点、竖折折钩、横 —— 一共 5 画。",
			},
			{
				type: "mc",
				hanzi: "瓜",
				q: "数一数，这个字有几画？",
				choices: ["4", "5", "6", "7"],
				answer: 1,
				explain: "按「▶ 看笔顺」数一数：撇、撇、竖提、点、捺 —— 一共 5 画。",
			},
			{
				type: "mc",
				hanzi: "多",
				q: "数一数，这个字有几画？",
				choices: ["5", "6", "7", "8"],
				answer: 1,
				explain: "按「▶ 看笔顺」数一数：两个「夕」叠在一起，一共 6 画。",
			},
		],
	},

	// C — 填上正确的标点符号
	zh_c: {
		title: "C 标点符号",
		subtitle: "句子后面应该用什么标点？",
		questions: [
			{
				type: "mc",
				q: "你听到妹妹在房间里唱歌吗（ ）",
				choices: ["，", "。", "？", "！"],
				answer: 2,
				explain: "句末有「吗」，这是在问问题，要用问号「？」。",
			},
			{
				type: "mc",
				q: "这只小狗真可爱啊（ ）",
				choices: ["，", "。", "？", "！"],
				answer: 3,
				explain: "句末有「啊」，带着很强的感情，要用感叹号「！」。",
			},
			{
				type: "mc",
				q: "弯弯曲曲的小河，也长胖了（ ）",
				choices: ["，", "。", "？", "！"],
				answer: 1,
				explain: "话已经说完了，用句号「。」。",
			},
			{
				type: "mc",
				q: "为什么丽丽今天没有来上课（ ）",
				choices: ["，", "。", "？", "！"],
				answer: 2,
				explain: "「为什么……」是问句，要用问号「？」。",
			},
			{
				type: "mc",
				q: "放学了（ ）弟弟背着书包走路回家。",
				choices: ["，", "。", "？", "！"],
				answer: 0,
				explain: "句子还没说完，中间停一下用逗号「，」。",
			},
		],
	},

	// D — 选词填充 (word bank: 害怕 美丽 香甜 欢乐 热闹)
	zh_d: {
		title: "D 选词填充",
		subtitle: "选一选：害怕 · 美丽 · 香甜 · 欢乐 · 热闹",
		questions: [
			{
				type: "mc",
				q: "晚上停电了，弟弟很 ＿＿ 。",
				choices: ["美丽", "香甜", "害怕", "热闹"],
				answer: 2,
				explain: "黑黑的看不见，心里会怎样？是「害怕」。",
			},
			{
				type: "mc",
				q: "雨后，天空出现一道 ＿＿ 的彩虹。",
				choices: ["美丽", "害怕", "欢乐", "热闹"],
				answer: 0,
				explain: "彩虹很好看，用「美丽」来形容。",
			},
			{
				type: "mc",
				q: "妈妈做的蛋糕很 ＿＿ 。",
				choices: ["害怕", "香甜", "热闹", "美丽"],
				answer: 1,
				explain: "蛋糕又香又甜，是「香甜」。",
			},
			{
				type: "mc",
				q: "菜市场里人来人往，非常 ＿＿ 。",
				choices: ["香甜", "害怕", "美丽", "热闹"],
				answer: 3,
				explain: "人很多、很吵，是「热闹」。",
			},
			{
				type: "mc",
				q: "我跟妹妹一起度过 ＿＿ 的时光。",
				choices: ["害怕", "美丽", "欢乐", "香甜"],
				answer: 2,
				explain: "和妹妹一起玩得很开心，是「欢乐」。",
			},
		],
	},

	// E — 圈出正确的字 (look-alike characters)
	zh_e: {
		title: "E 圈正确的字",
		subtitle: "选出正确的字",
		questions: [
			{
				type: "mc",
				q: "大家（ ）下来读书。",
				choices: ["坐", "座"],
				answer: 0,
				explain: "坐下来的动作用「坐」；「座」是一座山的座。",
			},
			{
				type: "mc",
				q: "我掉了一（ ）牙。",
				choices: ["棵", "颗"],
				answer: 1,
				explain: "小小圆圆的东西（牙、星星）用「颗」；「棵」是数树的。",
			},
			{
				type: "mc",
				q: "数数看这里有多少（ ）树。",
				choices: ["颗", "棵"],
				answer: 1,
				explain: "树用「棵」：一棵树、两棵树。",
			},
			{
				type: "mc",
				q: "天空放（ ）了，真好。",
				choices: ["晴", "情"],
				answer: 0,
				explain: "天气好用「晴」（日字旁，跟太阳有关）；「情」是心情。",
			},
			{
				type: "mc",
				q: "鱼儿在（ ）里游来游去。",
				choices: ["和", "河"],
				answer: 1,
				explain: "鱼在水里游，用「河」（三点水，跟水有关）。",
			},
			{
				type: "mc",
				q: "星星（ ）月亮多明亮。",
				choices: ["和", "河"],
				answer: 0,
				explain: "「星星跟月亮」用「和」，表示两样东西在一起。",
			},
			{
				type: "mc",
				q: "盘子里的糖果很（ ），只剩三颗。",
				choices: ["小", "少"],
				answer: 1,
				explain: "数量不多用「少」；「小」是大小的小。",
			},
		],
	},

	// F — 圈出正确的拼音 (polyphonic characters 多音字)
	zh_f: {
		title: "F 圈正确的拼音",
		subtitle: "这个字读什么？",
		questions: [
			{
				type: "mc",
				q: "小朋友多学习，长（ ）知识。",
				choices: ["zhǎng", "cháng"],
				answer: 0,
				explain: "「长知识」是学到更多，读 zhǎng（跟长大一样）。",
			},
			{
				type: "mc",
				q: "这个故事太长（ ）了！",
				choices: ["zhǎng", "cháng"],
				answer: 1,
				explain: "说东西很长、不短，读 cháng。",
			},
			{
				type: "mc",
				q: "请把积木还（ ）给我。",
				choices: ["hái", "huán"],
				answer: 1,
				explain: "把东西还给别人，读 huán。",
			},
			{
				type: "mc",
				q: "桌上有瓜有鱼，还（ ）有蛋。",
				choices: ["hái", "huán"],
				answer: 0,
				explain: "「还有」表示「也有」，读 hái。",
			},
			{
				type: "mc",
				q: "小虫有点儿重（ ），搬不动。",
				choices: ["zhòng", "chóng"],
				answer: 0,
				explain: "「重」是不轻，读 zhòng；chóng 是「重复」的重。",
			},
			{
				type: "mc",
				q: "星星和（ ）月亮多明亮。",
				choices: ["hé", "hè"],
				answer: 0,
				explain: "「跟、与」的意思，读 hé。",
			},
		],
	},

	// G — 看图选词 (picture → correct word)
	zh_g: {
		title: "G 看图选词",
		subtitle: "图里是什么？选出正确的词",
		questions: [
			{
				type: "mc",
				q: "这是什么动物？",
				image: "tiger",
				choices: ["老虎", "小猫", "天鹅"],
				answer: 0,
				explain: "身上有花纹、很威风的大猫，是「老虎」。",
			},
			{
				type: "mc",
				q: "这是什么水果？",
				image: "banana",
				choices: ["西瓜", "香蕉", "苹果"],
				answer: 1,
				explain: "黄黄的、弯弯的，是「香蕉」。",
			},
			{
				type: "mc",
				q: "这是什么？",
				image: "bee",
				choices: ["蚂蚁", "小鸟", "蜜蜂"],
				answer: 2,
				explain: "会采花蜜、嗡嗡叫的是「蜜蜂」。",
			},
			{
				type: "mc",
				q: "天上的它是什么？",
				image: "moon",
				choices: ["月亮", "太阳", "星星"],
				answer: 0,
				explain: "晚上天上弯弯亮亮的是「月亮」。",
			},
			{
				type: "mc",
				q: "这是什么动物？",
				image: "swan",
				choices: ["公鸡", "天鹅", "小鸭"],
				answer: 1,
				explain: "白白的、脖子长长、在水里游的是「天鹅」。",
			},
			{
				type: "mc",
				q: "这是什么？",
				image: "ant",
				choices: ["小虫", "蜜蜂", "蚂蚁"],
				answer: 2,
				explain: "小小黑黑、爱搬东西的是「蚂蚁」。",
			},
		],
	},

	// H — 填写正确的量词 (measure words)
	zh_h: {
		title: "H 填量词",
		subtitle: "一（ ）……？选出正确的量词",
		questions: [
			{
				type: "mc",
				q: "一（ ）猫",
				image: "cat",
				choices: ["只", "群", "棵", "座"],
				answer: 0,
				explain: "小动物用「只」：一只猫、一只鸟。",
			},
			{
				type: "mc",
				q: "一（ ）天鹅",
				image: "swan-group",
				choices: ["群", "只", "张", "片"],
				answer: 0,
				explain: "很多在一起用「群」：一群天鹅。",
			},
			{
				type: "mc",
				q: "一（ ）树",
				image: "tree",
				choices: ["颗", "只", "棵", "座"],
				answer: 2,
				explain: "树用「棵」：一棵树。",
			},
			{
				type: "mc",
				q: "一（ ）大山",
				image: "mountain",
				choices: ["只", "座", "群", "张"],
				answer: 1,
				explain: "大大的山、桥用「座」：一座山。",
			},
			{
				type: "mc",
				q: "一（ ）牙",
				image: "tooth",
				choices: ["棵", "片", "只", "颗"],
				answer: 3,
				explain: "小小圆圆的（牙、星星）用「颗」。",
			},
			{
				type: "mc",
				q: "一（ ）相片",
				image: "photo",
				choices: ["张", "只", "棵", "座"],
				answer: 0,
				explain: "平平薄薄的（纸、相片）用「张」。",
			},
			{
				type: "mc",
				q: "一（ ）蜜蜂",
				image: "bee-group",
				choices: ["只", "群", "条", "棵"],
				answer: 1,
				explain: "很多蜜蜂在一起用「群」。",
			},
		],
	},

	// I — 根据图意，把句子和图片连起来 (match sentence ↔ picture)
	zh_i: {
		title: "I 句子连图",
		subtitle: "把句子和图片配对起来",
		questions: [
			{
				type: "match",
				pairs: [
					{ left: "ant", right: "小蚂蚁搬小虫。" },
					{ left: "bee", right: "小蜜蜂飞到花园。" },
					{ left: "rain", right: "雨停了，天更蓝了。" },
					{ left: "banana", right: "香蕉弯弯像滑梯。" },
					{ left: "swan", right: "一群天鹅在游水。" },
				],
			},
			{
				type: "match",
				pairs: [
					{ left: "book", right: "我们一起读书写字。" },
					{ left: "moon", right: "天上有星星和月亮。" },
					{ left: "rice", right: "全家开心吃晚饭。" },
					{ left: "blocks", right: "我跟妹妹搭积木。" },
				],
			},
		],
	},

	// J — 根据图意，完成句子 (complete the sentence)
	zh_j: {
		title: "J 看图完成句子",
		subtitle: "看图，选出正确的句子",
		questions: [
			{
				type: "mc",
				q: "下雨了，______",
				image: "umbrella",
				choices: ["我打着伞走路回家。", "弟弟在客厅玩玩具车。", "太阳出来了。"],
				answer: 0,
				explain: "图里在下雨，撑着伞走路，所以选「打伞走路回家」。",
			},
			{
				type: "mc",
				q: "上音乐课时，______",
				image: "piano",
				choices: ["妈妈在菜市场买菜。", "老师教同学们唱歌。", "小蚂蚁搬小虫。"],
				answer: 1,
				explain: "图里有钢琴和音符，是音乐课，老师在教唱歌。",
			},
			{
				type: "mc",
				q: "在客厅里，______",
				image: "toycar",
				choices: ["天鹅在水里游。", "我们一起浇花。", "弟弟在玩玩具车。"],
				answer: 2,
				explain: "图里有玩具车和小朋友，是「弟弟在玩玩具车」。",
			},
			{
				type: "mc",
				q: "早上，______",
				image: "sunrise",
				choices: [
					"太阳出来了，红红的。",
					"月亮和星星不见了的故事。",
					"弟弟很害怕。",
				],
				answer: 0,
				explain: "图里是日出，早上太阳出来了，红红的。",
			},
		],
	},

	// K — 看图写话 (pick the sentences that describe the picture)
	zh_k: {
		title: "K 看图写话",
		subtitle: "看图，点出所有正确的句子",
		questions: [
			{
				type: "tap",
				q: "看图：小女孩在浇花",
				image: "watering",
				items: [
					{ label: "她在浇花。", correct: true },
					{ label: "花儿很美丽。", correct: true },
					{ label: "她很开心。", correct: true },
					{ label: "天在下雪。", correct: false },
					{ label: "小狗在睡觉。", correct: false },
					{ label: "鱼儿在天上飞。", correct: false },
				],
				time: 18,
			},
			{
				type: "tap",
				q: "看图：小朋友在游乐场玩",
				image: "slide",
				items: [
					{ label: "他们在游乐场。", correct: true },
					{ label: "大家玩得很开心。", correct: true },
					{ label: "他们在玩滑梯。", correct: true },
					{ label: "全家在吃晚饭。", correct: false },
					{ label: "小蜜蜂采花蜜。", correct: false },
				],
				time: 18,
			},
			{
				type: "mc",
				q: "看图：大家排队打饭\n哪一句最适合做开头？",
				image: "lineup-food",
				choices: [
					"下课了，大家排队打饭。",
					"弟弟在玩玩具车。",
					"香蕉弯弯像滑梯。",
				],
				answer: 0,
				explain: "看图写话要先写「谁在做什么」，图里大家在排队打饭。",
			},
		],
	},
};

export const BASE_BADGES: Badge[] = [
	{
		id: "a380",
		name: "Airbus A380",
		sub: "完成 10 个数学任务",
		icon: "🛬",
		earned: true,
		rarity: "gold",
	},
	{
		id: "b787",
		name: "Boeing 787",
		sub: "完成 5 个英文任务",
		icon: "✈",
		earned: true,
		rarity: "silver",
	},
	{
		id: "a330",
		name: "Airbus A330",
		sub: "累积 15 颗星",
		icon: "🛫",
		earned: true,
		rarity: "silver",
	},
	{
		id: "b737",
		name: "Boeing 737",
		sub: "答对 20 道题",
		icon: "🛩",
		earned: true,
		rarity: "bronze",
	},
	{
		id: "rocket",
		name: "Falcon Rocket",
		sub: "完成科学任务",
		icon: "🚀",
		earned: false,
		rarity: "gold",
	},
	{
		id: "heli",
		name: "Helicopter",
		sub: "完成马来文 3 课",
		icon: "🚁",
		earned: false,
		rarity: "bronze",
	},
	{
		id: "concorde",
		name: "Concorde",
		sub: "一日内答对 30 题",
		icon: "🛰",
		earned: false,
		rarity: "gold",
	},
	{
		id: "jet",
		name: "Fighter Jet",
		sub: "挑战「专家」难度",
		icon: "🛸",
		earned: false,
		rarity: "silver",
	},
];

export const BASE_PILOT: Pilot = {
	name: "小翔",
	title: "见习副机长",
	rank: "Junior First Officer",
	flightHours: 0,
	stars: 0,
	avatarId: "pilot1",
	nextRank: "副机长",
	nextRankAt: 60,
};

export const UNLOCKABLES: Unlockable[] = [
	{
		id: "pilot1",
		name: "飞行员服",
		icon: "👨‍✈️",
		unlocked: true,
		current: true,
	},
	{
		id: "astro",
		name: "宇航员服",
		icon: "👨‍🚀",
		unlocked: true,
		current: false,
	},
	{ id: "cap", name: "机长帽", icon: "🎩", unlocked: true, current: false },
	{ id: "goggles", name: "飞行护目镜", icon: "🥽", unlocked: false, cost: 60 },
	{ id: "cape", name: "英雄披风", icon: "🦸", unlocked: false, cost: 100 },
	{
		id: "rocket_suit",
		name: "火箭背包",
		icon: "🚀",
		unlocked: false,
		cost: 150,
	},
];

export const DAILY: DailyTask[] = [
	{ id: "d1", name: "完成 1 个数学任务", done: true, reward: 10 },
	{ id: "d2", name: "答对 5 道英文题", done: true, reward: 10 },
	{ id: "d3", name: "学习 10 分钟", done: false, progress: 0.6, reward: 15 },
];

// Several lessons can share the same quiz. A lesson fully determines its quiz,
// so the quiz route can re-derive it from the lesson id (no quizId in the URL).
const LESSON_QUIZ: Record<string, string> = {
	m1: "math_add",
	m2: "math_add",
	e2: "en_animals",
	e1: "en_animals",
	s1: "sci_senses",
	// 华文 期末复习 — exam sections A–K
	za: "zh_a",
	zb: "zh_b",
	zc: "zh_c",
	zd: "zh_d",
	ze: "zh_e",
	zf: "zh_f",
	zg: "zh_g",
	zh1: "zh_h",
	zi: "zh_i",
	zj: "zh_j",
	zk: "zh_k",
};

export function resolveQuizId(lessonId: string): string {
	return LESSON_QUIZ[lessonId] || "math_add";
}
