
import { RewardItem, ClaimState } from '../types';
import { MOCK_REWARDS } from '../constants';

const STORAGE_KEY = 'cm_claimed_rewards';

export const rewardService = {
  async getRewards(): Promise<RewardItem[]> {
    // Simulate API delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(MOCK_REWARDS);
      }, 1000);
    });
  },

  getClaimedState(): ClaimState {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  },

  setClaimedState(id: string) {
    const currentState = this.getClaimedState();
    const newState = { ...currentState, [id]: true };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
  },
  
  clearClaimedState() {
    localStorage.removeItem(STORAGE_KEY);
  }
};
