import {
  Controller,
  Post,
  Get,
  Param,
} from '@nestjs/common';

import { ApiKeysService } from './api-keys.service';

@Controller('api-keys')
export class ApiKeysController {
  constructor(
    private readonly apiKeysService: ApiKeysService,
  ) {}

  @Post(':userId')
  generateKey(
    @Param('userId')
    userId: string,
  ) {
    return this.apiKeysService.generateApiKey(
      userId,
    );
  }

  @Get(':userId')
  getKeys(
    @Param('userId')
    userId: string,
  ) {
    return this.apiKeysService.getUserKeys(
      userId,
    );
  }
}