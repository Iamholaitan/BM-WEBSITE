import { Controller, Get, Post, Put, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CarriersService } from './carriers.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '@prisma/client';

@ApiTags('Carriers')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('carriers')
export class CarriersController {
  constructor(private carriersService: CarriersService) {}

  @Get()
  @ApiOperation({ summary: 'List all carriers' })
  async findAll() {
    const carriers = await this.carriersService.findAll();
    return { success: true, data: carriers };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get carrier by ID' })
  async findOne(@Param('id') id: string) {
    const carrier = await this.carriersService.findById(id);
    return { success: true, data: carrier };
  }

  @Post()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Create carrier' })
  async create(@Body() body: { name: string; code: string; apiEndpoint?: string }) {
    const carrier = await this.carriersService.create(body);
    return { success: true, data: carrier };
  }

  @Put(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Update carrier' })
  async update(@Param('id') id: string, @Body() body: Record<string, unknown>) {
    const carrier = await this.carriersService.update(id, body as { name?: string; apiEndpoint?: string; isActive?: boolean });
    return { success: true, data: carrier };
  }
}
