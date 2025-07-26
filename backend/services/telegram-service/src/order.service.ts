import { Injectable } from '@nestjs/common';
import { BotService } from './bot.service';
import { CartService, CartItem } from './cart.service';
import { Message } from 'telegraf/typings/core/types/typegram';

export interface OrderItem extends CartItem {}

export interface Order {
  id: string;
  userId: number;
  items: OrderItem[];
  total: number;
  status:
    | 'pending'
    | 'confirmed'
    | 'processing'
    | 'shipped'
    | 'delivered'
    | 'cancelled';
  shippingAddress?: string;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class OrderService {
  private orders: Map<string, Order> = new Map();
  private userOrders: Map<number, string[]> = new Map();

  constructor(
    private readonly botService: BotService,
    private readonly cartService: CartService,
  ) {}

  private generateOrderId(): string {
    return Math.random().toString(36).substring(2, 15);
  }

  async createOrder(userId: number, shippingAddress: string): Promise<Order> {
    const total = await this.cartService.getCartTotal(userId);
    const cart = await this.cartService.getCart(userId);

    if (!cart.items.length) {
      throw new Error('Корзина пуста');
    }

    const orderId = this.generateOrderId();
    const order: Order = {
      id: orderId,
      userId,
      items: [...cart.items],
      total,
      status: 'pending',
      shippingAddress,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.orders.set(orderId, order);

    if (!this.userOrders.has(userId)) {
      this.userOrders.set(userId, []);
    }
    this.userOrders.get(userId).push(orderId);

    await this.cartService.clearCart(userId);
    await this.sendOrderNotification(order);

    return order;
  }

  async getUserOrders(userId: number): Promise<Order[]> {
    const orderIds = this.userOrders.get(userId) || [];
    return orderIds
      .map((id) => this.orders.get(id))
      .filter((order): order is Order => order !== undefined);
  }

  async getOrder(orderId: string): Promise<Order | undefined> {
    return this.orders.get(orderId);
  }

  async updateOrderStatus(orderId: string, status: Order['status']) {
    const order = this.orders.get(orderId);
    if (!order) {
      throw new Error('Заказ не найден');
    }

    order.status = status;
    order.updatedAt = new Date();
    this.orders.set(orderId, order);

    await this.sendOrderStatusUpdate(order);
    return order;
  }

  private async sendOrderNotification(
    order: Order,
  ): Promise<Message.TextMessage> {
    const itemsList = order.items
      .map(
        (item) =>
          `${item.title}\nx${item.quantity} = ${item.price * item.quantity} ₽`,
      )
      .join('\n');

    const text = `
🎉 Заказ #${order.id} создан!

Состав заказа:
${itemsList}

💰 Итого: ${order.total} ₽
📦 Статус: ${this.getStatusEmoji(order.status)} ${order.status}
🏠 Адрес доставки: ${order.shippingAddress}
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

    return this.botService.sendMessage(order.userId, text, {
      reply_markup: keyboard,
      parse_mode: 'HTML',
    });
  }

  private async sendOrderStatusUpdate(
    order: Order,
  ): Promise<Message.TextMessage> {
    const text = `
📦 Статус заказа #${order.id} обновлен!

${this.getStatusEmoji(order.status)} Новый статус: ${order.status}
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

    return this.botService.sendMessage(order.userId, text, {
      reply_markup: keyboard,
      parse_mode: 'HTML',
    });
  }

  private getStatusEmoji(status: Order['status']): string {
    const statusEmojis = {
      pending: '⏳',
      confirmed: '✅',
      processing: '🔧',
      shipped: '🚚',
      delivered: '📦',
      cancelled: '❌',
    };
    return statusEmojis[status] || '❓';
  }
}
