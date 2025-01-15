import { AnalyticsEventTypeEnum } from 'abstractions/enums';

const { GETRESPONSE_TOKEN } = process.env;

export const token = GETRESPONSE_TOKEN;

export const campaignId = 'LWXOd';

export const tagsIds = {
  [AnalyticsEventTypeEnum.Registration]: 'pnEl8',
  [AnalyticsEventTypeEnum.AlgemEventRegistration]: 'pTcQk',
  [AnalyticsEventTypeEnum.AstarEventRegistration]: 'pTcMT',
  [AnalyticsEventTypeEnum.WalletVerify]: 'pTcoz',
  [AnalyticsEventTypeEnum.Subscribe]: 'pTczA'
};
