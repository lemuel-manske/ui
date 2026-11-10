import childProcess from 'node:child_process';
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

function setWorkspaceVersions(cwd, version) {
  if (!/^\d+\.\d+\.\d+$/.test(version)) {
    throw new Error('A stable semantic release version is required.');
  }

  const directories = [
    '',
    ...readdirSync(join(cwd, 'packages'), { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => `packages/${entry.name}`),
  ];

  const manifests = directories.map((directory) => ({
    directory,
    manifest: JSON.parse(readFileSync(join(cwd, directory, 'package.json'), 'utf8')),
  }));

  const workspaceNames = new Set(manifests.slice(1).map(({ manifest }) => manifest.name));

  const lockPath = join(cwd, 'package-lock.json');

  const lock = JSON.parse(readFileSync(lockPath, 'utf8'));

  for (const { directory } of manifests) {
    if (!lock.packages[directory]) {
      throw new Error(`Missing lockfile entry for ${directory || 'the root workspace'}.`);
    }
  }

  for (const { directory, manifest } of manifests) {
    manifest.version = version;

    for (const group of [
      'dependencies',
      'devDependencies',
      'peerDependencies',
      'optionalDependencies',
    ]) {
      for (const [name, range] of Object.entries(manifest[group] ?? {})) {
        if (workspaceNames.has(name) && !range.startsWith('file:')) {
          manifest[group][name] = `^${version}`;
        }
      }

      if (manifest[group]) {
        lock.packages[directory][group] = manifest[group];
      }
    }

    lock.packages[directory].version = version;

    writeFileSync(join(cwd, directory, 'package.json'), `${JSON.stringify(manifest, null, 2)}\n`);
  }

  lock.version = version;

  writeFileSync(lockPath, `${JSON.stringify(lock, null, 2)}\n`);
}

function prepare(_options, { cwd, env, nextRelease }) {
  setWorkspaceVersions(cwd, nextRelease.version);

  for (const script of ['build', 'check:packages']) {
    childProcess.execFileSync('npm', ['run', script], { cwd, env, stdio: 'inherit' });
  }
}

function publish(_options, { cwd, env }) {
  childProcess.execFileSync('npm', ['publish', '--workspaces'], { cwd, env, stdio: 'inherit' });
}

export { prepare, publish };
