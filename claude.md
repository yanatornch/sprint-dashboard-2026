# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start local Vite dev server
npm run build      # Build to dist/ (Vercel runs this on deploy)
node azure_sync.js          # Manual Azure DevOps → Firestore sync (needs .env)
node notify_unfinished.js   # Manual Friday report trigger (needs .env)
node seed_backlog.js        # One-time seed of backlog collection into Firestore
node setup_auth.js          # One-time seed of email + role fields onto users docs
```

Requires `.env` with: `AZURE_ORG`, `AZURE_PROJECT`, `AZURE_PAT`, `WEBHOOK_URL`, `WEBHOOK_SECRET`, `SPRINT_NOTIFY_URL`

## Deploy

Push to `main` → Vercel auto-builds and deploys. No CLI needed. Vercel config is in `vercel.json` (buildCommand, outputDirectory, framework). New HTML pages must be added to `vite.config.js` `rollupOptions.input` or they 404 in production.

## Architecture

**Frontend** (`index.html` + `main.js`): Vanilla JS bundled by Vite. `main.js` uses top-level `await` (requires `esnext` target in `vite.config.js`). Fetches all data from Firestore on load, then renders purely client-side using Chart.js (loaded via CDN in `index.html`).

**Auth** (`auth.js` + `login.html`): Microsoft OAuth via Firebase Auth (`OAuthProvider("microsoft.com")`). `requireAuth()` is called at the top of `main.js` with top-level `await` — it resolves `{ user, role }` or redirects to `/login.html`. Role is read from the `email` field on the user's doc in the `users` Firestore collection. `admin` role sees the Sync Azure button; `user` role does not. New admin-only features should check `currentRole !== "admin"`.

**Firebase** (`firebase.js`): Browser-side uses CDN ESM imports (`https://www.gstatic.com/firebasejs/11.0.1/`). Node.js scripts (`azure_sync.js`, `notify_unfinished.js`, `api/*.js`) use npm `firebase` package. **Never mix these** — CDN imports break in Node.js, npm imports break in the browser.

**Vercel API functions** (`api/`): Four serverless functions:
- `api/leave.js` — POST endpoint to record personal leave into Firestore. Requires `Authorization: Bearer ${LEAVE_API_SECRET}` header.
- `api/trigger-sync.js` — POST endpoint that fires GitHub Actions `azure-sync.yml` workflow via `workflow_dispatch`. Requires `GITHUB_ACTIONS_TOKEN` env var.
- `api/team-status.js` — team status helper.
- `api/update-backlog.js` — POST endpoint to replace backlog items in Firestore. Requires `Authorization: Bearer ${BACKLOG_API_SECRET}` header.

**GitHub Actions** (`.github/workflows/`):
- `azure-sync.yml` — runs `azure_sync.js` every Friday at 23:00 UTC (06:00 ICT Saturday). Also triggered by the Sync Azure button via `api/trigger-sync.js`.
- `notify-unfinished.yml` — runs `notify_unfinished.js` every Friday at 11:00 UTC (18:00 ICT). Sends dev team unfinished task report to `SPRINT_NOTIFY_URL`.

## Firestore Collections

| Collection | Description |
|---|---|
| `tasks` | Individual Azure DevOps work items. Doc ID: `task_${azureId}` |
| `sprintUserStats` | Points + task count per person per sprint. Doc ID: `sprint_${n}_${person}` |
| `sprintProjectStats` | Points per project per sprint. Doc ID: `sprint_${n}_${projectId}` |
| `sprints` | Sprint metadata (name, index, dates) |
| `users` | Team roster. Doc ID: short name (e.g. `No`). Fields: `id`, `role` (Dev/BA/etc.), `email`, `role` (admin/user for auth). The `role` field is overloaded — `Dev`/`BA`/etc. is the team role used by `main.js`; `admin`/`user` is the auth role checked by `auth.js` via the `email` field. |
| `projects` | Project paths (id, name) |
| `leaves` | Personal leave records written by `api/leave.js` |
| `backlog` | Next sprint backlog items (seeded by `seed_backlog.js`, editable in Firebase Console) |
| `dashboardStats/v1` | Last sync timestamp written by `azure_sync.js` |

## Key Patterns in main.js

**ROLES**: The `ROLES` object is the single source of truth for role assignments. `notify_unfinished.js` has its own copy — keep them in sync.

**SPRINT_DATES**: Both `azure_sync.js` and `notify_unfinished.js` have a `SPRINT_DATES` array for date-based sprint detection. Sprint 11 = `2026-05-25 → 2026-06-07`, Sprint 12 = `2026-06-08 → 2026-06-21`.

**CURRENT_SPRINT_IDX**: Computed in `main.js` from `SPRINT_DATES` based on today's date (0-indexed).

**Task states**: `To Do`, `In Progress`, `Blocked`, `Bugged`, `Ready for review`, `Ready for test`, `Waiting to INT deploy`, `Waiting to PRD deploy`, `Done`. Done detection uses lowercase `.includes()` check for: `done`, `closed`, `removed`, `canceled`, `cancelled`.

**Chart.js plugins**: `buildLeavePlugin()` is a factory (returns a new plugin object each call) because Chart.js plugin IDs must be unique per chart instance. `buildBarHoverPlugin()` renders rich HTML tooltips on bar hover using a fixed-position `div`.

## Production URLs

- Dashboard: `https://sprint-dashboard-2026.vercel.app/`
- Leave API: `POST https://sprint-dashboard-2026.vercel.app/api/leave`
- Repo: `https://github.com/yanatornch/sprint-dashboard-2026`
- Firebase project: `morestudio-sprint-2026`

## Firebase Console

- Authorized domains (for OAuth): Authentication → Settings → Authorized domains. Must include `sprint-dashboard-2026.vercel.app` and `localhost`.
- Microsoft OAuth provider: Authentication → Sign-in method → Microsoft. Azure app: client ID `26363253-3fb9-4e60-b470-511d1a064df5`, tenant `2e4e0da2-49c7-4d00-9942-bd882f2a0353`.

## Vercel Environment Variables

| Variable | Used by |
|---|---|
| `LEAVE_API_SECRET` | `api/leave.js` auth |
| `GITHUB_ACTIONS_TOKEN` | `api/trigger-sync.js` |
| `BACKLOG_API_SECRET` | `api/update-backlog.js` auth |

## GitHub Secrets

`AZURE_ORG`, `AZURE_PROJECT`, `AZURE_PAT`, `WEBHOOK_URL`, `WEBHOOK_SECRET`, `SPRINT_NOTIFY_URL`, `SPRINT_DASHBOARD_URL`

## Firestore Collections (additional)

| Collection | Description |
|---|---|
| `taskSnapshots` | Daily snapshots of all task states. Doc ID: `YYYY-MM-DD`. Used to compute daily deltas for notifications. |
| `dailyStats` | Daily sprint notification records saved by `api/notify/daily-sprint.js`. |
