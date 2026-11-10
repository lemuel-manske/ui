import assert from 'node:assert/strict';
import childProcess from 'node:child_process';
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';

import releaseConfig from '../release.config.js';

import { prepare, publish, setWorkspaceVersions } from './release-workspaces.js';

function fixture(t) {
  const cwd = mkdtempSync(join(tmpdir(), 'ui-release-test-'));

  t.after(() => rmSync(cwd, { recursive: true, force: true }));

  const manifests = {
    '': {
      name: '@lemuel-manske/ui',
      version: '0.1.0',
      private: true,
      devDependencies: { '@lemuel-manske/config': 'file:packages/config' },
    },
    'packages/components': {
      name: '@lemuel-manske/components',
      version: '0.1.0',
      dependencies: { '@lemuel-manske/utils': '^0.1.0' },
      peerDependencies: { react: '^19.0.0' },
      devDependencies: { '@lemuel-manske/config': 'file:../config' },
    },
    'packages/utils': { name: '@lemuel-manske/utils', version: '0.1.0' },
    'packages/config': { name: '@lemuel-manske/config', version: '0.1.0' },
  };

  for (const [directory, manifest] of Object.entries(manifests)) {
    mkdirSync(join(cwd, directory), { recursive: true });

    writeFileSync(join(cwd, directory, 'package.json'), JSON.stringify(manifest));
  }

  writeFileSync(
    join(cwd, 'package-lock.json'),
    JSON.stringify({
      name: '@lemuel-manske/ui',
      version: '0.1.0',
      lockfileVersion: 3,
      packages: {
        ...manifests,
        'node_modules/react': { version: '19.3.0', integrity: 'unchanged' },
      },
    }),
  );

  return cwd;
}

function read(cwd, path) {
  return JSON.parse(readFileSync(join(cwd, path), 'utf8'));
}

test('release versions every workspace and updates internal dependency ranges and the lockfile', (t) => {
  const cwd = fixture(t);

  setWorkspaceVersions(cwd, '1.2.3');

  for (const directory of ['', 'packages/components', 'packages/utils', 'packages/config']) {
    assert.equal(read(cwd, join(directory, 'package.json')).version, '1.2.3');
  }

  const components = read(cwd, 'packages/components/package.json');

  assert.equal(components.dependencies['@lemuel-manske/utils'], '^1.2.3');

  assert.equal(components.peerDependencies.react, '^19.0.0');

  assert.equal(components.devDependencies['@lemuel-manske/config'], 'file:../config');

  assert.equal(read(cwd, 'package.json').private, true);

  const lock = read(cwd, 'package-lock.json');

  assert.equal(lock.version, '1.2.3');

  assert.equal(lock.packages['packages/config'].version, '1.2.3');

  assert.equal(lock.packages[''].version, '1.2.3');

  assert.deepEqual(lock.packages['packages/components'].dependencies, components.dependencies);

  assert.deepEqual(lock.packages['node_modules/react'], {
    version: '19.3.0',
    integrity: 'unchanged',
  });
});

test('invalid release versions and incomplete lockfiles fail before changing manifests', (t) => {
  const cwd = fixture(t);

  assert.throws(() => setWorkspaceVersions(cwd, 'invalid'), /semantic release version/);

  const lock = read(cwd, 'package-lock.json');

  delete lock.packages['packages/utils'];

  writeFileSync(join(cwd, 'package-lock.json'), JSON.stringify(lock));

  assert.throws(() => setWorkspaceVersions(cwd, '1.0.0'), /Missing lockfile entry/);

  assert.equal(read(cwd, 'package.json').version, '0.1.0');

  assert.equal(read(cwd, 'packages/components/package.json').version, '0.1.0');
});

test('release preparation builds and validates the versioned packages', (t) => {
  const cwd = fixture(t);

  const calls = [];

  t.mock.method(childProcess, 'execFileSync', (command, args, options) => {
    assert.equal(read(cwd, 'packages/components/package.json').version, '1.0.0');

    calls.push({ command, args, cwd: options.cwd });
  });

  prepare({}, { cwd, env: {}, nextRelease: { version: '1.0.0' } });

  assert.deepEqual(calls, [
    { command: 'npm', args: ['run', 'build'], cwd },
    { command: 'npm', args: ['run', 'check:packages'], cwd },
  ]);
});

test('publishing includes every workspace and propagates publication failures', (t) => {
  const failure = new Error('Registry rejected publication');

  t.mock.method(childProcess, 'execFileSync', (command, args) => {
    assert.equal(command, 'npm');

    assert.deepEqual(args, ['publish', '--workspaces']);

    throw failure;
  });

  assert.throws(() => publish({}, { cwd: '/tmp', env: {} }), failure);
});

const requireRelease = createRequire(import.meta.resolve('semantic-release'));

const { analyzeCommits } = await import(
  requireRelease.resolve('@semantic-release/commit-analyzer')
);

test('configured release notes render the Conventional Commits preset', async () => {
  const { generateNotes } = await import(
    requireRelease.resolve('@semantic-release/release-notes-generator')
  );

  const notes = await generateNotes(releaseConfig.plugins[1][1], {
    cwd: process.cwd(),
    options: { repositoryUrl: 'https://github.com/lemuel-manske/ui.git' },
    commits: [{ hash: 'abc123', message: 'feat: add timeline' }],
    lastRelease: { version: '1.0.0', gitTag: 'v1.0.0' },
    nextRelease: { version: '1.1.0', gitTag: 'v1.1.0' },
    logger: { log() {} },
  });

  assert.match(notes, /add timeline/);

  assert.match(notes, /1\.1\.0/);
});

for (const [message, expected] of [
  ['fix: correct rendering', 'patch'],
  ['feat: add a timeline', 'minor'],
  ['feat!: remove an API', 'major'],
  ['fix: change behavior\n\nBREAKING CHANGE: old consumers must migrate.', 'major'],
  ['ci: change the workflow', null],
]) {
  test(`configured commit analysis maps ${message.split('\n')[0]} to ${expected}`, async () => {
    const actual = await analyzeCommits(releaseConfig.plugins[0][1], {
      cwd: process.cwd(),
      commits: [{ hash: 'abc123', message }],
      logger: { log() {} },
    });

    assert.equal(actual, expected);
  });
}
