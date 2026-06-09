import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SupportService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async createTicket(data: {
    userId: string;
    subject: string;
    message: string;
  }) {
    return this.prisma.supportTicket.create({
      data: {
        userId: data.userId,
        subject: data.subject,
        message: data.message,
        status: 'OPEN',
      },
    });
  }

  async getUserTickets(
    userId: string,
  ) {
    return this.prisma.supportTicket.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getAllTickets() {
    return this.prisma.supportTicket.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async updateStatus(
    ticketId: string,
    status: string,
  ) {
    return this.prisma.supportTicket.update({
      where: {
        id: ticketId,
      },
      data: {
        status,
      },
    });
  }
}