import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('templates')
export class Template extends BaseEntity {
  @Column({ type: 'jsonb', default: '{}' })
  name: Record<string, string>;

  @Column({ type: 'jsonb', default: '{}' })
  description: Record<string, string>;

  @Column({ name: 'preview_image', nullable: true })
  previewImage: string;

  @Column({ type: 'jsonb', default: '{}' })
  config: Record<string, any>;

  @Column({ nullable: true })
  category: string;

  @Column({ name: 'subscription_type', default: 'free' })
  subscriptionType: string;

  @Column({ default: 'active' })
  status: string;
}
