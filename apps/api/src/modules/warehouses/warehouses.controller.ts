import { Controller, Get, Post, Put, Param, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { WarehousesService } from './warehouses.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { paginationSchema, warehouseSchema } from '@bm/shared';
import { UserRole } from '@prisma/client';

@ApiTags('Warehouses')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('warehouses')
export class WarehousesController {
  constructor(private warehousesService: WarehousesService) {}

  @Get()
  @ApiOperation({ summary: 'List warehouses' })
  async findAll(@Query() query: unknown) {
    const params = paginationSchema.parse(query);
    const result = await this.warehousesService.findAll(params);
    return { success: true, ...result };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get warehouse by ID' })
  async findOne(@Param('id') id: string) {
    const warehouse = await this.warehousesService.findById(id);
    return { success: true, data: warehouse };
  }

  @Post()
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @ApiOperation({ summary: 'Create warehouse' })
  async create(@Body() body: unknown) {
    const data = warehouseSchema.parse(body);
    const warehouse = await this.warehousesService.create(data);
    return { success: true, data: warehouse };
  }

  @Put(':id')
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @ApiOperation({ summary: 'Update warehouse' })
  async update(@Param('id') id: string, @Body() body: unknown) {
    const data = warehouseSchema.partial().parse(body);
    const warehouse = await this.warehousesService.update(id, data);
    return { success: true, data: warehouse };
  }
}
