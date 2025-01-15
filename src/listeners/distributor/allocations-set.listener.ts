import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { ProjectsService, UsersService } from 'services';
import { AllocationsSetEventName } from 'constants/distributor-events.constants';
import { AllocationSetEvent } from 'evm-events/distributor/allocation-set.event';

@Injectable()
export class AllocationsSetListener {
  constructor(
    private readonly usersService: UsersService,
    private readonly projectsService: ProjectsService
  ) {}

  @OnEvent(AllocationsSetEventName, { async: true })
  async handle(event: AllocationSetEvent) {
    const project = await this.projectsService.getProjectByAddress(
      event.contract
    );
    const user = await this.usersService.getUserByWallet(event.to);
    const admin = await this.usersService.getUserById(project.adminId);

    console.log(AllocationsSetEventName, {
      user,
      admin,
      amount: event.amount,
      allocationSetAt: event.when,
      project
    });
  }
}
