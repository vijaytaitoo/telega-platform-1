import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  ValidationPipe,
  UsePipes,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiProperty,
} from '@nestjs/swagger';
import { ShopsService } from '../services/shops.service';
import { CreateShopDto, UpdateShopDto, Shop } from '../models/shop.model';

@ApiTags('Магазины')
@Controller('shops')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class ShopsController {
  constructor(private readonly shopsService: ShopsService) {}

  @Get()
  @ApiOperation({ summary: 'Получить список всех магазинов' })
  @ApiResponse({
    status: 200,
    description: 'Список магазинов успешно получен',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          description: { type: 'object' },
          slug: { type: 'string' },
          owner_id: { type: 'string' },
          created_at: { type: 'string', format: 'date-time' },
          updated_at: { type: 'string', format: 'date-time' },
        },
      },
    },
  })
  async findAll(): Promise<Shop[]> {
    return this.shopsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить магазин по ID' })
  @ApiResponse({
    status: 200,
    description: 'Магазин успешно найден',
    type: Shop,
  })
  @ApiResponse({ status: 404, description: 'Магазин не найден' })
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Shop> {
    return this.shopsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Создать новый магазин' })
  @ApiResponse({
    status: 201,
    description: 'Магазин успешно создан',
    type: Shop,
  })
  @ApiResponse({ status: 400, description: 'Некорректные данные магазина' })
  async create(
    @Body(ValidationPipe) createShopDto: CreateShopDto,
  ): Promise<Shop> {
    return this.shopsService.create(createShopDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Обновить магазин' })
  @ApiResponse({
    status: 200,
    description: 'Магазин успешно обновлен',
    type: Shop,
  })
  @ApiResponse({ status: 400, description: 'Некорректные данные магазина' })
  @ApiResponse({ status: 404, description: 'Магазин не найден' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) updateShopDto: UpdateShopDto,
  ): Promise<Shop> {
    return this.shopsService.update(id, updateShopDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить магазин' })
  @ApiResponse({ status: 200, description: 'Магазин успешно удален' })
  @ApiResponse({ status: 404, description: 'Магазин не найден' })
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<{ message: string }> {
    return this.shopsService.remove(id);
  }
}
