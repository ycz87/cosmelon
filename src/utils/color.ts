/**
 * Returns a color with the provided alpha channel.
 * Supports hex/rgb/rgba inputs and falls back to color-mix for other formats.
 */
export function withOpacity(color: string, alpha: number): string {
  const safeAlpha = Math.min(1, Math.max(0, alpha));
  const input = color.trim();

  if (/^#[0-9a-f]{3}$/i.test(input)) {
    const r = parseInt(input[1] + input[1], 16);
    const g = parseInt(input[2] + input[2], 16);
    const b = parseInt(input[3] + input[3], 16);
    return `rgba(${r}, ${g}, ${b}, ${safeAlpha})`;
  }

  if (/^#[0-9a-f]{6}([0-9a-f]{2})?$/i.test(input)) {
    const hex = input.slice(1, 7);
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${safeAlpha})`;
  }

  const rgbMatch = input.match(/^rgba?\((.+)\)$/i);
  if (rgbMatch) {
    const channels = rgbMatch[1]
      .replaceAll('/', ' ')
      .replaceAll(',', ' ')
      .split(/\s+/)
      .filter(Boolean);
    if (channels.length >= 3) {
      return `rgba(${channels[0]}, ${channels[1]}, ${channels[2]}, ${safeAlpha})`;
    }
  }

  return `color-mix(in srgb, ${input} ${Math.round(safeAlpha * 100)}%, transparent)`;
}
