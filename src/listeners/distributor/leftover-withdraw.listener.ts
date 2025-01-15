import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { ProjectsService, UsersService } from 'services';
import { LeftoverWithdrawnEventName } from 'constants/distributor-events.constants';
import { LeftoverWithdrawnEvent } from 'evm-events/distributor/leftover-withdrawn.event';

@Injectable()
export class LeftoverWithdrawListener {
  constructor(
    private readonly usersService: UsersService,
    private readonly projectsService: ProjectsService
  ) {}

  @OnEvent(LeftoverWithdrawnEventName, { async: true })
  async handle(event: LeftoverWithdrawnEvent) {
    const project = await this.projectsService.getProjectByAddress(
      event.contract
    );
    const admin = await this.usersService.getUserById(project.adminId);

    console.log(LeftoverWithdrawnEventName, {
      admin,
      amount: event.amount,
      leftoverWithdrawAt: event.when,
      project
    });
  }
}
