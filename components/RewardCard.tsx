
import React from 'react';
import { Share2, CheckCircle2 } from 'lucide-react';
import { RewardItem, RewardType } from '../types';

interface RewardCardProps {
  reward: RewardItem;
  isClaimed: boolean;
  onClaim: (id: string, link: string) => void;
}

const RewardCard: React.FC<RewardCardProps> = ({ reward, isClaimed, onClaim }) => {
  const getIcon = () => {
    switch (reward.type) {
      case RewardType.SPIN:
        return (
          <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center border border-blue-100">
            <span className="text-2xl">🌀</span>
          </div>
        );
      case RewardType.COIN:
        return (
          <div className="w-14 h-14 bg-yellow-50 rounded-2xl flex items-center justify-center border border-yellow-100">
            <span className="text-2xl">💰</span>
          </div>
        );
      case RewardType.BOTH:
        return (
          <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center border border-purple-100">
            <span className="text-2xl">🎁</span>
          </div>
        );
    }
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: reward.title,
        text: `Nhận ${reward.title} ngay tại đây!`,
        url: window.location.href,
      }).catch(() => {});
    }
  };

  return (
    <div 
      className={`bg-white rounded-[24px] p-5 mb-4 shadow-[0_4px_12px_rgba(0,0,0,0.03)] border transition-all duration-300 ${
        isClaimed ? 'opacity-60 grayscale-[0.3] border-gray-100' : 'border-transparent hover:shadow-md'
      }`}
    >
      <div className="flex items-center space-x-4">
        {getIcon()}
        <div className="flex-1">
          <h3 className={`font-bold text-[17px] leading-tight ${isClaimed ? 'text-gray-500' : 'text-gray-900'}`}>
            {reward.title}
          </h3>
          <p className="text-gray-400 text-xs mt-1 font-medium">{reward.date}</p>
        </div>
        {isClaimed && (
          <div className="text-green-500 animate-in fade-in zoom-in duration-300">
            <CheckCircle2 size={24} />
          </div>
        )}
      </div>

      <div className="flex space-x-3 mt-5">
        <button
          onClick={() => onClaim(reward.id, reward.link)}
          className={`flex-1 h-12 rounded-xl font-bold text-sm transition-all active:scale-95 flex items-center justify-center ${
            isClaimed 
              ? 'bg-gray-100 text-gray-500' 
              : 'bg-blue-600 text-white shadow-lg shadow-blue-200'
          }`}
        >
          {isClaimed ? 'Đã nhận' : 'Nhận ngay'}
        </button>
        <button
          onClick={handleShare}
          className="w-14 h-12 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center text-gray-500 active:scale-95 transition-all"
        >
          <Share2 size={20} />
        </button>
      </div>
    </div>
  );
};

export default RewardCard;
