import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';

import { HttpService } from '@nestjs/axios';
import { PrismaService } from '../prisma/prisma.service';
import { WalletService } from '../wallet/wallet.service';
import { ApiKeysService } from '../api-keys/api-keys.service';

import { firstValueFrom } from 'rxjs';

@Injectable()
export class VerificationsService {
  constructor(
    private readonly http: HttpService,
    private readonly prisma: PrismaService,
    private readonly walletService: WalletService,
    private readonly apiKeysService: ApiKeysService,
  ) {}

  async executeVerification(
    apiKey: string,
    serviceName: string,
    endpoint: string,
    payload: any,
  ) {
    const key =
      await this.apiKeysService.validateApiKey(
        apiKey,
      );

    if (!key) {
      throw new UnauthorizedException(
        'Invalid API Key',
      );
    }

    const pricing =
      await this.prisma.pricing.findUnique({
        where: {
          serviceName,
        },
      });

    if (!pricing) {
      throw new BadRequestException(
        'Pricing not configured',
      );
    }

    try {
      const response =
        await firstValueFrom(
          this.http.post(
            `${process.env.NEROTIX_BASE_URL}${endpoint}`,
            payload,
            {
              headers: {
                Authorization:
                  `Bearer ${process.env.NEROTIX_TOKEN}`,
              },
            },
          ),
        );

      await this.walletService.debitWallet(
        key.userId,
        pricing.price,
        `${serviceName} Verification`,
      );

      await this.prisma.verificationRequest.create({
        data: {
          userId: key.userId,
          serviceName,
          amount: pricing.price,
          status: 'SUCCESS',
          requestData: payload,
          responseData: response.data,
        },
      });

      return response.data;
    } catch (error: any) {
      console.log('========== NEROTIX ERROR ==========');
      console.log(
        'Status:',
        error?.response?.status,
      );
      console.log(
        'Response:',
        error?.response?.data,
      );
      console.log(
        'Message:',
        error?.message,
      );
      console.log('===================================');

      await this.prisma.verificationRequest.create({
        data: {
          userId: key.userId,
          serviceName,
          amount: pricing.price,
          status: 'FAILED',
          requestData: payload,
          responseData:
            error?.response?.data || {},
          errorMessage:
            error?.response?.data?.message ||
            error.message,
        },
      });

      throw error;
    }
  }

  async getHistory(userId: string) {
    return this.prisma.verificationRequest.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}