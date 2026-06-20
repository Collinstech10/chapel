import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { PrismaService } from '../prisma/prisma.service';

/**
 * Writes an AuditLog row for mutating requests (POST/PATCH/PUT/DELETE).
 * Apply on controllers/handlers that touch sensitive data: members,
 * finance, roles, counseling.
 */
@Injectable()
export class AuditLogInterceptor implements NestInterceptor {
  constructor(private prisma: PrismaService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, user } = request;

    if (!['POST', 'PATCH', 'PUT', 'DELETE'].includes(method)) {
      return next.handle();
    }

    return next.handle().pipe(
      tap(() => {
        this.prisma.auditLog
          .create({
            data: {
              userId: user?.id,
              action: `${method} ${url}`,
              entity: url.split('/')[3] ?? 'unknown',
              metadata: { body: request.body },
              ipAddress: request.ip,
            },
          })
          .catch(() => {
            /* never let audit logging break the request */
          });
      }),
    );
  }
}
