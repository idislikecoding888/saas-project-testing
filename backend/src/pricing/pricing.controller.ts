import {
  Controller,
  Get,
  Patch,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';

import { PricingService } from './pricing.service';

import { Permission } from '../common/decorators/permission.decorator';
import { PermissionGuard } from '../common/guards/permission.guard';

@Controller('pricing')
export class PricingController {
  constructor(
    private readonly pricingService: PricingService,
  ) {}

  @Get()
  getAllPricing() {
    return this.pricingService.getAllPricing();
  }

  @Get('developer/docs')
  developerDocs() {
    return this.pricingService.getDeveloperDocs();
  }

  @UseGuards(PermissionGuard)
  @Permission('MANAGE_PRICING')
  @Patch(':id')
  updatePricing(
    @Param('id') id: string,
    @Body() body: { price: number },
  ) {
    return this.pricingService.updatePricing(
      id,
      body.price,
    );
  }
}