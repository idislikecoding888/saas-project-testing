import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PricingService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async getAllPricing() {
    return this.prisma.pricing.findMany({
      orderBy: {
        serviceName: 'asc',
      },
    });
  }

  async getDeveloperDocs() {
    const pricing =
      await this.prisma.pricing.findMany({
        where: {
          isActive: true,
        },
        orderBy: {
          serviceName: 'asc',
        },
      });

    return pricing.map((item) => ({
      serviceName: item.serviceName,
      price: item.price,
      endpoint:
        this.getEndpointForService(
          item.serviceName,
        ),
    }));
  }

  private getEndpointForService(
    serviceName: string,
  ) {
    const endpoints = {
      AADHAAR_OTP:
        '/verifications/aadhaar/send-otp',

      DIGILOCKER:
        '/verifications/digilocker',

      PAN_VERIFY:
        '/verifications/pan',

      PAN_360:
        '/verifications/pan-360',

      DRIVING_LICENSE:
        '/verifications/driving-license',

      VOTER_ID:
        '/verifications/voter-id',

      PASSPORT:
        '/verifications/passport',

      PENNY_DROP:
        '/verifications/penny-drop',

      PAN_TO_GSTIN:
        '/verifications/pan-to-gstin',

      CIN_LOOKUP:
        '/verifications/cin-lookup',

      GST_VERIFY:
        '/verifications/gst',

      UDYAM:
        '/verifications/udyam',

      PAN_TO_UDYAM:
        '/verifications/pan-to-udyam',

      FACE_CHECK:
        '/verifications/face-check',

      FACE_LIVELINESS:
        '/verifications/face-liveliness',

      NAME_MATCH:
        '/verifications/name-match',

      REVERSE_GEOCODING:
        '/verifications/reverse-geocoding',

      VEHICLE_RC:
        '/verifications/vehicle-rc',

      EMPLOYMENT_360:
        '/verifications/employment-360',

      NUMBER_LOOKUP:
        '/verifications/number-lookup',
    };

    return (
      endpoints[serviceName] ||
      '/verifications'
    );
  }

  async updatePricing(
    id: string,
    price: number,
  ) {
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