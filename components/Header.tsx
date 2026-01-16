
import React from 'react';
import { ArrowLeft, MoreVertical, Bell } from 'lucide-react';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-100 flex items-center px-4 z-50 justify-between safe-top">
      <div className="flex items-center">
        <button className="p-2 -ml-2 hover:bg-gray-100 rounded-full active:scale-95 transition-transform">
          <ArrowLeft size={24} className="text-gray-700" />
        </button>
        <h1 className="ml-2 font-bold text-lg text-gray-800 tracking-tight">{title}</h1>
      </div>
      <div className="flex items-center space-x-2">
        <button className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
          <Bell size={20} />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
          <MoreVertical size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;
