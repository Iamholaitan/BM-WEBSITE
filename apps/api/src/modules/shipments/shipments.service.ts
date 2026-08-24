import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PaginationQuery } from '@bm/shared';
import { ShipmentStatus as PrismaShipmentStatus, Prisma } from '@prisma/client';
import { STATUS_TRANSITIONS, ShipmentStatus } from '@bm/shared';

@Injectable()
export class ShipmentsService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: PaginationQuery & { status?: string; customerId?: string }) {
    const { page = 1, limit = 20, search, sortBy = 'createdAt', sortOrder = 'desc', status, customerId } = query;
    const skip = (page - 1) * limit;

    const where: Prisma.ShipmentWhereInput = {
      ...(status ? { status: status as ShipmentStatus } : {}),
      ...(customerId ? { customerId } : {}),
      ...(search
        ? {
            OR: [
              { trackingNumber: { contains: search, mode: 'insensitive' } },
              { customer: { name: { contains: search, mode: 'insensitive' } } },
            ],
          }
        : {}),
    };

    const [data, total] = await Promise.all([
      this.prisma.shipment.findMany({
        where,
        include: { customer: { select: { id: true, name: true, company: true } }, carrier: { select: { id: true, name: true, code: true } } },
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.shipment.count({ where }),
    ]);

    return { data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  }

  async findById(id: string) {
    const shipment = await this.prisma.shipment.findUnique({
      where: { id },
      include: {
        customer: true,
        carrier: true,
        items: true,
        events: { orderBy: { recordedAt: 'desc' } },
        documents: true,
      },
    });
    if (!shipment) throw new NotFoundException('Shipment not found');
    return shipment;
  }

  async findByTrackingNumber(trackingNumber: string) {
    const shipment = await this.prisma.shipment.findUnique({
      where: { trackingNumber },
      include: {
        events: { orderBy: { recordedAt: 'desc' } },
        items: true,
      },
    });
    if (!shipment) throw new NotFoundException('Shipment not found');
    return shipment;
  }

  async create(data: {
    type: string;
    customerId: string;
    carrierId?: string;
    originWarehouseId?: string;
    destWarehouseId?: string;
    originAddress: Record<string, string>;
    destAddress: Record<string, string>;
    estimatedDelivery?: string;
    weight?: number;
    dimensions?: Record<string, unknown>;
    specialInstructions?: string;
    items: Array<{ description: string; quantity: number; unitValue?: number; hsCode?: string; weight?: number }>;
  }, createdBy: string) {
    const trackingNumber = await this.generateTrackingNumber();

    return this.prisma.$transaction(async (tx) => {
      const shipment = await tx.shipment.create({
        data: {
          trackingNumber,
          type: data.type as never,
          customerId: data.customerId,
          carrierId: data.carrierId,
          originWarehouseId: data.originWarehouseId,
          destWarehouseId: data.destWarehouseId,
          originAddress: data.originAddress as never,
          destAddress: data.destAddress as never,
          estimatedDelivery: data.estimatedDelivery ? new Date(data.estimatedDelivery) : null,
          weight: data.weight,
          dimensions: data.dimensions as never,
          specialInstructions: data.specialInstructions,
          createdBy,
          items: {
            create: data.items,
          },
        },
        include: { items: true },
      });

      return shipment;
    });
  }

  async updateStatus(id: string, newStatus: ShipmentStatus) {
    const shipment = await this.prisma.shipment.findUnique({ where: { id } });
    if (!shipment) throw new NotFoundException('Shipment not found');

    const allowed = STATUS_TRANSITIONS[shipment.status as ShipmentStatus];
    if (!allowed || !allowed.includes(newStatus)) {
      throw new BadRequestException(`Cannot transition from ${shipment.status} to ${newStatus}`);
    }

    const updateData: Prisma.ShipmentUpdateInput = { status: newStatus as PrismaShipmentStatus };
    if (newStatus === ShipmentStatus.DELIVERED) {
      updateData.actualDelivery = new Date();
    }

    return this.prisma.shipment.update({
      where: { id },
      data: updateData,
      include: { customer: true, carrier: true, items: true },
    });
  }

  async cancel(id: string) {
    return this.updateStatus(id, ShipmentStatus.CANCELLED);
  }

  async addEvent(shipmentId: string, data: {
    eventType: string;
    location?: string;
    latitude?: number;
    longitude?: number;
    notes?: string;
  }, recordedBy: string) {
    const shipment = await this.prisma.shipment.findUnique({ where: { id: shipmentId } });
    if (!shipment) throw new NotFoundException('Shipment not found');

    return this.prisma.shipmentEvent.create({
      data: {
        shipmentId,
        eventType: data.eventType as never,
        location: data.location,
        latitude: data.latitude,
        longitude: data.longitude,
        notes: data.notes,
        recordedBy,
      },
    });
  }

  private async generateTrackingNumber(): Promise<string> {
    const date = new Date();
    const datePart = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;
    let attempts = 0;
    while (attempts < 10) {
      const random = Math.random().toString(36).substring(2, 8).toUpperCase();
      const trackingNumber = `BM-${datePart}-${random}`;
      const existing = await this.prisma.shipment.findUnique({ where: { trackingNumber } });
      if (!existing) return trackingNumber;
      attempts++;
    }
    throw new BadRequestException('Could not generate unique tracking number');
  }
}
