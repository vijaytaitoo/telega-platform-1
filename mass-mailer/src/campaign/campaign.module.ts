import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { CampaignController } from './campaign.controller';
import { CampaignService } from './campaign.service';
import { CampaignProcessor } from './campaign.processor';
import { CampaignGateway } from './campaign.gateway';
import { TelegramModule } from '../telegram/telegram.module';
import { PrismaService } from '../prisma.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'campaign',
    }),
    TelegramModule,
  ],
  controllers: [CampaignController],
  providers: [CampaignService, CampaignProcessor, CampaignGateway, PrismaService],
})
export class CampaignModule {} 