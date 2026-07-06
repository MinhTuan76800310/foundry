# doc-flow — Dữ liệu lấy từ đâu? (khi project đã có docs)

Plugin **không** tự đọc toàn bộ repo rồi điền form. Nó điền report theo **chuỗi nguồn** + **bằng chứng**. Nếu thiếu nguồn, model dễ **điền cho đủ section** → đúng hình thức, **sai thông tin**.

---

## Chuỗi nguồn (đúng thứ tự)

```
brainstorm.md (optional)
       ↓
brief.html          ← plan of record (KR, Approach, Scope) — PHẢI Approved
       ↓
worklog.md          ← thực tế khi làm (deviation, verify KR)
       ↓
git + tests         ← bằng chứng (diff, log, lệnh verify)
       ↓
report / index.html ← đối chiếu brief vs worklog vs git
```

**Report KHÔNG được** lấy KR / plan-vs-actual chủ yếu từ:

- README cũ, Confluence, comment chat
- `docs/` legacy không gắn task folder `docs/work/<slug>/`
- Suy đoán từ tên file hoặc “task tương tự”

---

## Khi cài plugin **sau** khi project đã có docs

| Tình huống | Hành vi plugin hiện tại | Vì sao “không ổn” |
|------------|-------------------------|-------------------|
| Chỉ có `docs/README`, ADR cũ | `/report` không biết brief nào | Agent chọn brief **mới nhất** hoặc **tự dựng** nội dung |
| Có `brief.md` cũ, không có `worklog.md` | Report bảo “reconstruct từ git” | Git không ghi **lý do deviation** → §4 Plan vs Actual **bịa** |
| Brief chưa **Approved** | `/work` hỏi nhưng vẫn có thể chạy tiếp | KR trong report không khớp kế hoạch đã duyệt |
| Làm việc **không** gọi `/work` | Không có worklog | Report **không có** nguồn deviation |
| Nhiều folder `docs/work/*` | “Most recent brief.html” | Report gắn **nhầm task** |
| Repo lớn, một lần `/report` | Agent đọc một phần code | Architecture / What changed **tóm tắt sai** |

**Kết luận:** Plugin giả định **lifecycle 4 bước trên task folder**. Docs cũ rải rác **không thay** brief + worklog + evidence.

---

## Mỗi field report lấy từ đâu

| Section report | Nguồn bắt buộc | Nếu thiếu |
|----------------|----------------|-----------|
| §1 Executive | Scoreboard §3 (chỉ fact đã verify) | Không khẳng định “done” |
| §3 Key Results | **KR từ brief.html** + verify (worklog / lệnh trong brief) | `unverified` hoặc ❌, không ✅ |
| §4 Plan vs Actual | **worklog** deviation register; không có → git + **nói rõ** “no worklog” | Không điền lý do deviation tự nghĩ |
| §5 What changed | `git diff` / `git log` từ ngày brief | Liệt file + commit, không mô tả chung chung |
| §6 Diagrams | Brief diagrams + **trạng thái thật** sau work | Đánh dấu changed / không khẳng định |
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
3. **Report:** `/doc-flow:report` + yêu cầu agent: *chạy từng lệnh verify KR trong brief, paste output vào evidence*

### C — Chỉ muốn HTML đẹp cho doc cũ

Plugin **không đảm bảo** factual nếu không có (B). Coi như **typeset** — nội dung do anh paste / review tay.

---

## Lệnh agent nên chạy trước `/report` (copy vào chat)

```text
Trước khi viết report/index:
1. Đọc đúng folder docs/work/<slug>/brief.html + worklog.md
2. git log --oneline --since="<brief date>" -- .
3. git diff <base>..HEAD --stat
4. Chạy từng lệnh Verification trong brief §2 KR; lưu exit code/output
5. Mọi câu trong §1 Executive phải có trong bảng §3
6. Không có worklog → §4 ghi "Source: git only; deviations may be incomplete"
```

---

## Cải tiến plugin (hướng)

- [ ] `/report` bắt buộc argument slug hoặc path brief (cấm silent “latest” nếu >1 folder)
- [ ] Checklist “evidence block” trong chat trước khi ghi HTML
- [ ] Skill: cấm ✅ nếu không có output lệnh verify
- [ ] Lệnh `/doc-flow:import` (tương lai): gợi ý map docs cũ → brainstorm, không auto-fill report

---

## Một câu cho team

**Report là bản đối chiếu brief + worklog + git, không phải bản tóm tắt ý kiến model.** Cài plugin muộn thì phải **retro brief/worklog** hoặc chấp nhận review tay — không thì chỉ đúng **layout** `index.html`.