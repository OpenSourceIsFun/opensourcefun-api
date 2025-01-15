import { Injectable } from '@nestjs/common';
import { Prisma, ReferralCode } from '@prisma/client';
import { PrismaRepository } from 'repositories';

@Injectable()
export class ReferralCodesService {
  private readonly referralCodesRepository: Prisma.ReferralCodeDelegate<Prisma.RejectOnNotFound>;

  constructor(private readonly prismaRepository: PrismaRepository) {
    this.referralCodesRepository = prismaRepository.referralCode;
  }

  public async createReferralCode(
    info: Prisma.ReferralCodeUncheckedCreateInput
  ): Promise<ReferralCode> {
    return this.referralCodesRepository.create({
      data: info
    });
  }

  public async updateReferralCodeById(
    id: string,
    info: Prisma.ReferralCodeUncheckedCreateInput
  ): Promise<ReferralCode> {
    return this.referralCodesRepository.update({
      where: {
        id
      },
      data: info
    });
  }

  public async getReferralCodeById(
    referralCodeId: string
  ): Promise<ReferralCode> {
    return this.referralCodesRepository.findUnique({
      where: {
        id: referralCodeId
      }
    });
  }

  public async getReferralCodeByUser(userId: string): Promise<ReferralCode> {
    return this.referralCodesRepository.findUnique({
      where: {
        userId
      }
    });
  }
}
