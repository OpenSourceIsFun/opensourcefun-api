import { ContractEvent } from './contract.event';

export class LeftoverWithdrawnEvent extends ContractEvent {
  amount: number;

  when: Date;
}
