// Quiz mini-games — Multiple Choice, Drag-Match, Timed Tap, Spelling, Fill-in-blank, Memory.
// Each game emits onAnswer(correct) when done; QuizRunner aggregates into a result.

import { useEffect, useState } from "react";
import { SFX } from "./audio";
import type { MatchPair, Question, Quiz, TapItem } from "./data";
import { HanziStrokes } from "./hanzi";
import { hasIcon, PicIcon } from "./icons";
import {
	BigButton,
	Card,
	Confetti,
	Heart,
	ProgressBar,
	SkyBackground,
	Star,
} from "./ui";

/* ---------- Multiple Choice ---------- */
function MCQuestion({
	question,
	onAnswer,
	qNum,
	qTotal,
}: {
	question: Question;
	onAnswer: (correct: boolean) => void;
	qNum: number;
	qTotal: number;
}) {
	// Retry mode: wrong choices lock out and a hint appears; the child keeps
	// trying until they find the right answer. We never reveal it for them.
	const [wrongIdxs, setWrongIdxs] = useState<number[]>([]);
	const [solved, setSolved] = useState(false);
	const choices = question.choices ?? [];
	const answer = question.answer as number;
	const showHint = !solved && wrongIdxs.length > 0;

	const pick = (i: number) => {
		if (solved || wrongIdxs.includes(i)) return;
		if (i === answer) {
			setSolved(true);
			SFX.correct();
			// Pass first-try correctness up for star scoring.
			const firstTry = wrongIdxs.length === 0;
			setTimeout(() => onAnswer(firstTry), 950);
		} else {
			SFX.wrong();
			setWrongIdxs((prev) => [...prev, i]);
		}
	};

	return (
		<div
			style={{
				textAlign: "center",
				padding: "16px clamp(12px, 4vw, 30px)",
				position: "relative",
				zIndex: 1,
			}}
		>
			{question.hanzi && (
				<div
					style={{
						marginBottom: 24,
						display: "flex",
						justifyContent: "center",
					}}
				>
					<HanziStrokes
						char={question.hanzi}
						allowAnimate={wrongIdxs.length > 0}
					/>
				</div>
			)}
			{question.image && (
				<div
					style={{
						marginBottom: 20,
						display: "flex",
						justifyContent: "center",
					}}
				>
					<div
						style={{
							width: "clamp(104px, 30vw, 150px)",
							height: "clamp(104px, 30vw, 150px)",
							borderRadius: 24,
							background: "#FFFFFF",
							border: "4px solid #1A2B4A",
							boxShadow: "0 6px 0 #1A2B4A",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<PicIcon name={question.image} size={96} />
					</div>
				</div>
			)}
			<div
				style={{
					background: "#FFFFFF",
					borderRadius: 24,
					padding: "clamp(18px, 5vw, 30px) clamp(20px, 6vw, 40px)",
					border: "4px solid #1A2B4A",
					boxShadow: "0 8px 0 #1A2B4A",
					marginBottom: "clamp(22px, 6vw, 36px)",
					display: "block",
					width: "100%",
					maxWidth: 560,
					margin: "0 auto clamp(22px, 6vw, 36px)",
					boxSizing: "border-box",
				}}
			>
				<div
					style={{
						fontSize: 14,
						color: "#7080A0",
						fontWeight: 700,
						marginBottom: 8,
					}}
				>
					第 {qNum} 题 / 共 {qTotal} 题
				</div>
				<div
					style={{
						fontSize: "clamp(22px, 5.5vw, 38px)",
						fontWeight: 800,
						color: "#1A2B4A",
						whiteSpace: "pre-line",
						lineHeight: 1.3,
					}}
				>
					{question.q}
				</div>
			</div>

			<div
				style={{
					display: "grid",
					gridTemplateColumns:
						"repeat(auto-fit, minmax(min(100%, 200px), 1fr))",
					gap: 16,
					maxWidth: 560,
					margin: "0 auto",
				}}
			>
				{choices.map((c, i) => {
					const isWrong = wrongIdxs.includes(i);
					const isSolvedCorrect = solved && i === answer;
					let bg = "#FFFFFF";
					let border = "#1A2B4A";
					let shadow = "#1A2B4A";
					let color = "#1A2B4A";
					if (isSolvedCorrect) {
						bg = "#A8E6A3";
						border = "#2D7A2D";
						shadow = "#2D7A2D";
						color = "#1A4A1A";
					} else if (isWrong) {
						bg = "#FFB6B6";
						border = "#C73E3E";
						shadow = "#C73E3E";
						color = "#5A1A1A";
					} else if (solved) {
						// Dim the untouched choices once the question is solved.
						bg = "#F0F0F0";
						color = "#999";
					}
					const locked = solved || isWrong;
					return (
						<button
							// biome-ignore lint/suspicious/noArrayIndexKey: fixed choice list
							key={i}
							type="button"
							onClick={() => pick(i)}
							disabled={locked}
							style={{
								background: bg,
								border: `4px solid ${border}`,
								color,
								padding: "clamp(16px, 4.5vw, 22px) clamp(16px, 4vw, 24px)",
								borderRadius: 20,
								fontSize: "clamp(18px, 4.6vw, 26px)",
								fontWeight: 800,
								cursor: locked ? "default" : "pointer",
								boxShadow: `0 6px 0 ${shadow}`,
								fontFamily: "inherit",
								transition: "all 200ms",
								transform: isSolvedCorrect ? "scale(1.05)" : "scale(1)",
								opacity: isWrong ? 0.7 : 1,
							}}
						>
							<span
								style={{
									display: "inline-block",
									minWidth: 28,
									height: 28,
									borderRadius: 14,
									background: isSolvedCorrect ? "#2D7A2D" : "#1A2B4A",
									color: "#FFF",
									fontSize: 16,
									marginRight: 12,
									lineHeight: "28px",
								}}
							>
								{String.fromCharCode(65 + i)}
							</span>
							{c}
							{isSolvedCorrect && <span style={{ marginLeft: 12 }}>✓</span>}
							{isWrong && <span style={{ marginLeft: 12 }}>✗</span>}
						</button>
					);
				})}
			</div>

			{/* Hint after a wrong try — encourage and explain, but don't give it away */}
			{showHint && (
				<div
					style={{
						maxWidth: 560,
						margin: "26px auto 0",
						background: "#FFF6D6",
						border: "4px solid #E5B53A",
						borderRadius: 18,
						boxShadow: "0 5px 0 #C99800",
						padding: "16px 22px",
						fontSize: 20,
						fontWeight: 700,
						color: "#6B4E00",
						lineHeight: 1.5,
						animation: "lc-pop 0.25s",
					}}
				>
					<span style={{ fontWeight: 900 }}>💡 再试一次！</span>{" "}
					{question.explain ?? "别急，仔细想一想，你一定可以的！"}
				</div>
			)}
		</div>
	);
}

/* ---------- Tap-to-match (works on touch + mouse) ---------- */
function MatchQuestion({
	question,
	onAnswer,
}: {
	question: Question;
	onAnswer: (correct: boolean) => void;
}) {
	const pairs = (question.pairs ?? []) as MatchPair[];
	const [shuffledRight] = useState(() => {
		const arr = pairs.map((p, i) => ({ text: p.right, originalIdx: i }));
		for (let i = arr.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[arr[i], arr[j]] = [arr[j], arr[i]];
		}
		return arr;
	});
	const [matches, setMatches] = useState<Record<number, number>>({});
	// The word the child has tapped and is holding (originalIdx), or null.
	const [selected, setSelected] = useState<number | null>(null);
	const [done, setDone] = useState(false);

	const usedRights = new Set(Object.values(matches));
	const allMatched = Object.keys(matches).length === pairs.length;

	// Grade only when the child taps 确认 — never auto-submit, so they can
	// review, undo and rearrange first.
	const confirm = () => {
		if (done || !allMatched) return;
		setDone(true);
		setSelected(null);
		const correct = Object.entries(matches).every(
			([l, r]) => Number(l) === Number(r),
		);
		if (correct) SFX.correct();
		else SFX.wrong();
		setTimeout(() => onAnswer(correct), 1500);
	};

	// Tap a word to pick it up (tap again to release).
	const pickWord = (originalIdx: number) => {
		if (done || usedRights.has(originalIdx)) return;
		SFX.tap();
		setSelected((cur) => (cur === originalIdx ? null : originalIdx));
	};

	// Tap a picture slot: drop the held word, or clear the slot if empty-handed.
	const placeAt = (leftIdx: number) => {
		if (done) return;
		if (selected == null) {
			if (matches[leftIdx] != null) {
				setMatches((prev) => {
					const next = { ...prev };
					delete next[leftIdx];
					return next;
				});
				SFX.pop();
			}
			return;
		}
		setMatches((prev) => {
			const next = { ...prev };
			for (const k of Object.keys(next)) {
				if (next[Number(k)] === selected) delete next[Number(k)];
			}
			next[leftIdx] = selected;
			return next;
		});
		SFX.pop();
		setSelected(null);
	};

	return (
		<div
			style={{
				padding: "16px clamp(12px, 4vw, 40px)",
				position: "relative",
				zIndex: 1,
			}}
		>
			<h2
				style={{
					textAlign: "center",
					fontSize: "clamp(20px, 5vw, 28px)",
					color: "#1A2B4A",
					marginBottom: 6,
				}}
			>
				把图片和单字配对起来
			</h2>
			<div
				style={{
					textAlign: "center",
					fontSize: "clamp(12px, 3.4vw, 15px)",
					color: "#7080A0",
					fontWeight: 700,
					marginBottom: 18,
				}}
			>
				👆 先点句子，再点图片放上去 · 点已放好的图片可以取消
			</div>
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "1fr 1fr",
					gap: "clamp(10px, 3.5vw, 40px)",
					maxWidth: 760,
					margin: "0 auto",
				}}
			>
				{/* Left: picture slots (tap to drop / clear) */}
				<div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
					{pairs.map((p, i) => {
						const matched = matches[i] != null;
						const correct = done && matches[i] === i;
						return (
							<button
								// biome-ignore lint/suspicious/noArrayIndexKey: fixed pair list
								key={i}
								type="button"
								onClick={() => placeAt(i)}
								disabled={done}
								style={{
									background: "#FFFFFF",
									border: `4px dashed ${
										matched
											? correct
												? "#2D7A2D"
												: done
													? "#C73E3E"
													: "#4A9EFF"
											: "#94B8E0"
									}`,
									borderRadius: 18,
									padding: "clamp(8px, 2.5vw, 14px)",
									minHeight: 64,
									display: "flex",
									alignItems: "center",
									gap: "clamp(8px, 2.5vw, 14px)",
									transition: "all 150ms",
									cursor: done ? "default" : "pointer",
									fontFamily: "inherit",
									textAlign: "left",
									width: "100%",
								}}
							>
								<div
									style={{
										width: "clamp(46px, 13vw, 60px)",
										height: "clamp(46px, 13vw, 60px)",
										flexShrink: 0,
										borderRadius: 14,
										background: "#F0F7FF",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										fontSize: "clamp(30px, 9vw, 44px)",
									}}
								>
									{hasIcon(p.left) ? (
										<PicIcon name={p.left} size={44} />
									) : (
										p.left
									)}
								</div>
								<div
									style={{
										flex: 1,
										fontSize: "clamp(13px, 3.6vw, 22px)",
										fontWeight: 700,
										color: matched ? "#1A2B4A" : "#94B8E0",
									}}
								>
									{matched ? pairs[matches[i]].right : "点这里 →"}
								</div>
								{matched && !done && (
									<span
										aria-hidden
										style={{
											flexShrink: 0,
											width: 26,
											height: 26,
											borderRadius: 13,
											background: "#FFE3E3",
											color: "#C73E3E",
											border: "2px solid #C73E3E",
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
											fontSize: 14,
											fontWeight: 900,
										}}
									>
										✕
									</span>
								)}
							</button>
						);
					})}
				</div>
				{/* Right: word cards (tap to pick up) */}
				<div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
					{shuffledRight.map((item) => {
						const used = usedRights.has(item.originalIdx);
						const isSel = selected === item.originalIdx;
						return (
							<button
								key={item.originalIdx}
								type="button"
								onClick={() => pickWord(item.originalIdx)}
								disabled={used || done}
								style={{
									background: used ? "#E8E8E8" : isSel ? "#FFEC99" : "#FFD93D",
									border: `4px solid ${used ? "#AAA" : isSel ? "#1A2B4A" : "#C99800"}`,
									boxShadow: used
										? "none"
										: isSel
											? "0 0 0 3px #FFD93D"
											: "0 4px 0 #C99800",
									transform: isSel ? "scale(1.03)" : "none",
									borderRadius: 18,
									padding: "clamp(12px, 3.5vw, 18px) clamp(10px, 3vw, 24px)",
									fontSize: "clamp(14px, 3.9vw, 24px)",
									fontWeight: 800,
									color: used ? "#999" : "#1A2B4A",
									textAlign: "center",
									cursor: used || done ? "default" : "pointer",
									opacity: used ? 0.5 : 1,
									userSelect: "none",
									fontFamily: "inherit",
									transition: "transform 120ms",
								}}
							>
								{item.text}
							</button>
						);
					})}
				</div>
			</div>

			{/* Confirm — appears once every picture has a sentence on it */}
			<div style={{ display: "flex", justifyContent: "center", marginTop: 26 }}>
				<button
					type="button"
					onClick={confirm}
					disabled={!allMatched || done}
					style={{
						padding: "14px clamp(28px, 9vw, 48px)",
						borderRadius: 18,
						border: "4px solid #1A2B4A",
						background: allMatched && !done ? "#4ECDC4" : "#E0E0E0",
						boxShadow:
							allMatched && !done ? "0 6px 0 #2A8E89" : "0 6px 0 #B5B5B5",
						color: "#1A2B4A",
						fontSize: "clamp(18px, 4.6vw, 24px)",
						fontWeight: 800,
						fontFamily: "inherit",
						cursor: allMatched && !done ? "pointer" : "default",
						transition: "all 150ms",
					}}
				>
					{done ? "✓ 已确认" : allMatched ? "✓ 确认答案" : "把图片都配对好"}
				</button>
			</div>
		</div>
	);
}

/* ---------- Fill in the blank ---------- */
function FillQuestion({
	question,
	onAnswer,
	qNum,
	qTotal,
}: {
	question: Question;
	onAnswer: (correct: boolean) => void;
	qNum: number;
	qTotal: number;
}) {
	const [val, setVal] = useState("");
	const [solved, setSolved] = useState(false);
	const [attempts, setAttempts] = useState(0);
	const answer = String(question.answer);
	const isRight = val.trim().toLowerCase() === answer.toLowerCase();
	const showHint = !solved && attempts > 0;

	const submit = () => {
		if (!val.trim() || solved) return;
		if (isRight) {
			setSolved(true);
			SFX.correct();
			const firstTry = attempts === 0;
			setTimeout(() => onAnswer(firstTry), 950);
		} else {
			SFX.wrong();
			setAttempts((a) => a + 1);
		}
	};

	return (
		<div
			style={{
				textAlign: "center",
				padding: 30,
				position: "relative",
				zIndex: 1,
			}}
		>
			<div
				style={{
					background: "#FFFFFF",
					borderRadius: 24,
					padding: "34px 50px",
					border: "4px solid #1A2B4A",
					boxShadow: "0 8px 0 #1A2B4A",
					marginBottom: 30,
					display: "inline-block",
					maxWidth: 600,
				}}
			>
				<div
					style={{
						fontSize: 14,
						color: "#7080A0",
						fontWeight: 700,
						marginBottom: 8,
					}}
				>
					第 {qNum} 题 / 共 {qTotal} 题
				</div>
				<div
					style={{
						fontSize: 30,
						fontWeight: 800,
						color: "#1A2B4A",
						whiteSpace: "pre-line",
						lineHeight: 1.4,
					}}
				>
					{question.q}
				</div>
			</div>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					gap: 12,
					alignItems: "center",
					flexWrap: "wrap",
				}}
			>
				<input
					value={val}
					onChange={(e) => setVal(e.target.value)}
					disabled={solved}
					onKeyDown={(e) => e.key === "Enter" && submit()}
					placeholder="写答案"
					style={{
						fontSize: 32,
						fontWeight: 800,
						padding: "14px 26px",
						border: `4px solid ${solved ? "#2D7A2D" : showHint ? "#C73E3E" : "#1A2B4A"}`,
						borderRadius: 18,
						width: 200,
						textAlign: "center",
						background: solved ? "#E0F5E0" : showHint ? "#FFE5E5" : "#FFF",
						color: "#1A2B4A",
						fontFamily: "inherit",
						outline: "none",
					}}
				/>
				<BigButton
					color="#4ECDC4"
					shadow="#2A8E89"
					onClick={submit}
					disabled={!val.trim() || solved}
				>
					确认 ✓
				</BigButton>
			</div>
			{showHint && (
				<div
					style={{
						maxWidth: 560,
						margin: "22px auto 0",
						background: "#FFF6D6",
						border: "4px solid #E5B53A",
						borderRadius: 18,
						boxShadow: "0 5px 0 #C99800",
						padding: "16px 22px",
						fontSize: 20,
						fontWeight: 700,
						color: "#6B4E00",
						lineHeight: 1.5,
						animation: "lc-pop 0.25s",
					}}
				>
					<span style={{ fontWeight: 900 }}>💡 再试一次！</span>{" "}
					{question.explain ?? "答案不对哦，再想一想，你可以的！"}
				</div>
			)}
		</div>
	);
}

/* ---------- Spell the word ---------- */
function SpellQuestion({
	question,
	onAnswer,
}: {
	question: Question;
	onAnswer: (correct: boolean) => void;
}) {
	const word = (question.word ?? "").toUpperCase();
	const [picked, setPicked] = useState<{ id: number; letter: string }[]>([]);
	const [revealed, setRevealed] = useState(false);

	const [bank] = useState(() => {
		const letters = word.split("");
		const extras = ["R", "S", "O", "T", "M"]
			.filter((l) => !letters.includes(l))
			.slice(0, 3);
		const all = [...letters, ...extras];
		for (let i = all.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[all[i], all[j]] = [all[j], all[i]];
		}
		return all.map((l, i) => ({ id: i, letter: l }));
	});

	const pickedIds = new Set(picked.map((p) => p.id));
	const guessNow = picked.map((x) => x.letter).join("");

	const addLetter = (item: { id: number; letter: string }) => {
		if (revealed || pickedIds.has(item.id)) return;
		SFX.tap();
		const next = [...picked, item];
		setPicked(next);
		if (next.length === word.length) {
			const guess = next.map((p) => p.letter).join("");
			const correct = guess === word;
			setRevealed(true);
			if (correct) SFX.correct();
			else SFX.wrong();
			setTimeout(() => onAnswer(correct), 1300);
		}
	};

	const removeLetter = (idx: number) => {
		if (revealed) return;
		setPicked(picked.filter((_, i) => i !== idx));
		SFX.tap();
	};

	return (
		<div
			style={{
				textAlign: "center",
				padding: 30,
				position: "relative",
				zIndex: 1,
			}}
		>
			<div style={{ fontSize: 80, marginBottom: 8 }}>{question.hint}</div>
			<h2 style={{ fontSize: 26, color: "#1A2B4A", marginBottom: 20 }}>
				把字母拼出来 →
			</h2>
			{/* Slots */}
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					gap: 10,
					marginBottom: 32,
					flexWrap: "wrap",
				}}
			>
				{Array.from(word).map((_, i) => {
					const p = picked[i];
					return (
						<div
							// biome-ignore lint/suspicious/noArrayIndexKey: fixed slot count
							key={i}
							onClick={() => p && removeLetter(i)}
							style={{
								width: 56,
								height: 70,
								borderRadius: 14,
								border: `4px solid ${revealed ? (guessNow === word ? "#2D7A2D" : "#C73E3E") : "#1A2B4A"}`,
								background: p ? "#FFD93D" : "#F0F7FF",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								fontSize: 38,
								fontWeight: 900,
								color: "#1A2B4A",
								boxShadow: p
									? "0 4px 0 #C99800"
									: "inset 0 3px 0 rgba(0,0,0,0.1)",
								cursor: p && !revealed ? "pointer" : "default",
							}}
						>
							{p ? p.letter : ""}
						</div>
					);
				})}
			</div>
			{/* Bank */}
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					gap: 10,
					flexWrap: "wrap",
					maxWidth: 500,
					margin: "0 auto",
				}}
			>
				{bank.map((item) => {
					const used = pickedIds.has(item.id);
					return (
						<button
							key={item.id}
							type="button"
							onClick={() => addLetter(item)}
							disabled={used || revealed}
							style={{
								width: 52,
								height: 52,
								borderRadius: 12,
								border: "3px solid #1A2B4A",
								background: used ? "#E0E0E0" : "#FFFFFF",
								color: used ? "#AAA" : "#1A2B4A",
								fontSize: 26,
								fontWeight: 800,
								cursor: used || revealed ? "default" : "pointer",
								boxShadow: used ? "none" : "0 4px 0 #1A2B4A",
								fontFamily: "inherit",
								transform: used ? "translateY(4px)" : "none",
							}}
						>
							{item.letter}
						</button>
					);
				})}
			</div>
		</div>
	);
}

/* ---------- Timed Tap-all ---------- */
function TapQuestion({
	question,
	onAnswer,
}: {
	question: Question;
	onAnswer: (correct: boolean) => void;
}) {
	const total = question.time || 12;
	const [time, setTime] = useState(total);
	const [tapped, setTapped] = useState<Record<number, "good" | "bad">>({});
	const [done, setDone] = useState(false);
	const [items] = useState<TapItem[]>(() => {
		const arr = [...(question.items ?? [])];
		for (let i = arr.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[arr[i], arr[j]] = [arr[j], arr[i]];
		}
		return arr;
	});
	const correctNeeded = items.filter((x) => x.correct).length;

	const finalize = (final: Record<number, "good" | "bad"> = tapped) => {
		const goods = Object.values(final).filter((v) => v === "good").length;
		const bads = Object.values(final).filter((v) => v === "bad").length;
		const won = goods === correctNeeded && bads === 0;
		if (won) SFX.correct();
		else SFX.wrong();
		setTimeout(() => onAnswer(won), 900);
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: countdown timer ticks on time/done
	useEffect(() => {
		if (done) return;
		if (time <= 0) {
			setDone(true);
			finalize();
			return;
		}
		const t = setTimeout(() => {
			setTime(time - 1);
			if (time <= 3) SFX.countdown();
		}, 1000);
		return () => clearTimeout(t);
	}, [time, done]);

	const tap = (i: number) => {
		if (done || tapped[i] != null) return;
		const item = items[i];
		setTapped((t) => ({ ...t, [i]: item.correct ? "good" : "bad" }));
		if (item.correct) SFX.star();
		else SFX.wrong();
		const newTapped = {
			...tapped,
			[i]: item.correct ? "good" : "bad",
		} as Record<number, "good" | "bad">;
		const goodCount = Object.values(newTapped).filter(
			(v) => v === "good",
		).length;
		if (goodCount >= correctNeeded) {
			setDone(true);
			setTimeout(() => finalize(newTapped), 600);
		}
	};

	return (
		<div
			style={{
				padding: 30,
				textAlign: "center",
				position: "relative",
				zIndex: 1,
			}}
		>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					maxWidth: 700,
					margin: "0 auto 16px",
				}}
			>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						gap: 12,
						fontSize: 24,
						fontWeight: 800,
						color: "#1A2B4A",
						textAlign: "left",
					}}
				>
					{question.image && (
						<div
							style={{
								width: 64,
								height: 64,
								borderRadius: 14,
								background: "#FFFFFF",
								border: "3px solid #1A2B4A",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								flexShrink: 0,
							}}
						>
							<PicIcon name={question.image} size={48} />
						</div>
					)}
					<span>{question.q}</span>
				</div>
				<div
					style={{
						background: time <= 3 ? "#FF6B6B" : "#1A2B4A",
						color: "#FFF",
						padding: "8px 18px",
						borderRadius: 18,
						fontSize: 26,
						fontWeight: 900,
						minWidth: 60,
						animation: time <= 3 ? "lc-shake 0.4s infinite" : "none",
					}}
				>
					⏱ {time}
				</div>
			</div>
			<div
				style={{
					display: "grid",
					gridTemplateColumns:
						"repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
					gap: 14,
					maxWidth: 700,
					margin: "0 auto",
				}}
			>
				{items.map((item, i) => {
					const state = tapped[i];
					let bg = "#FFFFFF";
					let border = "#1A2B4A";
					if (state === "good") {
						bg = "#A8E6A3";
						border = "#2D7A2D";
					}
					if (state === "bad") {
						bg = "#FFB6B6";
						border = "#C73E3E";
					}
					return (
						<button
							// biome-ignore lint/suspicious/noArrayIndexKey: fixed tap grid
							key={i}
							type="button"
							onClick={() => tap(i)}
							disabled={done || state != null}
							style={{
								background: bg,
								border: `4px solid ${border}`,
								padding: "clamp(14px, 3.5vw, 22px) clamp(12px, 3vw, 16px)",
								borderRadius: 18,
								fontSize: "clamp(15px, 4vw, 22px)",
								fontWeight: 800,
								color: "#1A2B4A",
								cursor: "pointer",
								boxShadow: `0 4px 0 ${border}`,
								fontFamily: "inherit",
								transform: state ? "scale(0.95)" : "scale(1)",
								transition: "all 150ms",
							}}
						>
							{item.label}
						</button>
					);
				})}
			</div>
		</div>
	);
}

/* ---------- Memory cards ---------- */
function MemoryQuestion({
	question,
	onAnswer,
}: {
	question: Question;
	onAnswer: (correct: boolean) => void;
}) {
	const items = (question.pairs ?? []) as string[];
	const [cards] = useState(() => {
		const arr = [...items, ...items].map((v, i) => ({ id: i, value: v }));
		for (let i = arr.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[arr[i], arr[j]] = [arr[j], arr[i]];
		}
		return arr;
	});
	const [flipped, setFlipped] = useState<number[]>([]);
	const [matched, setMatched] = useState<number[]>([]);
	const [moves, setMoves] = useState(0);

	const click = (id: number) => {
		if (flipped.length === 2) return;
		if (flipped.includes(id) || matched.includes(id)) return;
		const newFlipped = [...flipped, id];
		setFlipped(newFlipped);
		SFX.tap();
		if (newFlipped.length === 2) {
			setMoves((m) => m + 1);
			const a = cards.find((c) => c.id === newFlipped[0]);
			const b = cards.find((c) => c.id === newFlipped[1]);
			if (a && b && a.value === b.value) {
				setTimeout(() => {
					setMatched((m) => [...m, a.id, b.id]);
					setFlipped([]);
					SFX.star();
				}, 600);
			} else {
				setTimeout(() => setFlipped([]), 900);
			}
		}
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: completion check on matched count
	useEffect(() => {
		if (matched.length === cards.length && cards.length > 0) {
			SFX.correct();
			setTimeout(() => onAnswer(true), 800);
		}
	}, [matched, cards.length]);

	return (
		<div
			style={{
				padding: 20,
				textAlign: "center",
				position: "relative",
				zIndex: 1,
			}}
		>
			<h2 style={{ fontSize: 26, color: "#1A2B4A", marginBottom: 10 }}>
				翻一翻，找出一对一对的飞机！
			</h2>
			<div
				style={{
					fontSize: 16,
					color: "#7080A0",
					marginBottom: 20,
					fontWeight: 700,
				}}
			>
				步数: {moves}
			</div>
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(4, 1fr)",
					gap: 12,
					maxWidth: 500,
					margin: "0 auto",
				}}
			>
				{cards.map((card) => {
					const isUp = flipped.includes(card.id) || matched.includes(card.id);
					const isMatched = matched.includes(card.id);
					return (
						<div
							key={card.id}
							onClick={() => click(card.id)}
							style={{
								aspectRatio: "3/4",
								borderRadius: 16,
								cursor: "pointer",
								perspective: 1000,
							}}
						>
							<div
								style={{
									position: "relative",
									width: "100%",
									height: "100%",
									transformStyle: "preserve-3d",
									transition: "transform 400ms",
									transform: isUp ? "rotateY(180deg)" : "rotateY(0)",
								}}
							>
								{/* back */}
								<div
									style={{
										position: "absolute",
										inset: 0,
										backfaceVisibility: "hidden",
										background: "linear-gradient(135deg, #4A9EFF, #1F3A6E)",
										borderRadius: 14,
										border: "4px solid #1A2B4A",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										fontSize: 32,
										color: "#FFD93D",
										fontWeight: 900,
										boxShadow: "0 4px 0 #1A2B4A",
									}}
								>
									✈
								</div>
								{/* front */}
								<div
									style={{
										position: "absolute",
										inset: 0,
										backfaceVisibility: "hidden",
										background: isMatched ? "#A8E6A3" : "#FFD93D",
										borderRadius: 14,
										border: `4px solid ${isMatched ? "#2D7A2D" : "#C99800"}`,
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										fontSize: 22,
										fontWeight: 900,
										color: "#1A2B4A",
										transform: "rotateY(180deg)",
										boxShadow: isMatched
											? "0 4px 0 #2D7A2D"
											: "0 4px 0 #C99800",
									}}
								>
									{card.value}
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

/* ---------- Free writing (看图写话) ---------- */
// Open-ended: the child writes (here or on paper) guided by the tips. There is
// no right answer — a parent reviews the writing and awards stars at the end.
function WriteQuestion({
	question,
	value,
	onChange,
	onDone,
	qNum,
	qTotal,
}: {
	question: Question;
	value: string;
	onChange: (v: string) => void;
	onDone: () => void;
	qNum: number;
	qTotal: number;
}) {
	return (
		<div
			style={{
				textAlign: "center",
				padding: "16px clamp(12px, 4vw, 30px)",
				position: "relative",
				zIndex: 1,
			}}
		>
			{question.image && (
				<div
					style={{
						marginBottom: 20,
						display: "flex",
						justifyContent: "center",
					}}
				>
					<div
						style={{
							width: "clamp(104px, 30vw, 150px)",
							height: "clamp(104px, 30vw, 150px)",
							borderRadius: 24,
							background: "#FFFFFF",
							border: "4px solid #1A2B4A",
							boxShadow: "0 6px 0 #1A2B4A",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<PicIcon name={question.image} size={96} />
					</div>
				</div>
			)}
			<div
				style={{
					background: "#FFFFFF",
					borderRadius: 24,
					padding: "clamp(18px, 5vw, 30px) clamp(20px, 6vw, 36px)",
					border: "4px solid #1A2B4A",
					boxShadow: "0 8px 0 #1A2B4A",
					width: "100%",
					maxWidth: 560,
					margin: "0 auto clamp(20px, 5vw, 30px)",
					boxSizing: "border-box",
					textAlign: "left",
				}}
			>
				<div
					style={{
						fontSize: 14,
						color: "#7080A0",
						fontWeight: 700,
						marginBottom: 8,
						textAlign: "center",
					}}
				>
					第 {qNum} 题 / 共 {qTotal} 题
				</div>
				<div
					style={{
						fontSize: "clamp(20px, 5vw, 32px)",
						fontWeight: 800,
						color: "#1A2B4A",
						whiteSpace: "pre-line",
						lineHeight: 1.3,
						textAlign: "center",
					}}
				>
					{question.q}
				</div>

				{question.tips && question.tips.length > 0 && (
					<div
						style={{
							marginTop: 18,
							background: "#FFF8E7",
							border: "3px dashed #FFD93D",
							borderRadius: 16,
							padding: "14px 18px",
						}}
					>
						<div
							style={{
								fontSize: 15,
								fontWeight: 800,
								color: "#C99800",
								marginBottom: 10,
							}}
						>
							✍️ 写作小提示
						</div>
						<ul
							style={{
								margin: 0,
								paddingLeft: 20,
								display: "flex",
								flexDirection: "column",
								gap: 8,
							}}
						>
							{question.tips.map((tip) => (
								<li
									key={tip}
									style={{ fontSize: 16, lineHeight: 1.4, color: "#2D3F5E" }}
								>
									{tip}
								</li>
							))}
						</ul>
					</div>
				)}

				<textarea
					value={value}
					onChange={(e) => onChange(e.target.value)}
					placeholder="在这里写一写，也可以写在纸上～"
					rows={4}
					style={{
						width: "100%",
						marginTop: 18,
						fontSize: 18,
						fontWeight: 600,
						lineHeight: 1.6,
						padding: "12px 14px",
						border: "3px solid #1A2B4A",
						borderRadius: 14,
						fontFamily: "inherit",
						color: "#1A2B4A",
						outline: "none",
						resize: "vertical",
						boxSizing: "border-box",
					}}
				/>
			</div>

			<BigButton
				color="#4ECDC4"
				shadow="#2A8E89"
				onClick={() => {
					SFX.tap();
					onDone();
				}}
				size="lg"
			>
				写好了 →
			</BigButton>
		</div>
	);
}

// Shown after the child finishes a free-writing quiz. A parent reads the
// writing and taps a star rating, which becomes the lesson's score.
function ParentReview({
	quiz,
	answers,
	onRate,
	onRetry,
}: {
	quiz: Quiz;
	answers: string[];
	onRate: (stars: number) => void;
	onRetry: () => void;
}) {
	const ratings: { stars: number; label: string }[] = [
		{ stars: 1, label: "⭐ 加油" },
		{ stars: 2, label: "⭐⭐ 不错" },
		{ stars: 3, label: "⭐⭐⭐ 很棒" },
	];
	return (
		<div style={{ position: "absolute", inset: 0, overflow: "auto" }}>
			<SkyBackground />
			<div
				style={{
					position: "relative",
					zIndex: 1,
					maxWidth: 600,
					margin: "0 auto",
					padding: "24px clamp(14px, 4vw, 30px) 40px",
				}}
			>
				<h1
					style={{
						textAlign: "center",
						fontSize: "clamp(24px, 6vw, 34px)",
						color: "#1A2B4A",
						margin: "0 0 6px",
						fontFamily: '"ZCOOL KuaiLe", "Baloo 2", system-ui',
					}}
				>
					请爸爸妈妈看一看 👀
				</h1>
				<p
					style={{
						textAlign: "center",
						fontSize: 15,
						fontWeight: 700,
						color: "#4A6080",
						margin: "0 0 22px",
					}}
				>
					看图写话没有标准答案，请家长读一读孩子写的，再给个鼓励的星星。
				</p>

				{quiz.questions.map((q, i) => (
					<div
						key={q.image ?? i}
						style={{
							background: "#FFFFFF",
							borderRadius: 18,
							border: "3px solid #1A2B4A",
							boxShadow: "0 5px 0 #1A2B4A",
							padding: "16px 18px",
							marginBottom: 16,
						}}
					>
						<div
							style={{
								fontSize: 15,
								fontWeight: 800,
								color: "#7080A0",
								marginBottom: 8,
								whiteSpace: "pre-line",
							}}
						>
							{q.q}
						</div>
						<div
							style={{
								fontSize: 18,
								fontWeight: 600,
								lineHeight: 1.6,
								color: answers[i]?.trim() ? "#1A2B4A" : "#9AA7BE",
								whiteSpace: "pre-wrap",
								background: "#F5F7FB",
								borderRadius: 12,
								padding: "12px 14px",
								minHeight: 40,
							}}
						>
							{answers[i]?.trim() || "（写在纸上了）"}
						</div>
					</div>
				))}

				<div
					style={{
						fontSize: 16,
						fontWeight: 800,
						color: "#1A2B4A",
						textAlign: "center",
						margin: "20px 0 12px",
					}}
				>
					给孩子的作品评分：
				</div>
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						flexWrap: "wrap",
						gap: 12,
						marginBottom: 18,
					}}
				>
					{ratings.map((r) => (
						<BigButton
							key={r.stars}
							color="#FFD93D"
							shadow="#C99800"
							onClick={() => {
								SFX.badge();
								onRate(r.stars);
							}}
						>
							{r.label}
						</BigButton>
					))}
				</div>
				<div style={{ display: "flex", justifyContent: "center" }}>
					<BigButton color="#FFFFFF" shadow="#1A2B4A" onClick={onRetry}>
						让孩子再写一次
					</BigButton>
				</div>
			</div>
		</div>
	);
}

/* ---------- Wrapper that runs through a quiz ---------- */
export interface QuizResult {
	stars: number;
	correct: number;
	total: number;
	seconds: number;
}

export function QuizRunner({
	quiz,
	onExit,
	onComplete,
}: {
	quiz: Quiz;
	onExit: () => void;
	onComplete: (result: QuizResult) => void;
}) {
	const [qIdx, setQIdx] = useState(0);
	const [correct, setCorrect] = useState(0);
	const [hearts, setHearts] = useState(3);
	const [showResult, setShowResult] = useState(false);
	const [startedAt, setStartedAt] = useState(() => Date.now());

	const total = quiz.questions.length;
	const q = quiz.questions[qIdx];

	// A free-writing quiz (看图写话) isn't auto-graded: no hearts, no first-try
	// scoring — the child writes, then a parent awards the stars at the end.
	const isWriting = quiz.questions.every((qq) => qq.type === "write");
	const [answers, setAnswers] = useState<string[]>(() =>
		quiz.questions.map(() => ""),
	);

	// Advance through a writing quiz without any correct/wrong scoring.
	const advanceWrite = () => {
		if (qIdx + 1 >= total) {
			setShowResult(true);
			SFX.badge();
		} else {
			setQIdx(qIdx + 1);
		}
	};

	// `firstTry` is true when the child got it right with no wrong attempts.
	// In retry mode they always reach the answer, so we never end early on
	// hearts — every question gets finished. Hearts are a gentle "first-try"
	// meter and stars reflect how many were nailed on the first go.
	const next = (firstTry: boolean) => {
		if (firstTry) setCorrect((c) => c + 1);
		else setHearts((h) => Math.max(0, h - 1));
		if (qIdx + 1 >= total) {
			setTimeout(() => {
				setShowResult(true);
				SFX.badge();
			}, 250);
		} else {
			setQIdx(qIdx + 1);
		}
	};

	if (showResult && isWriting) {
		const seconds = Math.round((Date.now() - startedAt) / 1000);
		return (
			<ParentReview
				quiz={quiz}
				answers={answers}
				onRate={(stars) =>
					onComplete({ stars, correct: total, total, seconds })
				}
				onRetry={() => {
					setQIdx(0);
					setAnswers(quiz.questions.map(() => ""));
					setStartedAt(Date.now());
					setShowResult(false);
				}}
			/>
		);
	}

	if (showResult) {
		const stars =
			correct === total ? 3 : correct >= total * 0.6 ? 2 : correct >= 1 ? 1 : 0;
		const seconds = Math.round((Date.now() - startedAt) / 1000);
		return (
			<ResultScreen
				correct={correct}
				total={total}
				stars={stars}
				onExit={() => onComplete({ stars, correct, total, seconds })}
				onRetry={() => {
					setQIdx(0);
					setCorrect(0);
					setHearts(3);
					setStartedAt(Date.now());
					setShowResult(false);
				}}
				quiz={quiz}
			/>
		);
	}

	return (
		<div style={{ position: "absolute", inset: 0, overflow: "auto" }}>
			<SkyBackground />
			{/* Top bar */}
			<div
				style={{
					position: "relative",
					zIndex: 2,
					padding: 18,
					display: "flex",
					alignItems: "center",
					gap: 14,
				}}
			>
				<button
					type="button"
					onClick={onExit}
					style={{
						background: "#FFF",
						border: "3px solid #1A2B4A",
						borderRadius: 14,
						padding: "8px 14px",
						fontSize: 18,
						fontWeight: 800,
						cursor: "pointer",
						boxShadow: "0 4px 0 #1A2B4A",
						fontFamily: "inherit",
					}}
				>
					✕
				</button>
				<div style={{ flex: 1, maxWidth: 500 }}>
					<ProgressBar value={qIdx / total} color="#4ECDC4" height={18} />
				</div>
				{isWriting ? (
					<span style={{ fontSize: 26 }}>✍️</span>
				) : (
					<div style={{ display: "flex", gap: 4 }}>
						{[0, 1, 2].map((i) => (
							<span key={i} style={{ opacity: i < hearts ? 1 : 0.2 }}>
								<Heart size={28} />
							</span>
						))}
					</div>
				)}
			</div>

			{q.type === "write" && (
				<WriteQuestion
					key={qIdx}
					question={q}
					value={answers[qIdx]}
					onChange={(v) =>
						setAnswers((prev) => {
							const copy = [...prev];
							copy[qIdx] = v;
							return copy;
						})
					}
					onDone={advanceWrite}
					qNum={qIdx + 1}
					qTotal={total}
				/>
			)}
			{q.type === "mc" && (
				<MCQuestion
					key={qIdx}
					question={q}
					onAnswer={next}
					qNum={qIdx + 1}
					qTotal={total}
				/>
			)}
			{q.type === "match" && (
				<MatchQuestion key={qIdx} question={q} onAnswer={next} />
			)}
			{q.type === "fill" && (
				<FillQuestion
					key={qIdx}
					question={q}
					onAnswer={next}
					qNum={qIdx + 1}
					qTotal={total}
				/>
			)}
			{q.type === "spell" && (
				<SpellQuestion key={qIdx} question={q} onAnswer={next} />
			)}
			{q.type === "tap" && (
				<TapQuestion key={qIdx} question={q} onAnswer={next} />
			)}
			{q.type === "memory" && (
				<MemoryQuestion key={qIdx} question={q} onAnswer={next} />
			)}
		</div>
	);
}

function ResultScreen({
	correct,
	total,
	stars,
	onExit,
	onRetry,
	quiz,
}: {
	correct: number;
	total: number;
	stars: number;
	onExit: () => void;
	onRetry: () => void;
	quiz: Quiz;
}) {
	const won = stars >= 2;
	return (
		<div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
			<SkyBackground />
			<Confetti run={won} />
			<div
				style={{
					position: "relative",
					zIndex: 1,
					height: "100%",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					padding: 40,
					textAlign: "center",
				}}
			>
				<div style={{ fontSize: 60, marginBottom: 8 }}>{won ? "🎉" : "💪"}</div>
				<h1
					style={{
						fontSize: 52,
						color: "#1A2B4A",
						margin: 0,
						fontFamily: '"ZCOOL KuaiLe", "Baloo 2", system-ui',
						textShadow: "3px 3px 0 #FFD93D",
					}}
				>
					{won ? "任务完成！" : "再试一次！"}
				</h1>
				<p
					style={{
						fontSize: 22,
						color: "#2D3F5E",
						marginTop: 8,
						marginBottom: 24,
					}}
				>
					{won ? `你完成了 "${quiz.title}"` : "不要放弃，下次更好！"}
				</p>
				{/* Stars */}
				<div style={{ display: "flex", gap: 18, marginBottom: 28 }}>
					{[0, 1, 2].map((i) => (
						<div
							key={i}
							style={{
								animation: `lc-pop 0.4s ${i * 0.2}s both`,
								opacity: i < stars ? 1 : 0.25,
							}}
						>
							<Star size={72} color={i < stars ? "#FFD93D" : "#CCC"} />
						</div>
					))}
				</div>
				{/* Stats */}
				<div style={{ display: "flex", gap: 16, marginBottom: 36 }}>
					<Card
						style={{ padding: "14px 24px", textAlign: "center", minWidth: 130 }}
						bg="#FFFFFF"
						accent="#4ECDC4"
					>
						<div style={{ fontSize: 14, color: "#7080A0", fontWeight: 700 }}>
							答对
						</div>
						<div style={{ fontSize: 32, fontWeight: 900, color: "#1A2B4A" }}>
							{correct}/{total}
						</div>
					</Card>
					<Card
						style={{ padding: "14px 24px", textAlign: "center", minWidth: 130 }}
						bg="#FFFFFF"
						accent="#FFD93D"
					>
						<div style={{ fontSize: 14, color: "#7080A0", fontWeight: 700 }}>
							获得 ⭐
						</div>
						<div style={{ fontSize: 32, fontWeight: 900, color: "#1A2B4A" }}>
							+{correct * 10}
						</div>
					</Card>
					<Card
						style={{ padding: "14px 24px", textAlign: "center", minWidth: 130 }}
						bg="#FFFFFF"
						accent="#FF6B6B"
					>
						<div style={{ fontSize: 14, color: "#7080A0", fontWeight: 700 }}>
							飞行时数
						</div>
						<div style={{ fontSize: 32, fontWeight: 900, color: "#1A2B4A" }}>
							+5
						</div>
					</Card>
				</div>
				<div style={{ display: "flex", gap: 16 }}>
					<BigButton
						color="#FFF"
						shadow="#1A2B4A"
						onClick={onRetry}
						size="lg"
						style={{ color: "#1A2B4A", border: "3px solid #1A2B4A" }}
					>
						再玩一次
					</BigButton>
					<BigButton
						color="#4ECDC4"
						shadow="#2A8E89"
						onClick={onExit}
						size="lg"
					>
						继续 →
					</BigButton>
				</div>
			</div>
		</div>
	);
}
