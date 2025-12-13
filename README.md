# AI Chatbot Monorepo

Full‑stack monorepo for an AI chatbot with React/Vite frontend, Express/Prisma backend, and shared TypeScript types.

## Prerequisites
- Node.js 24 (LTS) with Corepack enabled (`corepack enable`)
- pnpm
- Docker + Docker Compose (Colima or Docker Desktop)

## Project Structure
```
apps/
  frontend/   # React + Vite
  backend/    # Express + Prisma + OpenAI
packages/
  shared/     # Shared types/utils
scripts/      # DB/ingestion scripts
```

## Setup
1) Install deps
```sh
pnpm install
```

2) Environment variables  
Copy `apps/backend/.env.example` to `apps/backend/.env` and set:
- `OPENAI_API_KEY` (required for real completions)
- `DATABASE_URL` (defaults to `postgres://postgres:postgres@postgres:5432/ai_chatbot` for Docker)
- `PRISMA_CLIENT_ENGINE_TYPE=library`

3) Start services (Docker)
```sh
docker compose up -d backend
```
This brings up Postgres and the backend. Live reload is enabled in the container via `tsx watch`.

4) Run frontend (host)
```sh
pnpm --filter ai-chatbot-frontend dev
```
Set `VITE_API_BASE_URL` (e.g., `http://localhost:3001`) in your shell or `.env`.

## Prisma / Database
- Migrate (dev): `pnpm --filter ai-chatbot-backend exec prisma migrate dev --name <name>`
- Generate client: `pnpm --filter ai-chatbot-backend exec prisma generate`
- Seed schema via SQL (optional): `scripts/db/init.sql`

## API (MVP)
- `POST /api/chat` with body `{ message: string }` -> `{ answer: string, sources?: ... }`

## Notes
- Backend dev script uses `tsx watch`; file changes in `apps/backend/src`, `apps/backend/prisma`, and `packages/shared/src` are bind-mounted in Docker.
- Frontend uses React 19 + Vite 7; TypeScript is set to `moduleResolution: "bundler"`.
