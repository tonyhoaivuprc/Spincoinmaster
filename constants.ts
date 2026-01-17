
import { RewardItem, RewardType } from './types';

export const COLORS = {
  primary: '#7B1FA2', // Purple header/buttons
  secondary: '#FB8C00', // Orange buttons
  success: '#4CAF50', // Green button
  info: '#2196F3', // Light blue buttons
  darkBlue: '#1565C0', // Bottom row buttons
  background: '#FFFFFF',
  text: '#FFFFFF',
  textDark: '#333333',
  gray: '#F5F5F5'
};

export const generateMockData = (): RewardItem[] => {
  const data: RewardItem[] = [];
  const now = new Date();
  
  for (let i = 0; i < 110; i++) {
    const date = new Date(now);
    date.setHours(date.getHours() - i * 6);
    
    const type = i % 2 === 0 ? RewardType.SPIN : RewardType.COIN;
    const amountStr = type === RewardType.SPIN 
      ? `${[25, 30, 40, 50, 100, 125][i % 6]} Spins`
      : `${(i + 1) * 1.5} Million Coins`;

    data.push({
      id: `reward-${i}`,
      title: amountStr,
      date: date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }),
      link: 'https://static.moonactive.net/static/coinmaster/reward-link.html?c=test_link',
      type: type,
      amount: amountStr
    });
  }
  return data;
};
