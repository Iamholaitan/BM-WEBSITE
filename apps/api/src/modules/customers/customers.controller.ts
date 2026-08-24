import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CustomersService } from './customers.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { paginationSchema, customerSchema } from '@bm/shared';
import { UserRole } from '@prisma/client';

@ApiTags('Customers')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  @Get()
  @ApiOperation({ summary: 'List customers' })
  async findAll(@Query() query: unknown) {
    const params = paginationSchema.parse(query);
    const result = await this.customersService.findAll(params);
    return { success: true, ...result };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get customer by ID' })
  async findOne(@Param('id') id: string) {
    const customer = await this.customersService.findById(id);
    return { success: true, data: customer };
  }

  @Post()
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.OPERATOR)
  @ApiOperation({ summary: 'Create customer' })
  async create(@Body() body: unknown, @CurrentUser() user: { id: string }) {
    const data = customerSchema.parse(body);
    const customer = await this.customersService.create(data, user.id);
    return { success: true, data: customer };
  }

  @Put(':id')
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @ApiOperation({ summary: 'Update customer' })
  async update(@Param('id') id: string, @Body() body: unknown) {
    const data = customerSchema.partial().parse(body);
    const customer = await this.customersService.update(id, data);
    return { success: true, data: customer };
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Soft delete customer' })
  async remove(@Param('id') id: string) {
    await this.customersService.softDelete(id);
    return { success: true, message: 'Customer deleted' };
  }
}
