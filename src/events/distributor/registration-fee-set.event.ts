import { ContractEvent } from './contract.event';

export class RegistrationFeeSetEvent extends ContractEvent {
  amount: number;

  when: Date;
}
