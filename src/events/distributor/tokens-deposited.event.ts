import { ContractEvent } from './contract.event';

export class TokensDepositedEvent extends ContractEvent {
  amount: number;

  when: Date;
}
