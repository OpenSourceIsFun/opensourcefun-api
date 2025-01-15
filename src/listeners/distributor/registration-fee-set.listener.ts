import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { ProjectsService, UsersService } from 'services';
import { RegistrationFeeSetEventName } from 'constants/distributor-events.constants';
import { RegistrationFeeSetEvent } from 'evm-events/distributor/registration-fee-set.event';

@Injectable()
export class RegistrationFeeSetListener {
  constructor(
    private readonly usersService: UsersService,
    private readonly projectsService: ProjectsService
  ) {}

  @OnEvent(RegistrationFeeSetEventName, { async: true })
  async handle(event: RegistrationFeeSetEvent) {
    const project = await this.projectsService.getProjectByAddress(
      event.contract
    );
    const admin = await this.usersService.getUserById(project.adminId);

    console.log(RegistrationFeeSetEventName, {
      admin,
      project,
      amount: event.amount,
      registrationFeeSetAt: event.when
    });
  }
}
