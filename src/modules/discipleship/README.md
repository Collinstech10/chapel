# Discipleship Module — Phase 2

Scaffolded folder, not yet implemented. Build this module when Phase 2 begins.

**Planned contents:** Tracks for New Converts, Baptism Class, Foundation School, Workers Training, Leadership Training. Progress tracking, mentor assignment, completion -> triggers Certificate issuance (Phase 4). Models: DiscipleshipTrack, DiscipleshipEnrollment.

**When you build it, follow the established pattern** (see `modules/members` or `modules/attendance`):
- `dto/` — request DTOs with class-validator decorators
- `*.service.ts` — business logic, injects `PrismaService`
- `*.controller.ts` — routes, guarded with `JwtAuthGuard` + `PermissionGuard`
- `*.module.ts` — wires it together
- Register the module in `src/app.module.ts`
- Add any new `Permission` keys to `prisma/seed.ts`
