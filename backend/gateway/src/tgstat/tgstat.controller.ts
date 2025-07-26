import { Controller, Get, Query, Param } from '@nestjs/common';

interface ChannelStats {
  channelId: string;
  username: string;
  title: string;
  description: string;
  subscribers: number;
  posts: number;
  averageViews: number;
  averageReactions: number;
  engagementRate: number;
  growthRate: number;
  topPosts: Array<{
    id: string;
    text: string;
    views: number;
    reactions: number;
    date: string;
  }>;
  demographics: {
    ageGroups: Record<string, number>;
    countries: Record<string, number>;
    languages: Record<string, number>;
  };
  activity: {
    postsPerDay: number;
    averagePostLength: number;
    bestPostingTime: string;
  };
}

@Controller('tgstat')
export class TgstatController {
  private mockChannelStats: Record<string, ChannelStats> = {
    'test-channel-id': {
      channelId: 'test-channel-id',
      username: '@telega_channel',
      title: 'Tele•Ga Official Channel',
      description: 'Официальный канал платформы Tele•Ga - будущее e-commerce в Telegram',
      subscribers: 15420,
      posts: 342,
      averageViews: 8920,
      averageReactions: 156,
      engagementRate: 8.5,
      growthRate: 12.3,
      topPosts: [
        {
          id: '1',
          text: '🚀 Запускаем Tele•Ga - революцию в e-commerce!',
          views: 12500,
          reactions: 234,
          date: '2024-01-15',
        },
        {
          id: '2',
          text: '📱 Как создать магазин в Telegram за 5 минут',
          views: 10800,
          reactions: 189,
          date: '2024-01-20',
        },
        {
          id: '3',
          text: '💡 Новые возможности для продавцов',
          views: 9200,
          reactions: 145,
          date: '2024-01-25',
        },
      ],
      demographics: {
        ageGroups: {
          '18-24': 35,
          '25-34': 42,
          '35-44': 18,
          '45+': 5,
        },
        countries: {
          'Kyrgyzstan': 45,
          'Kazakhstan': 25,
          'Uzbekistan': 20,
          'Russia': 10,
        },
        languages: {
          'Russian': 60,
          'Kyrgyz': 25,
          'English': 15,
        },
      },
      activity: {
        postsPerDay: 2.3,
        averagePostLength: 280,
        bestPostingTime: '18:00-20:00',
      },
    },
    'fashion-channel': {
      channelId: 'fashion-channel',
      username: '@fashion_kg',
      title: 'Fashion Kyrgyzstan',
      description: 'Мода и стиль в Кыргызстане',
      subscribers: 8900,
      posts: 156,
      averageViews: 5200,
      averageReactions: 89,
      engagementRate: 6.2,
      growthRate: 8.7,
      topPosts: [
        {
          id: '4',
          text: '👗 Тренды весны 2024',
          views: 7800,
          reactions: 123,
          date: '2024-02-01',
        },
        {
          id: '5',
          text: '👜 Стильные сумки от местных дизайнеров',
          views: 6500,
          reactions: 98,
          date: '2024-02-05',
        },
      ],
      demographics: {
        ageGroups: {
          '18-24': 55,
          '25-34': 35,
          '35-44': 8,
          '45+': 2,
        },
        countries: {
          'Kyrgyzstan': 85,
          'Kazakhstan': 10,
          'Uzbekistan': 5,
        },
        languages: {
          'Russian': 70,
          'Kyrgyz': 20,
          'English': 10,
        },
      },
      activity: {
        postsPerDay: 1.8,
        averagePostLength: 320,
        bestPostingTime: '19:00-21:00',
      },
    },
  };

  @Get('channel')
  getChannelStats(@Query('channelId') channelId: string) {
    const stats = this.mockChannelStats[channelId];
    if (!stats) {
      return {
        success: false,
        message: 'Channel not found or no statistics available',
      };
    }

    return {
      success: true,
      data: {
        ...stats,
        lastUpdated: new Date().toISOString(),
      },
    };
  }

  @Get('channel/:channelId/subscribers')
  getSubscribers(@Param('channelId') channelId: string) {
    const stats = this.mockChannelStats[channelId];
    if (!stats) {
      return { success: false, message: 'Channel not found' };
    }

    return {
      success: true,
      data: {
        channelId,
        subscribers: stats.subscribers,
        growthRate: stats.growthRate,
        trend: '+2.1%',
        previousPeriod: stats.subscribers * 0.98,
      },
    };
  }

  @Get('channel/:channelId/engagement')
  getEngagement(@Param('channelId') channelId: string) {
    const stats = this.mockChannelStats[channelId];
    if (!stats) {
      return { success: false, message: 'Channel not found' };
    }

    return {
      success: true,
      data: {
        channelId,
        engagementRate: stats.engagementRate,
        averageViews: stats.averageViews,
        averageReactions: stats.averageReactions,
        trend: '+1.8%',
        previousPeriod: {
          engagementRate: stats.engagementRate * 0.96,
          averageViews: stats.averageViews * 0.94,
          averageReactions: stats.averageReactions * 0.97,
        },
      },
    };
  }

  @Get('channel/:channelId/posts')
  getPosts(@Param('channelId') channelId: string, @Query('limit') limit: string = '10') {
    const stats = this.mockChannelStats[channelId];
    if (!stats) {
      return { success: false, message: 'Channel not found' };
    }

    const limitNum = parseInt(limit) || 10;
    const posts = stats.topPosts.slice(0, limitNum);

    return {
      success: true,
      data: {
        channelId,
        totalPosts: stats.posts,
        topPosts: posts,
        averagePostLength: stats.activity.averagePostLength,
        postsPerDay: stats.activity.postsPerDay,
      },
    };
  }

  @Get('channel/:channelId/demographics')
  getDemographics(@Param('channelId') channelId: string) {
    const stats = this.mockChannelStats[channelId];
    if (!stats) {
      return { success: false, message: 'Channel not found' };
    }

    return {
      success: true,
      data: {
        channelId,
        demographics: stats.demographics,
        activity: stats.activity,
      },
    };
  }

  @Get('channel/:channelId/analytics')
  getAnalytics(@Param('channelId') channelId: string, @Query('period') period: string = 'last_30_days') {
    const stats = this.mockChannelStats[channelId];
    if (!stats) {
      return { success: false, message: 'Channel not found' };
    }

    return {
      success: true,
      data: {
        channelId,
        period,
        overview: {
          subscribers: stats.subscribers,
          posts: stats.posts,
          engagementRate: stats.engagementRate,
          growthRate: stats.growthRate,
        },
        performance: {
          averageViews: stats.averageViews,
          averageReactions: stats.averageReactions,
          topPosts: stats.topPosts.slice(0, 5),
        },
        demographics: stats.demographics,
        activity: stats.activity,
        generatedAt: new Date().toISOString(),
      },
    };
  }
} 