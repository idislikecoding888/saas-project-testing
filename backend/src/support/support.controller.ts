import {
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';

import { SupportService } from './support.service';

import { Permission } from '../common/decorators/permission.decorator';
import { PermissionGuard } from '../common/guards/permission.guard';

@Controller('support')
export class SupportController {
  constructor(
    private readonly supportService:
      SupportService,
  ) {}

  @Post('create')
  createTicket(
    @Body()
    body: {
      userId: string;
      subject: string;
      message: string;
    },
  ) {
    return this.supportService.createTicket(
      body,
    );
  }

  @Get('user/:userId')
  getUserTickets(
    @Param('userId')
    userId: string,
  ) {
    return this.supportService.getUserTickets(
      userId,
    );
  }

  @UseGuards(PermissionGuard)
  @Permission('VIEW_SUPPORT')
  @Get('all')
  getAllTickets() {
    return this.supportService.getAllTickets();
  }

  @UseGuards(PermissionGuard)
  @Permission('VIEW_SUPPORT')
  @Patch(':ticketId/status')
  updateStatus(
    @Param('ticketId')
    ticketId: string,

    @Body()
    body: {
      status: string;
    },
  ) {
    return this.supportService.updateStatus(
      ticketId,
      body.status,
    );
  }
}