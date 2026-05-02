/**
 * Utility functions for detecting and validating colors
 */

/**
 * Check if a string is a valid hex color
 * @param str - String to check
 * @returns true if string is a valid hex color (e.g., "#ff0000" or "#f00")
 */
export function isHexColor(str: string): boolean {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(str);
}

/**
 * Check if a data array has a key
 * @param data - Array of data objects
 * @param key - Key to check for
 * @returns true if all objects in data have the key
 */
export function hasDataKey(
  data: { [key: string]: any }[],
  key: string,
): boolean {
  if (data.length === 0) return false;
  return data.every((item) => key in item);
}

/**
 * Extract values from data array by key
 * @param data - Array of data objects
 * @param key - Key to extract
 * @returns Array of values, or empty array if key doesn't exist
 */
export function extractDataValues(
  data: { [key: string]: any }[],
  key: string,
): number[] {
  return data.map((item) => Number(item[key])).filter((v) => !isNaN(v));
}
