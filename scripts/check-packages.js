import { execFileSync } from 'node:child_process';
import { readFileSync, readdirSync } from 'node:fs';

const packagesDirectory = new URL('../packages/', import.meta.url);

const manifests = new Map(
  readdirSync(packagesDirectory, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => {
      const manifest = JSON.parse(
        readFileSync(new URL(`${entry.name}/package.json`, packagesDirectory), 'utf8'),
      );

      return [manifest.name, manifest];
    }),
);

const packages = JSON.parse(
  execFileSync('npm', ['pack', '--workspaces', '--dry-run', '--json'], {
    cwd: new URL('../', import.meta.url),
    encoding: 'utf8',
  }),
);

function exportTargets(exports) {
  return typeof exports === 'string' ? [exports] : Object.values(exports).flatMap(exportTargets);
}

for (const { name, version, files } of packages) {
  const manifest = manifests.get(name);

  const paths = new Set(files.map((file) => `./${file.path}`));

  for (const target of exportTargets(manifest.exports)) {
    if (!paths.has(target)) {
      throw new Error(`${name}: exported file ${target} is missing from the package`);
    }
  }

  for (const [dependency, range] of Object.entries(manifest.dependencies ?? {})) {
    if (/^(file|link|workspace):/.test(range)) {
      throw new Error(`${name}: ${dependency} must use a publishable dependency version`);
    }
  }

  console.log(`Validated ${name}@${version}: ${files.length} packaged files`);
}
