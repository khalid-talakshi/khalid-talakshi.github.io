# Reading Time Calculation Guide

## Overview

The blog now features an intelligent reading time calculation system that estimates how long it takes to read a blog post. The calculation is based on **written content only**, excluding component syntax, code blocks, and other markdown formatting.

## Features

✨ **Accurate Calculation**
- Counts only written text content
- Excludes JSX/component syntax
- Excludes code blocks and inline code
- Excludes markdown formatting

🔧 **Configurable**
- Adjustable words per minute (default: 200)
- Configurable minimum reading time (default: 1 minute)
- Easy to customize globally or per-post

📊 **Detailed Information**
- Reading time in minutes
- Formatted string (e.g., "5 min read")
- Word count
- Words per minute setting

## How It Works

### Content Extraction

The reading time utility extracts written content by removing:

1. **Frontmatter** - YAML metadata between `---` markers
2. **JSX Components** - `<Component prop="value" />`
3. **HTML Comments** - `<!-- comment -->`
4. **Code Blocks** - ` ```code``` `
5. **Inline Code** - `` `code` ``
6. **Markdown Links** - `[text](url)` → `text`
7. **Markdown Images** - `![alt](url)`
8. **Markdown Formatting** - `*`, `_`, `~`, `#`, etc.

### Calculation Formula

```
Reading Time (minutes) = ceil(Word Count / Words Per Minute)
Minimum Reading Time = 1 minute (configurable)
```

**Example:**
- 227 words ÷ 200 wpm = 1.135 minutes → **2 min read**
- 150 words ÷ 200 wpm = 0.75 minutes → **1 min read** (minimum)

## Usage

### In Blog Page (`src/pages/blog.astro`)

The blog page automatically calculates reading time for all posts:

```typescript
import { getReadingTime } from "../utils/readingTime";

const READING_TIME_CONFIG = {
  wordsPerMinute: 200,
  minReadingTime: 1,
};

const enrichedPosts = await Promise.all(
  blogPosts.map(async (post) => {
    const readingTime = getReadingTime(post.body, READING_TIME_CONFIG);
    return { ...post, readingTime };
  })
);
```

### In Post Page (`src/pages/posts/[postId].astro`)

Reading time is displayed on individual post pages:

```typescript
import { getReadingTime } from "../../utils/readingTime";

const readingTime = getReadingTime(entry.body, READING_TIME_CONFIG);
```

### API Reference

#### `getReadingTime(content, config?)`

Get formatted reading time string.

```typescript
const readingTime = getReadingTime(content);
// Returns: "5 min read"
```

**Parameters:**
- `content` (string | undefined) - Raw markdown/mdx content
- `config` (ReadingTimeConfig, optional) - Configuration options

**Returns:** Formatted string (e.g., "5 min read")

#### `calculateReadingTimeMinutes(content, config?)`

Get reading time in minutes.

```typescript
const minutes = calculateReadingTimeMinutes(content);
// Returns: 5
```

**Parameters:**
- `content` (string | undefined) - Raw markdown/mdx content
- `config` (ReadingTimeConfig, optional) - Configuration options

**Returns:** Number of minutes

#### `getReadingTimeDetails(content, config?)`

Get detailed reading time information.

```typescript
const details = getReadingTimeDetails(content);
// Returns: {
//   minutes: 5,
//   formatted: "5 min read",
//   wordCount: 1000,
//   wordsPerMinute: 200
// }
```

**Parameters:**
- `content` (string | undefined) - Raw markdown/mdx content
- `config` (ReadingTimeConfig, optional) - Configuration options

**Returns:** Object with reading time details

#### `extractWrittenContent(content)`

Extract written content from markdown/mdx.

```typescript
const cleaned = extractWrittenContent(content);
```

**Parameters:**
- `content` (string | undefined) - Raw markdown/mdx content

**Returns:** Cleaned text content

#### `countWords(text)`

Count words in text.

```typescript
const wordCount = countWords(text);
```

**Parameters:**
- `text` (string) - Text to count

**Returns:** Word count

## Configuration

### Global Configuration

Edit the `READING_TIME_CONFIG` in `src/pages/blog.astro` and `src/pages/posts/[postId].astro`:

```typescript
const READING_TIME_CONFIG = {
  wordsPerMinute: 200,  // Adjust reading speed
  minReadingTime: 1,    // Minimum reading time in minutes
};
```

### Per-Post Configuration

You can pass custom configuration to any function:

```typescript
const readingTime = getReadingTime(content, {
  wordsPerMinute: 250,  // Faster readers
  minReadingTime: 2,    // Minimum 2 minutes
});
```

## Examples

### Example 1: Basic Usage

```typescript
import { getReadingTime } from "../utils/readingTime";

const content = `
# My Blog Post

This is a blog post with some content...
`;

const readingTime = getReadingTime(content);
console.log(readingTime); // "1 min read"
```

### Example 2: Detailed Information

```typescript
import { getReadingTimeDetails } from "../utils/readingTime";

const details = getReadingTimeDetails(content);
console.log(`${details.wordCount} words`);        // "227 words"
console.log(`${details.minutes} min read`);       // "2 min read"
console.log(`${details.wordsPerMinute} wpm`);     // "200 wpm"
```

### Example 3: Custom Configuration

```typescript
import { getReadingTime } from "../utils/readingTime";

// For technical content (slower reading)
const technicalReadingTime = getReadingTime(content, {
  wordsPerMinute: 150,
  minReadingTime: 2,
});

// For casual content (faster reading)
const casualReadingTime = getReadingTime(content, {
  wordsPerMinute: 250,
  minReadingTime: 1,
});
```

## Display in Components

### Blog Card

The `FeaturedBlogCard` component displays reading time:

```astro
<FeaturedBlogCard
  title={post.data.title}
  description={post.data.description}
  date={post.data.date}
  href={`/posts/${post.id}`}
  readingTime={post.readingTime}  <!-- "5 min read" -->
/>
```

### Post Page

Reading time is displayed in the post header:

```astro
<div class="flex gap-4">
  <p>{entry?.data.date}</p>
  <p class="text-theme-accent">{readingTime}</p>
</div>
```

## Testing

### Manual Testing

1. Create a test blog post with known word count
2. Calculate expected reading time: `wordCount / 200`
3. Verify the displayed reading time matches

### Example Test Content

```markdown
---
title: "Test Post"
---

# Test

This is a test post. [Link](http://example.com)

\`\`\`
// Code block - not counted
const x = 1;
\`\`\`

<Component prop="value" />

More text here...
```

## Best Practices

✅ **Do:**
- Use realistic content for testing
- Adjust `wordsPerMinute` based on content type
- Display reading time prominently
- Update reading time when content changes

❌ **Don't:**
- Hardcode reading times
- Count code blocks or components
- Ignore the minimum reading time setting
- Use unrealistic words per minute values

## Troubleshooting

### Reading Time Shows "1 min read" for Long Posts

**Cause:** The content might be mostly code blocks or components.

**Solution:** Check that the content is being extracted correctly using `extractWrittenContent()`.

### Reading Time Seems Too High/Low

**Cause:** The `wordsPerMinute` setting might not match your audience.

**Solution:** Adjust the `wordsPerMinute` value in the configuration:
- Technical content: 150-180 wpm
- General content: 200-250 wpm
- Light content: 250+ wpm

### Build Fails with "Cannot read properties of undefined"

**Cause:** The `body` property might be undefined for some posts.

**Solution:** The utility now handles undefined content gracefully. Ensure all blog posts have content.

## Performance

The reading time calculation is:
- ✅ **Fast** - Runs at build time, not runtime
- ✅ **Efficient** - Simple regex and string operations
- ✅ **Scalable** - Works with any number of posts

## Future Enhancements

Potential improvements:
- [ ] Support for different languages (adjust wpm)
- [ ] Difficulty level estimation
- [ ] Estimated completion time
- [ ] Reading time by section
- [ ] Comparison with average reading time

## References

- [Average Reading Speed](https://en.wikipedia.org/wiki/Words_per_minute)
- [Medium Reading Time](https://help.medium.com/hc/en-us/articles/214991667-Reading-time)
- [Markdown Specification](https://spec.commonmark.org/)

---

**Last Updated:** April 27, 2026  
**Utility Location:** `src/utils/readingTime.ts`  
**Configuration:** `src/pages/blog.astro`, `src/pages/posts/[postId].astro`
