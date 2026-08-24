import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CarriersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.carrier.findMany({ orderBy: { name: 'asc' } });
  }

  async findById(id: string) {
    const carrier = await this.prisma.carrier.findUnique({ where: { id } });
    if (!carrier) throw new NotFoundException('Carrier not found');
    return carrier;
  }

  async create(data: { name: string; code: string; apiEndpoint?: string }) {
    return this.prisma.carrier.create({ data });
  }

  async update(id: string, data: { name?: string; apiEndpoint?: string; isActive?: boolean }) {
    await this.findById(id);
    return this.prisma.carrier.update({ where: { id }, data });
  }
}
