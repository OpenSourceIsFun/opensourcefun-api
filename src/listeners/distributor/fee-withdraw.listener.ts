import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { ProjectsService, UsersService } from 'services';
import { FeeWithdrawnEventName } from 'constants/distributor-events.constants';
import { RegistrationFeeWithdrawnEvent } from 'evm-events/distributor/registration-fee-withdrawn.event';

@Injectable()
export class FeeWithdrawListener {
  constructor(
    private readonly usersService: UsersService,
    private readonly projectsService: ProjectsService
  ) {}

  @OnEvent(FeeWithdrawnEventName, { async: true })
  async handle(event: RegistrationFeeWithdrawnEvent) {
    const project = await this.projectsService.getProjectByAddress(
      event.contract
    );
    const admin = await this.usersService.getUserById(project.adminId);

    console.log(FeeWithdrawnEventName, {
      admin,
      amount: event.amount,
      feeWithdrawAt: event.when,
      project
    });
  }
}
