# ChapelFlow Nigeria — Backend

Node.js (NestJS) backend for the ChapelFlow Nigeria chapel management platform.
See `BLUEPRINT.md` (in the project root you downloaded this alongside) for the
full phased build plan, architecture decisions, and module breakdown.

## Stack
- **Framework:** NestJS (TypeScript) on Node.js
- **Database:** PostgreSQL via Prisma ORM
- **Queues/Cache:** Redis + BullMQ
- **Auth:** JWT (access + refresh) with a permission-based RBAC layer

## Project status
This is a **scaffold**, not a finished product. Phase 0 (auth, RBAC, multi-tenancy)
and Phase 1 (members, attendance) are implemented as working reference modules.
Every other module listed in the blueprint has a folder with a `README.md`
describing what to build and when — see `src/modules/`.

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Start Postgres + Redis
docker compose up -d

# 3. Configure environment
cp .env.example .env
# edit .env if you changed docker-compose defaults

# 4. Run migrations and seed default roles/permissions
npm run prisma:migrate
npm run prisma:seed

# 5. Start the API in watch mode
npm run start:dev
```

API runs at `http://localhost:4000/api/v1`
Swagger docs at `http://localhost:4000/api/docs`

## Folder structure

```
src/
├── main.ts                  # bootstrap: helmet, validation, swagger
├── app.module.ts             # registers every feature module
├── config/                   # env loading + validation
├── common/
│   ├── prisma/                # PrismaService (global)
│   ├── guards/                 # JwtAuthGuard, PermissionGuard
│   ├── decorators/             # @RequirePermission, @CurrentUser
│   ├── filters/                 # global HTTP exception filter
│   └── interceptors/            # audit log interceptor
├── jobs/                      # BullMQ producers/processors (cron-driven)
└── modules/
    ├── auth/                   # Phase 0 — implemented
    ├── organizations/           # Phase 0 — implemented
    ├── members/                  # Phase 1 — implemented
    ├── attendance/                # Phase 1 — implemented
    └── ...                         # Phase 1-5 — see each folder's README.md
```

## Adding a new module
Follow the pattern in `src/modules/members/`:
1. `dto/*.dto.ts` — validated request shapes
2. `*.service.ts` — business logic, injects `PrismaService`
3. `*.controller.ts` — routes, decorated with `@UseGuards(JwtAuthGuard, PermissionGuard)`
   and `@RequirePermission('module:action')`
4. `*.module.ts` — wires it up
5. Register in `src/app.module.ts`
6. Add new permission keys to `prisma/seed.ts`
