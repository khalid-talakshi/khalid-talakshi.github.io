/**
 * Color scale utilities for mapping continuous values to colors
 * Supports custom color scales with blue-white-red as default
 */

export type ColorStop = [number, string]; // [position 0-1, hex color]

export interface ColorScale {
  stops: ColorStop[];
}

/**
 * Default blue-white-red color scale
 * Blue (0) -> White (0.5) -> Red (1)
 */
export const BLUE_WHITE_RED_SCALE: ColorScale = {
  stops: [
    [0, "#0066cc"], // Blue
    [0.5, "#ffffff"], // White
    [1, "#cc0000"], // Red
  ],
};

/**
 * Interpolate between two hex colors
 * @param color1 - Start color in hex format
 * @param color2 - End color in hex format
 * @param t - Interpolation factor (0-1)
 * @returns Interpolated hex color
 */
function interpolateColor(color1: string, color2: string, t: number): string {
  const c1 = parseInt(color1.slice(1), 16);
  const c2 = parseInt(color2.slice(1), 16);

  const r1 = (c1 >> 16) & 255;
  const g1 = (c1 >> 8) & 255;
  const b1 = c1 & 255;

  const r2 = (c2 >> 16) & 255;
  const g2 = (c2 >> 8) & 255;
  const b2 = c2 & 255;

  const r = Math.round(r1 + (r2 - r1) * t);
  const g = Math.round(g1 + (g2 - g1) * t);
  const b = Math.round(b1 + (b2 - b1) * t);

  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}

/**
 * Map a value to a color using a color scale
 * @param value - The value to map (should be normalized 0-1)
 * @param scale - The color scale to use
 * @returns Hex color string
 */
export function valueToColor(value: number, scale: ColorScale): string {
  // Clamp value to 0-1
  const clampedValue = Math.max(0, Math.min(1, value));

  // Find the two stops to interpolate between
  for (let i = 0; i < scale.stops.length - 1; i++) {
    const [pos1, color1] = scale.stops[i];
    const [pos2, color2] = scale.stops[i + 1];

    if (clampedValue >= pos1 && clampedValue <= pos2) {
      // Interpolate between these two colors
      const range = pos2 - pos1;
      const t = range === 0 ? 0 : (clampedValue - pos1) / range;
      return interpolateColor(color1, color2, t);
    }
  }

  // Fallback to last color
  return scale.stops[scale.stops.length - 1][1];
}

/**
 * Normalize values to 0-1 range
 * @param values - Array of numeric values
 * @returns Array of normalized values (0-1)
 */
export function normalizeValues(values: number[]): number[] {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min;

  if (range === 0) {
    return values.map(() => 0.5); // All same value -> middle of scale
  }

  return values.map((v) => (v - min) / range);
}

/**
 * Get color for a value given min/max bounds
 * @param value - The value to color
 * @param min - Minimum value in dataset
 * @param max - Maximum value in dataset
 * @param scale - Color scale to use
 * @returns Hex color string
 */
export function getColorForValue(
  value: number,
  min: number,
  max: number,
  scale: ColorScale = BLUE_WHITE_RED_SCALE,
): string {
  const range = max - min;
  const normalized = range === 0 ? 0.5 : (value - min) / range;
  return valueToColor(normalized, scale);
}
