# Website CMS Module — Phase 5

Scaffolded folder, not yet implemented. Build this module when Phase 5 begins.

**Planned contents:** Public-facing content management: homepage, about, leadership, events, sermons, gallery, blog. Likely exposed as public (unauthenticated) read endpoints plus authenticated admin write endpoints.

**When you build it, follow the established pattern** (see `modules/members` or `modules/attendance`):
- `dto/` — request DTOs with class-validator decorators
- `*.service.ts` — business logic, injects `PrismaService`
- `*.controller.ts` — routes, guarded with `JwtAuthGuard` + `PermissionGuard`
- `*.module.ts` — wires it together
- Register the module in `src/app.module.ts`
- Add any new `Permission` keys to `prisma/seed.ts`
