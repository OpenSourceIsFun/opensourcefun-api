import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { ProjectsService, UsersService } from 'services';
import { RegistrationRoundSetEventName } from 'constants/distributor-events.constants';
import { RegistrationRoundSetEvent } from 'evm-events/distributor/registration-round-set.event';

@Injectable()
export class RegistrationRoundSetListener {
  constructor(
    private readonly usersService: UsersService,
    private readonly projectsService: ProjectsService
  ) {}

  @OnEvent(RegistrationRoundSetEventName, { async: true })
  async handle(event: RegistrationRoundSetEvent) {
    const project = await this.projectsService.getProjectByAddress(
      event.contract
    );
    const admin = await this.usersService.getUserById(project.adminId);

    console.log(RegistrationRoundSetEventName, {
      admin,
      project,
      registrationRoundSetAt: event.when
    });
  }
}
