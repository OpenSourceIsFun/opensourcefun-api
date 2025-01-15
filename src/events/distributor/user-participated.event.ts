import { ContractEvent } from './contract.event';

export class UserParticipatedEvent extends ContractEvent {
  who: string;

  when: Date;
}
