# doc-flow: Cursor vs Claude Code CLI

## `/plugin` không chạy ở đâu?

| Môi trường | `/plugin marketplace update` | `/doc-flow:*` |
|------------|-------------------------------|---------------|
| **Terminal:** `claude` (Claude Code CLI) | ✅ Có | ✅ Có (sau install) |
| **Cursor / VS Code** chat (một số mode) | ❌ *"/plugin isn't available"* | ⚠️ Tùy extension — thử gõ `/doc-flow:brief` |
| **Session này (agent)** | ❌ | Dùng **prompt tay** hoặc **terminal** bên dưới |

## Cài / cập nhật plugin (đúng cách)

Mở **terminal**, không phải ô chat Cursor:

```bash
cd ~
claude
```

Trong session Claude Code:

```text
/plugin marketplace add /home/minhtuan958/Documents/doc-flow
/plugin install doc-flow@doc-flow
```

Cập nhật sau khi `git pull`:

```text
/plugin marketplace update
```

Hoặc sync tay (đã có script trên máy anh):

```bash
rsync -a --exclude .git /home/minhtuan958/Documents/doc-flow/ \
  ~/.claude/plugins/cache/doc-flow/doc-flow/0.3.0/
```

Restart `claude` hoặc Cursor window.

## Không có slash command — vẫn generate docs

Trong **bất kỳ** Claude (Cursor hoặc CLI), dán prompt:

```text
Follow doc-flow plugin at /home/minhtuan958/Documents/doc-flow:
Read commands/brief.md and skills/doc-visuals/SKILL.md.
Create PRE-WORK brief for: <task>.
Write docs/work/<today>-<slug>/brief.html only. Viz plan first. Stop after brief.
```

Tương tự `commands/work.md`, `commands/report.md`.

## Ảnh AI — không cần `/doc-flow:generate-images`

Chỉ `.env` ở **root repo app**:

```bash
cd /path/to/your-app
# .env có VILAO_API_KEY=...

node /home/minhtuan958/Documents/doc-flow/scripts/generate-viz-images.mjs \
  --cwd "$(pwd)" docs/work/<your-task-folder>
```

Không copy script — path tuyệt đối tới repo doc-flow là đủ.

## Lệnh mới `generate-images`

Chỉ có sau khi cache plugin đã sync (xem `commands/generate-images.md` trong cache).

Trong **terminal `claude`**:

```text
/doc-flow:generate-images docs/work/2026-07-04-...
```