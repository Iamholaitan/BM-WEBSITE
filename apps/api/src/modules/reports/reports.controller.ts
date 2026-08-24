import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ReportsService } from './reports.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('Reports')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Get('dashboard-stats')
  @ApiOperation({ summary: 'Get dashboard statistics' })
  async getDashboardStats() {
    const stats = await this.reportsService.getDashboardStats();
    return { success: true, data: stats };
  }

  @Get('shipment-volume')
  @ApiOperation({ summary: 'Get shipment volume (last 30 days)' })
  async getShipmentVolume() {
    const data = await this.reportsService.getShipmentVolume();
    return { success: true, data };
  }

  @Get('revenue')
  @ApiOperation({ summary: 'Get revenue by month' })
  async getRevenue() {
    const data = await this.reportsService.getRevenue();
    return { success: true, data };
  }
}
