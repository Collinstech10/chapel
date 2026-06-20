# AI Module — Phase 5

Scaffolded folder, not yet implemented. Build this module when Phase 5 begins.

**Planned contents:** Chat assistant for FAQs/event/member questions (OpenAI/Gemini wrapper service behind an internal interface, per the AiProvider pattern). Predictive analytics for attendance trends, inactivity, financial growth. Recommendation engine for departments/cells/training paths. Model: AiChatLog.

**When you build it, follow the established pattern** (see `modules/members` or `modules/attendance`):
- `dto/` — request DTOs with class-validator decorators
- `*.service.ts` — business logic, injects `PrismaService`
- `*.controller.ts` — routes, guarded with `JwtAuthGuard` + `PermissionGuard`
- `*.module.ts` — wires it together
- Register the module in `src/app.module.ts`
- Add any new `Permission` keys to `prisma/seed.ts`
