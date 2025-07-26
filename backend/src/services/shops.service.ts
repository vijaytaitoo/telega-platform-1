import { Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseService } from './supabase.service';
import { Shop, CreateShopDto, UpdateShopDto } from '../models/shop.model';

@Injectable()
export class ShopsService {
  private readonly tableName = 'shops';

  constructor(private readonly supabaseService: SupabaseService) {}

  async findAll(): Promise<Shop[]> {
    try {
      const { data, error } = await this.supabaseService
        .getClient()
        .from(this.tableName)
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error(
        `Ошибка при получении списка магазинов: ${error.message}`,
      );
    }
  }

  async findOne(id: string): Promise<Shop> {
    try {
      const { data, error } = await this.supabaseService
        .getClient()
        .from(this.tableName)
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      if (!data) throw new NotFoundException(`Магазин с ID ${id} не найден`);
      return data;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new Error(`Ошибка при получении магазина: ${error.message}`);
    }
  }

  async create(createShopDto: CreateShopDto): Promise<Shop> {
    try {
      const newShop = {
        ...createShopDto,
        created_at: new Date(),
        updated_at: new Date(),
      };

      const { data, error } = await this.supabaseService
        .getClient()
        .from(this.tableName)
        .insert([newShop])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error(`Ошибка при создании магазина: ${error.message}`);
    }
  }

  async update(id: string, updateShopDto: UpdateShopDto): Promise<Shop> {
    try {
      const updateData = {
        ...updateShopDto,
        updated_at: new Date(),
      };

      const { data, error } = await this.supabaseService
        .getClient()
        .from(this.tableName)
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      if (!data) throw new NotFoundException(`Магазин с ID ${id} не найден`);
      return data;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new Error(`Ошибка при обновлении магазина: ${error.message}`);
    }
  }

  async remove(id: string): Promise<{ message: string }> {
    try {
      // Проверяем существование магазина перед удалением
      await this.findOne(id);

      const { error } = await this.supabaseService
        .getClient()
        .from(this.tableName)
        .delete()
        .eq('id', id);

      if (error) throw error;
      return { message: `Магазин с ID ${id} успешно удален` };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new Error(`Ошибка при удалении магазина: ${error.message}`);
    }
  }
}
