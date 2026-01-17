
import { RewardItem, ClaimedStatus } from '../types';
import { generateMockData } from '../constants';

const CLAIMED_STORAGE_KEY = 'spin_vu_claimed_links';

export const rewardService = {
  async fetchRewards(): Promise<RewardItem[]> {
    try {
      // In a real app, this would be: 
      // const response = await fetch('https://api.example.com/cm-rewards');
      // return await response.json();
      
      // Simulating network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      return generateMockData();
    } catch (error) {
      console.error('Error fetching rewards:', error);
      return generateMockData();
    }
  },

  getClaimedStatus(): ClaimedStatus {
    const stored = localStorage.getItem(CLAIMED_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  },

  markAsClaimed(id: string): void {
    const current = this.getClaimedStatus();
    current[id] = true;
    localStorage.setItem(CLAIMED_STORAGE_KEY, JSON.stringify(current));
  },

  shareLink(item: RewardItem): void {
    if (navigator.share) {
      navigator.share({
        title: 'Nhận thưởng Coin Master',
        text: `Nhận ngay: ${item.title} tại Spin Vũ!`,
        url: item.link,
      }).catch(err => console.error('Error sharing', err));
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(item.link);
      alert('Đã sao chép link vào bộ nhớ tạm!');
    }
  }
};
