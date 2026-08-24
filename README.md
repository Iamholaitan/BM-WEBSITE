# BM-WEBSITE

Logistics & shipment management platform for BM Global Investment.

## Stack

- **Frontend:** Next.js 14 (App Router), Tailwind CSS, TanStack Query, Zustand — `apps/web`
- **Backend:** NestJS, Prisma ORM — `apps/api`
- **Database:** PostgreSQL + Redis — `packages/database`
- **Monorepo:** npm workspaces + Turborepo

## Getting started

```bash
npm install
cp .env.example .env
docker compose -f docker/docker-compose.yml up -d   # Postgres + Redis
npm run db:migrate
npm run db:seed
npm run dev                                          # web :3000, api :3001
```

Default admin login: `admin@bm-global.com` (see `packages/database/prisma/seed.ts`).

## Scripts

| Command | Description |
| --- | --- |
| `npm run build` | Build all packages |
| `npm run lint` | Lint all packages |
| `npm run typecheck` | TypeScript checks |
| `npm run db:studio` | Prisma Studio |

## Deployment

- Frontend: Netlify (see `netlify.toml`)
- API: any Node host (Render / Railway / Fly.io)
