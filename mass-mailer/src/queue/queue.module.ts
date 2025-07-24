import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { bullConfig } from './bull.config';

@Module({
  imports: [
    BullModule.forRoot(bullConfig),
  ],
})
export class QueueModule {} 