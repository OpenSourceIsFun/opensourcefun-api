import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { ProjectsService, UsersService } from 'services';
import { TokensWithdrawnEventName } from 'constants/distributor-events.constants';
import { TokensWithdrawnEvent } from 'evm-events/distributor/tokens-withdrawn.event';

@Injectable()
export class TokensWithdrawListener {
  constructor(
    private readonly usersService: UsersService,
    private readonly projectsService: ProjectsService
  ) {}

  @OnEvent(TokensWithdrawnEventName, { async: true })
  async handle(event: TokensWithdrawnEvent) {
    const project = await this.projectsService.getProjectByAddress(
      event.contract
    );
    const user = await this.usersService.getUserByWallet(event.who);

    console.log(TokensWithdrawnEventName, {
      user,
      amount: event.amount,
      tokensWithdrawAt: event.when,
      project
    });
  }
}
