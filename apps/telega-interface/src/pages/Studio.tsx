import React, { useState, useCallback } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import {
  Palette,
  Image,
  Calendar,
  User,
  Mail,
  Star,
  Upload,
  Download,
  Save,
  Eye,
  Smartphone,
  Monitor,
  Tablet,
} from 'lucide-react';
import { BlockTemplate, DroppedBlock, TelegramUser } from '../types';
import BlockTemplateItem from '../components/BlockTemplateItem';
import DroppedBlockItem from '../components/DroppedBlockItem';
import AdminPanel from '../components/AdminPanel';
import TelegramLoginButton from '../components/TelegramLoginButton';

const blockTemplates: BlockTemplate[] = [
  { id: 'hero', type: 'hero', name: 'Главный баннер', icon: 'star', category: 'fashion' },
  { id: 'gallery', type: 'gallery', name: 'Галерея товаров', icon: 'image', category: 'fashion' },
  { id: 'portfolio', type: 'portfolio', name: 'Портфолио', icon: 'user', category: 'freelance' },
  { id: 'booking', type: 'booking', name: 'Бронирование', icon: 'calendar', category: 'freelance' },
  { id: 'contact', type: 'contact', name: 'Контакты', icon: 'mail', category: 'electronics' },
];

export default function Studio() {
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<'fashion' | 'electronics' | 'freelance'>(
    'fashion',
  );
  const [droppedBlocks, setDroppedBlocks] = useState<DroppedBlock[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [isPreview, setIsPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  }, []);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      if (!over) {
        setActiveId(null);
        return;
      }

      if (over.id === 'dropzone') {
        // Adding new block from template
        const template = blockTemplates.find((t) => t.id === active.id);
        if (template) {
          const newBlock: DroppedBlock = {
            id: `${template.id}-${Date.now()}`,
            type: template.type,
            name: template.name,
            position: droppedBlocks.length,
            config: {},
          };
          setDroppedBlocks((prev) => [...prev, newBlock]);
        }
      } else {
        // Reordering existing blocks
        const oldIndex = droppedBlocks.findIndex((block) => block.id === active.id);
        const newIndex = droppedBlocks.findIndex((block) => block.id === over.id);

        if (oldIndex !== -1 && newIndex !== -1) {
          setDroppedBlocks((prev) => arrayMove(prev, oldIndex, newIndex));
        }
      }

      setActiveId(null);
    },
    [droppedBlocks],
  );

  const removeBlock = useCallback((blockId: string) => {
    setDroppedBlocks((prev) => prev.filter((block) => block.id !== blockId));
  }, []);

  const saveShop = useCallback(async () => {
    if (!user) return;

    setIsSaving(true);
    setSaveStatus('idle');

    try {
      // Simulate API call to save shop structure
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const shopData = {
        userId: user.id,
        blocks: droppedBlocks,
        category: selectedCategory,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Here you would save to Supabase or your API
      console.log('Saving shop data:', shopData);
      localStorage.setItem(`shop_${user.id}`, JSON.stringify(shopData));

      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (error) {
      console.error('Failed to save shop:', error);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } finally {
      setIsSaving(false);
    }
  }, [user, droppedBlocks, selectedCategory]);

  const filteredTemplates = blockTemplates.filter(
    (template) => template.category === selectedCategory,
  );

  const getPreviewWidth = () => {
    switch (previewMode) {
      case 'mobile':
        return 'w-80';
      case 'tablet':
        return 'w-96';
      case 'desktop':
        return 'w-full';
      default:
        return 'w-full';
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-400 via-purple-500 to-purple-600 flex items-center justify-center p-6">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center max-w-md w-full border border-white/20">
          <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Palette className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-4">Tele•Ga Studio</h1>
          <p className="text-white/80 mb-6">
            Войдите через Telegram, чтобы начать создавать свой магазин
          </p>
          <TelegramLoginButton onLogin={setUser} onLogout={() => setUser(null)} user={user} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-purple-500 to-purple-600">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {/* Header */}
        <header className="p-6 border-b border-white/20">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-purple-600 rounded-full flex items-center justify-center">
                <Palette className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Tele•Ga Studio</h1>
                <p className="text-white/70 text-sm">Конструктор магазинов</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Preview Mode Toggle */}
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-lg p-1">
                <button
                  onClick={() => setPreviewMode('mobile')}
                  className={`p-2 rounded ${previewMode === 'mobile' ? 'bg-white/20' : 'hover:bg-white/10'} text-white transition-colors`}
                >
                  <Smartphone className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setPreviewMode('tablet')}
                  className={`p-2 rounded ${previewMode === 'tablet' ? 'bg-white/20' : 'hover:bg-white/10'} text-white transition-colors`}
                >
                  <Tablet className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setPreviewMode('desktop')}
                  className={`p-2 rounded ${previewMode === 'desktop' ? 'bg-white/20' : 'hover:bg-white/10'} text-white transition-colors`}
                >
                  <Monitor className="w-4 h-4" />
                </button>
              </div>

              {/* Action Buttons */}
              <button
                onClick={saveShop}
                disabled={isSaving || droppedBlocks.length === 0}
                className={`flex items-center space-x-2 px-4 py-2 backdrop-blur-md rounded-lg text-white transition-all duration-200 ${
                  saveStatus === 'success'
                    ? 'bg-green-500/30 border border-green-400/50'
                    : saveStatus === 'error'
                      ? 'bg-red-500/30 border border-red-400/50'
                      : 'bg-green-500/20 hover:bg-green-500/30'
                } ${isSaving || droppedBlocks.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                className="flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg text-white hover:bg-white/20 transition-all duration-200"
              >
                <Eye className="w-4 h-4" />
                <span className="hidden sm:block">{isPreview ? 'Редактор' : 'Превью'}</span>
              </button>

              <button className="flex items-center space-x-2 px-4 py-2 bg-green-500/20 hover:bg-green-500/30 backdrop-blur-md rounded-lg text-white transition-all duration-200">
                <Save className="w-4 h-4" />
                <span className="hidden sm:block">
                  {isSaving
                    ? 'Сохранение...'
                    : saveStatus === 'success'
                      ? 'Сохранено!'
                      : saveStatus === 'error'
                        ? 'Ошибка'
                        : 'Сохранить'}
                </span>
              </button>

              <TelegramLoginButton onLogin={setUser} onLogout={() => setUser(null)} user={user} />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex h-[calc(100vh-88px)]">
          {!isPreview && (
            <>
              {/* Left Sidebar - Block Templates */}
              <div className="w-80 bg-white/5 backdrop-blur-md border-r border-white/20 p-6 overflow-y-auto">
                <h2 className="text-lg font-semibold text-white mb-4">Блоки</h2>

                {/* Category Selector */}
                <div className="flex space-x-2 mb-6">
                  {(['fashion', 'electronics', 'freelance'] as const).map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                        selectedCategory === category
                          ? 'bg-white/20 text-white'
                          : 'bg-white/5 text-white/70 hover:bg-white/10'
                      }`}
                    >
                      {category === 'fashion'
                        ? 'Мода'
                        : category === 'electronics'
                          ? 'Электроника'
                          : 'Фриланс'}
                    </button>
                  ))}
                </div>

                {/* Block Templates */}
                <div className="space-y-3">
                  {filteredTemplates.map((template) => (
                    <BlockTemplateItem key={template.id} template={template} />
                  ))}
                </div>
              </div>

              {/* Right Sidebar - Admin Panel */}
              <div className="w-80 bg-white/5 backdrop-blur-md border-l border-white/20 p-6 overflow-y-auto">
                <AdminPanel />
              </div>
            </>
          )}

          {/* Center - Drop Zone */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className={`mx-auto ${getPreviewWidth()} transition-all duration-300`}>
              <div
                id="dropzone"
                className={`min-h-[600px] bg-white/5 backdrop-blur-md rounded-2xl border-2 border-dashed border-white/30 p-6 transition-all duration-300 ${
                  activeId ? 'border-orange-400 bg-orange-400/10' : ''
                }`}
              >
                {droppedBlocks.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center py-20">
                    <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4">
                      <Palette className="w-8 h-8 text-white/50" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Начните создавать свой магазин
                    </h3>
                    <p className="text-white/70 max-w-md">
                      Перетащите блоки из левой панели сюда, чтобы построить свой уникальный магазин
                    </p>
                  </div>
                ) : (
                  <SortableContext
                    items={droppedBlocks.map((b) => b.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    <div className="space-y-4">
                      {droppedBlocks.map((block) => (
                        <DroppedBlockItem key={block.id} block={block} onRemove={removeBlock} />
                      ))}
                    </div>
                  </SortableContext>
                )}
              </div>
            </div>
          </div>
        </div>

        <DragOverlay>
          {activeId ? (
            <div className="bg-white/20 backdrop-blur-md rounded-lg p-4 border border-white/30">
              <div className="text-white font-medium">
                {blockTemplates.find((t) => t.id === activeId)?.name ||
                  droppedBlocks.find((b) => b.id === activeId)?.name}
              </div>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
