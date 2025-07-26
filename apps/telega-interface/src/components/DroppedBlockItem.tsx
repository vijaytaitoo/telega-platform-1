import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, X, Settings, Image, User, Calendar, Mail, Star } from 'lucide-react';
import { DroppedBlock } from '../types';

interface DroppedBlockItemProps {
  block: DroppedBlock;
  onRemove: (blockId: string) => void;
}

const iconMap = {
  hero: Star,
  gallery: Image,
  portfolio: User,
  booking: Calendar,
  contact: Mail,
};

const blockContent = {
  hero: {
    title: 'Добро пожаловать в наш магазин',
    subtitle: 'Лучшие товары по выгодным ценам',
    image:
      'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  gallery: {
    title: 'Наши товары',
    items: [
      'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=200',
      'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=200',
      'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=200',
    ],
  },
  portfolio: {
    title: 'Наши работы',
    description: 'Примеры выполненных проектов',
  },
  booking: {
    title: 'Записаться на консультацию',
    description: 'Выберите удобное время',
  },
  contact: {
    title: 'Связаться с нами',
    phone: '+7 (999) 123-45-67',
    email: 'info@example.com',
  },
};

export default function DroppedBlockItem({ block, onRemove }: DroppedBlockItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: block.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const IconComponent = iconMap[block.type as keyof typeof iconMap] || Star;
  const content = blockContent[block.type as keyof typeof blockContent];

  const renderBlockContent = () => {
    switch (block.type) {
      case 'hero':
        return (
          <div className="relative h-48 bg-gradient-to-r from-orange-500 to-purple-600 rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-black/30"></div>
            <div className="relative z-10 p-6 text-white">
              <h2 className="text-2xl font-bold mb-2">{content.title}</h2>
              <p className="text-white/90">{content.subtitle}</p>
            </div>
          </div>
        );

      case 'gallery':
        return (
          <div>
            <h3 className="text-white font-semibold mb-4">{content.title}</h3>
            <div className="grid grid-cols-3 gap-2">
              {content.items.map((item, index) => (
                <img
                  key={index}
                  src={item}
                  alt={`Gallery item ${index + 1}`}
                  className="w-full h-20 object-cover rounded"
                />
              ))}
            </div>
          </div>
        );

      case 'portfolio':
        return (
          <div className="text-center">
            <h3 className="text-white font-semibold mb-2">{content.title}</h3>
            <p className="text-white/70">{content.description}</p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="h-16 bg-white/10 rounded flex items-center justify-center">
                <span className="text-white/60 text-sm">Проект 1</span>
              </div>
              <div className="h-16 bg-white/10 rounded flex items-center justify-center">
                <span className="text-white/60 text-sm">Проект 2</span>
              </div>
            </div>
          </div>
        );

      case 'booking':
        return (
          <div className="text-center">
            <h3 className="text-white font-semibold mb-2">{content.title}</h3>
            <p className="text-white/70 mb-4">{content.description}</p>
            <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-purple-600 text-white rounded-lg">
              Выбрать время
            </button>
          </div>
        );

      case 'contact':
        return (
          <div>
            <h3 className="text-white font-semibold mb-4">{content.title}</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-white/80">
                <span>📞</span>
                <span>{content.phone}</span>
              </div>
              <div className="flex items-center space-x-2 text-white/80">
                <span>✉️</span>
                <span>{content.email}</span>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center text-white/70">
            <IconComponent className="w-8 h-8 mx-auto mb-2" />
            <p>{block.name}</p>
          </div>
        );
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group relative bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-4 ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      {/* Block Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div
            {...attributes}
            {...listeners}
            className="cursor-grab hover:cursor-grabbing p-1 hover:bg-white/10 rounded"
          >
            <GripVertical className="w-4 h-4 text-white/50" />
          </div>
          <IconComponent className="w-5 h-5 text-white" />
          <span className="text-white font-medium">{block.name}</span>
        </div>

        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-1 hover:bg-white/10 rounded text-white/70 hover:text-white">
            <Settings className="w-4 h-4" />
          </button>
          <button
            onClick={() => onRemove(block.id)}
            className="p-1 hover:bg-red-500/20 rounded text-white/70 hover:text-red-400"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Block Content */}
      <div className="min-h-[100px]">{renderBlockContent()}</div>
    </div>
  );
}
