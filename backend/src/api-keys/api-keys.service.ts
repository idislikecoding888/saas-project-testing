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

  async regenerateApiKey(userId: string) {
    await this.prisma.apiKey.updateMany({
      where: {
        userId,
        isActive: true,
      },
      data: {
        isActive: false,
      },
    });

    const apiKey =
      'sk_' +
      randomUUID().replace(/-/g, '');

    return this.prisma.apiKey.create({
      data: {
        userId,
        apiKey,
        isActive: true,
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

  async getUsageLogs(userId: string) {
    return this.prisma.verificationRequest.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        serviceName: true,
        amount: true,
        status: true,
        createdAt: true,
        errorMessage: true,
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