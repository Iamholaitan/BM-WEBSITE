import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TrackingService {
  constructor(private prisma: PrismaService) {}

  async getPublicTracking(trackingNumber: string) {
    const shipment = await this.prisma.shipment.findUnique({
      where: { trackingNumber },
      select: {
        trackingNumber: true,
        status: true,
        type: true,
        originAddress: true,
        destAddress: true,
        estimatedDelivery: true,
        actualDelivery: true,
        createdAt: true,
        events: {
          orderBy: { recordedAt: 'desc' },
          select: {
            eventType: true,
            location: true,
            latitude: true,
            longitude: true,
            notes: true,
            recordedAt: true,
          },
        },
      },
    });

    if (!shipment) throw new NotFoundException('Shipment not found');

    return {
      trackingNumber: shipment.trackingNumber,
      status: shipment.status,
      type: shipment.type,
      origin: shipment.originAddress,
      destination: shipment.destAddress,
      estimatedDelivery: shipment.estimatedDelivery,
      actualDelivery: shipment.actualDelivery,
      createdAt: shipment.createdAt,
      events: shipment.events,
    };
  }
}
