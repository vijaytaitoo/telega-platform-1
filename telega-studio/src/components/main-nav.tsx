'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { LayoutGrid, Layers, Settings, ShoppingBag } from 'lucide-react';

const items = [
  {
    title: 'Конструктор',
    href: '/studio',
    icon: LayoutGrid,
  },
  {
    title: 'Товары',
    href: '/studio/products',
    icon: ShoppingBag,
  },
  {
    title: 'Шаблоны',
    href: '/studio/templates',
    icon: Layers,
  },
  {
    title: 'Настройки',
    href: '/studio/settings',
    icon: Settings,
  },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <nav className="grid items-start gap-2 p-4">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <Link key={item.href} href={item.href}>
            <Button
              variant={pathname === item.href ? 'default' : 'ghost'}
              className="w-full justify-start gap-2"
            >
              <Icon className="h-4 w-4" />
              {item.title}
            </Button>
          </Link>
        );
      })}
    </nav>
  );
}