import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { User } from '@telega/database';
import { BotService } from './bot.service';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly botService: BotService,
  ) {}

  async send(
    userId: string,
    notification: {
      title: string;
      message: string;
      type: string;
      metadata?: any;
    },
  ) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user || !user.telegramId) {
      throw new Error('User not found or Telegram ID not set');
    }

    const message = `
*${notification.title}*

${notification.message}
    `.trim();

    return this.botService.sendMessage(user.telegramId, message, {
      parse_mode: 'Markdown',
      ...notification.metadata,
    });
  }

  async sendToMany(
    userIds: string[],
    notification: {
      title: string;
      message: string;
      type: string;
      metadata?: any;
    },
  ) {
    const users = await this.userRepository.find({
      where: { id: In(userIds) },
    });

    const message = `
*${notification.title}*

${notification.message}
    `.trim();

    return Promise.all(
      users
        .filter((user) => user.telegramId)
        .map((user) =>
          this.botService.sendMessage(user.telegramId, message, {
            parse_mode: 'Markdown',
            ...notification.metadata,
          }),
        ),
    );
  }
}
