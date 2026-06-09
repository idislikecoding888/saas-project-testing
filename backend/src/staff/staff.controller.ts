import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';

import { StaffService } from './staff.service';

import { Permission } from '../common/decorators/permission.decorator';
import { PermissionGuard } from '../common/guards/permission.guard';

@Controller('staff')
export class StaffController {
  constructor(
    private readonly staffService: StaffService,
  ) {}

  @UseGuards(PermissionGuard)
  @Permission('MANAGE_STAFF')
  @Post('create')
  createStaff(
    @Body()
    body: {
      email: string;
      password: string;
      firstName?: string;
      lastName?: string;
    },
  ) {
    return this.staffService.createStaff(body);
  }

  @UseGuards(PermissionGuard)
  @Permission('MANAGE_STAFF')
  @Get()
  getAllStaff() {
    return this.staffService.getAllStaff();
  }

  @UseGuards(PermissionGuard)
  @Permission('MANAGE_STAFF')
  @Post('assign-permission')
  assignPermission(
    @Body()
    body: {
      userId: string;
      permissionId: string;
    },
  ) {
    return this.staffService.assignPermission(
      body.userId,
      body.permissionId,
    );
  }

  @UseGuards(PermissionGuard)
  @Permission('MANAGE_STAFF')
  @Get('permissions')
  getStaffPermissions() {
    return this.staffService.getStaffPermissions();
  }
}