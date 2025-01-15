import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ethers } from 'ethers';
import {
  AllocationsSetEventName,
  DistributionParametersSetEventName,
  DistributionRoundSetEventName,
  FeeWithdrawnEventName,
  LeftoverWithdrawnEventName,
  MultipleParticipationCompletedEventName,
  MultipleRegistrationCompletedEventName,
  RegistrationFeeSetEventName,
  RegistrationRoundSetEventName,
  TokensDepositedEventName,
  TokensWithdrawnEventName,
  UserParticipatedEventName,
  UserRegisteredEventName,
  VestingEndDateSetEventName,
  VestingParametersSetEventName
} from 'constants/distributor-events.constants';
import { parseEthersDate } from 'utils/date';

@Injectable()
export class DistributorEventsSubscriberService {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  public async subscribe(contract: ethers.Contract): Promise<void> {
    await contract.on(UserRegisteredEventName, (who, when) =>
      this.eventEmitter.emit(UserRegisteredEventName, {
        contract: contract.address,
        who,
        when: parseEthersDate(when)
      })
    );

    await contract.on(UserParticipatedEventName, (who, when) =>
      this.eventEmitter.emit(UserParticipatedEventName, {
        contract: contract.address,
        who,
        when: parseEthersDate(when)
      })
    );

    await contract.on(MultipleRegistrationCompletedEventName, (when) =>
      this.eventEmitter.emit(MultipleRegistrationCompletedEventName, {
        contract: contract.address,
        when: parseEthersDate(when)
      })
    );

    await contract.on(MultipleParticipationCompletedEventName, (when) =>
      this.eventEmitter.emit(MultipleParticipationCompletedEventName, {
        contract: contract.address,
        when: parseEthersDate(when)
      })
    );

    await contract.on(DistributionRoundSetEventName, (when) =>
      this.eventEmitter.emit(DistributionRoundSetEventName, {
        contract: contract.address,
        when: parseEthersDate(when)
      })
    );

    await contract.on(RegistrationRoundSetEventName, (when) =>
      this.eventEmitter.emit(RegistrationRoundSetEventName, {
        contract: contract.address,
        when: parseEthersDate(when)
      })
    );

    await contract.on(DistributionParametersSetEventName, (when) =>
      this.eventEmitter.emit(DistributionParametersSetEventName, {
        contract: contract.address,
        when: parseEthersDate(when)
      })
    );

    await contract.on(TokensWithdrawnEventName, (who, amount, when) =>
      this.eventEmitter.emit(TokensWithdrawnEventName, {
        contract: contract.address,
        who,
        amount,
        when: parseEthersDate(when)
      })
    );

    await contract.on(FeeWithdrawnEventName, (amount, when) =>
      this.eventEmitter.emit(FeeWithdrawnEventName, {
        contract: contract.address,
        amount,
        when: parseEthersDate(when)
      })
    );

    await contract.on(LeftoverWithdrawnEventName, (amount, when) =>
      this.eventEmitter.emit(LeftoverWithdrawnEventName, {
        contract: contract.address,
        amount,
        when: parseEthersDate(when)
      })
    );

    await contract.on(VestingParametersSetEventName, (when) =>
      this.eventEmitter.emit(VestingParametersSetEventName, {
        contract: contract.address,
        when: parseEthersDate(when)
      })
    );

    await contract.on(AllocationsSetEventName, (to, amount, when) =>
      this.eventEmitter.emit(AllocationsSetEventName, {
        contract: contract.address,
        to,
        amount,
        when: parseEthersDate(when)
      })
    );

    await contract.on(VestingEndDateSetEventName, (when) =>
      this.eventEmitter.emit(VestingEndDateSetEventName, {
        contract: contract.address,
        when: parseEthersDate(when)
      })
    );

    await contract.on(RegistrationFeeSetEventName, (amount, when) =>
      this.eventEmitter.emit(RegistrationFeeSetEventName, {
        contract: contract.address,
        amount,
        when: parseEthersDate(when)
      })
    );

    await contract.on(TokensDepositedEventName, (amount, when) =>
      this.eventEmitter.emit(TokensDepositedEventName, {
        contract: contract.address,
        amount,
        when: parseEthersDate(when)
      })
    );
  }
}
