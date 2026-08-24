import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ShipmentStatus, ShipmentType, PaymentStatus } from '@prisma/client';

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  async getDashboardStats() {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const [
      totalShipments,
      activeShipments,
      deliveredShipments,
      totalCustomers,
      pendingInvoices,
      shipmentsByStatus,
      shipmentsByType,
      recentShipments,
      revenueResult,
    ] = await Promise.all([
      this.prisma.shipment.count(),
      this.prisma.shipment.count({
        where: { status: { in: [ShipmentStatus.IN_TRANSIT, ShipmentStatus.PICKED_UP, ShipmentStatus.OUT_FOR_DELIVERY] } },
      }),
      this.prisma.shipment.count({ where: { status: ShipmentStatus.DELIVERED } }),
      this.prisma.customer.count({ where: { deletedAt: null } }),
      this.prisma.invoice.count({ where: { status: PaymentStatus.PENDING } }),
      this.prisma.shipment.groupBy({ by: ['status'], _count: true }),
      this.prisma.shipment.groupBy({ by: ['type'], _count: true }),
      this.prisma.shipment.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
        include: { customer: { select: { name: true } } },
      }),
      this.prisma.invoice.aggregate({ _sum: { total: true }, where: { status: PaymentStatus.PAID } }),
    ]);

    const shipmentsByStatusMap = {} as Record<string, number>;
    for (const s of shipmentsByStatus) {
      shipmentsByStatusMap[s.status] = s._count;
    }

    const shipmentsByTypeMap = {} as Record<string, number>;
    for (const s of shipmentsByType) {
      shipmentsByTypeMap[s.type] = s._count;
    }

    return {
      totalShipments,
      activeShipments,
      deliveredShipments,
      totalCustomers,
      totalRevenue: Number(revenueResult._sum.total || 0),
      pendingInvoices,
      shipmentsByStatus: shipmentsByStatusMap,
      shipmentsByType: shipmentsByTypeMap,
      recentShipments,
    };
  }

  async getShipmentVolume() {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const shipments = await this.prisma.shipment.findMany({
      where: { createdAt: { gte: thirtyDaysAgo } },
      select: { createdAt: true },
    });

    const volume: Record<string, number> = {};
    for (const s of shipments) {
      const day = s.createdAt.toISOString().split('T')[0];
      volume[day] = (volume[day] || 0) + 1;
    }

    return Object.entries(volume).map(([date, count]) => ({ date, count }));
  }

  async getRevenue() {
    const invoices = await this.prisma.invoice.findMany({
      where: { status: PaymentStatus.PAID },
      select: { total: true, paidAt: true },
    });

    const revenue: Record<string, number> = {};
    for (const inv of invoices) {
      const month = inv.paidAt
        ? inv.paidAt.toISOString().substring(0, 7)
        : 'unknown';
      revenue[month] = (revenue[month] || 0) + Number(inv.total);
    }

    return Object.entries(revenue).map(([month, total]) => ({ month, total }));
  }
}
