import {
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';

import { AdminService } from './admin.service';

import { Permission } from '../common/decorators/permission.decorator';
import { PermissionGuard } from '../common/guards/permission.guard';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService:
      AdminService,
  ) {}

  @UseGuards(PermissionGuard)
  @Permission('VIEW_USERS')
  @Get('overview')
  getOverview() {
    return this.adminService.getOverview();
  }

  @UseGuards(PermissionGuard)
  @Permission('VIEW_TRANSACTIONS')
  @Get('revenue')
  getRevenue() {
    return this.adminService.getRevenueAnalytics();
  }

  @UseGuards(PermissionGuard)
  @Permission('VIEW_TRANSACTIONS')
  @Get('transactions')
  getTransactions() {
    return this.adminService.getRecentTransactions();
  }

  @UseGuards(PermissionGuard)
  @Permission('VIEW_VERIFICATIONS')
  @Get('verifications')
  getVerifications() {
    return this.adminService.getVerificationAnalytics();
  }
}