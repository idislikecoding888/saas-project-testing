import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { randomUUID } from 'crypto';

@Injectable()
export class ApiKeysService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async generateApiKey(userId: string) {
    const apiKey =
      'sk_' +
      randomUUID().replace(/-/g, '');

    return this.prisma.apiKey.create({
      data: {
        userId,
        apiKey,
      },
    });
  }

  async getUserKeys(userId: string) {
    return this.prisma.apiKey.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async validateApiKey(apiKey: string) {
    return this.prisma.apiKey.findFirst({
      where: {
        apiKey,
        isActive: true,
      },
    });
  }
}