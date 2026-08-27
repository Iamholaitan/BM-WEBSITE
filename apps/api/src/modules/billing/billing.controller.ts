import { Controller, Get, Post, Param, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { BillingService } from './billing.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { paginationSchema } from '@bm/shared';
import { UserRole } from '@prisma/client';

@ApiTags('Billing')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('invoices')
export class BillingController {
  constructor(private billingService: BillingService) {}

  @Get()
  @ApiOperation({ summary: 'List invoices' })
  async findAll(@Query() query: unknown) {
    const params = paginationSchema.parse(query);
    const result = await this.billingService.findAll(params);
    return { success: true, ...result };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get invoice by ID' })
  async findOne(@Param('id') id: string) {
    const invoice = await this.billingService.findById(id);
    return { success: true, data: invoice };
  }

  @Post()
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @ApiOperation({ summary: 'Create invoice from shipments' })
  async create(@Body() body: { customerId: string; shipmentIds: string[] }) {
    const invoice = await this.billingService.create(body.customerId, body.shipmentIds);
    return { success: true, data: invoice };
  }

  @Post(':id/pay')
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @ApiOperation({ summary: 'Mark invoice as paid' })
  async markPaid(@Param('id') id: string) {
    const invoice = await this.billingService.markPaid(id);
    return { success: true, data: invoice };
  }
}
