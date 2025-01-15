import { ContractEvent } from './contract.event';

export class AllocationSetEvent extends ContractEvent {
  amount: number;

  to: string;

  when: Date;
}
