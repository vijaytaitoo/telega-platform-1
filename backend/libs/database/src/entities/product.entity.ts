import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Shop } from './shop.entity';
import { Category } from './category.entity';
import { OrderItem } from './order-item.entity';

@Entity('products')
export class Product extends BaseEntity {
  @Column({ name: 'shop_id' })
  shopId: string;

  @ManyToOne(() => Shop, shop => shop.products)
  @JoinColumn({ name: 'shop_id' })
  shop: Shop;

  @Column({ name: 'category_id', nullable: true })
  categoryId: string;

  @ManyToOne(() => Category, category => category.products)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column({ type: 'jsonb', default: '{}' })
  name: Record<string, string>;

  @Column({ type: 'jsonb', default: '{}' })
  description: Record<string, string>;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ default: 'USD' })
  currency: string;

  @Column({ type: 'jsonb', default: '[]' })
  images: string[];

  @Column({ type: 'jsonb', default: '{}' })
  attributes: Record<string, any>;

  @Column({ name: 'stock_quantity', nullable: true })
  stockQuantity: number;

  @Column({ default: 'active' })
  status: string;

  @OneToMany(() => OrderItem, orderItem => orderItem.product)
  orderItems: OrderItem[];
} 