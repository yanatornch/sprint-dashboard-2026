---
name: backlog-import
description: Import backlog items from an HTML file into the sprint dashboard. Parses the file, previews the items, then POSTs to the /api/update-backlog endpoint to update Firestore. Use when the user wants to update the backlog table, seed new sprint backlog items, or replace the current backlog with items from a planning document.
---

# Backlog Import

Parse an HTML file into structured backlog items and send them to the dashboard API, which replaces the Firestore `backlog` collection.

**API endpoint:** `POST https://sprint-dashboard-2026.vercel.app/api/update-backlog`  
**Auth:** `Authorization: Bearer <BACKLOG_API_SECRET>`

## When to use

- "import backlog from this file"
- "update the backlog with [file path]"
- "replace backlog with new sprint plan"
- `/backlog-import ~/Desktop/sprint12.html`

---

## Step 1 — Get the file

Args to the skill = file path. If no path given, ask:
> "Which HTML file should I import? Please provide the full file path."

Read the file with the Read tool.

---

## Step 2 — Parse items

Extract backlog items from the HTML. Support these formats:
- `<table>` with columns for title, priority, status, tags, notes
- `<ul>` / `<ol>` list of items
- Headings as priority group labels, items as children

**Extract per item:**

| Field | Required | Type |
|---|---|---|
| `title` | ✓ | string |
| `priority` | ✓ | see mapping below |
| `status` | ✓ | see mapping below |
| `tags` | — | string[] |
| `notes` | — | string[] |
| `noteTypes` | — | string[] |
| `isNew` | — | boolean, default false |
| `order` | auto | 1, 2, 3… in document order |

**Priority mapping:**
| Text in file | Field value |
|---|---|
| P1, Critical, Must | `p1` |
| P2, High, Should | `p2` |
| P3, Medium, Could | `p3` |
| P4, Low, Admin, Nice to have | `p4` |
| Carry over, Carryover, Ongoing | `carryover` |
| Waiting, On hold, Blocked (group) | `waiting` |

**Status mapping:**
| Text in file | Field value |
|---|---|
| New, Todo, Not started | `New` |
| In progress, Doing, Active, WIP | `In Progress` |
| Blocked | `Blocked` |
| Waiting, On hold | `Waiting` |
| Pending | `Pending` |
| Done, Complete, Delivered | `Done` |

**noteTypes** — if not explicit, auto-detect:
- Contains "waiting", "blocked", "hold", "pending", "⏳", "❌" → `warn`
- Contains "sprint", "focus", "new", "UAT", "ℹ️" → `info`
- Contains "done", "complete", "ready", "✅" → `good`
- Otherwise → `default`

---

## Step 3 — Preview

Print a summary before calling the API:

```
📋 Backlog import preview — 24 items

  🔴 P1 Critical   3 items
  🟠 P2 High       4 items
  🔵 P3 Medium     5 items
  🟢 P4 Admin      6 items
  🟣 Carryover     3 items
  🟡 Waiting       3 items

Sample items:
  1. [p1] HC Registration UAT — New  #HC-Reg #Dev
  2. [p1] Market Village closure — Blocked  #Delivery
  3. [p2] TailMed kickoff — New  #TailMed

⚠️  This will REPLACE all 24 existing backlog items in the dashboard.
Proceed? (yes / no)
```

Wait for explicit "yes" before calling the API.

---

## Step 4 — Call the API

Get `BACKLOG_API_SECRET` from the environment (it's in `.env` as `BACKLOG_API_SECRET`).  
If not found in env, ask the user to provide it.

```bash
curl -s -X POST https://sprint-dashboard-2026.vercel.app/api/update-backlog \
  -H "Authorization: Bearer $BACKLOG_API_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"items": [...]}'
```

Or use the Bash tool to run that curl command with the full JSON payload.

The API returns:
```json
{ "success": true, "written": 24, "deleted": 22, "items": [...] }
```

---

## Step 5 — Confirm

Report the result:
```
✅ Backlog updated — 24 items written (22 old items replaced)
Refresh the dashboard to see changes: https://sprint-dashboard-2026.vercel.app/#backlog
```

If the API returns an error, show the error message and suggest fixes.

---

## Error handling

| Error | Fix |
|---|---|
| 401 Unauthorized | Check BACKLOG_API_SECRET in .env |
| 400 invalid priority | Re-check priority mapping for that item |
| 400 invalid status | Re-check status mapping for that item |
| 400 missing title | Item is missing a title — skip or ask user |
| 500 | Firestore write failed — retry or check Vercel logs |
