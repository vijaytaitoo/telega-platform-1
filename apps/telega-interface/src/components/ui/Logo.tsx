import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className={`${sizeClasses[size]} bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center`}>
        <span className="text-white font-bold text-lg">TG</span>
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-gray-900 dark:text-white">Tele•Ga</span>
        <span className="text-xs text-gray-500 dark:text-gray-400">Platform</span>
      </div>
    </div>
  );
};

export default Logo; 