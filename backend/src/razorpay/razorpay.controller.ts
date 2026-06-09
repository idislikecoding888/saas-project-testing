import {
  Controller,
  Post,
  Body,
} from '@nestjs/common';

import { RazorpayService } from './razorpay.service';

@Controller('razorpay')
export class RazorpayController {
  constructor(
    private readonly razorpayService:
      RazorpayService,
  ) {}

  @Post('create-order')
  createOrder(
    @Body()
    body: {
      userId: string;
      amount: number;
    },
  ) {
    return this.razorpayService.createOrder(
      body.userId,
      body.amount,
    );
  }

  @Post('verify-payment')
  verifyPayment(
    @Body()
    body: {
      userId: string;
      amount: number;

      razorpayOrderId: string;
      razorpayPaymentId: string;
      razorpaySignature: string;
    },
  ) {
    const verified =
      this.razorpayService.verifyPayment(
        body.razorpayOrderId,
        body.razorpayPaymentId,
        body.razorpaySignature,
      );

    if (!verified) {
      return {
        success: false,
        message:
          'Payment verification failed',
      };
    }

    return this.razorpayService.creditWalletAfterPayment(
      body.userId,
      body.amount,
    );
  }
}