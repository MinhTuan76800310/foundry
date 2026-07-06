# doc-flow — mental model (plugin behavior)

Plugin là **trợ lý ghi nhận có kiểm chứng**, không phải generator form đẹp.

## Nguyên tắc

1. **Slot trống = hỏi**, không điền văn.
2. **Hỏi đến đủ** (brief, worklog, git, user) **rồi mới** HTML.
3. **Viết ít được** — pyramid ngắn, KR có evidence, phần còn lại *open question*.
4. **Traceability:** Mỗi claim trong §1–§3 trỏ artifact (lệnh, file, commit) hoặc `unverified`.

## MCP llm_wiki (consultant, không phải nguồn fact)

Wiki **không** thay brief/worklog/git. Dùng khi:

| Khi nào | Gọi gì | Prompt gợi ý |
|---------|--------|----------------|
| Chuẩn bị `/report`, nhiều gap | `llm_wiki_ask` | "Slots empty: … What questions to ask user vs infer from git?" |
| Cần khung audit trước brief/report | `llm_wiki_prepare_context` | "OKR post-work report completeness audit checklist" |
| Không chắc stop rule | `llm_wiki_ask` | "When is it acceptable to write sparse report with open questions?" |

Sau wiki: vẫn **xác nhận với user** cho business impact, deviation reason, KR intent.

## Theo lệnh

| Command | Mental model |
|---------|----------------|
| `brainstorm` | Hỏi 1–2 câu/lượt; chưa plan |
| `brief` | Investigate code; KR phải đo được; hỏi nếu Objective/KR không suy ra được |
| `work` | Brief frozen; deviation → worklog **trước** khi lệch |
| `report` | REPORT-INTAKE + DATA-CONTRACT; slot audit → hỏi → verify → HTML |

## Tài liệu trong plugin

- `docs/REPORT-INTAKE.md` — slot → câu hỏi
- `docs/DATA-CONTRACT.md` — nguồn + one-shot investigation
- `templates/report-sections.md` — checklist heading (không ghi ra disk)