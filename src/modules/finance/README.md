# Finance Module — Phase 1-3

Scaffolded folder, not yet implemented. Build this module when Phase 1-3 begins.

**Planned contents:** Phase 1: basic transaction logging (tithes/offerings/donations). Phase 3: full payment gateway integration (Paystack, Flutterwave, Stripe webhooks), expense approval workflow, financial reports. Models: Transaction, Expense.

**When you build it, follow the established pattern** (see `modules/members` or `modules/attendance`):
- `dto/` — request DTOs with class-validator decorators
- `*.service.ts` — business logic, injects `PrismaService`
- `*.controller.ts` — routes, guarded with `JwtAuthGuard` + `PermissionGuard`
- `*.module.ts` — wires it together
- Register the module in `src/app.module.ts`
- Add any new `Permission` keys to `prisma/seed.ts`
