# Inventory & Library Module — Phase 3

Scaffolded folder, not yet implemented. Build this module when Phase 3 begins.

**Planned contents:** Physical inventory (chairs, sound systems) with quantity/status/damage tracking; resource library (books, PDFs, manuals) with search and download tracking. Model: LibraryItem (inventory can reuse the Asset model or get its own).

**When you build it, follow the established pattern** (see `modules/members` or `modules/attendance`):
- `dto/` — request DTOs with class-validator decorators
- `*.service.ts` — business logic, injects `PrismaService`
- `*.controller.ts` — routes, guarded with `JwtAuthGuard` + `PermissionGuard`
- `*.module.ts` — wires it together
- Register the module in `src/app.module.ts`
- Add any new `Permission` keys to `prisma/seed.ts`
