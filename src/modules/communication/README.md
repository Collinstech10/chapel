# Communication Module — Phase 1

Scaffolded folder, not yet implemented. Build this module when Phase 1 begins.

**Planned contents:** Announcements via email/SMS/push/in-app, broadcast groups by department/gender/level/role. Integrates Resend (email) and Firebase Cloud Messaging (push). Model: Announcement.

**When you build it, follow the established pattern** (see `modules/members` or `modules/attendance`):
- `dto/` — request DTOs with class-validator decorators
- `*.service.ts` — business logic, injects `PrismaService`
- `*.controller.ts` — routes, guarded with `JwtAuthGuard` + `PermissionGuard`
- `*.module.ts` — wires it together
- Register the module in `src/app.module.ts`
- Add any new `Permission` keys to `prisma/seed.ts`
