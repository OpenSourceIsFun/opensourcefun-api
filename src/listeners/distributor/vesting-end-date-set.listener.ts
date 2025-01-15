import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { ProjectsService, UsersService } from 'services';
import { VestingEndDateSetEventName } from 'constants/distributor-events.constants';
import { VestingEndDateSetEvent } from 'evm-events/distributor/vesting-end-date-set.event';

@Injectable()
export class VestingEndDateSetListener {
  constructor(
    private readonly usersService: UsersService,
    private readonly projectsService: ProjectsService
  ) {}

  @OnEvent(VestingEndDateSetEventName, { async: true })
  async handle(event: VestingEndDateSetEvent) {
    const project = await this.projectsService.getProjectByAddress(
      event.contract
    );
    const admin = await this.usersService.getUserById(project.adminId);

    console.log(VestingEndDateSetEventName, {
      admin,
      vestingEndDateSetAt: event.when,
      project
    });
  }
}
