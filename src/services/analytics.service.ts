import { Injectable } from '@nestjs/common';
import { AnalyticsEventTypeEnum } from 'abstractions/enums';
import { GetresponseRepository } from 'repositories';
import {
  campaignId as getresponseCampaignId,
  tagsIds as getresponseTagsIds
} from 'config/getresponse';

@Injectable()
export class AnalyticsService {
  private readonly getresponseRepository: GetresponseRepository;

  constructor(getresponseRepository: GetresponseRepository) {
    this.getresponseRepository = getresponseRepository;
  }

  private async sendEventToGetresponse(
    email: string,
    type: AnalyticsEventTypeEnum
  ): Promise<void> {
    const tagId = getresponseTagsIds[type];

    if (!tagId) return;

    await this.getresponseRepository.upsertContactTag(
      getresponseCampaignId,
      email,
      tagId
    );
  }

  public async sendEvent(
    email: string,
    type: AnalyticsEventTypeEnum
  ): Promise<void> {
    try {
      await this.sendEventToGetresponse(email, type);
    } catch (e) {
      console.error(e);
    }
  }
}
