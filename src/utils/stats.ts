/**
 * 统计工具函数 — 打卡计算、按天分组、汇总
 */
import type { PomodoroRecord } from '../types';

/** 获取 YYYY-MM-DD 格式的日期字符串 */
export function formatDateKey(date: Date): string {
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
}

/** 按天分组记录，返回 Map<dateKey, records[]> */
export function groupByDate(records: PomodoroRecord[]): Map<string, PomodoroRecord[]> {
  const map = new Map<string, PomodoroRecord[]>();
  for (const r of records) {
    const key = r.date;
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(r);
  }
  return map;
}

/** 获取某天的总专注分钟数 */
export function getDayMinutes(records: PomodoroRecord[], dateKey: string): number {
  return records
    .filter((r) => r.date === dateKey)
    .reduce((sum, r) => sum + (r.durationMinutes || 25), 0);
}

/** 获取最近 N 天的日期 key 列表（从今天往前） */
export function getRecentDays(n: number): string[] {
  const days: string[] = [];
  const now = new Date();
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    days.push(formatDateKey(d));
  }
  return days;
}

/** 获取某个月的所有日期 */
export function getMonthDays(year: number, month: number): Date[] {
  const days: Date[] = [];
  const d = new Date(year, month, 1);
  while (d.getMonth() === month) {
    days.push(new Date(d));
    d.setDate(d.getDate() + 1);
  }
  return days;
}

/** 计算连续打卡天数（从今天/昨天往前数） */
export function getStreak(records: PomodoroRecord[]): { current: number; longest: number } {
  const dateSet = new Set(records.map((r) => r.date));
  const today = formatDateKey(new Date());
  const yesterday = formatDateKey(new Date(Date.now() - 86400000));

  // Current streak: start from today or yesterday
  let current = 0;
  let startDate: Date;
  if (dateSet.has(today)) {
    startDate = new Date();
  } else if (dateSet.has(yesterday)) {
    startDate = new Date(Date.now() - 86400000);
  } else {
    // No streak
    startDate = new Date(); // won't enter loop
    current = 0;
  }

  if (dateSet.has(today) || dateSet.has(yesterday)) {
    const d = new Date(startDate);
    while (dateSet.has(formatDateKey(d))) {
      current++;
      d.setDate(d.getDate() - 1);
    }
  }

  // Longest streak: scan all dates sorted
  const sortedDates = Array.from(dateSet).sort();
  let longest = 0;
  let streak = 0;
  let prevDate: Date | null = null;

  for (const dateStr of sortedDates) {
    const [y, m, day] = dateStr.split('-').map(Number);
    const date = new Date(y, m - 1, day);
    if (prevDate) {
      const diff = (date.getTime() - prevDate.getTime()) / 86400000;
      if (Math.abs(diff - 1) < 0.01) {
        streak++;
      } else {
        streak = 1;
      }
    } else {
      streak = 1;
    }
    longest = Math.max(longest, streak);
    prevDate = date;
  }

  return { current, longest };
}

/** 汇总统计 */
export function getSummary(records: PomodoroRecord[]) {
  const now = new Date();
  const todayKey = formatDateKey(now);

  // 本周（周一开始）
  const dayOfWeek = now.getDay() || 7; // 0=Sun → 7
  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - dayOfWeek + 1);
  const weekStartKey = formatDateKey(weekStart);

  // 本月
  const monthStartKey = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-01`;

  let weekMinutes = 0;
  let monthMinutes = 0;
  let totalMinutes = 0;
  let totalCount = 0;
  let todayMinutes = 0;
  let todayCount = 0;

  for (const r of records) {
    const mins = r.durationMinutes || 25;
    totalMinutes += mins;
    totalCount++;
    if (r.date >= weekStartKey) weekMinutes += mins;
    if (r.date >= monthStartKey) monthMinutes += mins;
    if (r.date === todayKey) {
      todayMinutes += mins;
      todayCount++;
    }
  }

  return { weekMinutes, monthMinutes, totalMinutes, totalCount, todayMinutes, todayCount };
}

/** 格式化分钟为可读字符串 */
export function formatMinutes(minutes: number): string {
  if (minutes < 60) return `${minutes}分钟`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}小时${m}分钟` : `${h}小时`;
}

/** 获取星期几的短名 */
export function getWeekdayShort(dateKey: string): string {
  const [y, m, d] = dateKey.split('-').map(Number);
  const day = new Date(y, m - 1, d).getDay();
  return ['日', '一', '二', '三', '四', '五', '六'][day];
}
