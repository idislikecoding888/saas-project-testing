import {
  Controller,
  Get,
  Post,
  Param,
  Body,
} from '@nestjs/common';

import { WalletService } from './wallet.service';

@Controller('wallet')
export class WalletController {
  constructor(
    private readonly walletService: WalletService,
  ) {}

  @Get(':userId')
  getWallet(
    @Param('userId') userId: string,
  ) {
    return this.walletService.getWallet(
      userId,
    );
  }

  @Post('credit')
  creditWallet(
    @Body()
    body: {
      userId: string;
      amount: number;
      description?: string;
    },
  ) {
    return this.walletService.creditWallet(
      body.userId,
      body.amount,
      body.description,
    );
  }

  @Post('debit')
  debitWallet(
    @Body()
    body: {
      userId: string;
      amount: number;
      description?: string;
    },
  ) {
    return this.walletService.debitWallet(
      body.userId,
      body.amount,
      body.description,
    );
  }

  @Get('transactions/:userId')
  getTransactions(
    @Param('userId') userId: string,
  ) {
    return this.walletService.getTransactions(
      userId,
    );
  }
}
