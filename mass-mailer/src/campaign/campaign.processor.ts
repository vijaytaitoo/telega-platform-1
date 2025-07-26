import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bullmq';
import { PrismaService } from '../prisma.service';
import { TelegramService } from '../telegram/telegram.service';
import { Injectable, Logger } from '@nestjs/common';
import { CampaignGateway, CampaignEventsEnum } from './campaign.gateway';

@Injectable()
@Processor('campaign')
export class CampaignProcessor {
  private readonly logger = new Logger(CampaignProcessor.name);
  constructor(
    private readonly prisma: PrismaService,
    private readonly telegram: TelegramService,
    private readonly gateway: CampaignGateway,
  ) {}

  @Process('send-campaign')
  async handleSendCampaign(job: Job) {
    const { campaignId, retryOnly, chatIds } = job.data;
    const campaign = await this.prisma.campaign.findUnique({
      where: { id: campaignId },
      include: { recipients: true },
    });
    if (!campaign) {
      this.logger.error(`Campaign not found: ${campaignId}`);
      return;
    }
    const token = process.env.DEFAULT_TELEGRAM_BOT_TOKEN;
    let recipientsToSend;
    if (retryOnly && Array.isArray(chatIds)) {
      recipientsToSend = campaign.recipients.filter((r) => chatIds.includes(r.userId));
    } else {
      recipientsToSend = campaign.recipients.filter((r) => r.status === 'PENDING');
    }
    for (const [i, recipient] of recipientsToSend.entries()) {
      // Проверка статуса кампании перед отправкой
      const currentCampaign = await this.prisma.campaign.findUnique({ where: { id: campaignId } });
      if (currentCampaign.status === 'ABORTED') {
        this.logger.warn('Campaign aborted, skipping...');
        this.gateway.sendAborted(campaignId, {
          status: 'ABORTED',
          sent: i,
          failed: recipientsToSend.slice(0, i).filter((r) => r.status === 'ERROR').length,
          total: recipientsToSend.length,
        });
        return;
      }
      try {
        await this.telegram.sendMessage(
          token,
          recipient.userId,
          campaign.message,
          campaign.buttons,
        );
        await this.prisma.recipient.update({
          where: { id: recipient.id },
          data: { status: 'SENT', sentAt: new Date() },
        });
        this.gateway.sendProgress(campaignId, {
          status: 'IN_PROGRESS',
          sent: i + 1,
          failed: recipientsToSend.slice(0, i + 1).filter((r) => r.status === 'ERROR').length,
          total: recipientsToSend.length,
          currentUser: recipient.userId,
        });
      } catch (err) {
        this.logger.error(`Error sending to ${recipient.userId}: ${err}`);
        await this.prisma.recipient.update({
          where: { id: recipient.id },
          data: { status: 'ERROR', error: String(err) },
        });
        this.gateway.sendError(campaignId, {
          status: 'ERROR',
          userId: recipient.userId,
          error: String(err),
        });
      }
    }
    // После завершения
    await this.prisma.campaign.update({
      where: { id: campaign.id },
      data: { status: 'COMPLETED', completedAt: new Date() },
    });
    this.gateway.sendCompleted(campaignId, {
      status: 'COMPLETED',
      sent: recipientsToSend.filter((r) => r.status === 'SENT').length,
      failed: recipientsToSend.filter((r) => r.status === 'ERROR').length,
      total: recipientsToSend.length,
    });
  }
}
