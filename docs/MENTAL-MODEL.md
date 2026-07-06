# doc-flow — mental model (plugin behavior)

Plugin là **trợ lý ghi nhận có kiểm chứng**, không phải generator form đẹp.

## Nguyên tắc

1. **Slot trống = hỏi**, không điền văn.
2. **Hỏi đến đủ** (brief, worklog, git, user) **rồi mới** HTML.
3. **Viết ít được** — pyramid ngắn, KR có evidence, phần còn lại *open question*.
4. **Traceability:** Mỗi claim trong §1–§3 trỏ artifact (lệnh, file, commit) hoặc `unverified`.

## ReAct loop + Consultant (firewall fact/thinking)

Plugin **lặp** reason → act → observe → **gate** đến khi mỗi slot có evidence
hoặc `Open:` rồi mới ghi HTML — xem `docs/REACT-LOOP.md`.

**Consultant** (`docs/CONSULTANT.md`) chỉ nắn *cách nghĩ* (hỏi gì, KR dimension,
diagram, audit), **không** cấp fact project. Fallback chain — external tool
không bắt buộc:

```
Tier 1  llm_wiki MCP   (user này có)
Tier 2  MCP khác
Tier 3  Claude + docs trong repo   ← luôn đủ, không cần MCP
```

| Khi nào | Gọi consultant | Prompt (project-agnostic) |
|---------|----------------|----------------------------|
| Nhiều gap, chưa rõ hỏi gì | Tier 1→3 | "Slots empty: … questions to ask user vs infer from git?" |
| Cần khung audit trước brief/report | Tier 1→3 | "OKR post-work report completeness audit checklist" |
| Không chắc stop rule | Tier 1→3 | "When is a sparse report with open questions acceptable?" |

**Cấm hỏi consultant:** KR value, what changed, deviation reason, status —
đó là fact, chỉ brief/worklog/git/**user** trả lời. Sau consultant vẫn **xác
nhận với user** cho business impact, deviation reason, KR intent.

## Theo lệnh

| Command | Mental model |
|---------|----------------|
| `brainstorm` | Hỏi 1–2 câu/lượt; chưa plan |
| `brief` | ReAct loop; investigate code; KR phải đo được (+ lệnh verify); gate trước khi ghi `brief.html` |
| `work` | Brief frozen; deviation → worklog **trước** khi lệch |
| `report` | ReAct loop; slot audit → hỏi → verify → **gate** → HTML (sparse OK) |

## Tài liệu trong plugin

- `docs/REACT-LOOP.md` — vòng reason→act→observe→gate + `intake-state.json`
- `docs/CONSULTANT.md` — role how-to-think, fallback Tier 1→3, cấm hỏi fact
- `docs/REPORT-INTAKE.md` — slot → câu hỏi
- `docs/DATA-CONTRACT.md` — nguồn + one-shot investigation
- `templates/report-sections.md` — checklist heading (không ghi ra disk)