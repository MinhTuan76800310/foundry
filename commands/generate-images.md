---
description: Generate AI sketch PNGs from viz-spec.json using VILAO_API_KEY in project .env (no script copy)
argument-hint: "[task folder under docs/work — default latest viz-spec]"
---

Generate **`generated-images/`** for the current doc-flow task.

**Anh chỉ cần `.env` ở root repo app** (`VILAO_API_KEY=...`). Script nằm trong plugin — **không copy** vào project.

## Steps

1. Resolve task folder: argument or latest `docs/work/*/viz-spec.json` under **cwd**.
2. Confirm `viz-spec.json` has `imageRequests[]` (from `/doc-flow:report`).
3. Confirm **`<project-root>/.env`** has `VILAO_API_KEY` (or `API_KEY`).
4. Run (ask Bash approval):

```bash
node "${CLAUDE_PLUGIN_ROOT}/scripts/generate-viz-images.mjs" --cwd "$(pwd)" "<task-folder-relative-to-cwd>"
```

Example:

```bash
node "${CLAUDE_PLUGIN_ROOT}/scripts/generate-viz-images.mjs" --cwd "$(pwd)" docs/work/2026-07-04-my-task
```

5. Tell user: refresh `index.html` → **#viz-story**; manifest at `generated-images-manifest.json`.

If `.env` missing: stop and say add `.env` only — HTML + dynamic #viz still work without images.