import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { DocumentsService } from './documents.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('Documents')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('documents')
export class DocumentsController {
  constructor(private documentsService: DocumentsService) {}

  @Get()
  @ApiOperation({ summary: 'List documents' })
  async findAll(@Query('shipmentId') shipmentId?: string) {
    const docs = await this.documentsService.findAll(shipmentId);
    return { success: true, data: docs };
  }

  @Post()
  @ApiOperation({ summary: 'Create document metadata' })
  async create(
    @Body() body: { shipmentId?: string; type: string; fileName: string; fileUrl: string },
    @CurrentUser() user: { id: string },
  ) {
    const doc = await this.documentsService.create(body, user.id);
    return { success: true, data: doc };
  }
}
