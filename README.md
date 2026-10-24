# Takiia

Takiia is a workspace product for team messaging, meeting records, and social publishing queues.

This repository is a monorepo. The GitHub remote is `https://github.com/arnavganguly209-code/takiia.git`. Production is intended to run on a dedicated Ubuntu VPS at `/srv/apps/takiia` with an isolated PostgreSQL database named `takiia_db`.

Implemented today:

- Marketing site and dashboard entry points
- Registration, login, hashed sessions, workspace membership
- Conversation and message persistence, Socket.IO room structure
- Meeting records and join attempts
- Social account / scheduled-post models and a local queue
- Plan catalog and an explicit unconfigured checkout path
- Health and readiness endpoints

Not claimed as live until providers are configured and tested:

- Payments
- Outbound email
- External social publishing
- Production voice/video media (TURN / LiveKit)

## Layout

- `apps/web` — Next.js App Router on `127.0.0.1:3034`
- `apps/api` — Express + Socket.IO + Prisma on `127.0.0.1:3033`
- `packages/shared` — Zod schemas and shared types
- `infra/` — PM2 and Nginx examples
- `scripts/` — deploy, backup, and validation helpers
- `docs/` — database, deployment, and security notes

## Local setup

Requirements: Node 20.11+ and a local PostgreSQL database that is **not** production.

```bash
cd C:\Users\Admin\Desktop\ARNAB\Takiia
npm ci
copy apps\api\.env.example apps\api\.env
copy apps\web\.env.example apps\web\.env
```

Edit `apps/api/.env` so `DATABASE_URL` points at a local `takiia_dev` database. Generate secrets locally. Do not paste production values.

```bash
npm run prisma:generate
npm run prisma:migrate:dev -w @takiia/api
npm run dev:api
npm run dev:web
```

Web: `http://127.0.0.1:3034`  
API health: `http://127.0.0.1:3033/health`

## Environment

| Variable | Where | Notes |
| --- | --- | --- |
| `DATABASE_URL` | `apps/api/.env` only | Local `takiia_dev`. Production `takiia_db` stays on the VPS |
| `SESSION_SECRET` / `CSRF_SECRET` | API | 32+ random characters |
| `WEB_ORIGIN` | API | `http://127.0.0.1:3034` locally, `https://takiia.com` in production |
| `NEXT_PUBLIC_API_URL` | Web | Public origin. No secrets |
| Feature flags | API | Stay `false` until the matching provider is configured |

See `apps/api/.env.example` and `apps/web/.env.example`.

## Testing and validation

```bash
npm ci
npm run check:secrets
node scripts/check-deploy-scripts.mjs
npm run prisma:validate
npm run prisma:generate
npm test
npm run typecheck
npm run lint
npm run build
```

`/health` does not need a database. `/ready` does.

## Migrations

- Local: `prisma migrate dev`
- Production: backup `takiia_db`, then `prisma migrate deploy`
- Never `prisma db push` on production

Details: `docs/database.md`.

## Deployment

After one-time GitHub Environment and VPS SSH setup, pushes to `main` deploy automatically when CI passes. First-launch DNS, Nginx, and SSL steps are in `docs/launch.md`. Day-2 automation is in `docs/auto-deploy.md`.

Files are prepared in `infra/` and `scripts/deploy/`. This project does not connect to the VPS or create databases by itself.

Read `docs/deployment.md` before any production change. Rollback is documented there.

## License

Private. All rights reserved.
