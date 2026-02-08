/**
 * 音频系统 — 提醒音效 + 专注背景音
 * 使用 Web Audio API 生成所有声音，无需外部音频文件
 * 通过 GainNode 实现独立音量控制
 */
import type { SoundType, TickType } from '../types';

let audioCtx: AudioContext | null = null;
let alertGain: GainNode | null = null;  // 提醒音量控制节点
let tickGain: GainNode | null = null;   // 背景音量控制节点

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  return audioCtx;
}

/** 获取提醒音的音量控制节点 */
function getAlertGain(): GainNode {
  const ctx = getAudioContext();
  if (!alertGain) {
    alertGain = ctx.createGain();
    alertGain.connect(ctx.destination);
  }
  return alertGain;
}

/** 获取背景音的音量控制节点 */
function getTickGain(): GainNode {
  const ctx = getAudioContext();
  if (!tickGain) {
    tickGain = ctx.createGain();
    tickGain.connect(ctx.destination);
  }
  return tickGain;
}

/** 设置提醒音量 (0-100) */
export function setAlertVolume(vol: number): void {
  const gain = getAlertGain();
  gain.gain.setValueAtTime(vol / 100, getAudioContext().currentTime);
}

/** 设置背景音量 (0-100) */
export function setTickVolume(vol: number): void {
  const gain = getTickGain();
  gain.gain.setValueAtTime(vol / 100, getAudioContext().currentTime);
}

// ─── 提醒音效 ───

/** 和弦音效 — C5-E5-G5 琶音，可重复延长 */
function playChime(durationSec: number): void {
  const ctx = getAudioContext();
  const dest = getAlertGain();
  const repeats = Math.max(1, Math.ceil(durationSec / 1));

  for (let r = 0; r < repeats; r++) {
    const offset = r * 1.0;
    const frequencies = [523.25, 659.25, 783.99];
    const startTimes = [0, 0.15, 0.3];
    frequencies.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + offset);
      gain.gain.setValueAtTime(0, ctx.currentTime + offset + startTimes[i]);
      gain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + offset + startTimes[i] + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + offset + startTimes[i] + 0.5);
      osc.connect(gain);
      gain.connect(dest);
      osc.start(ctx.currentTime + offset + startTimes[i]);
      osc.stop(ctx.currentTime + offset + startTimes[i] + 0.5);
    });
  }
}

/** 铃声音效 — A5 基频 + 泛音 */
function playBell(durationSec: number): void {
  const ctx = getAudioContext();
  const dest = getAlertGain();
  const repeats = Math.max(1, Math.ceil(durationSec / 1.5));

  for (let r = 0; r < repeats; r++) {
    const offset = r * 1.5;
    const now = ctx.currentTime + offset;
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(880, now);
    gain1.gain.setValueAtTime(0.35, now);
    gain1.gain.exponentialRampToValueAtTime(0.01, now + 1.2);
    osc1.connect(gain1); gain1.connect(dest);
    osc1.start(now); osc1.stop(now + 1.2);

    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(2640, now);
    gain2.gain.setValueAtTime(0.12, now);
    gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.6);
    osc2.connect(gain2); gain2.connect(dest);
    osc2.start(now); osc2.stop(now + 0.6);
  }
}

/** 自然音效 — 带通滤波白噪声 + 柔和正弦波 */
function playNature(durationSec: number): void {
  const ctx = getAudioContext();
  const dest = getAlertGain();
  const now = ctx.currentTime;
  const dur = Math.max(1, durationSec);

  const bufferSize = Math.floor(ctx.sampleRate * dur);
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * 0.3;
  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(800, now);
  filter.Q.setValueAtTime(0.5, now);
  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(0, now);
  noiseGain.gain.linearRampToValueAtTime(0.12, now + 0.2);
  noiseGain.gain.setValueAtTime(0.12, now + dur - 0.3);
  noiseGain.gain.linearRampToValueAtTime(0, now + dur);
  noise.connect(filter); filter.connect(noiseGain); noiseGain.connect(dest);
  noise.start(now); noise.stop(now + dur);

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(440, now);
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.15, now + 0.15);
  gain.gain.exponentialRampToValueAtTime(0.01, now + Math.min(dur, 1.2));
  osc.connect(gain); gain.connect(dest);
  osc.start(now); osc.stop(now + Math.min(dur, 1.2));
}

export function playNotificationSound(sound: SoundType = 'chime', durationSec: number = 3): void {
  try {
    switch (sound) {
      case 'chime': playChime(durationSec); break;
      case 'bell': playBell(durationSec); break;
      case 'nature': playNature(durationSec); break;
    }
  } catch { /* Audio not available */ }
}

// ─── 专注背景音（Tick-Tock）───

let tickInterval: ReturnType<typeof setInterval> | null = null;

/** 经典钟摆 — 频率下滑的短脉冲 */
function tickClassic(): void {
  const ctx = getAudioContext();
  const dest = getTickGain();
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(800, now);
  osc.frequency.exponentialRampToValueAtTime(400, now + 0.03);
  gain.gain.setValueAtTime(0.08, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
  osc.connect(gain); gain.connect(dest);
  osc.start(now); osc.stop(now + 0.06);
}

/** 轻柔滴答 — 高频短脉冲 */
function tickSoft(): void {
  const ctx = getAudioContext();
  const dest = getTickGain();
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(1200, now);
  gain.gain.setValueAtTime(0.04, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
  osc.connect(gain); gain.connect(dest);
  osc.start(now); osc.stop(now + 0.04);
}

/** 机械钟表 — 方波 + 共振泛音 */
function tickMechanical(): void {
  const ctx = getAudioContext();
  const dest = getTickGain();
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'square';
  osc.frequency.setValueAtTime(600, now);
  osc.frequency.exponentialRampToValueAtTime(200, now + 0.02);
  gain.gain.setValueAtTime(0.06, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
  osc.connect(gain); gain.connect(dest);
  osc.start(now); osc.stop(now + 0.04);

  const osc2 = ctx.createOscillator();
  const gain2 = ctx.createGain();
  osc2.type = 'sine';
  osc2.frequency.setValueAtTime(1500, now + 0.01);
  gain2.gain.setValueAtTime(0.02, now + 0.01);
  gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
  osc2.connect(gain2); gain2.connect(dest);
  osc2.start(now + 0.01); osc2.stop(now + 0.05);
}

/** 木质钟声 — 带通滤波噪声脉冲（模拟木头敲击） */
function tickWooden(): void {
  const ctx = getAudioContext();
  const dest = getTickGain();
  const now = ctx.currentTime;
  const bufferSize = Math.floor(ctx.sampleRate * 0.03);
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.2));
  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(1000, now);
  filter.Q.setValueAtTime(2, now);
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.12, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
  noise.connect(filter); filter.connect(gain); gain.connect(dest);
  noise.start(now); noise.stop(now + 0.05);
}

const TICK_FUNCTIONS: Record<Exclude<TickType, 'none'>, () => void> = {
  classic: tickClassic, soft: tickSoft, mechanical: tickMechanical, wooden: tickWooden,
};

/** 开始播放背景滴答声（每秒一次） */
export function startTickSound(type: TickType): void {
  stopTickSound();
  if (type === 'none') return;
  const fn = TICK_FUNCTIONS[type];
  if (!fn) return;
  fn();
  tickInterval = setInterval(fn, 1000);
}

/** 停止背景滴答声 */
export function stopTickSound(): void {
  if (tickInterval) { clearInterval(tickInterval); tickInterval = null; }
}

/** 试听滴答声（播放 3 下） */
export function previewTickSound(type: TickType): void {
  if (type === 'none') return;
  const fn = TICK_FUNCTIONS[type];
  if (!fn) return;
  fn(); setTimeout(fn, 500); setTimeout(fn, 1000);
}

// ─── 浏览器通知 ───

export function requestNotificationPermission(): void {
  if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
  }
}

export function sendNotification(title: string, body: string, sound: SoundType = 'chime', durationSec: number = 3): void {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(title, { body });
  }
  playNotificationSound(sound, durationSec);
}
