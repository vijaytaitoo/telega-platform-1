import { Controller, Get, Query, Param } from '@nestjs/common';

interface AnalyticsData {
  storeId: string;
  period: string;
  revenue: number;
  orders: number;
  customers: number;
  averageOrderValue: number;
  topProducts: Array<{
    id: string;
    name: string;
    sales: number;
    revenue: number;
  }>;
  traffic: {
    total: number;
    unique: number;
    conversion: number;
  };
  salesByCategory: Array<{
    category: string;
    sales: number;
    revenue: number;
  }>;
  customerRetention: number;
  churnRate: number;
}

@Controller('grok')
export class GrokController {
  private mockAnalytics: Record<string, AnalyticsData> = {
    'test-store-id': {
      storeId: 'test-store-id',
      period: 'last_30_days',
      revenue: 1250000,
      orders: 342,
      customers: 156,
      averageOrderValue: 3655,
      topProducts: [
        { id: '1', name: 'Смартфон Galaxy S24', sales: 45, revenue: 225000 },
        { id: '2', name: 'Наушники AirPods Pro', sales: 38, revenue: 114000 },
        { id: '3', name: 'Ноутбук MacBook Air', sales: 12, revenue: 480000 },
      ],
      traffic: {
        total: 15420,
        unique: 8920,
        conversion: 3.8,
      },
      salesByCategory: [
        { category: 'electronics', sales: 156, revenue: 680000 },
        { category: 'fashion', sales: 98, revenue: 320000 },
        { category: 'home', sales: 88, revenue: 250000 },
      ],
      customerRetention: 78.5,
      churnRate: 2.3,
    },
    'fashion-store': {
      storeId: 'fashion-store',
      period: 'last_30_days',
      revenue: 890000,
      orders: 234,
      customers: 189,
      averageOrderValue: 3803,
      topProducts: [
        { id: '4', name: 'Джинсы Premium', sales: 67, revenue: 134000 },
        { id: '5', name: 'Кроссовки Nike', sales: 45, revenue: 90000 },
        { id: '6', name: 'Куртка зимняя', sales: 23, revenue: 69000 },
      ],
      traffic: {
        total: 12340,
        unique: 7450,
        conversion: 3.1,
      },
      salesByCategory: [
        { category: 'fashion', sales: 189, revenue: 620000 },
        { category: 'accessories', sales: 45, revenue: 270000 },
      ],
      customerRetention: 82.1,
      churnRate: 1.8,
    },
  };

  @Get('analytics')
  getAnalytics(@Query('storeId') storeId: string, @Query('period') period: string = 'last_30_days') {
    const analytics = this.mockAnalytics[storeId];
    if (!analytics) {
      return {
        success: false,
        message: 'Store not found or no analytics available',
      };
    }

    return {
      success: true,
      data: {
        ...analytics,
        period: period || analytics.period,
        generatedAt: new Date().toISOString(),
      },
    };
  }

  @Get('analytics/:storeId/revenue')
  getRevenue(@Param('storeId') storeId: string, @Query('period') period: string) {
    const analytics = this.mockAnalytics[storeId];
    if (!analytics) {
      return { success: false, message: 'Store not found' };
    }

    return {
      success: true,
      data: {
        storeId,
        period: period || analytics.period,
        revenue: analytics.revenue,
        currency: 'KGS',
        trend: '+12.5%',
        previousPeriod: analytics.revenue * 0.89,
      },
    };
  }

  @Get('analytics/:storeId/orders')
  getOrders(@Param('storeId') storeId: string, @Query('period') period: string) {
    const analytics = this.mockAnalytics[storeId];
    if (!analytics) {
      return { success: false, message: 'Store not found' };
    }

    return {
      success: true,
      data: {
        storeId,
        period: period || analytics.period,
        orders: analytics.orders,
        averageOrderValue: analytics.averageOrderValue,
        trend: '+8.2%',
        previousPeriod: analytics.orders * 0.92,
      },
    };
  }

  @Get('analytics/:storeId/customers')
  getCustomers(@Param('storeId') storeId: string, @Query('period') period: string) {
    const analytics = this.mockAnalytics[storeId];
    if (!analytics) {
      return { success: false, message: 'Store not found' };
    }

    return {
      success: true,
      data: {
        storeId,
        period: period || analytics.period,
        customers: analytics.customers,
        retention: analytics.customerRetention,
        churnRate: analytics.churnRate,
        trend: '+15.3%',
        previousPeriod: analytics.customers * 0.85,
      },
    };
  }

  @Get('analytics/:storeId/products')
  getTopProducts(@Param('storeId') storeId: string, @Query('limit') limit: string = '10') {
    const analytics = this.mockAnalytics[storeId];
    if (!analytics) {
      return { success: false, message: 'Store not found' };
    }

    const limitNum = parseInt(limit) || 10;
    const topProducts = analytics.topProducts.slice(0, limitNum);

    return {
      success: true,
      data: {
        storeId,
        topProducts,
        totalProducts: analytics.topProducts.length,
      },
    };
  }

  @Get('analytics/:storeId/traffic')
  getTraffic(@Param('storeId') storeId: string, @Query('period') period: string) {
    const analytics = this.mockAnalytics[storeId];
    if (!analytics) {
      return { success: false, message: 'Store not found' };
    }

    return {
      success: true,
      data: {
        storeId,
        period: period || analytics.period,
        traffic: analytics.traffic,
        trend: '+5.7%',
        previousPeriod: {
          total: analytics.traffic.total * 0.94,
          unique: analytics.traffic.unique * 0.93,
          conversion: analytics.traffic.conversion * 0.96,
        },
      },
    };
  }
} 