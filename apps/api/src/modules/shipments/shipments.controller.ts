import { Controller, Get, Post, Put, Param, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ShipmentsService } from './shipments.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { paginationSchema, createShipmentSchema, updateShipmentStatusSchema } from '@bm/shared';
import { UserRole } from '@prisma/client';
import { ShipmentStatus } from '@bm/shared';

@ApiTags('Shipments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('shipments')
export class ShipmentsController {
  constructor(private shipmentsService: ShipmentsService) {}

  @Get()
  @ApiOperation({ summary: 'List shipments' })
  async findAll(@Query() query: unknown) {
    const params = paginationSchema.parse(query) as never;
    const result = await this.shipmentsService.findAll(params);
    return { success: true, ...result };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get shipment by ID' })
  async findOne(@Param('id') id: string) {
    const shipment = await this.shipmentsService.findById(id);
    return { success: true, data: shipment };
  }

  @Post()
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.OPERATOR)
  @ApiOperation({ summary: 'Create shipment' })
  async create(@Body() body: unknown, @CurrentUser() user: { id: string }) {
    const data = createShipmentSchema.parse(body);
    const shipment = await this.shipmentsService.create(data as never, user.id);
    return { success: true, data: shipment };
  }

  @Put(':id/status')
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.OPERATOR)
  @ApiOperation({ summary: 'Update shipment status' })
  async updateStatus(@Param('id') id: string, @Body() body: unknown) {
    const { status } = updateShipmentStatusSchema.parse(body);
    const shipment = await this.shipmentsService.updateStatus(id, status as ShipmentStatus);
    return { success: true, data: shipment };
  }

  @Post(':id/cancel')
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @ApiOperation({ summary: 'Cancel shipment' })
  async cancel(@Param('id') id: string) {
    const shipment = await this.shipmentsService.cancel(id);
    return { success: true, data: shipment };
  }

  @Post(':id/events')
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.OPERATOR)
  @ApiOperation({ summary: 'Add tracking event' })
  async addEvent(
    @Param('id') id: string,
    @Body() body: { eventType: string; location?: string; latitude?: number; longitude?: number; notes?: string },
    @CurrentUser() user: { id: string },
  ) {
    const event = await this.shipmentsService.addEvent(id, body, user.id);
    return { success: true, data: event };
  }
}
