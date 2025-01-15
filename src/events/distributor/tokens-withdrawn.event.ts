import { ContractEvent } from './contract.event';

export class TokensWithdrawnEvent extends ContractEvent {
  who: string;

  amount: number;

  when: Date;
}
