
import React from 'react';
import { Share2, ArrowRight, Gift } from 'lucide-react';
import { RewardItem, RewardType } from '../types';
import { COLORS } from '../constants';

interface RewardCardProps {
  item: RewardItem;
  isClaimed: boolean;
  onClaim: (item: RewardItem) => void;
  onShare: (item: RewardItem) => void;
}

const RewardCard: React.FC<RewardCardProps> = ({ item, isClaimed, onClaim, onShare }) => {
  return (
    <div className="bg-[#E3F2FD] rounded-xl mb-3 flex items-center overflow-hidden shadow-sm border border-blue-100">
      <div className="p-4 flex items-center justify-center">
         <div className="w-10 h-10 flex items-center justify-center text-purple-700">
            <Gift size={32} />
         </div>
      </div>
      
      <div className="flex-1 py-3 px-2">
        <h3 className="font-bold text-[#1A237E] text-base leading-tight">
          {item.title}
        </h3>
        <p className="text-gray-400 text-xs font-medium mt-0.5">{item.date}</p>
      </div>

      <div className="flex flex-col border-l border-blue-200">
        <button
          onClick={() => onClaim(item)}
          className="p-3 bg-white hover:bg-gray-50 text-blue-600 transition-colors"
          title="Nhận thưởng"
        >
          <ArrowRight size={20} strokeWidth={3} />
        </button>
        <button
          onClick={() => onShare(item)}
          className="p-3 bg-white border-t border-blue-100 hover:bg-gray-50 text-blue-600 transition-colors"
          title="Chia sẻ"
        >
          <Share2 size={20} />
        </button>
      </div>
    </div>
  );
};

export default RewardCard;
