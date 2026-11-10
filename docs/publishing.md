# Publishing packages

The `Checks` workflow runs formatting, ESLint, package builds, package export validation, all
Jest and Chromium tests, and a Storybook build on pushes and pull requests. Package builds run
in dependency order. `npm run check:packages` checks that each exported file is present in its
package and that runtime dependencies use publishable version ranges.

## GitHub Packages setup

All nine workspace packages publish to `https://npm.pkg.github.com`:

- `@lkmliz/config-eslint`
- `@lkmliz/config-jest`
- `@lkmliz/config-playwright`
- `@lkmliz/config-prettier`
- `@lkmliz/config-typescript`
- `@lkmliz/config-vite`
- `@lkmliz/design-tokens`
- `@lkmliz/utils`
- `@lkmliz/components`

Only the root workspace remains private. Static configuration packages include their exported
configuration files; Playwright's TypeScript configuration helpers publish compiled JavaScript
and declarations.

GitHub Packages scopes belong to GitHub accounts or organizations. Keeping `@lkmliz` requires
publishing permission for the GitHub account or organization named `lkmliz`.

For this repository (`lemuel-manske/ui`), add an Actions repository secret named
`GH_PACKAGES_TOKEN` containing a classic personal access token with `write:packages` permission
for `lkmliz`. Authorize the token for organization SSO if required. Do not commit the token.
If the repository is moved under `lkmliz`, the workflow can instead use its built-in
`GITHUB_TOKEN`.

See [GitHub's npm registry documentation](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry)
for scope, authentication, repository association, and package visibility details.

## Publish on demand

1. Update the package versions in their `package.json` files. When releasing dependencies,
   update the component package's dependency ranges as needed.
2. Run `npm install --package-lock-only --ignore-scripts`, then commit and push the manifests
   and lockfile.
3. Open **Actions → Publish packages → Run workflow** on GitHub.
4. Choose the branch or tag and run the workflow. There are no package or distribution-tag options.

The workflow reruns all checks before publishing the versions recorded in the selected commit.
Every run publishes all nine packages: configuration packages, design tokens, utilities, then
components. npm uses its default `latest` distribution tag. Each package version can be published
once, so update already-published versions before starting another release or retrying a partially
completed release.

Publishing never runs automatically on a push. GitHub Packages initially creates private
packages; their owner can change visibility in the package settings.

## Install in another project

Add this scope mapping to that project's `.npmrc`:

```ini
@lkmliz:registry=https://npm.pkg.github.com
```

Authenticate with GitHub Packages using a classic token with `read:packages` access, then install:

```sh
npm login --scope=@lkmliz --auth-type=legacy --registry=https://npm.pkg.github.com
npm install @lkmliz/components
```

Configure authentication in the consuming project's user settings or CI secrets, outside source
control. GitHub requires authentication to download public packages as well.
