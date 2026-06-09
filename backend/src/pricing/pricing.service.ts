import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PricingService {
  constructor(private prisma: PrismaService) {}

  async getAllPricing() {
    return this.prisma.pricing.findMany({
      orderBy: {
        serviceName: 'asc',
      },
    });
  }

  async updatePricing(id: string, price: number) {
    return this.prisma.pricing.update({
      where: {
        id,
      },
      data: {
        price,
      },
    });
  }
}
