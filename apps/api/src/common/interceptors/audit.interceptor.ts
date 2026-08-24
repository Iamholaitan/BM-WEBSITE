import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  constructor(private prisma: PrismaService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest();
    const { method, url, body, user } = request;

    if (!['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
      return next.handle();
    }

    return next.handle().pipe(
      tap(async () => {
        try {
          await this.prisma.auditLog.create({
            data: {
              userId: user?.id,
              action: `${method} ${url}`,
              entity: this.extractEntity(url),
              entityId: this.extractEntityId(url, body),
              newValues: method !== 'DELETE' ? body : undefined,
            },
          });
        } catch {
          // Silently fail audit logging to not disrupt the request
        }
      }),
    );
  }

  private extractEntity(url: string): string {
    const parts = url.split('/').filter(Boolean);
    return parts[1] || 'unknown';
  }

  private extractEntityId(url: string, body: Record<string, unknown>): string | undefined {
    const parts = url.split('/').filter(Boolean);
    if (parts.length >= 3) {
      return parts[2];
    }
    return body?.id as string | undefined;
  }
}
