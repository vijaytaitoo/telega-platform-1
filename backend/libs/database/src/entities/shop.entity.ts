import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';
import { Product } from './product.entity';
import { Order } from './order.entity';
import { Template } from './template.entity';

@Entity('shops')
export class Shop extends BaseEntity {
  @Column({ name: 'owner_id' })
  ownerId: string;

  @ManyToOne(() => User, user => user.shops)
  @JoinColumn({ name: 'owner_id' })
  owner: User;

  @Column()
  name: string;

  @Column({ type: 'jsonb', default: '{}' })
  description: Record<string, string>;

  @Column({ unique: true })
  slug: string;

  @Column({ name: 'template_id', nullable: true })
  templateId: string;

  @ManyToOne(() => Template)
  @JoinColumn({ name: 'template_id' })
  template: Template;

  @Column({ type: 'jsonb', default: '{}' })
  settings: Record<string, any>;

  @Column({ default: 'active' })
  status: string;

  @Column({ name: 'subscription_type', default: 'free' })
  subscriptionType: string;

  @Column({ name: 'subscription_expires_at', nullable: true })
  subscriptionExpiresAt: Date;

  @OneToMany(() => Product, product => product.shop)
  products: Product[];

  @OneToMany(() => Order, order => order.shop)
  orders: Order[];
} 