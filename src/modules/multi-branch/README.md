# Multi-Branch Module — Phase 5

Scaffolded folder, not yet implemented. Build this module when Phase 5 begins.

**Planned contents:** Cross-branch analytics for denominational headquarters, branch administrator assignment, shared-database tenancy enforcement (builds on Branch model already in schema.prisma from Phase 0).

**When you build it, follow the established pattern** (see `modules/members` or `modules/attendance`):
- `dto/` — request DTOs with class-validator decorators
- `*.service.ts` — business logic, injects `PrismaService`
- `*.controller.ts` — routes, guarded with `JwtAuthGuard` + `PermissionGuard`
- `*.module.ts` — wires it together
- Register the module in `src/app.module.ts`
- Add any new `Permission` keys to `prisma/seed.ts`
