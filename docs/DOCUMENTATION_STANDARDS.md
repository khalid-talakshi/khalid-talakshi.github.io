# Documentation Standards

This document defines the standards for all AI-generated documentation in this project.

## 📋 Overview

All documentation should be:
- **Clear** - Easy to understand for developers of all levels
- **Accurate** - Reflects current implementation
- **Complete** - Covers all relevant aspects
- **Organized** - Logical structure and navigation
- **Maintained** - Updated when code changes

## 📁 File Organization

### Folder Structure

```
docs/
├── guides/              # Step-by-step guides and tutorials
├── references/          # API docs, quick references, reports
├── migrations/          # Migration guides and notes
└── checklists/          # Task lists and checklists
```

### Naming Convention

Use UPPER_SNAKE_CASE for all documentation files:

```
✅ READING_TIME_GUIDE.md
✅ COLOR_MAPPING_QUICK_START.md
✅ ECHARTS_MIGRATION_GUIDE.md
❌ reading-time-guide.md
❌ Reading Time Guide.md
```

### Category Selection

| Content Type | Category | Example |
|---|---|---|
| How-to guide, tutorial, step-by-step | `guides/` | `READING_TIME_GUIDE.md` |
| API reference, quick start, summary | `references/` | `ECHARTS_ONLY_REFERENCE.md` |
| Migration guide, upgrade notes | `migrations/` | `NEXTJS_UPGRADE_GUIDE.md` |
| Checklist, task list, process | `checklists/` | `MIGRATION_CHECKLIST.md` |

## 📝 Document Structure

### Standard Template

```markdown
# Document Title

## Overview
[1-2 sentence description of what this document covers]

## Table of Contents
(Include if document is longer than 2000 words)
- [Section 1](#section-1)
- [Section 2](#section-2)

## Main Content

### Section 1
[Content here]

### Section 2
[Content here]

## Examples
[Code examples and usage]

## Troubleshooting
[Common issues and solutions]

## Best Practices
[Do's and don'ts]

## References
[Links to related documentation]

---

**Last Updated:** [Date]
**Category:** [guides|references|migrations|checklists]
**Related Docs:** [Links]
```

### Metadata Footer

Every document must end with:

```markdown
---

**Last Updated:** April 27, 2026
**Category:** guides
**Related Docs:** 
- [Related Doc 1](path/to/doc.md)
- [Related Doc 2](path/to/doc.md)
```

## 🎨 Formatting Standards

### Headings

Use proper heading hierarchy:

```markdown
# Main Title (H1 - one per document)

## Major Section (H2)

### Subsection (H3)

#### Detail (H4)
```

### Code Blocks

Always specify language:

```markdown
✅ Correct:
\`\`\`typescript
const x = 1;
\`\`\`

❌ Incorrect:
\`\`\`
const x = 1;
\`\`\`
```

Supported languages:
- `typescript` / `ts`
- `javascript` / `js`
- `python` / `py`
- `r`
- `bash` / `shell`
- `json`
- `markdown` / `md`
- `html`
- `css`

### Lists

Use consistent formatting:

```markdown
✅ Unordered lists:
- Item 1
- Item 2
- Item 3

✅ Ordered lists:
1. First step
2. Second step
3. Third step

✅ Nested lists:
- Parent item
  - Child item 1
  - Child item 2
```

### Tables

Use markdown tables for comparisons:

```markdown
| Column 1 | Column 2 | Column 3 |
|---|---|---|
| Value 1 | Value 2 | Value 3 |
| Value 4 | Value 5 | Value 6 |
```

### Emphasis

```markdown
**Bold** for important terms
*Italic* for emphasis
`Code` for inline code
~~Strikethrough~~ for deprecated items
```

### Callouts

Use emoji-based callouts:

```markdown
✅ **Do:** This is recommended
❌ **Don't:** This should be avoided
⚠️ **Warning:** Important caution
💡 **Tip:** Helpful suggestion
📝 **Note:** Additional information
```

## 📊 Content Guidelines

### Overview Section

Keep to 1-2 sentences:

```markdown
## Overview

This guide explains how to configure the reading time calculation system
for blog posts. It covers setup, configuration options, and common use cases.
```

### Examples Section

Always include practical examples:

```markdown
## Examples

### Example 1: Basic Usage
[Description]
\`\`\`typescript
// Code here
\`\`\`

### Example 2: Advanced Usage
[Description]
\`\`\`typescript
// Code here
\`\`\`
```

### Troubleshooting Section

Format as Q&A:

```markdown
## Troubleshooting

### Issue: Reading time shows "1 min" for long posts
**Cause:** Content might be mostly code blocks
**Solution:** Check extraction using `extractWrittenContent()`

### Issue: Build fails
**Cause:** Undefined content
**Solution:** Ensure all posts have content
```

### Best Practices Section

Use checkmarks and X marks:

```markdown
## Best Practices

✅ **Do:**
- Keep docs up-to-date
- Include examples
- Link to related docs

❌ **Don't:**
- Leave outdated information
- Skip examples
- Forget to update index
```

## 🔗 Cross-Referencing

### Internal Links

Link to other docs in the same project:

```markdown
See [Reading Time Guide](guides/READING_TIME_GUIDE.md) for details.
See [Color Mapping Quick Start](references/COLOR_MAPPING_QUICK_START.md).
```

### External Links

Link to external resources:

```markdown
See [MDN Web Docs](https://developer.mozilla.org/) for more information.
```

### Table of Contents

For documents over 2000 words, include TOC:

```markdown
## Table of Contents
- [Section 1](#section-1)
- [Section 2](#section-2)
  - [Subsection 2.1](#subsection-21)
  - [Subsection 2.2](#subsection-22)
```

## 📐 Length Guidelines

| Document Type | Recommended Length | Max Length |
|---|---|---|
| Quick Start | 500-1000 words | 1500 words |
| Guide | 1000-3000 words | 5000 words |
| Reference | 500-2000 words | 3000 words |
| Checklist | 200-500 words | 1000 words |

## ✅ Quality Checklist

Before finalizing documentation:

- [ ] Title is clear and descriptive
- [ ] Overview section is concise (1-2 sentences)
- [ ] Structure follows standard template
- [ ] All code examples are tested
- [ ] All links are valid
- [ ] Formatting is consistent
- [ ] Metadata footer is complete
- [ ] Related docs are linked
- [ ] Troubleshooting section included
- [ ] Best practices section included
- [ ] No outdated information
- [ ] Spelling and grammar checked
- [ ] Document is in correct folder
- [ ] Index (README.md) is updated

## 🔄 Maintenance Schedule

Documentation should be reviewed:

| Frequency | Action |
|---|---|
| When code changes | Update affected docs |
| When bugs are fixed | Update troubleshooting |
| When features added | Add new docs |
| Monthly | Review for accuracy |
| Quarterly | Full review and update |

## 📝 Update Process

When updating documentation:

1. **Identify affected docs** - Which docs need updates?
2. **Update content** - Make necessary changes
3. **Update metadata** - Change "Last Updated" date
4. **Update index** - Update `docs/README.md` if structure changes
5. **Review** - Check against quality checklist
6. **Commit** - Use descriptive commit message

### Commit Message Format

```
docs: [action] [document name]

[Description of changes]

Files changed:
- docs/[category]/[DOCUMENT_NAME].md
```

Example:
```
docs: update READING_TIME_GUIDE with new examples

Added examples for custom configuration and troubleshooting
section for common issues.

Files changed:
- docs/guides/READING_TIME_GUIDE.md
```

## 🎓 Writing Tips

### Be Clear and Concise

```markdown
❌ Bad: "The aforementioned system facilitates the computation of temporal
metrics predicated upon lexical quantification."

✅ Good: "The reading time system calculates how long it takes to read
based on word count."
```

### Use Active Voice

```markdown
❌ Bad: "The reading time is calculated by the utility."
✅ Good: "The utility calculates the reading time."
```

### Include Context

```markdown
❌ Bad: "Set wordsPerMinute to 200."
✅ Good: "Set wordsPerMinute to 200 (the default reading speed for
general content)."
```

### Use Examples

```markdown
❌ Bad: "You can configure the reading time."
✅ Good: "You can configure the reading time:
\`\`\`typescript
const readingTime = getReadingTime(content, {
  wordsPerMinute: 250
});
\`\`\`"
```

## 🚀 Best Practices

✅ **Do:**
- Write for your audience
- Use consistent terminology
- Include practical examples
- Link to related docs
- Keep docs DRY (Don't Repeat Yourself)
- Update metadata regularly
- Review for accuracy
- Use clear headings

❌ **Don't:**
- Use jargon without explanation
- Mix multiple topics
- Leave outdated information
- Forget to update index
- Skip examples
- Use vague titles
- Ignore formatting standards
- Duplicate content across docs

## 📞 Questions?

If you have questions about documentation standards:
1. Check this guide
2. Review existing documentation
3. Follow the template provided
4. Ask for review before publishing

---

**Last Updated:** April 27, 2026
**Category:** references
**Related Docs:**
- [Documentation Index](README.md)
