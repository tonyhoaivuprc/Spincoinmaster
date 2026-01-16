
import React from 'react';

const Skeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-[24px] p-5 mb-4 shadow-sm animate-pulse border border-gray-100">
      <div className="flex items-center space-x-4">
        <div className="w-14 h-14 bg-gray-200 rounded-2xl"></div>
        <div className="flex-1 space-y-3 py-1">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-3 bg-gray-100 rounded w-1/2"></div>
        </div>
      </div>
      <div className="flex space-x-3 mt-5">
        <div className="h-11 bg-gray-200 rounded-xl flex-1"></div>
        <div className="h-11 bg-gray-100 rounded-xl w-24"></div>
      </div>
    </div>
  );
};

export default Skeleton;
