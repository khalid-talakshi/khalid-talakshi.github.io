import type { ColorScale } from "../utils/colorScale";

/**
 * Trace data structure for ECharts line and scatter charts
 * Supports color mapping for continuous values
 *
 * The `color` field is smart:
 * - If it's a hex color (e.g., "#ff0000"), use that solid color
 * - If it's a string key (e.g., "speed"), use that data field for color mapping
 *
 * Examples:
 *
 * Solid color (line chart or scatter without mapping):
 * {
 *   name: "Series 1",
 *   x: "x",
 *   y: "y",
 *   color: "#ff0000",  // Hex color - use as solid color
 *   data: [{ x: 1, y: 2 }, ...]
 * }
 *
 * Color mapping (scatter chart):
 * {
 *   name: "TSU",
 *   x: "x",
 *   y: "y",
 *   color: "speed",    // Data key - use for color mapping
 *   data: [{ x: 1, y: 2, speed: 50 }, ...]
 * }
 */
export interface Trace {
  name: string;
  data: { [key: string]: any }[];
  x: string; // Key for X-axis values
  y: string; // Key for Y-axis values
  color: string; // Hex color (e.g., "#ff0000") OR data key for color mapping (e.g., "speed")
  colorScale?: ColorScale; // Custom color scale (defaults to blue-white-red)
}
