import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class DocumentsService {
  constructor(private prisma: PrismaService) {}

  async findAll(shipmentId?: string) {
    const where = shipmentId ? { shipmentId } : {};
    return this.prisma.document.findMany({
      where,
      include: { uploader: { select: { id: true, firstName: true, lastName: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(data: { shipmentId?: string; type: string; fileName: string; fileUrl: string }, uploadedBy: string) {
    return this.prisma.document.create({
      data: {
        ...data,
        type: data.type as never,
        uploadedBy,
      } as never,
      include: { uploader: { select: { id: true, firstName: true, lastName: true } } },
    });
  }
}
