import { SetMetadata } from '@nestjs/common';

export const PERMISSION_KEY = 'permission';

/**
 * Usage: @RequirePermission('finance:write')
 * Combine with PermissionGuard. The permission key format is
 * "<module>:<action>", matching the Permission.key seeded in the DB.
 */
export const RequirePermission = (...permissions: string[]) =>
  SetMetadata(PERMISSION_KEY, permissions);
