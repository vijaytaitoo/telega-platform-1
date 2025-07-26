import React from 'react';
import { Heart, ShoppingCart, Eye } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="group bg-white/10 backdrop-blur-md rounded-xl border border-white/20 overflow-hidden hover:bg-white/20 transition-all duration-300 hover:scale-105">
      {/* Product Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

        {/* Actions */}
        <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors">
            <Heart className="w-4 h-4" />
          </button>
          <button className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors">
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Price Badge */}
        <div className="absolute bottom-3 left-3 bg-white/20 backdrop-blur-md rounded-full px-3 py-1">
          <span className="text-white font-bold">{formatPrice(product.price)}</span>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-white font-semibold mb-2 line-clamp-1">{product.name}</h3>
        <p className="text-white/70 text-sm mb-4 line-clamp-2">{product.description}</p>

        {/* Category */}
        <div className="flex items-center justify-between mb-4">
          <span className="px-2 py-1 bg-white/10 rounded-full text-white/80 text-xs capitalize">
            {product.category}
          </span>
        </div>

        {/* Add to Cart Button */}
        <button className="w-full flex items-center justify-center space-x-2 py-2 bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105">
          <ShoppingCart className="w-4 h-4" />
          <span>В корзину</span>
        </button>
      </div>
    </div>
  );
}
