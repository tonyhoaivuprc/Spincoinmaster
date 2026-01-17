
import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { COLORS } from '../constants';

interface AppBarProps {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
}

const AppBar: React.FC<AppBarProps> = ({ title, showBack = false, onBack }) => {
  return (
    <div 
      className="sticky top-0 z-50 w-full px-4 py-4 flex items-center shadow-md"
      style={{ backgroundColor: COLORS.primary }}
    >
      {showBack && (
        <button 
          onClick={onBack}
          className="p-1 text-white hover:opacity-80 transition-opacity"
        >
          <ChevronLeft size={28} strokeWidth={3} />
        </button>
      )}
      <h1 className="flex-1 text-center text-xl font-bold text-white pr-7">
        {title}
      </h1>
    </div>
  );
};

export default AppBar;
