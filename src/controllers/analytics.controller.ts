import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { IUserContext } from 'abstractions/interfaces';
import { AnalyticsEventTypeEnum } from 'abstractions/enums';

import { AnalyticsService, UsersService } from 'services';
import { UserContext } from 'decorators';
import { AuthGuard } from 'guards';
import { NotFoundException } from 'exceptions';
import { SendAnalyticsEventDto, SubscribeEventDto } from 'dto/analytics';

@Controller('analytics')
@ApiTags('analytics')
export class AnalyticsController {
  constructor(
    private readonly usersService: UsersService,
    private readonly analyticsService: AnalyticsService
  ) {}

  @Post('subscribe')
  @ApiOkResponse()
  async subscribeEvent(@Body() { email }: SubscribeEventDto) {
    await this.analyticsService.sendEvent(
      email,
      AnalyticsEventTypeEnum.Subscribe
    );
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiOkResponse()
  async sendEvent(
    @UserContext() userContext: IUserContext,
    @Body() { type }: SendAnalyticsEventDto
  ) {
    const user = await this.usersService.getUserById(userContext.id);

    if (!user) throw new NotFoundException('UserById', userContext.id);

    await this.analyticsService.sendEvent(user.email, type);
  }
}
