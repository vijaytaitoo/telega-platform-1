import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { TelegramProcessor } from './telegram.processor';

@Module({
  imports: [BullModule.registerQueue({ name: 'telegram' })],
  providers: [TelegramProcessor],
})
export class TelegramModule {}