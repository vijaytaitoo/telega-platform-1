import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shop } from './shop.entity';
import { CreateShopDto } from './dto/create-shop.dto';

@Injectable()
export class ShopsService {
  constructor(
    @InjectRepository(Shop)
    private readonly shopRepository: Repository<Shop>,
  ) {}

  findAll(): Promise<Shop[]> {
    return this.shopRepository.find();
  }

  create(dto: CreateShopDto): Promise<Shop> {
    const shop = this.shopRepository.create(dto);
    return this.shopRepository.save(shop);
  }

  findOne(id: string): Promise<Shop | null> {
    return this.shopRepository.findOneBy({ id });
  }

  async update(id: string, dto: Partial<CreateShopDto>): Promise<Shop | null> {
    await this.shopRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.shopRepository.delete(id);
  }
}
