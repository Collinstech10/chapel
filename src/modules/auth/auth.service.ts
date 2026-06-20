import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { PrismaService } from '../../common/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.prisma.user.findFirst({
      where: { OR: [{ email: dto.email }, { phone: dto.phone }] },
    });
    if (existing) throw new ConflictException('Email or phone already registered');

    const passwordHash = await bcrypt.hash(dto.password, 12);

    const user = await this.prisma.user.create({
      data: {
        branchId: dto.branchId,
        email: dto.email,
        phone: dto.phone,
        passwordHash,
        member: {
          create: {
            branchId: dto.branchId,
            fullName: dto.fullName,
            matricNumber: dto.matricNumber,
            qrCode: crypto.randomUUID(),
          },
        },
      },
      include: { member: true },
    });

    // Assign the default MEMBER role for the branch's organization here
    // (omitted — see organizations module for role-seeding helper).

    return this.issueTokens(user.id, user.branchId);
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findFirst({
      where: { OR: [{ email: dto.email }, { phone: dto.phone }] },
    });
    if (!user || !user.passwordHash) throw new UnauthorizedException('Invalid credentials');

    const valid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    return this.issueTokens(user.id, user.branchId);
  }

  private async issueTokens(userId: string, branchId: string) {
    const payload = { sub: userId, branchId };
    const accessToken = this.jwt.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN ?? '15m',
    });
    const refreshToken = this.jwt.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN ?? '7d',
    });
    return { accessToken, refreshToken };
  }

  // TODO Phase 0 follow-ups: sendOtp(), verifyOtp(), googleLogin(),
  // requestPasswordReset(), resetPassword(), enable2fa()
}
