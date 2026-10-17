import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';

const runGit = (...args) => execFileSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
const lock = JSON.parse(readFileSync('package-lock.json', 'utf8'));
const version = pkg.version;
const parse = (value) => {
  const match = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/.exec(value);
  if (!match) throw new Error(`Invalid stable SemVer: ${value}`);
  return match.slice(1).map(Number);
};

if (lock.version !== version || lock.packages?.['']?.version !== version) {
  throw new Error('package.json and package-lock.json root versions must match');
}
if (existsSync('openclaw.plugin.json')) {
  const plugin = JSON.parse(readFileSync('openclaw.plugin.json', 'utf8'));
  if (plugin.version !== version) throw new Error('OpenClaw plugin version must match package.json');
}
const html = readFileSync('futbot-app/index.html', 'utf8');
if (!html.includes(`<meta name="futbot-site-version" content="${version}">`)) {
  throw new Error('index.html site version must match package.json');
}
if (!existsSync('.git')) {
  console.log(`Version ${version} is internally consistent (source history unavailable in build context)`);
  process.exit(0);
}

let previous;
try {
  previous = JSON.parse(runGit('show', 'origin/main:package.json')).version;
} catch {
  previous = '0.1.0'; // First versioned change; the existing site had no manifest.
}
const [major, minor, patch] = parse(previous);
parse(version);
const changed = runGit('status', '--porcelain', '--untracked-files=all') ||
  runGit('diff', '--name-only', 'origin/main...HEAD');

if (!changed) {
  let alreadyMerged = false;
  try {
    runGit('merge-base', '--is-ancestor', 'HEAD', 'origin/main');
    alreadyMerged = true;
  } catch { /* This is a branch that still needs a bump. */ }
  if (alreadyMerged) {
    console.log(`Version ${version} belongs to a merged source revision`);
    process.exit(0);
  }
}

const allowed = [`${major}.${minor}.${patch + 1}`, `${major}.${minor + 1}.0`];
if (process.env.FUTBOT_ALLOW_MAJOR === '1') allowed.push(`${major + 1}.0.0`);
if (!allowed.includes(version)) {
  throw new Error(`Version ${version} must be one PATCH or MINOR bump from latest main (${previous})` +
    (process.env.FUTBOT_ALLOW_MAJOR === '1' ? ', or the owner-authorized MAJOR bump' : ''));
}
console.log(`Version ${previous} -> ${version} is valid`);
