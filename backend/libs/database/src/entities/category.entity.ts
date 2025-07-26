import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Product } from './product.entity';

@Entity('categories')
export class Category extends BaseEntity {
  @Column({ name: 'parent_id', nullable: true })
  parentId: string;

  @ManyToOne(() => Category, (category) => category.children)
  @JoinColumn({ name: 'parent_id' })
  parent: Category;

  @OneToMany(() => Category, (category) => category.parent)
  children: Category[];

  @Column({ type: 'jsonb', default: '{}' })
  name: Record<string, string>;

  @Column({ type: 'jsonb', default: '{}' })
  description: Record<string, string>;

  @Column()
  slug: string;

  @Column({ default: 'active' })
  status: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
