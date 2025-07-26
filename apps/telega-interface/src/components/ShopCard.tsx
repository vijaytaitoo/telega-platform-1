import React from 'react';
import { Star, Clock, Activity, Eye, Heart, MapPin } from 'lucide-react';
import { Shop } from '../types';

interface ShopCardProps {
  shop: Shop;
}

export default function ShopCard({ shop }: ShopCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [viewCount, setViewCount] = useState(Math.floor(Math.random() * 1000) + 100);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'fashion':
        return 'from-pink-500 to-rose-500';
      case 'electronics':
        return 'from-blue-500 to-cyan-500';
      case 'freelance':
        return 'from-purple-500 to-indigo-500';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'fashion':
        return 'Мода';
      case 'electronics':
        return 'Электроника';
      case 'freelance':
        return 'Фриланс';
      default:
        return category;
    }
  };

  return (
    <div className="group bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden hover:bg-white/20 transition-all duration-300 hover:scale-105">
      {/* Shop Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={shop.image}
          alt={shop.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

        {/* Category Badge */}
        <div
          className={`absolute top-4 left-4 px-3 py-1 bg-gradient-to-r ${getCategoryColor(shop.category)} text-white text-sm font-medium rounded-full`}
        >
          {getCategoryName(shop.category)}
        </div>

        {/* Actions */}
        <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            className={`p-2 backdrop-blur-md rounded-full transition-all duration-200 ${
              isLiked
                ? 'bg-red-500/30 text-red-300 scale-110'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
          </button>
          <button className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors">
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Trust Score */}
        <div className="absolute bottom-4 right-4 flex items-center space-x-1 bg-white/20 backdrop-blur-md rounded-full px-3 py-1">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="text-white font-medium">{shop.trustScore.toFixed(1)}</span>
        </div>
      </div>

      {/* Shop Info */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">{shop.name}</h3>
            <p className="text-white/70 text-sm line-clamp-2">{shop.description}</p>
          </div>
        </div>

        {/* Owner */}
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">{shop.owner.charAt(0)}</span>
          </div>
          <span className="text-white/80 text-sm">{shop.owner}</span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 text-yellow-300">
              <Star className="w-3 h-3" />
              <span className="text-sm">{shop.reviews}</span>
            </div>
            <div className="text-white/60 text-xs">отзывов</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 text-white/80">
              <Clock className="w-3 h-3 text-blue-300" />
              <span className="text-sm">{Math.round(shop.responseSpeed * 100)}%</span>
            </div>
            <div className="text-white/60 text-xs">ответы</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 text-white/80">
              <Activity className="w-3 h-3 text-green-300" />
              <span className="text-sm">{Math.round(shop.activity * 100)}%</span>
            </div>
            <div className="text-white/60 text-xs">активность</div>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="flex items-center justify-between mb-4 text-sm text-white/60">
          <span className="flex items-center space-x-1">
            <Eye className="w-3 h-3" />
            <span>{viewCount} просмотров</span>
          </span>
          <span>{new Date(shop.createdAt).toLocaleDateString('ru-RU')}</span>
        </div>

        {/* Action Button */}
        <button className="w-full py-3 bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105">
          Посетить магазин
        </button>
      </div>
    </div>
  );
}
