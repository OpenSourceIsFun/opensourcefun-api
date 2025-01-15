import { ContractEvent } from './contract.event';

export class RegistrationFeeWithdrawnEvent extends ContractEvent {
  amount: number;

  when: Date;
}
