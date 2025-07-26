import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Shop } from './entities/shop.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ShopService {
  constructor(@InjectRepository(Shop) private repo: Repository<Shop>) {}

  create(shopData: Partial<Shop>) {
    const shop = this.repo.create(shopData);
    return this.repo.save(shop);
  }

  findByOwner(ownerId: string) {
    return this.repo.find({ where: { ownerId } });
  }
}
