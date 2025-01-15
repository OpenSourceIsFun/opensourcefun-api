import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { ProjectsService, UsersService } from 'services';
import { UserParticipatedEvent } from 'evm-events';
import { UserParticipatedEventName } from 'constants/distributor-events.constants';

@Injectable()
export class UserParticipatedListener {
  constructor(
    private readonly usersService: UsersService,
    private readonly projectsService: ProjectsService
  ) {}

  @OnEvent(UserParticipatedEventName, { async: true })
  async handle(event: UserParticipatedEvent) {
    const user = await this.usersService.getUserByWallet(event.who);
    const project = await this.projectsService.getProjectByAddress(
      event.contract
    );

    console.log(UserParticipatedEventName, {
      user,
      project,
      participatedAt: event.when
    });
  }
}
