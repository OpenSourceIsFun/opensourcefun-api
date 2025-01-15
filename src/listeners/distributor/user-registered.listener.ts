import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { UserRegisteredEvent } from 'evm-events';
import { ProjectsService, UsersService } from 'services';
import { UserRegisteredEventName } from 'constants/distributor-events.constants';

@Injectable()
export class UserRegisteredListener {
  constructor(
    private readonly usersService: UsersService,
    private readonly projectsService: ProjectsService
  ) {}

  @OnEvent(UserRegisteredEventName, { async: true })
  async handle(event: UserRegisteredEvent) {
    const user = await this.usersService.getUserByWallet(event.who);
    const project = await this.projectsService.getProjectByAddress(
      event.contract
    );

    console.log(UserRegisteredEventName, {
      user,
      project,
      registeredAt: event.when
    });
  }
}
