import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';

import { networks } from 'config/chain-rpc';

import { DistributorEventsSubscriberService } from './distributor-events-subsriber.service';
import distributor from 'Distributor.json';

@Injectable()
export class DistributorService {
  constructor(
    private readonly distributorEventsSubscriberService: DistributorEventsSubscriberService
  ) {}

  // TODO: Remove default parameter
  public async listen(
    contractAddress: string,
    network: string = 'Astar'
  ): Promise<void> {
    const rpc = networks[network].rpcUrl;
    const networkInfo = {
      name: networks[network].name,
      chainId: networks[network].chainId
    };

    const provider = new ethers.providers.JsonRpcProvider(rpc, networkInfo);

    const contract = new ethers.Contract(
      contractAddress,
      distributor.abi,
      provider
    );

    await this.distributorEventsSubscriberService.subscribe(contract);
  }
}
