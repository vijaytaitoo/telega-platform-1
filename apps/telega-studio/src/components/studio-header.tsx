'use client';

import Link from 'next/link';
import React from 'react';
import { ModeToggle } from '@/components/mode-toggle';
import { Button } from '@/components/ui/button';
import { Eye, Save } from 'lucide-react';

export function StudioHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-semibold">
            Tele•Ga Studio
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Eye className="mr-2 h-4 w-4" />
            Предпросмотр
          </Button>
          <Button size="sm">
            <Save className="mr-2 h-4 w-4" />
            Сохранить
          </Button>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
