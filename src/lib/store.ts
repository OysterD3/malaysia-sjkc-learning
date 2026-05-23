// Local-only persistence. All learner data lives in the browser (localStorage):
// nothing leaves the device, there is no account and no backend. This keeps the
// app fully open-source-friendly — no secrets, no server, clone-and-run.
// The learner can wipe everything with resetAll() (设置 → 重置数据).

const KEY = "lca.v1";

// Real, derived stats — drives every number the UI shows.
export interface LiveStats {
	// Best stars per lesson, keyed `${subjectId}:${lessonId}`.
	progressMap: Record<string, number>;
	totalStars: number;
	lessonsCompleted: number;
	hasThreeStar: boolean;
	studyMinutes: number;
	today: { quizzes: number; correct: number; minutes: number };
}

export const EMPTY_STATS: LiveStats = {
	progressMap: {},
	totalStars: 0,
	lessonsCompleted: 0,
	hasThreeStar: false,
	studyMinutes: 0,
	today: { quizzes: 0, correct: 0, minutes: 0 },
};

export interface Settings {
	name: string;
	themeId: string;
	soundOn: boolean;
}

// Empty name signals a first-time visitor — the UI prompts for a nickname
// before entering the academy (see the _app layout route).
const DEFAULT_SETTINGS: Settings = {
	name: "",
	themeId: "pilot",
	soundOn: true,
};

interface DayRec {
	minutes: number;
	quizzes: number;
	correct: number;
}

interface SaveData extends Settings {
	progress: Record<string, number>; // `${subjectId}:${lessonId}` -> best stars
	days: Record<string, DayRec>; // `YYYY-MM-DD` -> that day's tally
}

function blank(): SaveData {
	return { ...DEFAULT_SETTINGS, progress: {}, days: {} };
}

function read(): SaveData {
	try {
		const raw = localStorage.getItem(KEY);
		if (!raw) return blank();
		const d = JSON.parse(raw) as Partial<SaveData>;
		return {
			name: d.name ?? DEFAULT_SETTINGS.name,
			themeId: d.themeId ?? DEFAULT_SETTINGS.themeId,
			soundOn: d.soundOn ?? DEFAULT_SETTINGS.soundOn,
			progress: d.progress ?? {},
			days: d.days ?? {},
		};
	} catch {
		return blank();
	}
}

function write(d: SaveData): void {
	try {
		localStorage.setItem(KEY, JSON.stringify(d));
	} catch {
		// Storage unavailable (private mode / quota) — degrade to in-memory only.
	}
}

// Local date as `YYYY-MM-DD` (used to group a day's study activity).
function todayKey(): string {
	const d = new Date();
	return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function loadSettings(): Settings {
	const d = read();
	return { name: d.name, themeId: d.themeId, soundOn: d.soundOn };
}

export function saveSettings(patch: Partial<Settings>): void {
	write({ ...read(), ...patch });
}

export function loadStats(): LiveStats {
	const d = read();
	let totalStars = 0;
	let lessonsCompleted = 0;
	let hasThreeStar = false;
	for (const stars of Object.values(d.progress)) {
		totalStars += stars;
		if (stars > 0) lessonsCompleted++;
		if (stars >= 3) hasThreeStar = true;
	}
	let studyMinutes = 0;
	for (const rec of Object.values(d.days)) studyMinutes += rec.minutes;
	const t = d.days[todayKey()] ?? { minutes: 0, quizzes: 0, correct: 0 };
	return {
		progressMap: { ...d.progress },
		totalStars,
		lessonsCompleted,
		hasThreeStar,
		studyMinutes,
		today: { quizzes: t.quizzes, correct: t.correct, minutes: t.minutes },
	};
}

// Record one finished quiz: keep the best stars + add to today's study tally.
export function recordQuiz(r: {
	subjectId: string;
	lessonId: string;
	stars: number;
	correct: number;
	seconds: number;
}): void {
	const d = read();
	const key = `${r.subjectId}:${r.lessonId}`;
	d.progress[key] = Math.max(d.progress[key] ?? 0, r.stars);
	const tk = todayKey();
	const day = d.days[tk] ?? { minutes: 0, quizzes: 0, correct: 0 };
	day.minutes += Math.max(1, Math.round(r.seconds / 60));
	day.quizzes += 1;
	day.correct += Math.max(0, r.correct);
	d.days[tk] = day;
	write(d);
}

// Wipe all progress, study history and settings.
export function resetAll(): void {
	try {
		localStorage.removeItem(KEY);
	} catch {
		// ignore
	}
}
