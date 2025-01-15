import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { ProjectsService, UsersService } from 'services';
import { VestingParametersSetEventName } from 'constants/distributor-events.constants';
import { VestingParametersSetEvent } from 'evm-events/distributor/vesting-parameters-set.event';

@Injectable()
export class VestingParametersSetListener {
  constructor(
    private readonly usersService: UsersService,
    private readonly projectsService: ProjectsService
  ) {}

  @OnEvent(VestingParametersSetEventName, { async: true })
  async handle(event: VestingParametersSetEvent) {
    const project = await this.projectsService.getProjectByAddress(
      event.contract
    );
    const admin = await this.usersService.getUserById(project.adminId);

    console.log(VestingParametersSetEventName, {
      admin,
      vestingParametersSetAt: event.when,
      project
    });
  }
}
