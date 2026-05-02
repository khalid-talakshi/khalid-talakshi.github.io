# Copilot Instructions

## Commands

```bash
yarn install          # install deps
yarn dev              # dev server at localhost:4321
yarn build            # production build to ./dist
yarn preview          # preview production build
yarn format           # prettier --write .
yarn format:check     # prettier --check .
```

**E2E tests (Playwright)** — requires the dev server to be running first:

```bash
yarn dev &            # start dev server
npx playwright test   # run all tests
npx playwright test tests/zoom.spec.ts            # single file
npx playwright test -g "Scatter chart should render"  # single test by name
```

There is no unit test suite and no lint script in `package.json`. Run Prettier before committing.

## Architecture

This is an **Astro blog** with React components for interactive data visualizations.

- **`src/content/blog/`** — MDX blog posts. Defined in `src/content.config.ts` with schema `{ title, author, description, published, date }`.
- **`src/pages/posts/[postId].astro`** — Dynamic route that renders blog posts using `getCollection("blog")` and `render()` from `astro:content`.
- **`src/content/datasets/`** — Raw data (JS/JSON) imported directly into MDX files for chart components.
- **`src/layouts/`** — `BaseLayout` (HTML shell + global CSS) → `StandardPageLayout` (centered container + nav) or `BlogPostLayout` (prose width). MDX posts use `BlogPostLayout` → `Prose.astro` for typography styling.
- **`src/components/charts/`** — All chart components are ECharts-based React `.tsx` files. Recharts was removed; do not re-introduce it.

## Chart System & `Trace` Interface

The `Trace` interface (`src/types/index.ts`) is the standard data contract for charts:

```ts
interface Trace {
  name: string;
  data: { [key: string]: any }[];
  x: string; // data key for x-axis
  y: string; // data key for y-axis
  color: string; // EITHER a hex color ("#ff0000") OR a data key for color mapping ("speed")
  colorScale?: ColorScale; // defaults to blue-white-red
}
```

**The `color` field is smart:** `isHexColor()` from `src/utils/colorDetection.ts` determines at runtime whether to use a solid color or map values through a color scale. Use `EChartsScatterChartFromTrace` when building scatter charts from `Trace` objects.

## Theme System

CSS variables in `src/styles/global.css` `@theme` block are the source of truth for colors:

```css
--color-theme-accent: #008fec --color-theme-background: #00071b
  --color-theme-foreground: #2264e3 --color-theme-muted: #212f3f
  --color-theme-border: #2264e3;
```

Use these as Tailwind utilities (`bg-theme-background`, `border-theme-border`, etc.). The ECharts theme (`src/utils/echartsTheme.ts`) reads these same CSS variables at runtime via `getComputedStyle` — always update `global.css` first, not `echartsTheme.ts` directly.

## Key Conventions

- **Fonts**: `font-anta` (headings) and `font-aldrich` (body). Loaded via Astro's `Font` component in `BaseLayout.astro`. Defined as `--font-anta` / `--font-aldrich` in `@theme`.
- **Prose styling**: `src/styles/blog.css` uses `@reference './global.css'` to apply Tailwind utilities inside MDX content. Add MDX typography overrides there.
- **Chart components** are client-side React — they use `useRef` + `echarts.init()` directly (not via `echarts-for-react` wrapper in most cases). Always call `chartRef.current?.dispose()` on unmount.
- **Datasets in MDX**: Raw telemetry/data lives in `src/content/datasets/` as `.js` or `.json` files and is imported at the top of `.mdx` files. Do not fetch data at runtime.
- **`published` flag**: Blog posts with `published: false` are included in `getCollection` results by default — filter with `.filter(p => p.data.published)` if building a public listing.

## TypeScript

- `tsconfig.json` extends `astro/tsconfigs/strict`. Keep strict mode on.
- Use `interface` for exported object shapes, `type` for unions.
- Avoid `any`; use `unknown` and narrow.
- Explicit return types on exported functions and module-level helpers.
