import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Shop } from './shop.entity';
import { Order } from './order.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column({ type: 'bigint', unique: true })
  telegramId: number;

  @Column({ nullable: true })
  username: string;

  @Column({ name: 'first_name', nullable: true })
  firstName: string;

  @Column({ name: 'last_name', nullable: true })
  lastName: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  email: string;

  @Column({ default: 'user' })
  role: string;

  @Column({ name: 'teleton_balance', type: 'decimal', precision: 10, scale: 2, default: 0 })
  teletonBalance: number;

  @Column({ name: 'subscription_type', default: 'free' })
  subscriptionType: string;

  @Column({ name: 'subscription_expires_at', nullable: true })
  subscriptionExpiresAt: Date;

  @OneToMany(() => Shop, shop => shop.owner)
  shops: Shop[];

  @OneToMany(() => Order, order => order.customer)
  orders: Order[];
} 