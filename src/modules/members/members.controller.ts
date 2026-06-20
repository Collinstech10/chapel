import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { PermissionGuard } from '../../common/guards/permission.guard';
import { RequirePermission } from '../../common/decorators/require-permission.decorator';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';

@ApiTags('members')
@Controller('members')
@UseGuards(JwtAuthGuard, PermissionGuard)
export class MembersController {
  constructor(private membersService: MembersService) {}

  @Post()
  @RequirePermission('members:write')
  create(@Body() dto: CreateMemberDto) {
    return this.membersService.create(dto);
  }

  @Get()
  @RequirePermission('members:read')
  findAll(@Query('branchId') branchId: string) {
    return this.membersService.findAll(branchId);
  }

  @Get(':id')
  @RequirePermission('members:read')
  findOne(@Param('id') id: string) {
    return this.membersService.findOne(id);
  }

  @Get(':id/qr-code')
  @RequirePermission('members:read')
  getQrCode(@Param('id') id: string) {
    return this.membersService.getQrCodeImage(id);
  }

  @Patch(':id')
  @RequirePermission('members:write')
  update(@Param('id') id: string, @Body() dto: UpdateMemberDto) {
    return this.membersService.update(id, dto);
  }

  @Delete(':id')
  @RequirePermission('members:write')
  remove(@Param('id') id: string) {
    return this.membersService.remove(id);
  }
}
