import { Injectable } from '@nestjs/common';

import { Prisma, WalletLog } from '@prisma/client';

import { PrismaRepository } from 'repositories';

@Injectable()
export class WalletLogsService {
  private readonly walletLogsRepository: Prisma.WalletLogDelegate<Prisma.RejectOnNotFound>;

  constructor(prismaRepository: PrismaRepository) {
    this.walletLogsRepository = prismaRepository.walletLog;
  }

  public createWalletLog(
    info: Prisma.WalletLogUncheckedCreateInput
  ): Promise<WalletLog> {
    return this.walletLogsRepository.create({ data: info });
  }
}
