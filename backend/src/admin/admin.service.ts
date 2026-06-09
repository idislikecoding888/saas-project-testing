import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async getOverview() {
    const totalUsers =
      await this.prisma.user.count({
        where: {
          role: 'CUSTOMER',
        },
      });

    const totalStaff =
      await this.prisma.user.count({
        where: {
          role: 'STAFF',
        },
      });

    const totalVerifications =
      await this.prisma.verificationRequest.count();

    const totalTransactions =
      await this.prisma.walletTransaction.count();

    const activeApiKeys =
      await this.prisma.apiKey.count({
        where: {
          isActive: true,
        },
      });

    const revenue =
      await this.prisma.walletTransaction.aggregate({
        where: {
          type: 'DEBIT',
        },
        _sum: {
          amount: true,
        },
      });

    return {
      totalUsers,
      totalStaff,
      totalVerifications,
      totalTransactions,
      activeApiKeys,
      totalRevenue:
        revenue._sum.amount || 0,
    };
  }

  async getRevenueAnalytics() {
    const credits =
      await this.prisma.walletTransaction.aggregate({
        where: {
          type: 'CREDIT',
        },
        _sum: {
          amount: true,
        },
        _count: true,
      });

    const debits =
      await this.prisma.walletTransaction.aggregate({
        where: {
          type: 'DEBIT',
        },
        _sum: {
          amount: true,
        },
        _count: true,
      });

    return {
      totalCredits:
        credits._sum.amount || 0,

      totalCreditTransactions:
        credits._count,

      totalDebits:
        debits._sum.amount || 0,

      totalDebitTransactions:
        debits._count,

      profit:
        debits._sum.amount || 0,
    };
  }

  async getRecentTransactions() {
    return this.prisma.walletTransaction.findMany({
      take: 50,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getVerificationAnalytics() {
    const total =
      await this.prisma.verificationRequest.count();

    const success =
      await this.prisma.verificationRequest.count({
        where: {
          status: 'SUCCESS',
        },
      });

    const failed =
      await this.prisma.verificationRequest.count({
        where: {
          status: 'FAILED',
        },
      });

    return {
      total,
      success,
      failed,
    };
  }
}