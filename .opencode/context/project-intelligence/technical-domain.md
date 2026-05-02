<!-- Context: project-intelligence/technical | Priority: critical | Version: 1.2 | Updated: 2026-04-26 -->

# Technical Domain

Document the technical foundation, architecture, and key decisions for the blog site.

## Quick Reference

- **Purpose**: Understand how the project works technically
- **Update When**: New features, refactoring, tech stack changes
- **Audience**: Developers, AI agents, technical stakeholders

## Primary Stack

| Layer     | Technology   | Version   | Rationale                                   |
| --------- | ------------ | --------- | ------------------------------------------- |
| Framework | Astro        | 6.0.6     | Static site generation with dynamic islands |
| Language  | TypeScript   | Latest    | Type safety and developer experience        |
| Styling   | Tailwind CSS | 4.2.2     | Utility-first CSS framework                 |
| Charting  | ECharts      | 6.0.0     | Advanced data visualization capabilities    |
| React     | React        | 19.2.4    | Interactive components and state management |
| Node      | Node.js      | >=22.12.0 | Runtime environment                         |

## Architecture Pattern

**Type**: Static Site Generation (SSG) with Interactive Islands  
**Pattern**: Astro pages + React components for interactivity  
**Structure**: Content-driven with Astro Content Collections

Combines static site generation for performance with React islands for interactivity. Astro handles server-side rendering of pages and content, while React components provide interactive features like graphs and charts.

## Project Structure

```
src/
├── components/          # Reusable components (Astro + React)
├── layouts/             # Page layouts
├── pages/               # Route pages (Astro)
├── content/             # Content collections (blog, projects, experience, education)
├── types/               # TypeScript type definitions
├── utils/               # Utility functions
└── styles/              # Global styles
```

## Code Patterns

### Astro Page Pattern

```astro
---
import Navigation from "../components/Navigation.astro";
import { getCollection } from "astro:content";

const blogPosts = await getCollection("blog");
---

<div class="w-full sm:w-[95%] mx-auto">
  <Navigation />
  <slot />
</div>
```

### React Component Pattern

```typescript
interface Props {
  data: DataPoint[];
  title?: string;
}

export default function Chart({ data, title }: Props) {
  return (
    <div className="flex flex-col gap-2">
      {title && <h3>{title}</h3>}
      {/* Component content */}
    </div>
  );
}
```

### Content Collection Pattern

```typescript
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    author: z.string(),
    date: z.string(),
    published: z.boolean(),
  }),
});

export const collections = { blog };
```

## Naming Conventions

| Type        | Convention               | Example                             |
| ----------- | ------------------------ | ----------------------------------- |
| Files       | PascalCase (components)  | `LineChart.tsx`, `Navigation.astro` |
| Components  | PascalCase               | `LineGraph`, `CustomTooltip`        |
| Functions   | camelCase                | `useGraphZoom`, `getCollection`     |
| Types       | PascalCase               | `Props`, `Trace`, `DataPoint`       |
| Constants   | camelCase or UPPER_SNAKE | `routes`, `MAX_ITEMS`               |
| CSS Classes | kebab-case (Tailwind)    | `flex`, `gap-2`, `rounded-xl`       |
| Directories | lowercase                | `src/components/`, `src/hooks/`     |

## Code Standards

- TypeScript strict mode (extends "astro/tsconfigs/strict")
- React JSX with react-jsx import source
- Functional components only (no class components)
- TypeScript interfaces for component Props
- Explicit return types on exported functions
- Tailwind CSS for styling (utility-first)
- Astro frontmatter for server-side logic
- Content Collections for content management
- React hooks for interactive state
- Prettier for code formatting

## Security Requirements

- Input validation for form submissions
- Content Security Policy (CSP) headers
- HTTPS enforcement
- XSS prevention (React auto-escapes by default)
- No sensitive data in client-side code
- Sanitize user-generated content
- Validate markdown/MDX content

## Development Environment

```
Setup: yarn install
Requirements: Node.js >=22.12.0, yarn or npm
Local Dev: yarn dev (runs astro dev on localhost:4321)
Build: yarn build (runs astro build)
Preview: yarn preview (runs astro preview)
Format: yarn format (runs prettier --write .)
Format Check: yarn format:check
```

## 📂 Codebase References

**Key Components**:

- `src/components/charts/` - ECharts React components
- `src/components/Navigation.astro` - Navigation layout
- `src/pages/blog.astro` - Blog listing page
- `src/content.config.ts` - Content collection schemas

**Config**:

- `astro.config.mjs` - Astro framework configuration
- `tsconfig.json` - TypeScript strict mode
- `package.json` - Dependencies and scripts
- `.prettierrc` - Prettier formatting rules

## Related Files

- `business-domain.md` - Why this technical foundation exists
- `business-tech-bridge.md` - How business needs map to technical solutions
- `decisions-log.md` - Full decision history with context
