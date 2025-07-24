import { Injectable } from '@nestjs/common';
import { BotService } from './bot.service';

import { ExtraReplyMessage } from 'telegraf/typings/telegram-types';

export interface CartItem {
  productId: string;
  title: string;
  price: number;
  quantity: number;
}

export interface Cart {
  userId: number;
  items: CartItem[];
  total: number;
}

@Injectable()
export class CartService {
  private carts: Map<number, Cart> = new Map();

  constructor(private readonly botService: BotService) {}

  public getCart(userId: number): Cart {
    if (!this.carts.has(userId)) {
      this.carts.set(userId, { userId, items: [] });
    }
    return this.carts.get(userId) as Cart;
  }

  async addToCart(userId: number, product: {
    id: string;
    title: string;
    price: number;
  }): Promise<Cart> {
    const cart = this.getCart(userId);
    const existingItem = cart.items.find(item => item.productId === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({
        productId: product.id,
        title: product.title,
        price: product.price,
        quantity: 1
      });
    }

    return this.sendCartSummary(userId);
  }

  async removeFromCart(userId: number, productId: string): Promise<Cart | null> {
    const cart = this.getCart(userId);
    cart.items = cart.items.filter(item => item.productId !== productId);
    return this.sendCartSummary(userId);
  }

  async updateQuantity(userId: number, productId: string, change: 'increase' | 'decrease'): Promise<Cart | null> {
    const cart = this.getCart(userId);
    const item = cart.items.find(item => item.productId === productId);

    if (item) {
      if (quantity <= 0) {
        return this.removeFromCart(userId, productId);
      }
      item.quantity = quantity;
      return this.sendCartSummary(userId);
    }
    return null;
  }

  async clearCart(userId: number): Promise<void> {
    this.carts.set(userId, { userId, items: [] });
    return this.sendCartSummary(userId);
  }

  async getCartTotal(userId: number): Promise<number> {
    const cart = this.getCart(userId);
    return cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  public async sendCartSummary(userId: number, cart: Cart, options?: ExtraReplyMessage): Promise<Message.TextMessage> {
    const cart = this.getCart(userId);
    const total = await this.getCartTotal(userId);

    if (cart.items.length === 0) {
      return this.botService.sendMessage(userId, '🛒 Ваша корзина пуста');
    }

    const itemsList = cart.items
      .map(item => `${item.title}\nx${item.quantity} = ${item.price * item.quantity} ₽`)
      .join('\n\n');

    const keyboard = {
      inline_keyboard: [
        ...cart.items.map(item => ([
          { 
            text: `➖`, 
            callback_data: JSON.stringify({ action: 'decrease_quantity', productId: item.productId })
          },
          { 
            text: `❌ ${item.title}`, 
            callback_data: JSON.stringify({ action: 'remove_from_cart', productId: item.productId })
          },
          { 
            text: `➕`, 
            callback_data: JSON.stringify({ action: 'increase_quantity', productId: item.productId })
          }
        ])),
        [
          { 
            text: '🗑 Очистить корзину', 
            callback_data: JSON.stringify({ action: 'clear_cart' })
          },
          { 
            text: '💳 Оформить заказ', 
            callback_data: JSON.stringify({ action: 'checkout' })
          }
        ]
      ]
    };

    const text = `
🛒 Ваша корзина:

${itemsList}

💰 Итого: ${total} ₽
    `.trim();

    return this.botService.sendMessage(userId, text, {
      reply_markup: keyboard,
      parse_mode: 'HTML'
    });
  }
}