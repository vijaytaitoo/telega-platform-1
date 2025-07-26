'use client';

import { useState } from 'react';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

type BlockType = {
  id: string;
  type: 'banner' | 'products' | 'text' | 'buttons';
  content: string;
};

export function WorkspaceArea() {
  const [blocks, setBlocks] = useState<BlockType[]>([]);

  const addBlock = (type: BlockType['type']) => {
    const newBlock: BlockType = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      content: '',
    };
    setBlocks([...blocks, newBlock]);
  };

  return (
    <div className="flex h-full">
      {/* Панель инструментов */}
      <div className="w-64 border-r p-4">
        <h2 className="mb-4 text-sm font-semibold">Блоки</h2>
        <div className="grid gap-2">
          <Button variant="outline" className="justify-start" onClick={() => addBlock('banner')}>
            <Plus className="mr-2 h-4 w-4" />
            Баннер
          </Button>
          <Button variant="outline" className="justify-start" onClick={() => addBlock('products')}>
            <Plus className="mr-2 h-4 w-4" />
            Товары
          </Button>
          <Button variant="outline" className="justify-start" onClick={() => addBlock('text')}>
            <Plus className="mr-2 h-4 w-4" />
            Текст
          </Button>
          <Button variant="outline" className="justify-start" onClick={() => addBlock('buttons')}>
            <Plus className="mr-2 h-4 w-4" />
            Кнопки
          </Button>
        </div>
      </div>

      {/* Рабочая область */}
      <div className="flex-1 p-4">
        <div className="min-h-[600px] rounded-lg border-2 border-dashed p-8">
          {blocks.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <p className="text-sm text-muted-foreground">
                Перетащите блоки из панели инструментов
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {blocks.map((block) => (
                <div
                  key={block.id}
                  className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm"
                >
                  {block.type}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
