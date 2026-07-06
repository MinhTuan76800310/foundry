# Report intake — cần biết gì, hỏi gì, khi nào mới viết

Plugin **không** mở template rồi điền cho đủ section. Mỗi field trong `report-sections.md` là một **slot**: trống = **câu hỏi**, không phải đoạn văn bịa.

**Chất lượng > độ dài:** Thu thập nhiều (git, docs, user), xuất report **ngắn** được — miễn mỗi câu trace được evidence hoặc ghi rõ *open question*.

**Mental model consultant:** Khi không chắc checklist hoặc còn gap, gọi MCP **`llm_wiki_ask`** (và nếu cần `llm_wiki_prepare_context`) với prompt dạng:

```text
Post-work report slots still empty: [list gaps].
Audience: German engineering partner, pyramid, OKR+verify, plan-vs-actual.
What questions should I ask the user or confirm from git before writing?
Prefer question checklist, not prose filler.
```

Dùng câu trả lời wiki để **bổ sung** checklist dưới đây — không thay brief/worklog/git.

---

## Vòng lặp: Clarify → Verify → Report

```
Intent (brief / user) → điều tra (git, scope, docs) → slot audit
       ↓
  Slot trống? → HỎI user (1–4 câu / lượt) hoặc llm_wiki_ask
       ↓
  Mỗi slot: evidence HOẶC open question (không prose)
       ↓
  Viết report.html / index.html (có thể thưa section)
```

**Stop rule:** Chỉ ghi HTML khi:

- Folder task đã resolve (không đoán `latest`).
- Mỗi KR trong brief có **Target + Actual + Score + Evidence** hoặc `unverified` + lý do.
- Plan baseline đã chỉ (brief Approach) hoặc ghi `no approved brief — baseline reconstructed`.
- Executive §1 chỉ khẳng định điều §3 đã chứng minh.

User có thể nói *"viết sparse, list open questions"* — khi đó section thiếu được thay bằng bullet **Open:** thay vì bịa.

---

## Slot → cần biết gì → hỏi gì → nguồn

| Slot (report-sections) | Phải biết trước khi viết | Hỏi user (nếu git/docs không đủ) | Infer từ git/CI (chỉ khi đủ chứng minh) |
|------------------------|-------------------------|-----------------------------------|----------------------------------------|
| **Status** (Done/Partial/Stopped) | Trạng thái thật so với brief Objective | "Coi task là done, partial, hay stopped? Vì sao?" | Không đoán — hỏi nếu không rõ |
| **§1 Apex** — đạt Objective? | Một câu kết luận duy nhất | "Một câu cho CTO: objective đạt/chưa?" | Chỉ sau khi §3 scored |
| **§1 Done / Not done** | Outcome có evidence | "3 outcome chắc chắn nhất? 3 việc còn lại?" | Liệt kê từ commit/PR **sau khi** user xác nhận ý nghĩa |
| **§1 Decision needed** | Blocker cần leadership | "Có quyết định nào leadership phải chốt không?" | — |
| **§2 Business impact** | Thay đổi user/cost/risk (ngôn ngữ business) | "User/customer/risk thay đổi thế nào? (không tên component)" | Không suy từ tên file |
| **§3 KR*** | Target, actual, verify method | Per KR: "Số đo thực tế? Đã chạy lệnh verify trong brief chưa?" | Commit/CI chỉ khi KR = deliverable artifact |
| **§4 Plan vs Actual** | Baseline từ brief Approach | "Bước nào lệch kế hoạch? Lý do (nếu biết)?" | worklog; không worklog → git timeline, **không bịa reason** |
| **§5 What changed** | File/module + commit | Thường đủ từ git | `git log` / `diff` scope + expand |
| **§6 Architecture** | Trạng thái cuối vs brief | "Diagram brief còn đúng không? Node nào đổi?" | Read code paths đã đụng |
| **§7 Learnings** | Bài học thật | "1–2 learning đáng ghi? Follow-up ai?" | Không invent |
| **§8 Docs updated** | Doc maintenance từ brief | "Doc nào trong brief đã cập nhật?" | `git diff` trên path docs |

\* Nếu **không có brief:** hỏi user *"KR nào dùng để score? Hay chỉ narrative từ git?"* — không tự nghĩ KR.

---

## Ba câu verify (plan / KR / regression)

Trước §4 và §3, agent tự kiểm:

1. **Phải thay đổi gì** (theo brief / scope)?
2. **Biết đã làm đúng bằng cách nào** (lệnh verify, metric, sign-off)?
3. **Biết chưa phá gì** (test, scope out)?

Slot nào không trả lời được → **open question**, không ✅.

---

## Git vs team (routing)

| Loại fact | Ai / đâu |
|-----------|----------|
| File đổi, commit, PR | Git |
| KR đạt ý định, root cause deviation, business impact | **User / team** |
| Load test đại diện, sign-off partner | **User** |

Git cho *what*; team cho *whether intent met* và *why*.

---

## Lệnh `/doc-flow:report` — thứ tự bắt buộc

1. Read `REPORT-INTAKE.md` + `DATA-CONTRACT.md` + `templates/report-sections.md`.
2. Investigation (scope, git, root context) — như DATA-CONTRACT.
3. **Slot audit** (chat): bảng slot → filled / gap / source.
4. **Hỏi** gap quan trọng (AskUserQuestion hoặc chat 1–2 câu); tùy chọn `llm_wiki_ask` khi checklist mơ hồ.
5. Chạy verify KR; cập nhật slot audit.
6. **Chỉ bây giờ** viết HTML — section nào vẫn gap → ngắn + **Open:** hoặc bỏ subsection.

---

## Liên kết field template

Chi tiết heading: `templates/report-sections.md`.  
Nguồn evidence: `docs/DATA-CONTRACT.md`.  
Viz: `skills/doc-visuals/SKILL.md` — số liệu KR trong `#viz` khớp bảng §3, không invent.