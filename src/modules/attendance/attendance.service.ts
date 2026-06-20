import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { ScanAttendanceDto } from './dto/scan-attendance.dto';
import { CreateServiceDto } from './dto/create-service.dto';

@Injectable()
export class AttendanceService {
  constructor(private prisma: PrismaService) {}

  createService(dto: CreateServiceDto) {
    return this.prisma.service.create({ data: dto });
  }

  /**
   * Core QR attendance flow:
   * 1. Look up the member by their scanned QR code.
   * 2. Confirm the service exists.
   * 3. Record attendance (unique per member+service - re-scans are ignored).
   */
  async scan(dto: ScanAttendanceDto) {
    const member = await this.prisma.member.findUnique({ where: { qrCode: dto.qrCode } });
    if (!member) throw new NotFoundException('Unrecognized QR code');

    const service = await this.prisma.service.findUnique({ where: { id: dto.serviceId } });
    if (!service) throw new BadRequestException('Service not found');

    try {
      return await this.prisma.attendanceRecord.create({
        data: { memberId: member.id, serviceId: service.id },
        include: { member: true, service: true },
      });
    } catch {
      throw new ConflictException('Attendance already recorded for this member');
    }
  }

  async getServiceAttendance(serviceId: string) {
    return this.prisma.attendanceRecord.findMany({
      where: { serviceId },
      include: { member: true },
    });
  }

  /** Members who attended none of the branch's last N services. */
  async getAbsentees(branchId: string, lastNServices = 4) {
    const recentServices = await this.prisma.service.findMany({
      where: { branchId },
      orderBy: { date: 'desc' },
      take: lastNServices,
    });
    const serviceIds = recentServices.map((s) => s.id);

    const attendedMemberIds = await this.prisma.attendanceRecord.findMany({
      where: { serviceId: { in: serviceIds } },
      select: { memberId: true },
      distinct: ['memberId'],
    });
    const attendedIds = attendedMemberIds.map((a) => a.memberId);

    return this.prisma.member.findMany({
      where: { branchId, status: 'ACTIVE', id: { notIn: attendedIds } },
    });
  }

  // TODO Phase 1 follow-ups: getWeeklyTrend(), getMonthlyTrend(),
  // getFirstTimerVsReturning(), getDepartmentAttendance()
}
