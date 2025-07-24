import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Статус')
@Controller()
export class AppController {
  @Get()
  @ApiOperation({ summary: 'Проверка статуса API' })
  @ApiResponse({ 
    status: 200, 
    description: 'API работает нормально',
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          example: 'ok',
        },
        timestamp: {
          type: 'string',
          example: '2025-07-11T02:35:24.000Z',
        },
      },
    },
  })
  getStatus() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }
} 