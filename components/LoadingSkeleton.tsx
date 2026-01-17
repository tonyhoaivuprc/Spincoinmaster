
import React from 'react';

const LoadingSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="bg-white rounded-[24px] p-5 mb-4 h-40 shadow-sm">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gray-200"></div>
            <div className="flex-1 space-y-3">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/4"></div>
            </div>
          </div>
          <div className="mt-6 flex gap-3">
            <div className="flex-1 h-12 bg-gray-200 rounded-2xl"></div>
            <div className="w-16 h-12 bg-gray-200 rounded-2xl"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
