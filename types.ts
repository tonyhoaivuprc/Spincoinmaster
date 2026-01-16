
export enum RewardType {
  SPIN = 'SPIN',
  COIN = 'COIN',
  BOTH = 'BOTH'
}

export interface RewardItem {
  id: string;
  title: string;
  date: string;
  type: RewardType;
  link: string;
  amount: string;
}

export interface ClaimState {
  [id: string]: boolean;
}
