// Web Audio sound effects for Little Captain Academy.
// All sounds are synthesized — no asset files needed. Browser-only: every
// public function no-ops on the server or when sound is toggled off.

let ctx: AudioContext | null = null;
let enabled = true;

export function setSoundEnabled(value: boolean) {
	enabled = value;
}

function getCtx(): AudioContext | null {
	if (typeof window === "undefined") return null;
	if (!ctx) {
		try {
			const Ctor =
				window.AudioContext ||
				(window as unknown as { webkitAudioContext: typeof AudioContext })
					.webkitAudioContext;
			ctx = new Ctor();
		} catch {
			return null;
		}
	}
	if (ctx && ctx.state === "suspended") ctx.resume();
	return ctx;
}

interface ToneOptions {
	freq?: number;
	type?: OscillatorType;
	dur?: number;
	vol?: number;
	attack?: number;
	release?: number;
	slide?: number;
}

function tone({
	freq = 440,
	type = "sine",
	dur = 0.15,
	vol = 0.18,
	attack = 0.005,
	release = 0.05,
	slide = 0,
}: ToneOptions) {
	const ac = getCtx();
	if (!ac) return;
	const t0 = ac.currentTime;
	const osc = ac.createOscillator();
	const gain = ac.createGain();
	osc.type = type;
	osc.frequency.setValueAtTime(freq, t0);
	if (slide)
		osc.frequency.exponentialRampToValueAtTime(
			Math.max(40, freq + slide),
			t0 + dur,
		);
	gain.gain.setValueAtTime(0, t0);
	gain.gain.linearRampToValueAtTime(vol, t0 + attack);
	gain.gain.linearRampToValueAtTime(vol * 0.7, t0 + dur - release);
	gain.gain.linearRampToValueAtTime(0, t0 + dur);
	osc.connect(gain).connect(ac.destination);
	osc.start(t0);
	osc.stop(t0 + dur + 0.02);
}

function noise({ dur = 0.2, vol = 0.15, hp = 800 } = {}) {
	const ac = getCtx();
	if (!ac) return;
	const t0 = ac.currentTime;
	const buf = ac.createBuffer(1, ac.sampleRate * dur, ac.sampleRate);
	const ch = buf.getChannelData(0);
	for (let i = 0; i < ch.length; i++)
		ch[i] = (Math.random() * 2 - 1) * (1 - i / ch.length);
	const src = ac.createBufferSource();
	src.buffer = buf;
	const filter = ac.createBiquadFilter();
	filter.type = "highpass";
	filter.frequency.value = hp;
	const gain = ac.createGain();
	gain.gain.setValueAtTime(vol, t0);
	gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
	src.connect(filter).connect(gain).connect(ac.destination);
	src.start(t0);
}

function guard(fn: () => void) {
	return () => {
		if (!enabled) return;
		fn();
	};
}

export const SFX = {
	tap: guard(() => tone({ freq: 600, type: "triangle", dur: 0.06, vol: 0.12 })),
	pop: guard(() =>
		tone({ freq: 800, type: "sine", dur: 0.08, vol: 0.18, slide: 200 }),
	),
	correct: guard(() => {
		tone({ freq: 660, type: "triangle", dur: 0.1, vol: 0.18 });
		setTimeout(
			() => tone({ freq: 880, type: "triangle", dur: 0.12, vol: 0.2 }),
			90,
		);
		setTimeout(
			() => tone({ freq: 1175, type: "triangle", dur: 0.16, vol: 0.22 }),
			200,
		);
	}),
	wrong: guard(() => {
		tone({ freq: 280, type: "sawtooth", dur: 0.14, vol: 0.16, slide: -80 });
		setTimeout(
			() =>
				tone({ freq: 200, type: "sawtooth", dur: 0.18, vol: 0.14, slide: -60 }),
			120,
		);
	}),
	star: guard(() => {
		tone({ freq: 1320, type: "triangle", dur: 0.08, vol: 0.16 });
		setTimeout(
			() => tone({ freq: 1760, type: "triangle", dur: 0.1, vol: 0.16 }),
			60,
		);
	}),
	takeoff: guard(() => {
		tone({ freq: 120, type: "sawtooth", dur: 0.6, vol: 0.12, slide: 400 });
		noise({ dur: 0.5, vol: 0.06, hp: 400 });
	}),
	badge: guard(() => {
		tone({ freq: 523, type: "triangle", dur: 0.12, vol: 0.18 });
		setTimeout(
			() => tone({ freq: 659, type: "triangle", dur: 0.12, vol: 0.18 }),
			110,
		);
		setTimeout(
			() => tone({ freq: 784, type: "triangle", dur: 0.14, vol: 0.2 }),
			220,
		);
		setTimeout(
			() => tone({ freq: 1047, type: "triangle", dur: 0.25, vol: 0.22 }),
			340,
		);
	}),
	whoosh: guard(() => noise({ dur: 0.3, vol: 0.1, hp: 1200 })),
	countdown: guard(() =>
		tone({ freq: 440, type: "square", dur: 0.08, vol: 0.1 }),
	),
};
