import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  Star,
  Clock,
  Activity,
  ShoppingBag,
  TrendingUp,
  Users,
  MapPin,
  Heart,
  Eye,
} from 'lucide-react';
import { Shop, Product, TelegramUser } from '../types';
import TelegramLoginButton from '../components/TelegramLoginButton';
import ShopCard from '../components/ShopCard';
import ProductCard from '../components/ProductCard';

// Mock data for demonstration
const mockShops: Shop[] = [
  {
    id: '1',
    name: 'Стильная Мода',
    description: 'Эксклюзивная одежда и аксессуары от ведущих дизайнеров',
    owner: 'Анна Петрова',
    category: 'fashion',
    trustScore: 4.8,
    reviews: 234,
    responseSpeed: 0.9,
    activity: 0.95,
    image:
      'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=400',
    products: [],
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'Цифровые Решения',
    description: 'Инновационная электроника и смарт-устройства будущего',
    owner: 'Дмитрий Волков',
    category: 'electronics',
    trustScore: 4.7,
    reviews: 187,
    responseSpeed: 0.85,
    activity: 0.88,
    image:
      'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=400',
    products: [],
    createdAt: '2024-02-01',
  },
  {
    id: '3',
    name: 'Креативная Студия',
    description: 'Профессиональный дизайн и разработка на высшем уровне',
    owner: 'Мария Сидорова',
    category: 'freelance',
    trustScore: 4.9,
    reviews: 312,
    responseSpeed: 0.95,
    activity: 0.92,
    image:
      'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
    products: [],
    createdAt: '2024-01-20',
  },
  {
    id: '4',
    name: 'Эко Товары',
    description: 'Натуральные и экологически чистые продукты для здоровья',
    owner: 'Елена Зеленская',
    category: 'fashion',
    trustScore: 4.6,
    reviews: 145,
    responseSpeed: 0.88,
    activity: 0.91,
    image:
      'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
    products: [],
    createdAt: '2024-02-10',
  },
  {
    id: '5',
    name: 'Гаджет Центр',
    description: 'Последние новинки техники и аксессуаров по доступным ценам',
    owner: 'Алексей Техников',
    category: 'electronics',
    trustScore: 4.5,
    reviews: 98,
    responseSpeed: 0.82,
    activity: 0.85,
    image:
      'https://images.pexels.com/photos/325153/pexels-photo-325153.jpeg?auto=compress&cs=tinysrgb&w=400',
    products: [],
    createdAt: '2024-02-15',
  },
  {
    id: '6',
    name: 'Фриланс Хаб',
    description: 'Комплексные IT-услуги и консультации для бизнеса',
    owner: 'Игорь Разработчиков',
    category: 'freelance',
    trustScore: 4.8,
    reviews: 267,
    responseSpeed: 0.93,
    activity: 0.96,
    image:
      'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
    products: [],
    createdAt: '2024-01-25',
  },
];

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Стильная куртка',
    price: 5999,
    description: 'Модная куртка из качественных материалов',
    image:
      'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=300',
    category: 'fashion',
    shopId: '1',
  },
  {
    id: '2',
    name: 'Беспроводные наушники',
    price: 3499,
    description: 'Качественный звук и долгая работа батареи',
    image:
      'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=300',
    category: 'electronics',
    shopId: '2',
  },
  {
    id: '3',
    name: 'Дизайн логотипа',
    price: 2999,
    description: 'Профессиональный дизайн логотипа для вашего бренда',
    image:
      'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=300',
    category: 'freelance',
    shopId: '3',
  },
];

export default function Marketbase() {
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<
    'all' | 'fashion' | 'electronics' | 'freelance'
  >('all');
  const [viewMode, setViewMode] = useState<'shops' | 'products'>('shops');
  const [sortBy, setSortBy] = useState<'rating' | 'reviews' | 'newest'>('rating');
  const [shops, setShops] = useState<Shop[]>(mockShops);
  const [products, setProducts] = useState<Product[]>(mockProducts);

  // Calculate trust score
  const calculateTrustScore = (shop: Shop): number => {
    return shop.reviews * 0.6 + shop.responseSpeed * 0.3 + shop.activity * 0.1;
  };

  // Filter and sort data
  const filteredShops = shops
    .filter((shop) => {
      const matchesSearch =
        shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shop.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || shop.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.trustScore - a.trustScore;
        case 'reviews':
          return b.reviews - a.reviews;
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        default:
          return 0;
      }
    });

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => b.price - a.price);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-purple-500 to-purple-600">
      {/* Header */}
      <header className="p-6 border-b border-white/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-purple-600 rounded-full flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Tele•Ga Marketbase</h1>
                <p className="text-white/70">Каталог магазинов и товаров экосистемы</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <TelegramLoginButton onLogin={setUser} onLogout={() => setUser(null)} user={user} />
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
              <input
                type="text"
                placeholder="Поиск магазинов и товаров..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-colors"
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex bg-white/10 backdrop-blur-md rounded-lg p-1">
              <button
                onClick={() => setViewMode('shops')}
                className={`px-4 py-2 rounded transition-colors ${
                  viewMode === 'shops' ? 'bg-white/20 text-white' : 'text-white/70 hover:text-white'
                }`}
              >
                Магазины
              </button>
              <button
                onClick={() => setViewMode('products')}
                className={`px-4 py-2 rounded transition-colors ${
                  viewMode === 'products'
                    ? 'bg-white/20 text-white'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                Товары
              </button>
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as any)}
              className="px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40"
            >
              <option value="all">Все категории</option>
              <option value="fashion">Мода</option>
              <option value="electronics">Электроника</option>
              <option value="freelance">Фриланс</option>
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40"
            >
              <option value="rating">По рейтингу</option>
              <option value="reviews">По отзывам</option>
              <option value="newest">Новые</option>
            </select>
          </div>
        </div>
      </header>

      {/* Stats Bar */}
      <div className="px-6 py-4 border-b border-white/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{shops.length}</div>
              <div className="text-white/70 text-sm">Магазинов</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{products.length}</div>
              <div className="text-white/70 text-sm">Товаров</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">4.8</div>
              <div className="text-white/70 text-sm">Средний рейтинг</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">24/7</div>
              <div className="text-white/70 text-sm">Поддержка</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="p-6">
        <div className="max-w-7xl mx-auto">
          {viewMode === 'shops' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredShops.map((shop) => (
                <ShopCard key={shop.id} shop={shop} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {(viewMode === 'shops' ? filteredShops : filteredProducts).length === 0 && (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-white/50" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Ничего не найдено</h3>
              <p className="text-white/70">Попробуйте изменить параметры поиска или фильтры</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
