# Documents & Certificates Module — Phase 4

Scaffolded folder, not yet implemented. Build this module when Phase 4 begins.

**Planned contents:** Document storage (constitutions, policies, meeting minutes) and digital certificate generation (baptism, foundation school, workers training) with QR verification and serial numbers. Models: DocumentRecord, Certificate.

**When you build it, follow the established pattern** (see `modules/members` or `modules/attendance`):
- `dto/` — request DTOs with class-validator decorators
- `*.service.ts` — business logic, injects `PrismaService`
- `*.controller.ts` — routes, guarded with `JwtAuthGuard` + `PermissionGuard`
- `*.module.ts` — wires it together
- Register the module in `src/app.module.ts`
- Add any new `Permission` keys to `prisma/seed.ts`
