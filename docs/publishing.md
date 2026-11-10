# Publishing packages

The `checks` workflow runs formatting, ESLint, builds, package export validation, all Jest and
Chromium tests, release tooling tests, and a Storybook build on pushes and pull requests.
Package builds run in dependency order. `npm run check:packages` verifies exported files and
runtime dependency ranges.

## Packages and authentication

All nine workspace packages publish to GitHub Packages under `@lemuel-manske`:

- `config-eslint`
- `config-jest`
- `config-playwright`
- `config-prettier`
- `config-typescript`
- `config-vite`
- `design-tokens`
- `utils`
- `components`

Only the root workspace remains private. Configuration packages include their exported files;
Playwright's helpers publish compiled JavaScript and declarations.

The scope matches the GitHub account that owns `lemuel-manske/ui`. The publishing workflow uses
the built-in `GITHUB_TOKEN` with `packages: write` and `contents: write` permissions. No personal
publishing token or `GH_PACKAGES_TOKEN` secret is required.

GitHub Packages initially creates private packages; their owner can change package visibility
in GitHub's package settings. See [GitHub's npm registry documentation](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry).

## Semantic versioning

`semantic-release` calculates one shared version for every package from Conventional Commits
since the last `v*` release tag:

| Commit                                                | Release                  |
| ----------------------------------------------------- | ------------------------ |
| `fix: correct a rendering issue`                      | Patch                    |
| `feat: add a component`                               | Minor                    |
| `feat!: remove an API` or a `BREAKING CHANGE:` footer | Major                    |
| `docs:`, `style:`, `test:`, `ci:`, or `chore:`        | No release by themselves |

The first semantic release is `1.0.0` when there are no previous release tags. Source manifest
versions are development values. During a release, the tool updates all package versions,
internal dependency ranges, and the lockfile in the runner; these changes are not committed
back to the repository. Git tags and the registry track published versions.

## Publish on demand

1. Commit changes using Conventional Commits and push them to `main`.
2. Open **Actions → publish → Run workflow** and select `main`.

There are no publishing inputs. The workflow reruns all checks, calculates the next version,
builds and validates all nine packages, publishes them to `https://npm.pkg.github.com`, and
creates a `v<version>` Git tag and GitHub Release with generated release notes. All packages
publish together. A run without release-worthy commits finishes without publishing.

Publishing remains manual. Runs on branches other than `main` skip the publishing job.
The GitHub Release is created after every package publishes successfully.

`npm run release -- --dry-run` previews the next version and release notes without publishing;
it still requires Git authentication. See the [semantic-release documentation](https://semantic-release.org/usage/configuration/).

## Install in another project

Add this scope mapping to the consuming project's `.npmrc`:

```ini
@lemuel-manske:registry=https://npm.pkg.github.com
```

Authenticate using a classic personal token with `read:packages` permission, then install:

```sh
npm login --scope=@lemuel-manske --auth-type=legacy --registry=https://npm.pkg.github.com
npm install @lemuel-manske/components
```

Store authentication in user settings or CI secrets. GitHub requires authentication to download
public packages as well.
