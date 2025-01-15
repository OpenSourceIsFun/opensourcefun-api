import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { ProjectsService, UsersService } from 'services';
import { TokensDepositedEventName } from 'constants/distributor-events.constants';
import { TokensDepositedEvent } from 'evm-events/distributor/tokens-deposited.event';

@Injectable()
export class TokensDepositedListener {
  constructor(
    private readonly usersService: UsersService,
    private readonly projectsService: ProjectsService
  ) {}

  @OnEvent(TokensDepositedEventName, { async: true })
  async handle(event: TokensDepositedEvent) {
    const project = await this.projectsService.getProjectByAddress(
      event.contract
    );
    const owner = await this.usersService.getUserById(project.ownerId);

    console.log(TokensDepositedEventName, {
      owner,
      tokensDepositedAt: event.when,
      project
    });
  }
}
