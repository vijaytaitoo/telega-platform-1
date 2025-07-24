import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('shops')
export class Shop {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  ownerId: string;

  @Column()
  type: 'physical' | 'digital' | 'service';

  @Column()
  template: string;

  @Column({ type: 'jsonb', default: {} })
  settings: Record<string, any>;
}