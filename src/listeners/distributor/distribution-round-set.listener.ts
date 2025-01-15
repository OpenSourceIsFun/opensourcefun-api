import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { ProjectsService, UsersService } from 'services';
import { DistributionRoundSetEventName } from 'constants/distributor-events.constants';
import { DistributionRoundSetEvent } from 'evm-events/distributor/distribution-round-set.event';

@Injectable()
export class DistributionRoundSetListener {
  constructor(
    private readonly usersService: UsersService,
    private readonly projectsService: ProjectsService
  ) {}

  @OnEvent(DistributionRoundSetEventName, { async: true })
  async handle(event: DistributionRoundSetEvent) {
    const project = await this.projectsService.getProjectByAddress(
      event.contract
    );
    const admin = await this.usersService.getUserById(project.adminId);

    console.log(DistributionRoundSetEventName, {
      admin,
      project,
      distributionRoundSetAt: event.when
    });
  }
}
