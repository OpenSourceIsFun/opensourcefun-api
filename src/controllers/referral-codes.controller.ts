import { map } from 'lodash';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { RewardActionTypes, User, Wallet } from '@prisma/client';
import { IUserContext } from 'abstractions/interfaces';
import { hash, genSalt } from 'bcryptjs';

import { ReferralCodesService, UsersService } from 'services';
import { UserContext } from 'decorators';
import { AuthGuard } from 'guards';

import { ReferralCodeModel, ReferralUserModel } from 'models';
import { UnauthorizedException } from 'exceptions';
import { REWARDS_PRIZES } from 'constants/rewards.constants';

@UseGuards(AuthGuard)
@Controller('referral-codes')
@ApiTags('referral-codes')
export class ReferralCodesController {
  constructor(
    private readonly referralCodesService: ReferralCodesService,
    private readonly usersService: UsersService
  ) {}

  @Get('/my/code')
  @ApiBearerAuth()
  @ApiOkResponse({ type: ReferralCodeModel })
  async getMyReferralCode(
    @UserContext() userContext: IUserContext
  ): Promise<ReferralCodeModel> {
    const user = await this.usersService.getUserById(userContext.id);

    if (!user) throw new UnauthorizedException();

    let code = await this.referralCodesService.getReferralCodeByUser(
      userContext.id
    );

    if (!code) {
      const referralHash = await hash(user.id, await genSalt(8));

      code = await this.referralCodesService.createReferralCode({
        userId: userContext.id,
        value: referralHash.substring(0, 10)
      });
    }

    return code;
  }

  @Get('/my/referrals')
  @ApiBearerAuth()
  @ApiOkResponse({ type: [ReferralUserModel] })
  async getMyReferrals(
    @UserContext() userContext: IUserContext
  ): Promise<ReferralUserModel[]> {
    const user = await this.usersService.getUserById(userContext.id);

    if (!user) throw new UnauthorizedException();

    const code = await this.referralCodesService.getReferralCodeByUser(
      userContext.id
    );

    if (!code) return [];

    const referrals = await this.usersService.getUsersByInviteReferralCode(
      code.value
    );

    return map(referrals, () => ({
      wallet:
        (user as User & { wallets: Wallet[] })?.wallets?.[0]?.value || null,
      userId: user.id,
      reward: REWARDS_PRIZES[RewardActionTypes.REFERRAL_REGISTRATION],
      createdAt: user.createdAt
    }));
  }
}
