# doc-flow — Dữ liệu lấy từ đâu? (khi project đã có docs)

Plugin **không** tự đọc toàn bộ repo rồi điền form. Agent **slot audit → hỏi đến đủ → verify → HTML** (`docs/REPORT-INTAKE.md`, `docs/MENTAL-MODEL.md`). Thiếu bước đó → form đẹp, **sai thông tin**. MCP **llm_wiki** chỉ gợi ý *câu hỏi* — không thay brief/worklog/git/user.

---

## Flow cơ bản: cần gì → ở đâu → làm sao

| Cần gì (cho report / index) | Ưu tiên lấy ở đâu | Làm sao |
|-----------------------------|-------------------|---------|
| Kế hoạch (KR, scope, approach) | `docs/work/<slug>/brief.html` | Đọc file; không có → **retro** hoặc dựng từ điều tra (ghi `retroactive`) |
| Thực tế khi làm (deviation, verify) | Cùng folder `worklog.md` | Đọc; không có → git + commit message, **không bịa lý do** |
| File / commit thay đổi | `git log`, `git diff`, `git show` | Neo theo ngày brief hoặc **commit gần nhất** (thường là việc vừa xong trước khi viết doc) |
| Scope task (path, module, feature) | Brief § Scope + `$ARGUMENTS` của `/report` | Tìm trong scope trước; scope **đề cập ra ngoài** → mở rộng đọc |
| Bối cảnh project (đang làm gì) | Root: `README*`, `docs/`, ADR, changelog gần đây | Đọc có chọn lọc — **không** thay brief/worklog làm nguồn KR |
| KR đạt hay chưa | Lệnh **Verification** trong brief §2 | Chạy lệnh, lưu exit code + output vào Evidence |

**Nguyên tắc:** Vẽ có não — điều tra trước, HTML sau. Layout không che thiếu bằng chứng.

---

## Chuỗi nguồn (lifecycle đủ 4 bước)

```
brainstorm.md (optional)
       ↓
brief.html          ← plan of record (KR, Approach, Scope) — nên Approved
       ↓
worklog.md          ← thực tế khi làm (deviation, verify KR)
       ↓
git + tests         ← bằng chứng (diff, log, lệnh verify)
       ↓
report / index.html ← đối chiếu brief vs worklog vs git
```

**Report KHÔNG được** lấy KR / plan-vs-actual chủ yếu từ:

- README cũ, Confluence, comment chat (trừ khi user **chỉ định** làm input cho slug này)
- `docs/` legacy không gắn task folder `docs/work/<slug>/`
- Suy đoán từ tên file hoặc “task tương tự”

---

## One-shot `/doc-flow:report` (raw) — điều tra bắt buộc

Khi chỉ chạy `/report` (không có `/work` trước đó), agent vẫn phải **đi kiếm** theo thứ tự:

### 1. Neo thời gian — git gần đây

Giả định hợp lý: **docs viết về việc vừa làm xong** → commit cuối (hoặc cụm commit gần nhất) là trục điều tra.

```bash
git log --oneline -30 -- .
git log -1 --format='%H %ci %s'
```

Từ đó chọn `since` cho diff/log (brief date nếu có; không có brief → từ commit/PR user chỉ hoặc cửa sổ ~7–14 ngày + commit message).

### 2. Bối cảnh root project

Đọc **có mục đích** (không quét cả repo):

- `README.md` / `README.*` ở root
- `docs/` index, ADR, design doc **được scope hoặc commit đề cập**
- File config / entrypoint mà scope hoặc diff chạm tới

Mục tiêu: hiểu **project đang nói về gì**, không copy sang report như KR.

### 3. Scope — trong trước, ngoài khi được dẫn

- **`/doc-flow:report <path-or-slug>`** → resolve `docs/work/<slug>/`, đọc `brief.html` § Scope (paths, modules, repos con).
- **Tìm trong scope:** `git log -- <scope-paths>`, `git diff --stat -- <scope-paths>`, Read file trong scope.
- **Scope đề cập ra ngoài** (dependency, package khác, service B, path `../`): Read / `git log` **cả path đó**.
- **Git log đề cập file ngoài scope** (rename, shared lib, CI): **investigate** file/commit đó trước khi ghi §5 What changed / §6.

### 4. Task folder

Luôn đọc trong folder target: `brief.html`, `worklog.md`, `brainstorm.md` (nếu có). Thiếu brief → báo retroactive; thiếu worklog → §4 ghi nguồn git-only.

### 5. Khối “Investigation” trong chat (trước HTML)

Paste tóm tắt (bullet):

- Slug / scope paths
- 5–10 commit liên quan (hash + subject)
- File đã đọc ngoài scope (vì sao mở rộng)
- Gap: no brief / no worklog / KR verify chưa chạy

Chỉ sau đó mới ghi `report.html` / `index.html`.

---

## Khi cài plugin **sau** khi project đã có docs

| Tình huống | Hành vi mong đợi | Vì sao “không ổn” nếu bỏ qua điều tra |
|------------|------------------|----------------------------------------|
| Chỉ có `docs/README`, ADR cũ | `/report` + slug; điều tra git + scope | Agent chọn brief **mới nhất** hoặc **tự dựng** |
| Có `brief.md` cũ, không có `worklog.md` | Git reconstruct; deviation = `reconstructed` | Git không ghi **lý do deviation** |
| Brief chưa **Approved** | Flag; KR = reconstructed | Report không khớp kế hoạch đã duyệt |
| Không gọi `/work` | Không có worklog | §4 không có nguồn deviation |
| Nhiều folder `docs/work/*` | User **bắt buộc** slug | Report gắn **nhầm task** |
| Repo lớn | Scope + mở rộng theo reference | Architecture / What changed **tóm tắt sai** |

**Kết luận:** Lifecycle 4 bước là **chuẩn vàng**. One-shot `/report` vẫn được nếu agent chạy **điều tra có phạm vi** ở trên — không phải thằng vẽ form trống.

---

## Mỗi field report lấy từ đâu

| Section report | Nguồn bắt buộc | Nếu thiếu |
|----------------|----------------|-----------|
| §1 Executive | Scoreboard §3 (chỉ fact đã verify) | Không khẳng định “done” |
| §3 Key Results | **KR từ brief.html** + verify (worklog / lệnh trong brief) | `unverified` hoặc ❌, không ✅ |
| §4 Plan vs Actual | **worklog** deviation register; không có → git + **nói rõ** “no worklog” | Không điền lý do deviation tự nghĩ |
| §5 What changed | `git diff` / `git log` trong scope + file git dẫn ra ngoài scope | Liệt file + commit, không mô tả chung chung |
| §6 Diagrams | Brief diagrams + code/docs **đã đọc** sau work | Đánh dấu changed / không khẳng định |
| Embed brief/worklog trong index | **Đọc file** trong cùng `docs/work/<slug>/` | Không copy từ brief task khác |

---

## Quy trình khuyến nghị (repo đã có docs)

### A — Task mới (đúng plugin)

1. `/doc-flow:brief <task>` → folder **mới** `docs/work/2026-07-06-<slug>/`
2. Duyệt → Approved trong `brief.html`
3. `/doc-flow:work` — mọi lệch kế hoạch → worklog
4. `/doc-flow:report` — chỉ định slug: `/doc-flow:report 2026-07-06-<slug>`

### B — Retrofit (đã code xong, chưa có brief/worklog)

Không tin `/report` một mình. Làm **một lần**:

1. **Retro brief:** `/doc-flow:brief` với đính kèm: README, ADR, path PR — ghi rõ **retroactive**
2. **Retro worklog:** Tạo `worklog.md`, điền từ `git log` + nhớ lại; deviation ghi **“reconstructed”**
3. **Report:** `/doc-flow:report <slug>` + agent chạy điều tra § one-shot + từng lệnh verify KR

### C — Chỉ muốn HTML đẹp cho doc cũ

Plugin **không đảm bảo** factual nếu không có (B). Coi như **typeset** — nội dung do anh paste / review tay.

---

## Lệnh agent (copy vào chat khi one-shot report)

```text
Trước khi viết report/index:
1. Resolve docs/work/<slug> từ argument — không đoán "latest"
2. Đọc brief.html + worklog.md trong folder
3. Đọc README/docs root nếu cần bối cảnh; KR vẫn từ brief
4. git log --oneline -30; neo since = brief date hoặc commit gần nhất
5. git log / git diff theo scope trong brief; mở rộng path khi scope hoặc log đề cập ngoài scope
6. Read file ngoài scope mà commit chạm
7. Chạy từng lệnh Verification trong brief §2 KR
8. Paste Investigation block + evidence; rồi mới HTML
9. Không có worklog → §4 "Source: git only; deviations may be incomplete"
```

---

## Cải tiến plugin (hướng)

- [x] DATA-CONTRACT: flow cần gì / one-shot investigation / scope expand
- [x] `/report`: investigation gate trước evidence + HTML
- [ ] Script helper `scripts/collect-evidence.sh` (optional)
- [ ] Lệnh `/doc-flow:import` (tương lai): map docs cũ → brainstorm

---

## Một câu cho team

**Report là bản đối chiếu brief + worklog + git sau khi điều tra có phạm vi — không phải form đẹp từ trí nhớ model.** Cài plugin muộn: retro brief/worklog **hoặc** one-shot report với Investigation block đầy đủ.