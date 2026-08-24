import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PaginationQuery } from '@bm/shared';

@Injectable()
export class WarehousesService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: PaginationQuery) {
    const { page = 1, limit = 20, search, sortBy = 'createdAt', sortOrder = 'desc' } = query;
    const skip = (page - 1) * limit;

    const where = search
      ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' as const } },
            { code: { contains: search, mode: 'insensitive' as const } },
          ],
        }
      : {};

    const [data, total] = await Promise.all([
      this.prisma.warehouse.findMany({ where, skip, take: limit, orderBy: { [sortBy]: sortOrder } }),
      this.prisma.warehouse.count({ where }),
    ]);

    return { data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  }

  async findById(id: string) {
    const warehouse = await this.prisma.warehouse.findUnique({ where: { id } });
    if (!warehouse) throw new NotFoundException('Warehouse not found');
    return warehouse;
  }

  async create(data: Record<string, unknown>) {
    return this.prisma.warehouse.create({ data: data as never });
  }

  async update(id: string, data: Record<string, unknown>) {
    await this.findById(id);
    return this.prisma.warehouse.update({ where: { id }, data: data as never });
  }
}
