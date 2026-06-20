# Expenses & Assets Module — Phase 3

Scaffolded folder, not yet implemented. Build this module when Phase 3 begins.

**Planned contents:** Expense tracking with receipts and approval workflow; asset register with purchase history, condition, and maintenance schedule. Models: Expense, Asset.

**When you build it, follow the established pattern** (see `modules/members` or `modules/attendance`):
- `dto/` — request DTOs with class-validator decorators
- `*.service.ts` — business logic, injects `PrismaService`
- `*.controller.ts` — routes, guarded with `JwtAuthGuard` + `PermissionGuard`
- `*.module.ts` — wires it together
- Register the module in `src/app.module.ts`
- Add any new `Permission` keys to `prisma/seed.ts`
