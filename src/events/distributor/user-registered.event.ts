import { ContractEvent } from './contract.event';

export class UserRegisteredEvent extends ContractEvent {
  who: string;

  when: Date;
}
