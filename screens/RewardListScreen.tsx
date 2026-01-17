
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '../components/AppBar';
import RewardCard from '../components/RewardCard';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { rewardService } from '../services/rewardService';
import { RewardItem, RewardType, ClaimedStatus } from '../types';

interface RewardListScreenProps {
  type: RewardType;
  title: string;
}

const RewardListScreen: React.FC<RewardListScreenProps> = ({ type, title }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [rewards, setRewards] = useState<RewardItem[]>([]);
  const [claimed, setClaimed] = useState<ClaimedStatus>(rewardService.getClaimedStatus());

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await rewardService.fetchRewards();
      const filtered = data
        .filter(item => item.type === type)
        .sort((a, b) => {
           const dateA = a.date.split('/').reverse().join('');
           const dateB = b.date.split('/').reverse().join('');
           return dateB.localeCompare(dateA);
        });
      setRewards(filtered);
      setLoading(false);
    };
    loadData();
  }, [type]);

  const handleClaim = (item: RewardItem) => {
    window.open(item.link, '_blank');
    rewardService.markAsClaimed(item.id);
    setClaimed(prev => ({ ...prev, [item.id]: true }));
  };

  const handleShare = (item: RewardItem) => {
    rewardService.shareLink(item);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <AppBar title={title} showBack onBack={() => navigate(-1)} />
      
      <div className="flex-1 overflow-y-auto px-4 py-4 no-scrollbar">
        {loading ? (
          <LoadingSkeleton />
        ) : rewards.length > 0 ? (
          <div className="pb-8">
            {rewards.map(item => (
              <RewardCard 
                key={item.id} 
                item={item} 
                isClaimed={!!claimed[item.id]} 
                onClaim={handleClaim}
                onShare={handleShare}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full py-20 text-gray-400">
            <p className="text-lg">Không tìm thấy link nào.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RewardListScreen;
