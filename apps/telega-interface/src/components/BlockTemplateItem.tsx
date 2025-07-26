import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Image, User, Calendar, Mail, Star } from 'lucide-react';
import { BlockTemplate } from '../types';

interface BlockTemplateItemProps {
  template: BlockTemplate;
}

const iconMap = {
  image: Image,
  user: User,
  calendar: Calendar,
  mail: Mail,
  star: Star,
};

export default function BlockTemplateItem({ template }: BlockTemplateItemProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: template.id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  const IconComponent = iconMap[template.icon as keyof typeof iconMap] || Star;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`p-4 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 cursor-grab hover:bg-white/20 transition-all duration-200 ${
        isDragging ? 'opacity-50 cursor-grabbing' : ''
      }`}
    >
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-purple-600 rounded-lg flex items-center justify-center">
          <IconComponent className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="text-white font-medium">{template.name}</div>
          <div className="text-white/60 text-sm capitalize">{template.category}</div>
        </div>
      </div>
    </div>
  );
}
