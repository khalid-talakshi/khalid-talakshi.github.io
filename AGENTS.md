## Purpose

This file instructs agentic coding tools how to build, lint, test, and follow repo style.

## Quick commands (run from repo root)

- Install deps: `yarn install` (or `npm install`)
- Dev server: `yarn dev` → runs `astro dev` on `localhost:4321`
- Build for production: `yarn build` → outputs to `./dist/`
- Preview production build: `yarn preview`
- Astro CLI: `yarn astro -- <args>` or `npx astro <args>`
- Format check: `yarn format:check` → runs `prettier --check .`
- Format fix: `yarn format` → runs `prettier --write .`

## Project structure

- **Pages & routes**: `src/pages/` (kebab-case `.astro` files)
- **Components**: `src/components/` (PascalCase `.astro` or `.tsx`)
- **Layouts**: `src/layouts/` (PascalCase `.astro`)
- **Content collections**: `src/content/` with schemas in `src/content.config.ts`
  - `blog/` — blog posts (`.md` or `.mdx`)
  - `projects/` — project entries (`.md`)
  - `experience/` — work history (`.md`)
  - `education/` — education entries (`.md`)
- **Utilities**: `src/utils/` (TypeScript helpers)
- **Types**: `src/types/index.ts`
- **Styles**: Tailwind + component-scoped CSS in `src/styles/`

## Tech stack

- **Framework**: Astro 6 with React 19 integration
- **Styling**: Tailwind CSS 4 + Tailwind Typography plugin
- **Charts**: ECharts 6 (React components in `src/components/charts/`)
- **Content**: Astro Content Collections with Zod schema validation
- **Formatting**: Prettier with `prettier-plugin-astro`
- **Node**: >=22.12.0 (enforced in `package.json`)

## TypeScript & code style

- `tsconfig.json` extends `astro/tsconfigs/strict` — keep `strict` enabled
- Explicit return types on exported functions and module-level helpers
- Avoid `any`; prefer `unknown` for untrusted input and narrow quickly
- Use `interface` for public exported object shapes; use `type` for unions/mapped types
- Use `readonly` for arrays/tuples where possible and `as const` for literal tuples

## Import ordering

1. Node / built-ins
2. External packages (react, astro, tailwind, echarts, etc.)
3. Absolute imports from `src/` (if configured)
4. Relative imports (`../` then `./`)
5. Styles & assets last

## Naming conventions

- **Pages/routes**: kebab-case (e.g., `src/pages/about.astro`)
- **Components & layouts**: PascalCase matching component name (e.g., `Navigation.astro`)
- **Stylesheets**: `src/styles/<component>.css` or inline Tailwind
- **Identifiers**: camelCase for vars/functions, UPPER_SNAKE for constants, PascalCase for types

## Astro & React specifics

- In `.astro` files, put imports and TypeScript frontmatter at the top inside the frontmatter fence (`---`)
- Type-check frontmatter using `export interface Props` for component props
- React components (`.tsx`) used inside Astro: place under `src/components/` with `jsx: react-jsx` in `tsconfig`
- Content collections: define schemas in `src/content.config.ts` using Zod; query with `getCollection()` in pages

## CSS & Tailwind

- Prefer Tailwind utility classes for layout and small styles
- For component-specific CSS, use `src/styles/<component>.css` and import explicitly
- Use CSS variables for central theming values
- Tailwind Typography plugin available for prose styling

## Error handling

- Do not swallow errors silently
- Use try/catch at boundaries and rethrow with context: `throw new Error(\`fetchPosts failed: ${err.message}\`)`

## Accessibility

- Add `alt` attributes to images
- Use semantic HTML
- Ensure visible focus styles

## Formatting & linting

- **Prettier**: `yarn format:check` to verify, `yarn format` to fix
  - Configured with `prettier-plugin-astro` for `.astro` file support
  - Config in `.prettierrc`
- **ESLint**: Not currently installed
  - If adding: install `eslint`, `eslint-plugin-astro`, `@typescript-eslint/eslint-plugin`, `@typescript-eslint/parser`
  - Run: `npx eslint . --ext .ts,.tsx,.astro`
- **Vitest**: Not currently installed
  - If adding: install `vitest`, `@vitest/ui`, `@testing-library/react`
  - Run: `npx vitest run` or `npx vitest --watch`

## Commits & PRs

- Commit message style: short imperative subject (≤50 chars) and optional body
- PR: 1–3 bullet points describing changes, testing notes, and relevant issue links

## Onboarding checklist for an agent

1. Run `yarn install` to install dependencies
2. Run `yarn dev` and confirm site boots locally at `localhost:4321`
3. Run `yarn format:check` to verify formatting
4. If making code changes, run `yarn build` to verify production build succeeds
5. If adding tests: install Vitest and create test files in `src/components/__tests__/` or `src/utils/__tests__/`

## Known quirks & gotchas

- **Content collections**: Schemas in `content.config.ts` are strict; missing required fields will cause build errors
- **ECharts**: Client-side rendering only; wrap in `client:load` or `client:visible` when used in Astro
- **Tailwind 4**: Uses Vite plugin; ensure `@tailwindcss/vite` is in dependencies
- **MDX support**: Blog posts can use `.mdx` for embedded React components; see `@astrojs/mdx` config
- **Node version**: Requires >=22.12.0; older versions may cause build failures

## Next recommended changes (optional)

1. Add ESLint config and `lint` script to `package.json`
2. Add Vitest and sample tests in `src/components/__tests__/`
3. Add CI workflow (`.github/workflows/ci.yml`) to run `format:check`, `build`, and tests on PRs
