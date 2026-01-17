
export enum RewardType {
  SPIN = 'spin',
  COIN = 'coin'
}

export interface RewardItem {
  id: string;
  title: string;
  date: string;
  link: string;
  type: RewardType;
  amount?: string;
}

export interface ClaimedStatus {
  [key: string]: boolean;
}
