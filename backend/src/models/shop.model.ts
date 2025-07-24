import { IsString, IsOptional, IsObject, MinLength, Matches } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class Shop {
  @ApiProperty({ description: 'Уникальный идентификатор магазина' })
  id: string;

  @ApiProperty({ description: 'Название магазина' })
  name: string;

  @ApiProperty({ description: 'Описание магазина', required: false })
  description: Record<string, any>;

  @ApiProperty({ description: 'URL-friendly идентификатор магазина' })
  slug: string;

  @ApiProperty({ description: 'ID владельца магазина' })
  owner_id: string;

  @ApiProperty({ description: 'Дата создания магазина' })
  created_at: Date;

  @ApiProperty({ description: 'Дата последнего обновления магазина' })
  updated_at: Date;
}

export class CreateShopDto {
  @ApiProperty({
    description: 'Название магазина',
    minLength: 3,
    example: 'Мой магазин'
  })
  @IsString()
  @MinLength(3, { message: 'Название магазина должно содержать минимум 3 символа' })
  name: string;

  @ApiProperty({
    description: 'Описание магазина',
    required: false,
    example: { ru: 'Описание на русском', en: 'Description in English' }
  })
  @IsOptional()
  @IsObject()
  description?: Record<string, any>;

  @ApiProperty({
    description: 'URL-friendly идентификатор магазина',
    pattern: '^[a-z0-9-]+$',
    example: 'my-shop'
  })
  @IsString()
  @Matches(/^[a-z0-9-]+$/, {
    message: 'Slug может содержать только строчные буквы, цифры и дефисы',
  })
  slug: string;
}

export class UpdateShopDto {
  @ApiProperty({
    description: 'Название магазина',
    minLength: 3,
    required: false,
    example: 'Обновленный магазин'
  })
  @IsOptional()
  @IsString()
  @MinLength(3, { message: 'Название магазина должно содержать минимум 3 символа' })
  name?: string;

  @ApiProperty({
    description: 'Описание магазина',
    required: false,
    example: { ru: 'Обновленное описание', en: 'Updated description' }
  })
  @IsOptional()
  @IsObject()
  description?: Record<string, any>;

  @ApiProperty({
    description: 'URL-friendly идентификатор магазина',
    pattern: '^[a-z0-9-]+$',
    required: false,
    example: 'updated-shop'
  })
  @IsOptional()
  @IsString()
  @Matches(/^[a-z0-9-]+$/, {
    message: 'Slug может содержать только строчные буквы, цифры и дефисы',
  })
  slug?: string;
}