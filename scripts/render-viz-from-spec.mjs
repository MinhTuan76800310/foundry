#!/usr/bin/env node
/**
 * viz-spec.json → viz-rendered.html
 * v2: story A→B→C + readable captions + detail sub-diagram below focused node
 */
import { readFileSync, writeFileSync } from 'fs';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const specPath = resolve(process.argv[2] || join(root, 'docs/work/2026-07-04-worklog-verify/viz-spec.json'));
const spec = JSON.parse(readFileSync(specPath, 'utf8'));
const outHtml = join(dirname(specPath), 'viz-rendered.html');
const specJson = JSON.stringify(spec).replace(/</g, '\\u003c');

const html = `<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Story viz — ${escapeHtml(spec.task?.title || 'doc-flow')}</title>
<link href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&family=Patrick+Hand&family=Newsreader&display=swap" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/roughjs@4.6.6/bundled/rough.js"><\/script>
<style>
  :root { --paper:#F5EEDC; --ink:#0B2545; --orange:#D75C2A; --green:#2A7553; --card:#FCF9EF; }
  * { box-sizing: border-box; }
  body { margin:0; background:var(--paper); color:var(--ink); font-family:Newsreader,serif; line-height:1.55; }
  .wrap { max-width:880px; margin:0 auto; padding:28px 20px 64px; }
  h1 { font-family:Caveat,cursive; font-size:2.6rem; margin:0 0 6px; }
  .hint { font-family:'Patrick Hand',cursive; font-size:1.15rem; color:#64748b; margin-bottom:20px; }
  .story-panel { background:var(--card); border:3px solid var(--ink); padding:20px; margin-bottom:20px; }
  .story-panel h2 { font-family:Caveat,cursive; font-size:1.9rem; margin:0 0 8px; color:#2563eb; }
  #canvas-main { width:100%; height:200px; display:block; cursor:pointer; }
  .node-btns { display:flex; flex-wrap:wrap; gap:10px; margin-top:12px; }
  .node-btns button {
    font-family:'Patrick Hand',cursive; font-size:1.05rem; padding:10px 16px;
    border:2px solid var(--ink); background:var(--card); cursor:pointer;
  }
  .node-btns button.active { background:var(--ink); color:var(--paper); }
  .node-btns button.has-detail { border-color:var(--orange); }
  .readable-box {
    margin-top:20px; padding:18px 20px; background:#fff8e8;
    border-left:5px solid var(--orange); font-size:1.05rem;
  }
  .readable-box h3 { font-family:Caveat,cursive; font-size:1.6rem; margin:0 0 8px; }
  .detail-zone {
    margin-top:24px; padding:20px; border:2px dashed var(--orange);
    background:var(--card); min-height:120px;
  }
  .detail-zone.empty { color:#94a3b8; font-family:'Patrick Hand',cursive; font-size:1.1rem; text-align:center; padding:40px; }
  .detail-zone h4 { font-family:Caveat,cursive; font-size:1.5rem; margin:0 0 6px; color:var(--orange); }
  .detail-caption { font-family:'Patrick Hand',cursive; color:#64748b; margin-bottom:12px; }
  #canvas-detail { width:100%; height:220px; display:block; }
  .child-list { margin:12px 0 0; padding:0; list-style:none; }
  .child-list li { font-family:'Patrick Hand',cursive; padding:6px 0; border-bottom:1px dotted #cbd5e1; }
  .child-list strong { color:var(--ink); }
  .charts { margin-top:40px; }
  .block { background:var(--card); border:2px solid var(--ink); padding:16px; margin-bottom:20px; }
  .block h2 { font-family:Caveat,cursive; font-size:1.5rem; margin:0 0 10px; }
  canvas.chart { width:100%; max-width:720px; height:auto; display:block; margin:0 auto; }
</style>
</head>
<body>
<div class="wrap">
  <h1>${escapeHtml(spec.task?.title || 'Visualization')}</h1>
  <p class="hint">Click A / B / C trên sơ đồ hoặc nút bên dưới — khối có chi tiết (B, C) sẽ hiện <strong>chú thích</strong> + <strong>sơ đồ con</strong> phía dưới.</p>

  <section class="story-panel" id="story-section">
    <h2 id="story-title">Luồng chính</h2>
    <p id="story-caption" class="hint" style="margin-top:0"></p>
    <canvas id="canvas-main" width="840" height="200"></canvas>
    <div class="node-btns" id="node-btns"></div>
    <div class="readable-box" id="readable" style="display:none">
      <h3 id="readable-title"></h3>
      <p id="readable-text"></p>
    </div>
    <div class="detail-zone empty" id="detail-zone">
      Chọn khối <strong>B (worklog)</strong> hoặc <strong>C (report)</strong> để xem mối quan hệ con và hình minh họa bên trong.
    </div>
  </section>

  <section class="charts" id="charts-root"></section>
</div>
<script id="viz-spec-data" type="application/json">${specJson}<\/script>
<script>
const spec = JSON.parse(document.getElementById('viz-spec-data').textContent);
const RC = rough;
const COLORS = { fail:'#D75C2A', pass:'#2A7553', ink:'#0B2545', orange:'#D75C2A' };
let selectedId = 'B';

function drawMainFlow(story) {
  const c = document.getElementById('canvas-main');
  const rc = RC.canvas(c);
  const ctx = c.getContext('2d');
  ctx.clearRect(0, 0, c.width, c.height);
  const nodes = story.nodes;
  const pos = {};
  const nw = 120, nh = 56, y = 72;
  nodes.forEach((n, i) => { pos[n.id] = { x: 50 + i * 250, y, n }; });
  story.edges.forEach(e => {
    const a = pos[e.from], b = pos[e.to];
    if (!a || !b) return;
    rc.line(a.x + nw, a.y + nh/2, b.x, b.y + nh/2, { roughness: 1.5, strokeWidth: 2, stroke: COLORS.ink });
    rc.arrow(a.x + nw + 20, a.y + nh/2, b.x - 8, b.y + nh/2, { roughness: 1.2, stroke: COLORS.ink });
    if (e.label) {
      ctx.font = '14px Caveat';
      ctx.fillStyle = COLORS.orange;
      ctx.fillText(e.label, (a.x + b.x) / 2 + 40, a.y - 6);
    }
  });
  nodes.forEach(n => {
    const p = pos[n.id];
    const sel = n.id === selectedId;
    const hasD = n.detail && n.detail.children;
    rc.rectangle(p.x, p.y, nw, nh, {
      roughness: 2,
      stroke: sel ? COLORS.orange : COLORS.ink,
      strokeWidth: sel ? 3 : 2,
      fill: sel ? 'rgba(215,92,42,0.12)' : '#FCF9EF',
      fillStyle: 'solid'
    });
    ctx.font = 'bold 18px Patrick Hand';
    ctx.fillStyle = COLORS.ink;
    ctx.fillText(n.id + ' · ' + n.label, p.x + 10, p.y + 28);
    ctx.font = '13px Patrick Hand';
    ctx.fillStyle = '#64748b';
    ctx.fillText(n.short || '', p.x + 10, p.y + 46);
    if (hasD) {
      ctx.font = '11px Caveat';
      ctx.fillStyle = COLORS.orange;
      ctx.fillText('▼ chi tiết', p.x + nw - 52, p.y + nh + 14);
    }
  });
  return pos;
}

function drawDetail(detail) {
  const zone = document.getElementById('detail-zone');
  zone.classList.remove('empty');
  zone.innerHTML = '<h4>' + detail.title + '</h4><p class="detail-caption">' + detail.caption + '</p><canvas id="canvas-detail" width="800" height="220"></canvas><ul class="child-list" id="child-list"></ul>';
  const c = document.getElementById('canvas-detail');
  const rc = RC.canvas(c);
  const ctx = c.getContext('2d');
  const children = detail.children || [];
  const edges = detail.internalEdges || [];
  const cx = 80, cy = 100, gap = 200;
  const cpos = {};
  children.forEach((ch, i) => {
    const x = cx + i * gap;
    cpos[ch.id] = { x, y: cy - 30, ch };
    rc.rectangle(x, cy - 30, 100, 50, { roughness: 2.2, fill: '#fffef8', fillStyle: 'solid', stroke: COLORS.orange, strokeWidth: 2 });
    ctx.font = '15px Patrick Hand';
    ctx.fillStyle = COLORS.ink;
    ctx.fillText(ch.id, x + 8, cy - 8);
    ctx.font = '12px Patrick Hand';
    ctx.fillText(ch.label, x + 8, cy + 8);
  });
  edges.forEach(e => {
    const a = cpos[e.from], b = cpos[e.to];
    if (!a || !b) return;
    rc.line(a.x + 50, a.y + 50, b.x, b.y + 25, { roughness: 1.8, stroke: COLORS.ink });
    if (e.label) {
      ctx.font = '12px Caveat';
      ctx.fillStyle = '#64748b';
      ctx.fillText(e.label, (a.x + b.x) / 2, (a.y + b.y) / 2 + 40);
    }
  });
  const ul = document.getElementById('child-list');
  children.forEach(ch => {
    const li = document.createElement('li');
    li.innerHTML = '<strong>' + ch.id + ' — ' + ch.label + '</strong>: ' + (ch.role || '');
    ul.appendChild(li);
  });
}

function selectNode(id) {
  selectedId = id;
  const story = spec.story;
  if (!story) return;
  document.getElementById('story-title').textContent = story.title || 'Luồng chính';
  document.getElementById('story-caption').textContent = story.caption || '';
  const pos = drawMainFlow(story);
  const node = story.nodes.find(n => n.id === id);
  const rb = document.getElementById('readable');
  const zone = document.getElementById('detail-zone');
  if (node) {
    rb.style.display = 'block';
    document.getElementById('readable-title').textContent = node.id + ' — ' + node.label;
    document.getElementById('readable-text').textContent = node.readable || node.short || '';
    if (node.detail && node.detail.children && node.detail.children.length) {
      drawDetail(node.detail);
    } else {
      zone.classList.add('empty');
      zone.innerHTML = 'Khối <strong>' + node.id + '</strong> không có sơ đồ con trong spec — chỉ chú thích phía trên.';
    }
  }
  document.querySelectorAll('#node-btns button').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.id === id);
  });
}

function initStory() {
  const story = spec.story;
  if (!story) {
    document.getElementById('story-section').style.display = 'none';
    return;
  }
  const btns = document.getElementById('node-btns');
  story.nodes.forEach(n => {
    const b = document.createElement('button');
    b.type = 'button';
    b.dataset.id = n.id;
    b.textContent = n.id + ' → ' + n.label;
    if (n.detail) b.classList.add('has-detail');
    b.onclick = () => selectNode(n.id);
    btns.appendChild(b);
  });
  const c = document.getElementById('canvas-main');
  c.onclick = (ev) => {
    const story = spec.story;
    const rect = c.getBoundingClientRect();
    const x = (ev.clientX - rect.left) * (c.width / rect.width);
    story.nodes.forEach((n, i) => {
      const nx = 50 + i * 250;
      if (x >= nx && x <= nx + 120) selectNode(n.id);
    });
  };
  selectNode(selectedId);
}

function renderBar(chart, canvas) {
  canvas.width = 720; canvas.height = 280;
  const rc = RC.canvas(canvas);
  const ctx = canvas.getContext('2d');
  const pad = { l: 50, t: 30, b: 50 };
  const W = 620, H = 180, baseY = pad.t + H;
  rc.line(50, baseY, 670, baseY, { roughness: 1.3, strokeWidth: 2 });
  chart.series.forEach((s, i) => {
    const pct = s.value / (s.max || 100);
    const x = 120 + i * 220;
    const h = H * pct;
    const fill = s.intent === 'fail' ? COLORS.fail : COLORS.pass;
    if (h > 1) rc.rectangle(x, baseY - h, 60, h, { roughness: 2, fill, fillStyle: 'solid', stroke: COLORS.ink });
    ctx.font = '14px Patrick Hand';
    ctx.fillText(s.label, x - 10, baseY + 22);
  });
}

function renderTimeline(chart, canvas) {
  canvas.width = 720; canvas.height = 200;
  const rc = RC.canvas(canvas);
  const ctx = canvas.getContext('2d');
  const ev = chart.events;
  const y = 90, pad = 40, W = 640;
  rc.line(pad, y, pad + W, y, { roughness: 1.4, strokeWidth: 2 });
  ev.forEach((e, i) => {
    const x = pad + (W * i) / Math.max(1, ev.length - 1);
    const fill = e.kind === 'deviation' ? COLORS.fail : COLORS.pass;
    rc.circle(x, y, e.kind === 'deviation' ? 28 : 18, { roughness: 2, fill, fillStyle: 'solid', stroke: COLORS.ink });
    ctx.font = '13px Patrick Hand';
    ctx.fillText(e.at, x - 12, y - 32);
    ctx.fillText(e.label, x - 50, y + 38);
  });
}

(spec.charts || []).forEach(ch => {
  const root = document.getElementById('charts-root');
  const div = document.createElement('div');
  div.className = 'block';
  const cv = document.createElement('canvas');
  cv.className = 'chart';
  div.innerHTML = '<h2>' + (ch.title || ch.id) + '</h2>';
  div.appendChild(cv);
  root.appendChild(div);
  if (ch.type === 'bar') renderBar(ch, cv);
  else if (ch.type === 'timeline') renderTimeline(ch, cv);
});

initStory();
<\/script>
</body>
</html>`;

writeFileSync(outHtml, html, 'utf8');
console.log('Wrote:', outHtml);

function escapeHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}