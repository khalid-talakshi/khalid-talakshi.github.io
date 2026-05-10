/**
 * Parse a date in DD-MM-YYYY format into a UTC timestamp.
 * Returns Number.NEGATIVE_INFINITY when input is invalid.
 */
export function parseDayMonthYearToTimestamp(dateStr: string): number {
  const trimmed = dateStr.trim();
  const match = /^(\d{2})-(\d{2})-(\d{4})$/.exec(trimmed);

  if (!match) {
    return Number.NEGATIVE_INFINITY;
  }

  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);

  if (
    !Number.isInteger(day) ||
    !Number.isInteger(month) ||
    !Number.isInteger(year) ||
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > 31
  ) {
    return Number.NEGATIVE_INFINITY;
  }

  const timestamp = Date.UTC(year, month - 1, day);
  const date = new Date(timestamp);

  // Guard against overflow dates such as 31-02-2026.
  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return Number.NEGATIVE_INFINITY;
  }

  return timestamp;
}
