# Smart Canteen Frontend

React + TypeScript application for customers, canteen managers, and platform administrators. This is the project's single frontend source.

## Setup

Use Node.js 22 LTS and pnpm 10.30.3. Install with `pnpm install --frozen-lockfile`, then copy `.env.example` to `.env` if no local environment file exists.

- `pnpm dev`: start Vite at http://localhost:5173.
- `pnpm typecheck`: check application and tool configuration types.
- `pnpm build`: typecheck and generate `dist/` (Vite replaces old build output).
- `pnpm clean`: remove generated `dist/` output.
- `pnpm preview`: preview the production build at http://localhost:4173.
- `pnpm test:e2e`: run Playwright against the sibling `../Backend` API.

## Configuration

See `.env.example` for the API URL, payment mode, Razorpay key ID, and QA controls. Vite uses these values during development and builds. The Docker image writes `env-config.js` from runtime environment variables before starting Nginx on port 8080. `public/env-config.js` supplies an empty configuration for local use.

## Browser tests

### Dummy logins

These accounts are created by the backend demo seed. Use them only for testing:

| Role | Email | Password |
|---|---|---|
| Super admin | `owner@smartcanteen.com` | `SuperAdmin@123` |
| Manager | `manager.alpha@smartcanteen.com` | `Manager@123` |
| Customer | `student.alpha@smartcanteen.com` | `Customer@123` |

With `VITE_ENABLE_QA_TOOLS=true`, the login page shows buttons to fill these credentials. For a fresh local database, apply migrations and run `pnpm build && pnpm seed` from `Backend/`, or use the Docker Compose setup below. Seeding preserves passwords on accounts that already exist.

Keep this repository beside `Backend/`. Install Chromium with `pnpm exec playwright install chromium`, start Docker, and configure `Backend/.env` for the local database and fake payments. `pnpm test:e2e` starts the backend through its Docker Compose configuration and the frontend through Vite. The backend container applies migrations and seeds demo users.

Test output goes to ignored `test-results/` and `playwright-report/` directories. The TypeScript configuration files are the source of truth; generated JavaScript, declarations, and build metadata should not be committed.

## AWS exam deployment

The backend repository owns shared AWS infrastructure and the exam guide at `../Backend/infra/README.md`. This repository has its own GitHub CI/ECS release workflow.

## Release quality and operating hours

CI runs TypeScript builds, unit coverage, Chromium browser tests, container checks,
and the SonarQube Cloud quality gate. Add `SONAR_TOKEN` to repository Actions secrets;
the organization/project keys are in `sonar-project.properties`. Main releases are
admitted only when the shared AWS `APPLICATION_ENABLED` flag is true. Use the
backend repository’s **Application power** workflow to turn the app and database
on or off. After startup, rerun **CI and ECS release** to deploy commits made while off. Configure
`DEPLOY_ENVIRONMENT=production` only after the separate production infrastructure
and HTTPS environment are ready. See the backend `infra/SRE.md` runbook.
