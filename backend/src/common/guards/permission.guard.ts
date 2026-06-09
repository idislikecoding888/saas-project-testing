import {
  Injectable,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';

import { Reflector } from '@nestjs/core';

import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PermissionGuard
  implements CanActivate
{
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService,
  ) {}

  async canActivate(
    context: ExecutionContext,
  ) {
    const permission =
      this.reflector.get<string>(
        'permission',
        context.getHandler(),
      );

    if (!permission) {
      return true;
    }

    const request =
      context.switchToHttp().getRequest();

    const userId =
      request.headers['user-id'];

    if (!userId) {
      return false;
    }

    const user =
      await this.prisma.user.findUnique({
        where: {
          id: String(userId),
        },
      });

    if (!user) {
      return false;
    }

    // SUPER ADMIN BYPASS
    if (user.role === 'SUPER_ADMIN') {
      return true;
    }

    const staffPermission =
      await this.prisma.staffPermission.findFirst({
        where: {
          userId: String(userId),
          permission: {
            name: permission,
          },
        },
      });

    return !!staffPermission;
  }
}