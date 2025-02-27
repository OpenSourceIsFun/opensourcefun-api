import { Injectable } from '@nestjs/common';

import { Prisma, Reward } from '@prisma/client';

import { PrismaRepository } from 'repositories';
import { REWARDS_PRIZES } from 'constants/rewards.constants';

@Injectable()
export class RewardsService {
  private readonly rewardsRepository: Prisma.RewardDelegate<Prisma.RejectOnNotFound>;

  constructor(prismaRepository: PrismaRepository) {
    this.rewardsRepository = prismaRepository.reward;
  }

  public createReward(
    info: Omit<Prisma.RewardUncheckedCreateInput, 'prize'>
  ): Promise<Reward> {
    const newReward: Prisma.RewardUncheckedCreateInput = {
      ...info,
      prize: REWARDS_PRIZES[info.action]
    };

    return this.rewardsRepository.create({ data: newReward });
  }

  public async getRewardsSumByUserId(userId: string): Promise<number> {
    const result = await this.rewardsRepository.aggregate({
      where: {
        userId
      },
      _sum: {
        prize: true
      }
    });

    return result._sum.prize;
  }
}
