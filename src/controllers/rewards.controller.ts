import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { IUserContext } from 'abstractions/interfaces';

import { RewardsService } from 'services';
import { UserContext } from 'decorators';
import { AuthGuard } from 'guards';

@UseGuards(AuthGuard)
@Controller('rewards')
@ApiTags('rewards')
export class RewardsController {
  constructor(private readonly rewardsService: RewardsService) {}

  @Get('/my/total')
  @ApiBearerAuth()
  @ApiOkResponse()
  async getMyRewardsTotal(@UserContext() userContext: IUserContext) {
    const total = await this.rewardsService.getRewardsSumByUserId(
      userContext.id
    );

    return { total };
  }
}
