import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../../../common/prisma/prisma.service';

interface JwtPayload {
  sub: string; // userId
  branchId: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: JwtPayload) {
    // Resolve the user's roles -> permissions once at validation time,
    // so PermissionGuard can do a simple array check with no extra query.
    const userRoles = await this.prisma.userRole.findMany({
      where: { userId: payload.sub, branchId: payload.branchId },
      include: { role: { include: { rolePermissions: { include: { permission: true } } } } },
    });

    const permissions = new Set<string>();
    for (const ur of userRoles) {
      for (const rp of ur.role.rolePermissions) {
        permissions.add(rp.permission.key);
      }
    }

    return {
      id: payload.sub,
      branchId: payload.branchId,
      roles: userRoles.map((ur) => ur.role.name),
      permissions: Array.from(permissions),
    };
  }
}
