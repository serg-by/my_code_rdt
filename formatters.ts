/**
 * Parse a raw digit string into HH:MM:SS formatted string.
 * Examples:
 *   "12530"  → "01:25:30"
 *   "530"    → "00:05:30"
 *   "10000"  → "01:00:00"
 *   ""       → "00:00:00"
 */
export function formatTimeFromDigits(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 6);
  const padded = digits.padStart(6, "0");
  const hh = padded.slice(0, 2);
  const mm = padded.slice(2, 4);
  const ss = padded.slice(4, 6);
  return `${hh}:${mm}:${ss}`;
}

/**
 * Clamp time to max 23:59:59.
 */
export function clampTime(formatted: string): string {
  const [hh, mm, ss] = formatted.split(":").map(Number);
  const ch = Math.min(hh, 23);
  const cm = Math.min(mm, 59);
  const cs = Math.min(ss, 59);
  return [
    String(ch).padStart(2, "0"),
    String(cm).padStart(2, "0"),
    String(cs).padStart(2, "0"),
  ].join(":");
}

/**
 * Parse raw digit string to total seconds.
 * Handles smart formatting: "12530" → 01:25:30 → 5130s
 */
export function parseTrainingTimeToSeconds(raw: string): number {
  if (!raw || raw.replace(/\D/g, "").length === 0) return 0;
  const formatted = clampTime(formatTimeFromDigits(raw));
  const [hh, mm, ss] = formatted.split(":").map(Number);
  return hh * 3600 + mm * 60 + ss;
}

/**
 * Format seconds into human-readable "Xd Xh Xm Xs" string.
 */
export function formatSecondsToDHMS(totalSeconds: number): string {
  const s = Math.round(totalSeconds);
  const days = Math.floor(s / 86400);
  const hours = Math.floor((s % 86400) / 3600);
  const minutes = Math.floor((s % 3600) / 60);
  const seconds = s % 60;

  const parts: string[] = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (seconds > 0 || parts.length === 0) parts.push(`${seconds}s`);
  return parts.join(" ");
}

/**
 * Format a number with commas.
 */
export function formatNumber(n: number): string {
  return n.toLocaleString("ru-RU");
}
