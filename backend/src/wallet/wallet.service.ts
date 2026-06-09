import {
  Injectable,
  BadRequestException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WalletService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async getWallet(userId: string) {
    let wallet =
      await this.prisma.wallet.findUnique({
        where: {
          userId,
        },
      });

    if (!wallet) {
      wallet =
        await this.prisma.wallet.create({
          data: {
            userId,
            balance: 0,
          },
        });
    }

    return wallet;
  }

  async creditWallet(
    userId: string,
    amount: number,
    description = 'Wallet Credit',
  ) {
    const wallet =
      await this.getWallet(userId);

    const updatedWallet =
      await this.prisma.wallet.update({
        where: {
          userId,
        },
        data: {
          balance: {
            increment: amount,
          },
        },
      });

    await this.prisma.walletTransaction.create({
      data: {
        userId,
        amount,
        type: 'CREDIT',
        description,
      },
    });

    return updatedWallet;
  }

  async debitWallet(
    userId: string,
    amount: number,
    description = 'Wallet Debit',
  ) {
    const wallet =
      await this.getWallet(userId);

    if (wallet.balance < amount) {
      throw new BadRequestException(
        'Insufficient wallet balance',
      );
    }

    const updatedWallet =
      await this.prisma.wallet.update({
        where: {
          userId,
        },
        data: {
          balance: {
            decrement: amount,
          },
        },
      });

    await this.prisma.walletTransaction.create({
      data: {
        userId,
        amount,
        type: 'DEBIT',
        description,
      },
    });

    return updatedWallet;
  }

  async getTransactions(userId: string) {
    return this.prisma.walletTransaction.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}