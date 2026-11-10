import { spawnSync } from 'node:child_process';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDirectory = fileURLToPath(new URL('../', import.meta.url));

const prettier = fileURLToPath(
  new URL('./bin/prettier.cjs', import.meta.resolve('prettier/package.json')),
);

const eslint = fileURLToPath(
  new URL('./bin/eslint.js', import.meta.resolve('eslint/package.json')),
);

const workspaces = new Map();

for (const file of process.argv.slice(2)) {
  const parts = relative(rootDirectory, file).split('/');

  const workspace = parts[0] === 'packages' && parts.length > 2 ? parts.slice(0, 2).join('/') : '';

  if (!workspaces.has(workspace)) {
    workspaces.set(workspace, []);
  }

  workspaces.get(workspace).push(file);
}

function run(tool, args, cwd) {
  const result = spawnSync(process.execPath, [tool, ...args], { cwd, stdio: 'inherit' });

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

for (const [workspace, files] of workspaces) {
  const cwd = join(rootDirectory, workspace);

  run(prettier, ['--write', '--ignore-unknown', ...files], cwd);

  const sourceFiles = files.filter((file) => /\.[cm]?[jt]sx?$/.test(file));

  if (sourceFiles.length > 0) {
    const config = workspace === 'packages/config-eslint' ? ['--config', 'node.js'] : [];

    run(eslint, ['--fix', ...config, ...sourceFiles], cwd);
  }
}
