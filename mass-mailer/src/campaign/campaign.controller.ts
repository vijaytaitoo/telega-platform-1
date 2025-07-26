import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiParam } from '@nestjs/swagger';
import { CampaignStatus } from '@prisma/client';

@ApiTags('Campaigns')
@Controller('campaigns')
export class CampaignController {
  constructor(private readonly campaignService: CampaignService) {}

  @Post()
  @ApiOperation({ summary: 'Создать рассылку' })
  @ApiResponse({ status: 201, description: 'Кампания создана и поставлена в очередь' })
  async create(@Body() dto: CreateCampaignDto) {
    return this.campaignService.createCampaign(dto);
  }

  @Get()
  @ApiQuery({ name: 'ownerId', required: true })
  @ApiQuery({ name: 'status', enum: CampaignStatus, required: false })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'offset', required: false, type: Number })
  async getCampaigns(
    @Query('ownerId') ownerId: string,
    @Query('status') status?: CampaignStatus,
    @Query('limit') limit = 20,
    @Query('offset') offset = 0,
  ) {
    return this.campaignService.getCampaigns({
      ownerId,
      status,
      limit: Number(limit),
      offset: Number(offset),
    });
  }

  @Get(':id/status')
  @ApiOperation({ summary: 'Статус и статистика рассылки' })
  @ApiResponse({ status: 200, description: 'Статистика кампании' })
  async getStatus(@Param('id') id: string) {
    return this.campaignService.getCampaignStatus(id);
  }

  @Post(':id/retry')
  @ApiOperation({ summary: 'Повторить отправку неудачных сообщений' })
  @ApiParam({ name: 'id', type: String })
  async retryFailed(@Param('id') id: string) {
    return this.campaignService.retryFailed(id);
  }

  @Post(':id/abort')
  @ApiOperation({ summary: 'Прервать рассылку' })
  @ApiParam({ name: 'id', type: String })
  async abort(@Param('id') id: string) {
    return this.campaignService.abortCampaign(id);
  }
}
