import {
  Controller,
  Post,
  Body,
  Headers,
  Get,
  Param,
} from '@nestjs/common';

import { VerificationsService } from './verifications.service';

@Controller('verifications')
export class VerificationsController {
  constructor(
    private readonly verificationsService:
      VerificationsService,
  ) {}

  @Post('pan')
  pan(
    @Headers('x-api-key') apiKey: string,
    @Body() body: any,
  ) {
    return this.verificationsService.executeVerification(
      apiKey,
      'PAN_VERIFY',
      '/service/pancard/verify',
      body,
    );
  }

  @Post('gst')
  gst(
    @Headers('x-api-key') apiKey: string,
    @Body() body: any,
  ) {
    return this.verificationsService.executeVerification(
      apiKey,
      'GST_VERIFY',
      '/service/gst/verify',
      body,
    );
  }

  @Post('aadhaar/send-otp')
  aadhaarOtp(
    @Headers('x-api-key') apiKey: string,
    @Body() body: any,
  ) {
    return this.verificationsService.executeVerification(
      apiKey,
      'AADHAAR_OTP',
      '/service/aadhaar/send-otp',
      body,
    );
  }

  @Post('passport')
  passport(
    @Headers('x-api-key') apiKey: string,
    @Body() body: any,
  ) {
    return this.verificationsService.executeVerification(
      apiKey,
      'PASSPORT',
      '/service/passport/verify',
      body,
    );
  }

  @Post('digilocker')
  digilocker(
    @Headers('x-api-key') apiKey: string,
    @Body() body: any,
  ) {
    return this.verificationsService.executeVerification(
      apiKey,
      'DIGILOCKER',
      '/service/digilocker/verify',
      body,
    );
  }

  @Post('driving-license')
  drivingLicense(
    @Headers('x-api-key') apiKey: string,
    @Body() body: any,
  ) {
    return this.verificationsService.executeVerification(
      apiKey,
      'DRIVING_LICENSE',
      '/service/driving-license/verify',
      body,
    );
  }

  @Post('voter-id')
  voterId(
    @Headers('x-api-key') apiKey: string,
    @Body() body: any,
  ) {
    return this.verificationsService.executeVerification(
      apiKey,
      'VOTER_ID',
      '/service/voter-id/verify',
      body,
    );
  }

  @Get('history/:userId')
  history(
    @Param('userId') userId: string,
  ) {
    return this.verificationsService.getHistory(
      userId,
    );
  }
}