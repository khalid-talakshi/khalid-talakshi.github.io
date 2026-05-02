/**
 * Color scale utilities for scatter plot visualization
 * Provides common color scales for mapping numerical values to colors
 */

/**
 * Linear interpolation between two values
 */
function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/**
 * Convert HSL to RGB hex color
 */
function hslToHex(h: number, s: number, l: number): string {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let r = 0,
    g = 0,
    b = 0;

  if (h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (h < 300) {
    r = x;
    g = 0;
    b = c;
  } else {
    r = c;
    g = 0;
    b = x;
  }

  const toHex = (val: number) => {
    const hex = Math.round((val + m) * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Viridis-like color scale (blue -> green -> yellow)
 * Maps normalized value (0-1) to a color
 */
export function viridisScale(value: number, min: number, max: number): string {
  const normalized = (value - min) / (max - min);
  const clamped = Math.max(0, Math.min(1, normalized));

  // Viridis-inspired: blue (240°) -> cyan (180°) -> green (120°) -> yellow (60°)
  const hue = 240 - clamped * 180; // 240° to 60°
  const saturation = 0.8;
  const lightness = 0.4 + clamped * 0.2; // 40% to 60%

  return hslToHex(hue, saturation, lightness);
}

/**
 * Cool to warm color scale (blue -> red)
 * Maps normalized value (0-1) to a color
 */
export function coolToWarmScale(
  value: number,
  min: number,
  max: number,
): string {
  const normalized = (value - min) / (max - min);
  const clamped = Math.max(0, Math.min(1, normalized));

  // Cool (240° blue) to warm (0° red)
  const hue = 240 - clamped * 240; // 240° to 0°
  const saturation = 0.8;
  const lightness = 0.5;

  return hslToHex(hue, saturation, lightness);
}

/**
 * Plasma-like color scale (purple -> orange)
 * Maps normalized value (0-1) to a color
 */
export function plasmaScale(value: number, min: number, max: number): string {
  const normalized = (value - min) / (max - min);
  const clamped = Math.max(0, Math.min(1, normalized));

  // Plasma: purple (270°) -> red (0°) -> orange (30°)
  const hue = 270 - clamped * 240; // 270° to 30°
  const saturation = 0.9;
  const lightness = 0.3 + clamped * 0.3; // 30% to 60%

  return hslToHex(hue, saturation, lightness);
}

/**
 * Grayscale color scale (dark -> light)
 * Maps normalized value (0-1) to a grayscale color
 */
export function grayscaleScale(
  value: number,
  min: number,
  max: number,
): string {
  const normalized = (value - min) / (max - min);
  const clamped = Math.max(0, Math.min(1, normalized));

  const lightness = 0.2 + clamped * 0.6; // 20% to 80%
  const hex = Math.round(lightness * 255).toString(16);
  const hexPair = hex.length === 1 ? "0" + hex : hex;

  return `#${hexPair}${hexPair}${hexPair}`;
}

/**
 * Blue accent scale (light blue -> dark blue)
 * Maps normalized value (0-1) to shades of blue
 */
export function blueAccentScale(
  value: number,
  min: number,
  max: number,
): string {
  const normalized = (value - min) / (max - min);
  const clamped = Math.max(0, Math.min(1, normalized));

  // Blue hue (240°) with varying saturation and lightness
  const hue = 240;
  const saturation = 0.5 + clamped * 0.5; // 50% to 100%
  const lightness = 0.6 - clamped * 0.3; // 60% to 30%

  return hslToHex(hue, saturation, lightness);
}
