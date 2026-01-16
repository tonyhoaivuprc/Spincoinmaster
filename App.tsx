
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import RewardCard from './components/RewardCard';
import Skeleton from './components/Skeleton';
import { RewardItem, RewardType, ClaimState } from './types';
import { rewardService } from './services/rewardService';
import { RefreshCcw } from 'lucide-react';

const App: React.FC = () => {
  const [rewards, setRewards] = useState<RewardItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [claimedState, setClaimedState] = useState<ClaimState>({});
  const [activeTab, setActiveTab] = useState<RewardType | 'ALL'>('ALL');

  const fetchData = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      const data = await rewardService.getRewards();
      setRewards(data);
      setClaimedState(rewardService.getClaimedState());
    } catch (error) {
      console.error("Failed to fetch rewards", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleClaim = (id: string, link: string) => {
    // Update UI immediately
    setClaimedState(prev => ({ ...prev, [id]: true }));
    // Persist
    rewardService.setClaimedState(id);
    // Open link
    window.open(link, '_blank');
  };

  const filteredRewards = rewards.filter(item => {
    if (activeTab === 'ALL') return true;
    return item.type === activeTab;
  });

  return (
    <div className="min-h-screen max-w-md mx-auto relative bg-gray-50 overflow-hidden flex flex-col">
      <Header title="Spin Master Rewards" />
      
      {/* Tab Navigation */}
      <div className="fixed top-16 left-0 right-0 max-w-md mx-auto bg-white z-40 px-4 pt-2 pb-3 flex space-x-2 border-b border-gray-50">
        {[
          { id: 'ALL', label: 'Tất cả' },
          { id: RewardType.SPIN, label: 'Vòng quay' },
          { id: RewardType.COIN, label: 'Tiền xu' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
              activeTab === tab.id 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <main className="flex-1 mt-[128px] px-4 pb-20 overflow-y-auto no-scrollbar">
        {/* Pull-to-refresh Indicator */}
        <div 
          className={`flex justify-center items-center transition-all duration-300 overflow-hidden ${
            refreshing ? 'h-12 opacity-100' : 'h-0 opacity-0'
          }`}
        >
          <RefreshCcw className="animate-spin text-blue-500" size={24} />
        </div>

        <div className="mt-4">
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} />)
          ) : filteredRewards.length > 0 ? (
            filteredRewards.map((reward, index) => (
              <div 
                key={reward.id} 
                className="animate-in fade-in slide-in-from-bottom-4 duration-500"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <RewardCard 
                  reward={reward} 
                  isClaimed={!!claimedState[reward.id]} 
                  onClaim={handleClaim}
                />
              </div>
            ))
          ) : (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">📭</div>
              <p className="text-gray-500 font-medium">Không có phần thưởng nào</p>
            </div>
          )}
        </div>
      </main>

      {/* Floating Action Button (Optional but fits style) */}
      <button 
        onClick={() => fetchData(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-white shadow-2xl rounded-full flex items-center justify-center border border-gray-100 text-blue-600 active:rotate-180 transition-transform duration-500 z-50 lg:hidden"
      >
        <RefreshCcw size={24} className={refreshing ? 'animate-spin' : ''} />
      </button>

      {/* Simple Bottom Spacing for native feel */}
      <div className="h-safe-bottom"></div>
    </div>
  );
};

export default App;
