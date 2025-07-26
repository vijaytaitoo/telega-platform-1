import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bullmq';
import { CreateCampaignDto } from './dto/create-campaign.dto';

@Injectable()
export class CampaignService {
  constructor(
    private readonly prisma: PrismaService,
    @InjectQueue('campaign') private readonly campaignQueue: Queue,
  ) {}

  async createCampaign(dto: CreateCampaignDto) {
    // 1. Создать Campaign
    const campaign = await this.prisma.campaign.create({
      data: {
        ownerId: dto.ownerId,
        message: dto.message,
        imageUrl: dto.imageUrl,
        buttons: dto.buttons,
        recipients: {
          create: dto.recipients.map((userId) => ({ userId })),
        },
      },
      include: { recipients: true },
    });
    // 2. Кладём job в очередь
    await this.campaignQueue.add('send-campaign', { campaignId: campaign.id });
    return {
      id: campaign.id,
      status: campaign.status,
      recipientsCount: campaign.recipients.length,
    };
  }

  async getCampaignStatus(id: string) {
    const campaign = await this.prisma.campaign.findUnique({
      where: { id },
      include: { recipients: true },
    });
    if (!campaign) return null;
    const recipientsTotal = campaign.recipients.length;
    const recipientsSent = campaign.recipients.filter((r) => r.status === 'SENT').length;
    const recipientsError = campaign.recipients.filter((r) => r.status === 'ERROR').length;
    const recipientsPending = campaign.recipients.filter((r) => r.status === 'PENDING').length;
    return {
      id: campaign.id,
      status: campaign.status,
      recipientsTotal,
      recipientsSent,
      recipientsError,
      recipientsPending,
      startedAt: campaign.startedAt,
      completedAt: campaign.completedAt,
    };
  }

  async getCampaigns(query: { ownerId: string; status?: string; limit?: number; offset?: number }) {
    return this.prisma.campaign.findMany({
      where: {
        ownerId: query.ownerId,
        status: query.status,
      },
      orderBy: { createdAt: 'desc' },
      skip: query.offset || 0,
      take: query.limit || 20,
      include: {
        _count: {
          select: {
            recipients: true,
          },
        },
      },
    });
  }

  async retryFailed(campaignId: string) {
    const failedRecipients = await this.prisma.recipient.findMany({
      where: { campaignId, status: 'ERROR' },
    });
    if (!failedRecipients.length) {
      return { retried: 0 };
    }
    await this.prisma.recipient.updateMany({
      where: { campaignId, status: 'ERROR' },
      data: { status: 'PENDING', error: null },
    });
    await this.campaignQueue.add('send-campaign', {
      campaignId,
      retryOnly: true,
      chatIds: failedRecipients.map((r) => r.userId),
    });
    return { retried: failedRecipients.length };
  }

  async abortCampaign(id: string) {
    await this.prisma.campaign.update({
      where: { id },
      data: { status: 'ABORTED' },
    });
    await this.prisma.recipient.updateMany({
      where: { campaignId: id, status: 'PENDING' },
      data: { status: 'ABORTED' },
    });
    return { aborted: true };
  }
}
