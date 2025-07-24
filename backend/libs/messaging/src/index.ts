import { Module } from '@nestjs/common';

@Module({
  imports: [],
  providers: [],
  exports: []
})
export class MessagingModule {}

// Базовые типы
export interface MessagePayload {
  text: string;
  recipientId: string;
}

// Базовый интерфейс для сервисов сообщений
export interface IMessageService {
  send(payload: MessagePayload): Promise<void>;
}