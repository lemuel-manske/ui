# Repository Guidelines

## Project Structure & Module Organization

This repository is an npm workspace monorepo for the `@lemuel-manske` React design system.

- `packages/ui-components/src/`: component folders such as `button/` and `radio-group/`, containing components, hooks, CSS Modules, stories, and colocated tests.
- `packages/ui-utils/src/`: shared hooks and utilities.
- `packages/ui-design-tokens/src/`: typed tokens and enums; the build generates theme CSS.
- `packages/config-*`: shared ESLint, Prettier, TypeScript, Vite, Jest, and Playwright configuration.
- `packages/ui-components/.storybook/`: Storybook configuration and preview styles. Package `playwright/` directories contain browser test harnesses.

Expose public APIs through each package's `src/index.ts`. Build output belongs in ignored `dist/` directories.

## Documentation Guidelines

Do not alter `README.md` to add documentation. Keep the README very short; do not document features or usage there.

## Build, Test, and Development Commands

Run commands from the repository root:

- `npm ci`: install locked workspace dependencies.
- `npm run storybook`: start component documentation on port 6006.
- `npm run test`: runs Jest and Playwright tests in all workspaces.
- `npm run lint` and `npm run format`: check all workspaces with ESLint and Prettier.
- `npm run lint:fix` and `npm run format:fix`: apply automated fixes.

## Coding Style & Naming Conventions

Use strict TypeScript, ES modules, and React function components.

Follow existing two-space indentation, semicolons, single quotes, trailing commas, and Prettier's 100-column width.

Use PascalCase component filenames (`Button.tsx`), camelCase hooks (`useButton.ts`), and lowercase, hyphenated component directories. Keep styles in `Component.module.css`, prop types in `types.ts`, and variant definitions in `options.ts` where appropriate.

Use empty lines to separate logical blocks. When in doubt to separate or not, separate. Always.

Keep design token groups flat and semantic, with CSS variables named `--ui-{group}-{token}`.
Use action tokens for interactive colors and state tokens for focus and validation. Themes must
implement the complete `DesignTokens` contract; avoid component-specific color tokens.

## Testing Guidelines

Jest runs `src/**/*.test.ts` unit tests. Playwright runs `src/**/*.test.tsx` component and hook tests in Chromium. Colocate fixtures as `*.test-fixture.tsx` and stories as `*.stories.tsx`.

Test interactions, keyboard behavior, accessible names, and representative integration scenarios. Use the shared `@lemuel-manske/config-playwright` helpers and `noAccessibilityViolations()` matcher. No numeric coverage threshold is configured. Target components with `npm run test --workspace @lemuel-manske/components`.

## Commit & Pull Request Guidelines

This project follows the [Conventional Commits](https://www.conventionalcommits.org/) specification.

Also, commit hooks are in place to run linting before commits.
