import { Injectable } from '@nestjs/common';

import { Prisma, Wallet } from '@prisma/client';

import { PrismaRepository } from 'repositories';

@Injectable()
export class WalletsService {
  private readonly walletsRepository: Prisma.WalletDelegate<Prisma.RejectOnNotFound>;

  constructor(prismaRepository: PrismaRepository) {
    this.walletsRepository = prismaRepository.wallet;
  }

  public createWallet(
    info: Prisma.WalletUncheckedCreateInput
  ): Promise<Wallet> {
    return this.walletsRepository.create({ data: info });
  }

  public async deleteWalletById(id: string): Promise<void> {
    await this.walletsRepository.delete({
      where: {
        id
      }
    });
  }

  public getWalletByValue(name: string, value: string): Promise<Wallet | null> {
    return this.walletsRepository.findFirst({
      where: {
        name,
        value
      }
    });
  }

  public getWalletByName(userId: string, name: string): Promise<Wallet | null> {
    return this.walletsRepository.findFirst({
      where: {
        userId,
        name
      }
    });
  }

  public getWalletById(id: string): Promise<Wallet | null> {
    return this.walletsRepository.findUnique({
      where: {
        id
      }
    });
  }

  public getWalletsByUserId(userId: string): Promise<Wallet[]> {
    return this.walletsRepository.findMany({
      where: {
        userId
      }
    });
  }

  public getWalletsByValues(values: string[]): Promise<Wallet[]> {
    return this.walletsRepository.findMany({
      where: {
        value: { in: values, mode: 'insensitive' }
      }
    });
  }
}
