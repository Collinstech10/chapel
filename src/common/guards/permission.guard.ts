import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSION_KEY } from '../decorators/require-permission.decorator';

/**
 * Checks the permissions attached to req.user (resolved at login time from
 * UserRole -> Role -> RolePermission -> Permission) against the permissions
 * required by @RequirePermission() on the route handler.
 *
 * Apply globally in main.ts after JwtAuthGuard, or per-controller with
 * @UseGuards(JwtAuthGuard, PermissionGuard).
 */
@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const required = this.reflector.getAllAndOverride<string[]>(PERMISSION_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!required || required.length === 0) return true;

    const { user } = context.switchToHttp().getRequest();
    const userPermissions: string[] = user?.permissions ?? [];

    const hasAll = required.every((p) => userPermissions.includes(p));
    if (!hasAll) {
      throw new ForbiddenException(
        `Missing required permission(s): ${required.join(', ')}`,
      );
    }
    return true;
  }
}
