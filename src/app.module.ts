import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule } from './config/config.module';
import { PrismaModule } from './common/prisma/prisma.module';

import { AuthModule } from './modules/auth/auth.module';
import { OrganizationsModule } from './modules/organizations/organizations.module';
import { MembersModule } from './modules/members/members.module';
import { AttendanceModule } from './modules/attendance/attendance.module';

// Phase 2+ modules are scaffolded as empty folders under src/modules/.
// Import and register each one here as its phase begins:
// EventsModule, CommunicationModule, FinanceModule, DepartmentsModule,
// CellFellowshipModule, DiscipleshipModule, WorkersModule,
// PrayerCounselingModule, SermonsDevotionalsModule, BiblePlanModule,
// ExpensesAssetsModule, InventoryLibraryModule, ReportsAnalyticsModule,
// DocumentsCertificatesModule, AiAssistantModule, WebsiteCmsModule,
// MultiBranchModule.

@Module({
  imports: [
    ConfigModule,
    PrismaModule,
    ScheduleModule.forRoot(),
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 100 }]),

    // --- Phase 0 ---
    AuthModule,
    OrganizationsModule,

    // --- Phase 1 ---
    MembersModule,
    AttendanceModule,
  ],
})
export class AppModule {}
