#!/usr/bin/env node
/**
 * Generate hand-sketch images from viz-spec via Vilao API (reads .env in repo root).
 * Usage: node scripts/generate-viz-images.mjs [task-folder]
 * Requires: VILAO_API_KEY in .env (never commit .env)
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

function loadEnv() {
  const p = join(root, '.env');
  if (!existsSync(p)) throw new Error('Missing .env with VILAO_API_KEY');
  const lines = readFileSync(p, 'utf8').split('\n');
  const env = {};
  for (const line of lines) {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
    if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, '').trim();
  }
  const key = env.VILAO_API_KEY || env.API_KEY || env.OPENAI_API_KEY;
  if (!key) throw new Error('Set VILAO_API_KEY=... in .env');
  return key;
}

const STYLE =
  'Warm cream paper background #F5EEDC, subtle graph paper grid, navy blue ink #0B2545, accent orange #D75C2A and green #2A7553, hand-drawn sketch infographic style like warm editorial field guide, clean readable labels, no photorealistic photos, single illustration panel';

const PROMPTS = [
  {
    file: 'story-abc-flow.png',
    prompt: `${STYLE}. Horizontal flow diagram three boxes: A brief (approved plan frozen), arrow to B worklog (append-only journal), arrow to C report and index HTML bundle. Handwritten style arrows. Labels: brief, worklog, report. Top title: doc-flow lifecycle.`,
  },
  {
    file: 'block-B-worklog-detail.png',
    prompt: `${STYLE}. Zoom-in diagram inside worklog block: three connected sketch nodes B1 Log table, B2 Deviation row at 10:01, B3 Register D1. Arrows: deviation before file write. Subtitle: inside worklog - plan vs actual.`,
  },
  {
    file: 'kr-scoreboard-sketch.png',
    prompt: `${STYLE}. Hand-drawn bar chart two bars: KR1 delivery 0 percent red-orange bar empty, KR2 process 100 percent green bar full. Title Key Results scoreboard. Marker file YAML vs JSON deviation.`,
  },
];

async function generateImage(apiKey, prompt) {
  const res = await fetch('https://api.vilao.ai/v1/images/generations', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'alic/wan2.7-image-pro',
      prompt,
      n: 1,
      size: 'auto',
    }),
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`API ${res.status}: ${text.slice(0, 500)}`);
  const data = JSON.parse(text);
  const item = data.data?.[0];
  if (!item) throw new Error('No image in response: ' + text.slice(0, 300));
  if (item.b64_json) return Buffer.from(item.b64_json, 'base64');
  if (item.url) {
    const img = await fetch(item.url);
    return Buffer.from(await img.arrayBuffer());
  }
  throw new Error('No b64_json or url in response');
}

async function main() {
  const taskDir = resolve(process.argv[2] || join(root, 'docs/work/2026-07-04-worklog-verify'));
  const outDir = join(taskDir, 'generated-images');
  mkdirSync(outDir, { recursive: true });
  const apiKey = loadEnv();
  const manifest = { generatedAt: new Date().toISOString(), images: [] };

  for (const { file, prompt } of PROMPTS) {
    console.log('Generating', file, '...');
    try {
      const buf = await generateImage(apiKey, prompt);
      const outPath = join(outDir, file);
      writeFileSync(outPath, buf);
      manifest.images.push({ file, path: `generated-images/${file}` });
      console.log('  OK', outPath, buf.length, 'bytes');
    } catch (e) {
      console.error('  FAIL', file, e.message);
      manifest.images.push({ file, error: e.message });
    }
  }

  writeFileSync(join(taskDir, 'generated-images-manifest.json'), JSON.stringify(manifest, null, 2));
  console.log('Done. Manifest:', join(taskDir, 'generated-images-manifest.json'));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});