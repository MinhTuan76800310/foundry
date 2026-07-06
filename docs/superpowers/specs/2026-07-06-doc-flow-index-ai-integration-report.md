# Báo cáo tích hợp: `index.html` (chuẩn) + dynamic + ảnh AI

**Đối tượng:** Product / plugin doc-flow v0.4 direction  
**Chuẩn thị giác:** [docs/work/2026-07-04-worklog-verify/index.html](../../../work/2026-07-04-worklog-verify/index.html)  
**Ngày:** 2026-07-06

---

## 1. Kết luận (đọc trước)

| Deliverable | Vai trò |
|-------------|---------|
| **`index.html`** | **File chính** partner mở — full embed brief + worklog + report + **#viz dynamic** (giữ nguyên font/style dogfood). |
| **`report.html`** | Cùng pyramid §1–8, có thể rút gọn nav — dùng khi chỉ cần “báo cáo”, không cần bundle. |
| **`brief.html`** | Plan of record — cùng DNA CSS, ít #viz hơn. |
| **`viz-spec.json`** | Dữ liệu máy: story, charts, **imageRequests** → sinh PNG. |
| **`generated-images/`** | Output model — **nhúng vào `index.html`**, không thay thế canvas/SVG tương tác. |

**Nguyên tắc:** Dynamic HTML (play flow, scrub timeline, grep sim, KR bars animate) **luôn có**. Ảnh AI **bổ sung** chỗ Mermaid/SVG/Rough **không đủ “đọc hiểu / human”**.

---

## 2. Bố cục một `index.html` (đề xuất cố định)

Thứ tự section — **không đổi** để partner quen:

```
[top-nav]  Report · Brief · Worklog · Artifact · Viz · (optional) Story

§0  Hero
     - task title, meta table, 1 đoạn “single-file bundle”

§1  #report   (lane-tag: report)
     - FULL text report §1–8 (pyramid)
     - §3 KR: bảng evidence + (dynamic) canvas KR bên dưới hoặc trong #viz

§2  #brief    (lane-tag: brief)
     - FULL brief §0–11

§3  #worklog  (lane-tag: work)
     - log table + deviation register

§4  #artifact (optional)
     - marker.txt, screenshots, v.v.

§5  #viz      (lane-tag: viz)  ← LUÔN DYNAMIC
     - Play flow (SVG/canvas)
     - Timeline scrub
     - Format morph + grep sim
     - KR bars (data từ bảng §3)

§6  #viz-story (optional, khi có viz-spec.story + ảnh)
     - A→B→C: ảnh AI hero HOẶC Rough + click node
     - readable text (tiếng Anh/Việt)
     - ảnh detail khối B / C (generated-images/…)
     - vẫn giữ nút/tab “Interactive only” scroll lên #viz
```

**`report.html` riêng:** chỉ §0 hero ngắn + §1–§8, **không** embed brief/worklog; có thể link `index.html` “full bundle”.

---

## 3. Khi nào dùng gì? (Mermaid vs dynamic vs ảnh AI)

| Nhu cầu | Công cụ trong bundle | Lý do |
|---------|----------------------|--------|
| KR %, timeline, grep, play particle | **#viz dynamic** (canvas/SVG + JS) | Số liệu đúng, tương tác, đồng bộ bảng |
| Architecture đơn giản, ≤15 node, không nested | Mermaid → SVG inline **hoặc** `flow-play` | Đủ cho sơ đồ phẳng |
| **A→B→C + “bên trong B có B1,B2,B3”** | **Ảnh AI** + `story` trong viz-spec + (optional) Rough click | Mermaid khó “human story” + zoom conceptual |
| Business impact / metaphor (partner) | **1 ảnh AI** trong §2 report | Không cần tương tác |
| Deviation D1 (YAML vs JSON) | **Dynamic** `split-morph` + bảng | Cần đúng nội dung file |
| “Sơ đồ đẹp in PDF” | Ảnh AI hoặc Excalidraw export | Static OK |

**Quy tắc plugin:** Trong **Viz plan**, mỗi section ghi một trong: `dynamic` | `mermaid` | `ai-image` | `table-only`.

---

## 4. `viz-spec.json` — thêm `imageRequests`

Agent (`/report`) điền khi Viz plan chọn `ai-image`:

```json
"imageRequests": [
  {
    "id": "story-abc-flow",
    "file": "generated-images/story-abc-flow.png",
    "slot": "index#viz-story.hero",
    "promptHint": "A brief frozen plan, B worklog deviation, C report bundle; warm paper #F5EEDC navy orange green hand-drawn infographic",
    "when": "story present"
  },
  {
    "id": "block-B-detail",
    "file": "generated-images/block-B-worklog-detail.png",
    "slot": "index#viz-story.node.B",
    "promptHint": "Inside worklog: B1 log B2 deviation B3 register D1",
    "when": "node B has detail"
  }
]
```

Post-step (user hoặc CI):

```bash
node scripts/generate-viz-images.mjs docs/work/<slug>
# merge paths into index.html <img src="generated-images/...">
```

Plugin **không** gọi API trong Claude session mặc định (key, cost) — agent ghi `imageRequests`; user chạy script.

---

## 5. Trong một file report (nội dung), ảnh đặt ở đâu?

Trong **phần embed report** bên trong `index.html`:

| Report § | Dynamic | Ảnh AI gợi ý |
|----------|---------|----------------|
| §1 Executive | Không | Không (chữ đủ) |
| §2 Business impact | Không | **Optional:** 1 figure “traceability / partner trust” |
| §3 Key Results | **KR canvas** trong #viz | **Optional:** sketch bar **minh họa** dưới bảng (bảng vẫn source of truth) |
| §4 Plan vs Actual | **Timeline** #viz | Ảnh “inside deviation” nếu có khối con phức tạp |
| §5 What changed | List only | Không |
| §6 Architecture | Mermaid/SVG hoặc **ảnh story** | Ảnh khi multi-team / metaphor / nested subsystem |
| §7–§8 | Text | Không |

**Brief embed:** §6 Architecture — ưu tiên ảnh AI **nếu** brief mô tả hệ thống lạ với partner; ngược lại `flow-play` dynamic.

---

## 6. Pipeline plugin (v0.4)

```
/brainstorm → brainstorm.md
/brief      → brief.html + viz-spec.json (draft charts/story)
/work       → worklog.md
/report     → report.html + index.html (canonical bundle) + viz-spec.json (final)
              + imageRequests[]
     ↓ (optional local)
generate-viz-images.mjs → generated-images/
     ↓
index.html đã có <img> slot hoặc script đọc manifest
```

**Canonical template:** `templates/bundle.html` = structural copy of dogfood `index.html` + placeholders `<!-- SLOT:viz-story-images -->` trong #viz hoặc section #viz-story.

---

## 7. Style lock (ảnh AI)

Mọi `promptHint` phải append:

> Warm cream paper #F5EEDC, subtle grid, navy #0B2545, orange #D75C2A, green #2A7553, hand-drawn editorial infographic, Space-Grotesk-like labels feeling, **not photorealistic**, match doc-flow index.html warm_dynamic.

---

## 8. Việc làm tiếp (implementation)

- [x] Spec báo cáo này
- [ ] `commands/report.md`: bắt buộc `viz-spec.json` + `imageRequests` khi Viz plan có `ai-image`
- [ ] `skills/doc-visuals`: bảng hybrid + canonical path `index.html` dogfood
- [ ] `templates/bundle.html`: nav + sections như index; slot #viz-story
- [ ] `scripts/merge-ai-into-index.mjs` (optional): inject imgs from manifest

**Reference demos trong folder dogfood:**

- `index.html` — main bundle  
- `viz-rendered.html` — dynamic story Rough  
- `viz-ai-gallery.html` — gallery ảnh AI  
- `viz-spec.json` v2 + `generate-viz-images.mjs`