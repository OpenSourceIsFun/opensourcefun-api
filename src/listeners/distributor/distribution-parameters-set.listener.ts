import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { ProjectsService, UsersService } from 'services';
import { DistributionParametersSetEventName } from 'constants/distributor-events.constants';
import { DistributionParametersSetEvent } from 'evm-events/distributor/distribution-parameters-set.event';

@Injectable()
export class DistributionParametersSetListener {
  constructor(
    private readonly usersService: UsersService,
    private readonly projectsService: ProjectsService
  ) {}

  @OnEvent(DistributionParametersSetEventName, { async: true })
  async handle(event: DistributionParametersSetEvent) {
    const project = await this.projectsService.getProjectByAddress(
      event.contract
    );
    const admin = await this.usersService.getUserById(project.adminId);

    console.log(DistributionParametersSetEventName, {
      admin,
      project,
      distributionParametersSetAt: event.when
    });
  }
}
