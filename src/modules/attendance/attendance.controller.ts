import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { PermissionGuard } from '../../common/guards/permission.guard';
import { RequirePermission } from '../../common/decorators/require-permission.decorator';
import { AttendanceService } from './attendance.service';
import { ScanAttendanceDto } from './dto/scan-attendance.dto';
import { CreateServiceDto } from './dto/create-service.dto';

@ApiTags('attendance')
@Controller('attendance')
@UseGuards(JwtAuthGuard, PermissionGuard)
export class AttendanceController {
  constructor(private attendanceService: AttendanceService) {}

  @Post('services')
  @RequirePermission('attendance:write')
  createService(@Body() dto: CreateServiceDto) {
    return this.attendanceService.createService(dto);
  }

  @Post('scan')
  @RequirePermission('attendance:write')
  scan(@Body() dto: ScanAttendanceDto) {
    return this.attendanceService.scan(dto);
  }

  @Get('services/:serviceId')
  @RequirePermission('attendance:read')
  getServiceAttendance(@Param('serviceId') serviceId: string) {
    return this.attendanceService.getServiceAttendance(serviceId);
  }

  @Get('absentees')
  @RequirePermission('attendance:read')
  getAbsentees(@Query('branchId') branchId: string, @Query('lastN') lastN?: string) {
    return this.attendanceService.getAbsentees(branchId, lastN ? Number(lastN) : undefined);
  }
}
