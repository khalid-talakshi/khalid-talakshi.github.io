/**
 * Table of Contents utility
 * Extracts headings from HTML content and generates a structured TOC
 * NOTE: This utility is designed to work on the client side where DOM is available
 */

export interface TocEntry {
  id: string;
  title: string;
  level: number;
  children?: TocEntry[];
}

/**
 * Generate a slug from heading text for use as an anchor ID
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-"); // Replace multiple hyphens with single hyphen
}

/**
 * Extract headings from DOM and generate TOC structure
 * Supports h2 and h3 headings
 * IMPORTANT: This function must only be called on the client side
 */
export function extractTableOfContents(): TocEntry[] {
  // Get all h2 and h3 elements from the prose content
  const headings = Array.from(
    document.querySelectorAll(".prose h2, .prose h3"),
  ) as HTMLElement[];

  const toc: TocEntry[] = [];
  let currentH2: TocEntry | null = null;

  headings.forEach((heading) => {
    const level = parseInt(heading.tagName[1]);
    const title = heading.textContent || "";
    let id = heading.id;

    // Generate ID if it doesn't exist
    if (!id) {
      id = generateSlug(title);
      heading.id = id;
    }

    const entry: TocEntry = {
      id,
      title,
      level,
    };

    if (level === 2) {
      currentH2 = entry;
      toc.push(entry);
    } else if (level === 3 && currentH2) {
      if (!currentH2.children) {
        currentH2.children = [];
      }
      currentH2.children.push(entry);
    }
  });

  return toc;
}

/**
 * Flatten TOC structure for easier iteration
 */
export function flattenToc(toc: TocEntry[]): TocEntry[] {
  const flattened: TocEntry[] = [];

  toc.forEach((entry) => {
    flattened.push(entry);
    if (entry.children) {
      flattened.push(...entry.children);
    }
  });

  return flattened;
}
