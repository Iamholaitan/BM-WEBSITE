import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { TrackingService } from './tracking.service';

@ApiTags('Tracking')
@Controller('tracking')
export class TrackingController {
  constructor(private trackingService: TrackingService) {}

  @Get(':trackingNumber')
  @ApiOperation({ summary: 'Track a shipment by tracking number (public)' })
  async track(@Param('trackingNumber') trackingNumber: string) {
    const data = await this.trackingService.getPublicTracking(trackingNumber);
    return { success: true, data };
  }
}
