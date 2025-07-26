import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { BotService } from './bot.service';
import { WebhookService } from './webhook.service';
import { NotificationService } from './notification.service';
import { CartService } from './cart.service';
import { OrderService } from './order.service';
import {
  Update,
  Message,
  CallbackQuery,
} from 'telegraf/typings/core/types/typegram';

@Injectable()
export class TelegramService {
  constructor(
    private readonly configService: ConfigService,
    private readonly botService: BotService,
    private readonly webhookService: WebhookService,
    private readonly notificationService: NotificationService,
    private readonly cartService: CartService,
    private readonly orderService: OrderService,
    @InjectQueue('telegram') private readonly telegramQueue: Queue,
  ) {}

  async initialize() {
    const token = this.configService.get('TELEGRAM_BOT_TOKEN');
    const webhookUrl = this.configService.get('TELEGRAM_WEBHOOK_URL');

    await this.botService.initialize(token);
    await this.webhookService.setWebhook(token, webhookUrl);
  }

  async sendMessage(chatId: number, text: string, options?: any) {
    await this.telegramQueue.add('message', { chatId, text, options });
  }

  async sendNotification(
    userId: string,
    notification: {
      title: string;
      message: string;
      type: string;
      metadata?: any;
    },
  ) {
    await this.telegramQueue.add('notification', { userId, notification });
  }

  async handleUpdate(update: Update) {
    await this.telegramQueue.add('update', { update });
  }

  async sendProductCard(
    chatId: number,
    product: {
      id: string;
      title: string;
      price: number;
      image: string;
      description: string;
    },
  ) {
    const keyboard = {
      inline_keyboard: [
        [
          {
            text: '🛒 В корзину',
            callback_data: JSON.stringify({
              action: 'add_to_cart',
              productId: product.id,
            }),
          },
          {
            text: '💬 Подробнее',
            callback_data: JSON.stringify({
              action: 'product_details',
              productId: product.id,
            }),
          },
        ],
      ],
    };

    const text = `
📦 ${product.title}

${product.description}

💰 Цена: ${product.price} ₽
    `.trim();

    return this.botService.sendMessage(chatId, text, {
      reply_markup: keyboard,
      parse_mode: 'HTML',
    });
  }

  async sendOrderConfirmation(
    chatId: number,
    order: {
      id: string;
      items: Array<{ title: string; quantity: number; price: number }>;
      total: number;
      status: string;
    },
  ) {
    const itemsList = order.items
      .map((item) => `${item.title} x${item.quantity} - ${item.price} ₽`)
      .join('\n');

    const text = `
🎉 Заказ #${order.id} подтвержден!

Состав заказа:
${itemsList}

💰 Итого: ${order.total} ₽
📦 Статус: ${order.status}
    `.trim();

    const keyboard = {
      inline_keyboard: [
        [
          {
            text: '📋 Детали заказа',
            callback_data: JSON.stringify({
              action: 'order_details',
              orderId: order.id,
            }),
          },
        ],
      ],
    };

    return this.botService.sendMessage(chatId, text, {
      reply_markup: keyboard,
      parse_mode: 'HTML',
    });
  }

  private async handleMessage(message: Message) {
    // Обработка сообщений
    const { chat, text } = message;

    if (text === '/start') {
      const keyboard = {
        keyboard: [
          [{ text: '🛍 Каталог' }, { text: '🛒 Корзина' }],
          [{ text: '📦 Мои заказы' }, { text: '⚙️ Настройки' }],
        ],
        resize_keyboard: true,
      };

      await this.sendMessage(
        chat.id,
        'Добро пожаловать в Tele•Ga! 🎉\n\nЯ помогу вам совершать покупки прямо в Telegram.\n\nИспользуйте кнопки меню для навигации или отправьте /help для получения списка команд.',
        { reply_markup: keyboard },
      );
    } else if (text === '/help' || text === 'help') {
      await this.sendMessage(
        chat.id,
        `
Доступные команды:

🛍 Каталог - Просмотр товаров
🛒 Корзина - Ваша корзина
📦 Мои заказы - История заказов
⚙️ Настройки - Настройки профиля

Техническая поддержка: /support
      `.trim(),
      );
    } else if (text.toLowerCase() === '🛍 каталог' || text === '/catalog') {
      // TODO: Интеграция с сервисом каталога
      const demoProduct = {
        id: '1',
        title: 'Демо товар',
        price: 1999,
        image: 'https://example.com/image.jpg',
        description: 'Описание демо товара',
      };
      await this.sendProductCard(chat.id, demoProduct);
    } else if (text.toLowerCase() === '🛒 корзина' || text === '/cart') {
      const cart = await this.cartService.getCart(chat.id);
      if (cart.items.length === 0) {
        await this.sendMessage(chat.id, '🛒 Ваша корзина пуста');
      } else {
        await this.cartService.sendCartSummary(chat.id);
      }
    } else if (text.toLowerCase() === '📦 мои заказы' || text === '/orders') {
      const orders = await this.orderService.getUserOrders(chat.id);
      if (orders.length === 0) {
        await this.sendMessage(chat.id, '📦 У вас пока нет заказов');
      } else {
        const ordersList = orders
          .map(
            (order) =>
              `Заказ #${order.id}\n💰 Сумма: ${order.total} ₽\n📦 Статус: ${order.status}`,
          )
          .join('\n\n');

        const keyboard = {
          inline_keyboard: orders.map((order) => [
            {
              text: `📋 Заказ #${order.id}`,
              callback_data: JSON.stringify({
                action: 'order_details',
                orderId: order.id,
              }),
            },
          ]),
        };

        await this.sendMessage(chat.id, `📦 Ваши заказы:\n\n${ordersList}`, {
          reply_markup: keyboard,
          parse_mode: 'HTML',
        });
      }
    }
  }

  private async handleCallbackQuery(callbackQuery: CallbackQuery) {
    // Обработка callback запросов
    const { data, message } = callbackQuery;

    try {
      const callback = JSON.parse(data);
      const chatId = message.chat.id;

      switch (callback.action) {
        case 'add_to_cart':
          await this.cartService.addToCart(chatId, {
            id: callback.productId,
            title: 'Демо товар', // В реальном приложении получаем из БД
            price: 1999,
          });
          await this.botService.answerCallbackQuery(callbackQuery.id, {
            text: '✅ Товар добавлен в корзину!',
            show_alert: true,
          });
          break;

        case 'product_details':
          await this.botService.answerCallbackQuery(callbackQuery.id);
          await this.sendMessage(
            chatId,
            `Подробная информация о товаре #${callback.productId}\n\nСкоро здесь появится полное описание товара с характеристиками и отзывами.`,
          );
          break;

        case 'order_details':
          const order = await this.orderService.getOrder(callback.orderId);
          if (order) {
            await this.botService.answerCallbackQuery(callbackQuery.id);
            const itemsList = order.items
              .map(
                (item) =>
                  `${item.title} x${item.quantity} = ${item.price * item.quantity} ₽`,
              )
              .join('\n');

            await this.sendMessage(
              chatId,
              `
📋 Информация о заказе #${order.id}

Состав заказа:
${itemsList}

💰 Итого: ${order.total} ₽
📦 Статус: ${order.status}
🏠 Адрес доставки: ${order.shippingAddress}
            `.trim(),
            );
          }
          break;

        case 'decrease_quantity':
          await this.cartService.updateQuantity(
            chatId,
            callback.productId,
            (await this.cartService.getCart(chatId)).items.find(
              (item) => item.productId === callback.productId,
            ).quantity - 1,
          );
          await this.botService.answerCallbackQuery(callbackQuery.id);
          break;

        case 'increase_quantity':
          await this.cartService.updateQuantity(
            chatId,
            callback.productId,
            (await this.cartService.getCart(chatId)).items.find(
              (item) => item.productId === callback.productId,
            ).quantity + 1,
          );
          await this.botService.answerCallbackQuery(callbackQuery.id);
          break;

        case 'remove_from_cart':
          await this.cartService.removeFromCart(chatId, callback.productId);
          await this.botService.answerCallbackQuery(callbackQuery.id, {
            text: '🗑 Товар удален из корзины',
            show_alert: true,
          });
          break;

        case 'clear_cart':
          await this.cartService.clearCart(chatId);
          await this.botService.answerCallbackQuery(callbackQuery.id, {
            text: '🗑 Корзина очищена',
            show_alert: true,
          });
          break;

        case 'checkout':
          // В реальном приложении здесь должен быть запрос адреса доставки
          const demoAddress = 'ул. Примерная, д. 1, кв. 1';
          const newOrder = await this.orderService.createOrder(
            chatId,
            demoAddress,
          );
          await this.botService.answerCallbackQuery(callbackQuery.id, {
            text: '✅ Заказ успешно создан!',
            show_alert: true,
          });
          break;

        default:
          await this.botService.answerCallbackQuery(callbackQuery.id);
          break;
      }
    } catch (error) {
      console.error('Error handling callback query:', error);
    }
  }
}
