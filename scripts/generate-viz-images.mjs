#!/usr/bin/env node
/**
 * Generate images from viz-spec.json imageRequests.
 * Reads VILAO_API_KEY from .env in PROJECT ROOT (--cwd or walk up from task dir).
 * Usage: node .../generate-viz-images.mjs [--cwd /project] docs/work/<slug>
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';

const STYLE = 'Warm cream paper #F5EEDC, navy #0B2545, orange #D75C2A, green #2A7553, hand-drawn infographic, not photorealistic. ';

function parseArgs(argv) {
  let cwd = process.cwd();
  const paths = [];
  for (let i = 2; i < argv.length; i++) {
    if (argv[i] === '--cwd' && argv[i + 1]) { cwd = resolve(argv[++i]); continue; }
    paths.push(argv[i]);
  }
  return { cwd, taskArg: paths[0] };
}

function loadEnv(projectRoot) {
  const p = join(projectRoot, '.env');
  if (!existsSync(p)) throw new Error('Missing .env in project root: ' + projectRoot);
  const env = {};
  for (const line of readFileSync(p, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
    if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, '').trim();
  }
  const key = env.VILAO_API_KEY || env.API_KEY;
  if (!key) throw new Error('Set VILAO_API_KEY in ' + p);
  return key;
}

function promptsFromSpec(spec) {
  if (spec.imageRequests?.length) {
    return spec.imageRequests.map((r) => ({
      file: r.file.split('/').pop(),
      prompt: STYLE + (r.promptHint || r.id),
    }));
  }
  return [
    { file: 'story-abc-flow.png', prompt: STYLE + 'Flow A brief B worklog C report, hand arrows' },
    { file: 'kr-scoreboard-sketch.png', prompt: STYLE + 'Bar chart KR1 0% KR2 100%' },
  ];
}

async function generateImage(apiKey, prompt) {
  const res = await fetch('https://api.vilao.ai/v1/images/generations', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + apiKey, 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: 'alic/wan2.7-image-pro', prompt, n: 1, size: 'auto' }),
  });
  const text = await res.text();
  if (!res.ok) throw new Error('API ' + res.status + ': ' + text.slice(0, 400));
  const data = JSON.parse(text);
  const item = data.data?.[0];
  if (!item) throw new Error('No image');
  if (item.b64_json) return Buffer.from(item.b64_json, 'base64');
  if (item.url) return Buffer.from(await (await fetch(item.url)).arrayBuffer());
  throw new Error('No b64_json or url');
}

const { cwd, taskArg } = parseArgs(process.argv);
const taskDir = resolve(cwd, taskArg || 'docs/work/2026-07-04-worklog-verify');
const specPath = join(taskDir, 'viz-spec.json');
if (!existsSync(specPath)) {
  console.error('No viz-spec.json at', specPath);
  process.exit(1);
}
const spec = JSON.parse(readFileSync(specPath, 'utf8'));
const apiKey = loadEnv(cwd);
const outDir = join(taskDir, 'generated-images');
mkdirSync(outDir, { recursive: true });
const manifest = { generatedAt: new Date().toISOString(), projectRoot: cwd, images: [] };

for (const { file, prompt } of promptsFromSpec(spec)) {
  console.log('Generating', file);
  try {
    const buf = await generateImage(apiKey, prompt);
    writeFileSync(join(outDir, file), buf);
    manifest.images.push({ file, ok: true });
    console.log('  OK', buf.length, 'bytes');
  } catch (e) {
    console.error('  FAIL', e.message);
    manifest.images.push({ file, error: e.message });
  }
}
writeFileSync(join(taskDir, 'generated-images-manifest.json'), JSON.stringify(manifest, null, 2));
console.log('Done.', taskDir);
