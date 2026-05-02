/**
 * Reading time calculation utility
 * Calculates estimated reading time based on word count
 * Excludes component syntax and focuses on written content
 */

export interface ReadingTimeConfig {
  /** Words per minute (default: 200) */
  wordsPerMinute?: number;
  /** Minimum reading time in minutes (default: 1) */
  minReadingTime?: number;
}

const DEFAULT_CONFIG: Required<ReadingTimeConfig> = {
  wordsPerMinute: 200,
  minReadingTime: 1,
};

/**
 * Extract written content from markdown/mdx
 * Removes component syntax, code blocks, and frontmatter
 *
 * @param content - Raw markdown/mdx content
 * @returns Cleaned text content
 */
export function extractWrittenContent(content: string | undefined): string {
  if (!content) {
    return '';
  }

  let text = content;

  // Remove frontmatter (YAML between ---)
  text = text.replace(/^---[\s\S]*?---\n/, '');

  // Remove JSX/component syntax (e.g., <Component prop="value" />)
  text = text.replace(/<[A-Z][^>]*>/g, '');
  text = text.replace(/<\/[A-Z][^>]*>/g, '');

  // Remove HTML comments
  text = text.replace(/<!--[\s\S]*?-->/g, '');

  // Remove code blocks (```...```)
  text = text.replace(/```[\s\S]*?```/g, '');

  // Remove inline code markers
  text = text.replace(/`[^`]*`/g, '');

  // Remove markdown links [text](url) -> text
  text = text.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1');

  // Remove markdown images ![alt](url)
  text = text.replace(/!\[([^\]]*)\]\([^)]*\)/g, '');

  // Remove markdown formatting
  text = text.replace(/[*_~#\-\[\]()]/g, ' ');

  // Remove extra whitespace
  text = text.replace(/\s+/g, ' ').trim();

  return text;
}

/**
 * Count words in text
 *
 * @param text - Text to count
 * @returns Word count
 */
export function countWords(text: string): number {
  return text.split(/\s+/).filter((word) => word.length > 0).length;
}

/**
 * Calculate reading time in minutes
 *
 * @param content - Raw markdown/mdx content
 * @param config - Configuration options
 * @returns Reading time in minutes
 */
export function calculateReadingTimeMinutes(
  content: string | undefined,
  config?: ReadingTimeConfig
): number {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };

  const cleanedContent = extractWrittenContent(content);
  const wordCount = countWords(cleanedContent);
  const readingTimeMinutes = Math.ceil(
    wordCount / finalConfig.wordsPerMinute
  );

  return Math.max(readingTimeMinutes, finalConfig.minReadingTime);
}

/**
 * Format reading time as a human-readable string
 *
 * @param minutes - Reading time in minutes
 * @returns Formatted string (e.g., "5 min read")
 */
export function formatReadingTime(minutes: number): string {
  if (minutes === 1) {
    return '1 min read';
  }
  return `${minutes} min read`;
}

/**
 * Get reading time string from content
 *
 * @param content - Raw markdown/mdx content
 * @param config - Configuration options
 * @returns Formatted reading time string
 */
export function getReadingTime(
  content: string | undefined,
  config?: ReadingTimeConfig
): string {
  const minutes = calculateReadingTimeMinutes(content, config);
  return formatReadingTime(minutes);
}

/**
 * Get reading time with detailed information
 *
 * @param content - Raw markdown/mdx content
 * @param config - Configuration options
 * @returns Object with reading time details
 */
export function getReadingTimeDetails(
  content: string | undefined,
  config?: ReadingTimeConfig
): {
  minutes: number;
  formatted: string;
  wordCount: number;
  wordsPerMinute: number;
} {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };
  const cleanedContent = extractWrittenContent(content);
  const wordCount = countWords(cleanedContent);
  const minutes = calculateReadingTimeMinutes(content, config);

  return {
    minutes,
    formatted: formatReadingTime(minutes),
    wordCount,
    wordsPerMinute: finalConfig.wordsPerMinute,
  };
}
