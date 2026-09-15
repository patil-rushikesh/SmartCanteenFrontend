# Smart Canteen Frontend

React + TypeScript application for customers, canteen managers, and platform administrators. This is the project's single frontend source.

## Setup

Use Node.js 22 LTS and pnpm 10.30.3. Install with `pnpm install --frozen-lockfile`, then copy `.env.example` to `.env` if no local environment file exists.

- `pnpm dev`: start Vite at http://localhost:5173.
- `pnpm typecheck`: check application and tool configuration types.
- `pnpm build`: typecheck and generate `dist/`.
- `pnpm preview`: preview the production build at http://localhost:4173.
- `pnpm test:e2e`: run Playwright against the sibling `../Backend` API.

## Configuration

See `.env.example` for API URLs, payment mode, Razorpay key ID, and QA controls. Vite uses these values during development and builds. The Docker image writes `env-config.js` from runtime environment variables before starting Nginx on port 8080. `public/env-config.js` supplies an empty configuration for local use.

## Browser tests

Keep this repository beside `Backend/`. Install Chromium with `pnpm exec playwright install chromium`, start Docker, and configure `Backend/.env` for the local database and fake payments. `pnpm test:e2e` starts the backend through its Docker Compose configuration and the frontend through Vite. The backend container applies migrations and seeds demo users.

Test output goes to ignored `test-results/` and `playwright-report/` directories. The TypeScript configuration files are the source of truth; generated JavaScript, declarations, and build metadata should not be committed.

## AWS exam deployment

The backend repository owns shared AWS infrastructure and the exam guide at `../Backend/infra/README.md`. This repository has its own GitHub CI/ECS release workflow.
