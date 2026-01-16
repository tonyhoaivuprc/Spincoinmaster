
import React from 'react';
import { RewardType, RewardItem } from './types';

export const APP_TITLE = "Spin Master Rewards";

// Mock initial data - In a real app, this would be fetched from a Remote JSON
export const MOCK_REWARDS: RewardItem[] = [
  {
    id: '1',
    title: '25 Vòng quay miễn phí',
    date: 'Hôm nay, 24 Tháng 5',
    type: RewardType.SPIN,
    link: 'https://static.moonactive.net/content/cms/social/index.html?deeplink=coinmaster://promotions?type=reward&id=1',
    amount: '25'
  },
  {
    id: '2',
    title: '10 Vòng quay & 1 Triệu Xu',
    date: 'Hôm nay, 24 Tháng 5',
    type: RewardType.BOTH,
    link: 'https://static.moonactive.net/content/cms/social/index.html?deeplink=coinmaster://promotions?type=reward&id=2',
    amount: '10 + 1M'
  },
  {
    id: '3',
    title: '2 Triệu Xu vàng',
    date: 'Hôm qua, 23 Tháng 5',
    type: RewardType.COIN,
    link: 'https://static.moonactive.net/content/cms/social/index.html?deeplink=coinmaster://promotions?type=reward&id=3',
    amount: '2M'
  },
  {
    id: '4',
    title: '50 Vòng quay cực đại',
    date: '23 Tháng 5',
    type: RewardType.SPIN,
    link: 'https://static.moonactive.net/content/cms/social/index.html?deeplink=coinmaster://promotions?type=reward&id=4',
    amount: '50'
  },
  {
    id: '5',
    title: '25 Vòng quay đặc biệt',
    date: '22 Tháng 5',
    type: RewardType.SPIN,
    link: 'https://static.moonactive.net/content/cms/social/index.html?deeplink=coinmaster://promotions?type=reward&id=5',
    amount: '25'
  },
  {
    id: '6',
    title: '3 Triệu Xu may mắn',
    date: '22 Tháng 5',
    type: RewardType.COIN,
    link: 'https://static.moonactive.net/content/cms/social/index.html?deeplink=coinmaster://promotions?type=reward&id=6',
    amount: '3M'
  },
    {
    id: '7',
    title: '100 Vòng quay may mắn',
    date: '21 Tháng 5',
    type: RewardType.SPIN,
    link: 'https://static.moonactive.net/content/cms/social/index.html?deeplink=coinmaster://promotions?type=reward&id=7',
    amount: '100'
  },
  {
    id: '8',
    title: '5 Triệu Xu khổng lồ',
    date: '21 Tháng 5',
    type: RewardType.COIN,
    link: 'https://static.moonactive.net/content/cms/social/index.html?deeplink=coinmaster://promotions?type=reward&id=8',
    amount: '5M'
  }
];
