import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PaginationQuery } from '@bm/shared';
import { PaymentStatus } from '@prisma/client';

@Injectable()
export class BillingService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: PaginationQuery & { status?: string; customerId?: string }) {
    const { page = 1, limit = 20, status, customerId } = query;
    const skip = (page - 1) * limit;

    const where = {
      ...(status ? { status: status as PaymentStatus } : {}),
      ...(customerId ? { customerId } : {}),
    };

    const [data, total] = await Promise.all([
      this.prisma.invoice.findMany({
        where,
        include: { customer: { select: { id: true, name: true, company: true } } },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.invoice.count({ where }),
    ]);

    return { data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  }

  async findById(id: string) {
    const invoice = await this.prisma.invoice.findUnique({
      where: { id },
      include: { customer: true, lines: true },
    });
    if (!invoice) throw new NotFoundException('Invoice not found');
    return invoice;
  }

  async create(customerId: string, shipmentIds: string[]) {
    if (!shipmentIds.length) throw new BadRequestException('At least one shipment required');

    const shipments = await this.prisma.shipment.findMany({
      where: { id: { in: shipmentIds } },
      include: { items: true },
    });

    if (shipments.length !== shipmentIds.length) {
      throw new BadRequestException('Some shipments not found');
    }

    const invoiceNumber = await this.generateInvoiceNumber();

    let subtotal = 0;
    const lines = shipments.map((s) => {
      const lineTotal = Number(s.weight || 0) * 10;
      subtotal += lineTotal;
      return {
        description: `Shipment ${s.trackingNumber}`,
        quantity: 1,
        unitPrice: lineTotal,
        total: lineTotal,
        shipmentId: s.id,
      };
    });

    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    return this.prisma.invoice.create({
      data: {
        invoiceNumber,
        customerId,
        subtotal,
        tax,
        total,
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        lines: { create: lines },
      },
      include: { lines: true, customer: true },
    });
  }

  async markPaid(id: string) {
    const invoice = await this.prisma.invoice.findUnique({ where: { id } });
    if (!invoice) throw new NotFoundException('Invoice not found');
    if (invoice.status === PaymentStatus.PAID) {
      throw new BadRequestException('Invoice already paid');
    }

    return this.prisma.invoice.update({
      where: { id },
      data: { status: PaymentStatus.PAID, paidAt: new Date() },
      include: { lines: true, customer: true },
    });
  }

  private async generateInvoiceNumber(): Promise<string> {
    const date = new Date();
    const datePart = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;
    let attempts = 0;
    while (attempts < 10) {
      const random = Math.random().toString(36).substring(2, 8).toUpperCase();
      const invoiceNumber = `INV-${datePart}-${random}`;
      const existing = await this.prisma.invoice.findUnique({ where: { invoiceNumber } });
      if (!existing) return invoiceNumber;
      attempts++;
    }
    throw new BadRequestException('Could not generate unique invoice number');
  }
}
