import { Injectable, NotFoundException } from '@nestjs/common';
import * as crypto from 'crypto';
import * as QRCode from 'qrcode';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';

@Injectable()
export class MembersService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateMemberDto) {
    const qrCode = crypto.randomUUID();
    const member = await this.prisma.member.create({ data: { ...dto, qrCode } });
    return member;
  }

  findAll(branchId: string) {
    return this.prisma.member.findMany({ where: { branchId } });
  }

  async findOne(id: string) {
    const member = await this.prisma.member.findUnique({ where: { id } });
    if (!member) throw new NotFoundException('Member not found');
    return member;
  }

  async update(id: string, dto: UpdateMemberDto) {
    await this.findOne(id);
    return this.prisma.member.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.member.update({ where: { id }, data: { status: 'INACTIVE' } });
  }

  /** Renders the member's QR code as a PNG data URL for the digital ID card. */
  async getQrCodeImage(id: string): Promise<string> {
    const member = await this.findOne(id);
    return QRCode.toDataURL(member.qrCode);
  }
}
