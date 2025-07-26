import { z } from 'zod';

// Схема магазина
export const shopSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  owner: z.object({
    id: z.string(),
    telegramId: z.number(),
    username: z.string().optional(),
  }),
  settings: z.object({
    currency: z.string(),
    language: z.string(),
    theme: z.string(),
    paymentMethods: z.array(z.string()),
  }),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Схема продукта
export const productSchema = z.object({
  id: z.string(),
  shopId: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  images: z.array(z.string()),
  category: z.string(),
  attributes: z.record(z.string()),
  inStock: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Схема заказа
export const orderSchema = z.object({
  id: z.string(),
  shopId: z.string(),
  customer: z.object({
    telegramId: z.number(),
    username: z.string().optional(),
    name: z.string(),
  }),
  items: z.array(
    z.object({
      productId: z.string(),
      quantity: z.number(),
      price: z.number(),
    }),
  ),
  status: z.enum(['pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled']),
  totalAmount: z.number(),
  paymentMethod: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Shop = z.infer<typeof shopSchema>;
export type Product = z.infer<typeof productSchema>;
export type Order = z.infer<typeof orderSchema>;
