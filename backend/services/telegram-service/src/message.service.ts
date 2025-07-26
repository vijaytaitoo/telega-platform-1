import { Injectable } from '@nestjs/common';
import axios from 'axios';

interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  description: string;
}

@Injectable()
export class MessageService {
  private formatProductMessage(product: Product): string {
    return `
📦 ${product.title}

💰 Цена: ${product.price.toLocaleString()} ₽

📝 ${product.description}
    `;
  }

  async sendProductCard(token: string, chatId: number, product: Product) {
    const telegramUrl = `https://api.telegram.org/bot${token}/sendPhoto`;

    try {
      const response = await axios.post(telegramUrl, {
        chat_id: chatId,
        photo: product.image,
        caption: this.formatProductMessage(product),
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: '🛍 Добавить в корзину',
                callback_data: `add_to_cart:${product.id}`,
              },
            ],
            [
              {
                text: '🔍 Подробнее',
                url: `https://your-domain.com/product/${product.id}`,
              },
            ],
          ],
        },
      });

      return response.data;
    } catch (error) {
      throw new Error(`Ошибка отправки карточки товара: ${error.message}`);
    }
  }

  async sendOrderConfirmation(token: string, chatId: number, orderId: string) {
    const telegramUrl = `https://api.telegram.org/bot${token}/sendMessage`;

    try {
      const response = await axios.post(telegramUrl, {
        chat_id: chatId,
        text: `✅ Заказ #${orderId} успешно оформлен!

Мы уведомим вас о статусе заказа в этом чате.`,
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: '📋 Детали заказа',
                callback_data: `view_order:${orderId}`,
              },
            ],
          ],
        },
      });

      return response.data;
    } catch (error) {
      throw new Error(`Ошибка отправки подтверждения заказа: ${error.message}`);
    }
  }

  async sendShippingUpdate(
    token: string,
    chatId: number,
    orderId: string,
    status: string,
  ) {
    const telegramUrl = `https://api.telegram.org/bot${token}/sendMessage`;

    const statusEmoji = {
      processing: '⚙️',
      shipped: '🚚',
      delivered: '✅',
      cancelled: '❌',
    };

    try {
      const response = await axios.post(telegramUrl, {
        chat_id: chatId,
        text: `${statusEmoji[status]} Обновление статуса заказа #${orderId}:

Статус: ${status}`,
        parse_mode: 'HTML',
      });

      return response.data;
    } catch (error) {
      throw new Error(`Ошибка отправки обновления статуса: ${error.message}`);
    }
  }
}
