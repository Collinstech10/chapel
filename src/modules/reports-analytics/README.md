# Reports & Analytics Module — Phase 4

Scaffolded folder, not yet implemented. Build this module when Phase 4 begins.

**Planned contents:** Aggregation endpoints over existing data: membership, attendance, financial, department, and event reports. Export to PDF/Excel/CSV. No new core tables — mostly Prisma groupBy/aggregate queries plus a PDF/Excel export utility.

**When you build it, follow the established pattern** (see `modules/members` or `modules/attendance`):
- `dto/` — request DTOs with class-validator decorators
- `*.service.ts` — business logic, injects `PrismaService`
- `*.controller.ts` — routes, guarded with `JwtAuthGuard` + `PermissionGuard`
- `*.module.ts` — wires it together
- Register the module in `src/app.module.ts`
- Add any new `Permission` keys to `prisma/seed.ts`
