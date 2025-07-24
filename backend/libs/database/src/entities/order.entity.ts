import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Shop } from './shop.entity';
import { User } from './user.entity';
import { OrderItem } from './order-item.entity';

@Entity('orders')
export class Order extends BaseEntity {
  @Column({ name: 'shop_id' })
  shopId: string;

  @ManyToOne(() => Shop, shop => shop.orders)
  @JoinColumn({ name: 'shop_id' })
  shop: Shop;

  @Column({ name: 'customer_id' })
  customerId: string;

  @ManyToOne(() => User, user => user.orders)
  @JoinColumn({ name: 'customer_id' })
  customer: User;

  @Column({ default: 'pending' })
  status: string;

  @Column({ name: 'total_amount', type: 'decimal', precision: 10, scale: 2 })
  totalAmount: number;

  @Column({ default: 'USD' })
  currency: string;

  @Column({ name: 'payment_method', nullable: true })
  paymentMethod: string;

  @Column({ name: 'payment_status', default: 'pending' })
  paymentStatus: string;

  @Column({ type: 'jsonb', nullable: true })
  shippingAddress: {
    address: string;
    city: string;
    country: string;
    postalCode: string;
  };

  @Column({ type: 'jsonb', default: '{}' })
  metadata: Record<string, any>;

  @OneToMany(() => OrderItem, orderItem => orderItem.order)
  items: OrderItem[];
} 