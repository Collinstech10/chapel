# Sermons & Devotionals Module — Phase 2

Scaffolded folder, not yet implemented. Build this module when Phase 2 begins.

**Planned contents:** Sermon upload (audio/video/PDF) with series/speaker/topic categorization and search; daily devotionals with read-tracking and bookmarking. Models: Sermon, Devotional.

**When you build it, follow the established pattern** (see `modules/members` or `modules/attendance`):
- `dto/` — request DTOs with class-validator decorators
- `*.service.ts` — business logic, injects `PrismaService`
- `*.controller.ts` — routes, guarded with `JwtAuthGuard` + `PermissionGuard`
- `*.module.ts` — wires it together
- Register the module in `src/app.module.ts`
- Add any new `Permission` keys to `prisma/seed.ts`
