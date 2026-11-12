## [2.0.0](https://github.com/lemuel-manske/ui/compare/v1.1.0...v2.0.0) (2026-11-12)

### ⚠ BREAKING CHANGES

- remove className and unrestricted visual overrides from
  public component and hook inputs. Custom themes must implement the updated
  DesignTokens contract, including divider and branding foundation tokens.

### Features

- introduce theme-driven branding ([23deaa3](https://github.com/lemuel-manske/ui/commit/23deaa3e277af98eb22080cf273f84443ef75e94))
- make `index.ts` the default entry point for config-vite ([45c240c](https://github.com/lemuel-manske/ui/commit/45c240c11cfcfeeea8890242319ff56a243a2bf1))
- **ui-design-tokens:** update OpenArchive tokens ([348b3cc](https://github.com/lemuel-manske/ui/commit/348b3cc75583bdfaf4fee37fe8d38e96c561d124))

### Bug Fixes

- build workspaces in dependency order ([f157bba](https://github.com/lemuel-manske/ui/commit/f157bba64b4c2b003087877ba5a806708abc1602))
- **config-vite:** resolve the default entry under src ([81fe6bf](https://github.com/lemuel-manske/ui/commit/81fe6bff0aacd7be0b9fc1f65a728cee0a612f21))
