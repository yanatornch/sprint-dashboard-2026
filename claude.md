# Project Documentation & AI Instructions

## Architecture Overview
This is the **Sprint Contribution Dashboard** for More Studio. 
The architecture was recently migrated from a massive hardcoded HTML file to a dynamic, modular system using **Vite** and **Firebase Firestore**.

### Tech Stack
- **Frontend**: HTML / CSS / Vanilla JavaScript (bundled with Vite).
- **Backend/Database**: Firebase Firestore (`morestudio-sprint-2026`).
- **Data Pipeline**: A Node.js script (`azure_sync.js`) pulls live data from Azure DevOps and syncs it into Firebase. This script runs via GitHub Actions on a schedule.
- **Hosting**: Vercel (Production URL: `https://morestudio-sprint-contribution.vercel.app/`).

## Project Structure
- `index.html`: The UI skeleton. **Do not put hardcoded Sprint data here.** It imports `main.js` as a module.
- `main.js`: The core frontend logic. It fetches data from Firestore, aggregates the points/tasks, and draws the charts using Chart.js.
- `azure_sync.js`: The sync script. Queries Azure DevOps, transforms the data, and writes to the `tasks`, `sprintUserStats`, and `sprintProjectStats` collections in Firebase.
- `firebase.js`: Contains the Firebase config and initialization.
- `vite.config.js`: Critically sets the build target to `esnext` so Vite supports the top-level `await` used in `main.js`.

## Firebase Collections
- **`sprints`**: Contains metadata about sprints (names, dates).
- **`users`**: Contains the team roster (name, role).
- **`projects`**: Contains project paths.
- **`tasks`**: Individual Work Items from Azure.
- **`sprintUserStats`**: Aggregated story points and tasks per person, per sprint.
- **`sprintProjectStats`**: Aggregated story points per project, per sprint.

## Common Tasks & Commands
- **Local Development**: Run `npm run dev` to start the local Vite server.
- **Production Build**: Run `npm run build` to output the bundled app into the `dist/` directory.
- **Manual Data Sync**: Run `node azure_sync.js` (Requires `.env` file with Azure credentials `ADO_ORG`, `ADO_PROJECT`, `ADO_PAT`).

## Deployment Rules (Vercel)
Vercel is hooked up to this GitHub repository. When code is pushed, Vercel automatically runs `npm run build` and serves the `dist/` folder.
**Troubleshooting Vercel**: If the website doesn't update, verify that Vercel is tracking the correct branch (`main` vs `dev`) and that the build logs on the Vercel dashboard show a successful Vite build.
