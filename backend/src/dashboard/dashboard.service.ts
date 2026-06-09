import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async getCustomerDashboard(
    userId: string,
  ) {
    const wallet =
      await this.prisma.wallet.findUnique({
        where: {
          userId,
        },
      });

    const apiKeys =
      await this.prisma.apiKey.findMany({
        where: {
          userId,
        },
      });

    const verifications =
      await this.prisma.verificationRequest.count({
        where: {
          userId,
        },
      });

    const transactions =
      await this.prisma.walletTransaction.count({
        where: {
          userId,
        },
      });

    return {
      wallet,
      apiKeys,
      totalVerifications: verifications,
      totalTransactions: transactions,
    };
  }
}