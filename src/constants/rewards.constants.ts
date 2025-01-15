import { RewardActionTypes } from '@prisma/client';

export const REWARDS_PRIZES = {
  [RewardActionTypes.REGISTRATION]: 10,
  [RewardActionTypes.REFERRAL_REGISTRATION]: 100,
  [RewardActionTypes.BINANCE_WALLET]: 20,
  [RewardActionTypes.POLKADOT_WALLET]: 20,
  [RewardActionTypes.KYC_ACCEPTED]: 15,
  [RewardActionTypes.SURVEY_COMPLETED]: 10,
  [RewardActionTypes.TWITTER_FOLLOW]: 2,
  [RewardActionTypes.TELEGRAM_FOLLOW]: 4,
  [RewardActionTypes.BLOG_FOLLOW]: 4
};
