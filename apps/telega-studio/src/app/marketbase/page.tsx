'use client';

import { useState } from 'react';
import React from 'react';
import { motion } from 'framer-motion';
import { ProductCard } from '@/components/ui/product-card';
import { ServiceCard } from '@/components/ui/service-card';
import { ModeToggle } from '@/components/mode-toggle';
import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase-client';

interface MarketbasePageProps {
  searchParams: {
    tab?: string;
    category?: string;
    geo?: string;
  };
}

interface Item {
  id: string;
  title: string;
  price?: string;
  priceRange?: string;
  imageUrl?: string;
  portfolioUrls?: string[];
}

export default function MarketbasePage({ searchParams }: MarketbasePageProps) {
  const [tab, setTab] = useState<string>(searchParams.tab || 'products');
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const table = tab === 'products' ? 'products' : 'services';
      const { data, error } = await supabase.from(table).select('*').match({
        category: searchParams.category,
        geo: searchParams.geo,
      });

      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error('Error fetching items:', error);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'products', label: 'Товары' },
    { id: 'services', label: 'Услуги' },
    { id: 'favorites', label: 'Избранное' },
    { id: 'top', label: 'Топ недели' },
  ];

  const categories = ['Все категории', 'Красота', 'Образование', 'Авто'];

  const locations = ['Все города', 'Ташкент', 'Москва', 'Алматы'];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen p-6 bg-light dark:bg-dark"
    >
      <div className="flex justify-between items-center mb-6">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-2xl font-bold gradient-text"
        >
          Маркетплейс
        </motion.h1>
        <ModeToggle />
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {tabs.map(({ id, label }) => (
          <Button
            key={id}
            onClick={() => setTab(id)}
            variant={tab === id ? 'gradient' : 'outline'}
            size="sm"
          >
            {label}
          </Button>
        ))}
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <select
          className="p-2 rounded-xl bg-white/80 dark:bg-white/5 border-2 border-primary/20"
          onChange={(e) => {
            const url = new URL(window.location.href);
            url.searchParams.set('category', e.target.value);
            window.history.pushState({}, '', url);
            fetchItems();
          }}
          value={searchParams.category || ''}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <select
          className="p-2 rounded-xl bg-white/80 dark:bg-white/5 border-2 border-primary/20"
          onChange={(e) => {
            const url = new URL(window.location.href);
            url.searchParams.set('geo', e.target.value);
            window.history.pushState({}, '', url);
            fetchItems();
          }}
          value={searchParams.geo || ''}
        >
          {locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {loading ? (
          <div className="col-span-full text-center py-12 text-gray-500">Загрузка...</div>
        ) : items.length > 0 ? (
          items.map((item) =>
            tab === 'products' ? (
              <ProductCard
                key={item.id}
                title={item.title}
                price={item.price || ''}
                imageUrl={item.imageUrl || '/placeholder.jpg'}
              />
            ) : (
              <ServiceCard
                key={item.id}
                title={item.title}
                priceRange={item.priceRange || ''}
                portfolioUrls={item.portfolioUrls || ['/placeholder.jpg']}
              />
            ),
          )
        ) : (
          <div className="col-span-full text-center py-12 text-gray-500">Ничего не найдено</div>
        )}
      </motion.div>
    </motion.div>
  );
}
