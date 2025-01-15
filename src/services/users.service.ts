import { toLower } from 'lodash';
import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { compare, genSalt, hash } from 'bcryptjs';
import { PrismaRepository } from 'repositories';
import { WalletsService } from './wallets.service';

@Injectable()
export class UsersService {
  private readonly usersRepository: Prisma.UserDelegate<Prisma.RejectOnNotFound>;

  constructor(
    prismaRepository: PrismaRepository,
    private readonly walletsService: WalletsService
  ) {
    this.usersRepository = prismaRepository.user;
  }

  private async encryptPassword(password: string): Promise<string> {
    const salt = await genSalt(12);

    return hash(password, salt);
  }

  public async comparePassword(
    password: string,
    hashedPassword?: string
  ): Promise<boolean> {
    if (!hashedPassword) return false;

    return compare(password, hashedPassword);
  }

  public async createUser(info: Prisma.UserCreateInput): Promise<User> {
    const newUser = { ...info };

    if (info.email) {
      newUser.email = toLower(info.email);
    }

    if (info.password) {
      newUser.password = await this.encryptPassword(info.password);
    }

    return this.usersRepository.create({ data: newUser });
  }

  public async updateUserById(
    userId: string,
    info: Partial<Prisma.UserUpdateInput>
  ): Promise<User> {
    return this.usersRepository.update({
      where: {
        id: userId
      },
      data: {
        ...info
      }
    });
  }

  public async updateUserPasswordById(
    userId: string,
    newPassword: string
  ): Promise<User> {
    const hashedPassword = await this.encryptPassword(newPassword);

    return this.usersRepository.update({
      where: {
        id: userId
      },
      data: {
        password: hashedPassword
      }
    });
  }

  public getUserByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findUnique({
      where: {
        email: toLower(email)
      }
    });
  }

  public getUserByKycId(kycId: string): Promise<User | null> {
    return this.usersRepository.findUnique({
      where: {
        kycId
      }
    });
  }

  public getUserById(userId: string): Promise<User | null> {
    return this.usersRepository.findUnique({
      where: {
        id: userId
      }
    });
  }

  public getUsersByIds(userIds: string[]): Promise<User[]> {
    return this.usersRepository.findMany({
      where: {
        id: { in: userIds }
      }
    });
  }

  public getUserByReferralCode(referralCode: string): Promise<User> {
    return this.usersRepository.findFirst({
      where: {
        myReferralCode: {
          value: referralCode
        }
      }
    });
  }

  public getUsersByInviteReferralCode(referralCode: string): Promise<User[]> {
    return this.usersRepository.findMany({
      where: {
        inviteReferralCode: referralCode
      },
      include: {
        wallets: true
      }
    });
  }

  public async getUserByWallet(
    address: string,
    walletName: string = 'eth'
  ): Promise<User> {
    const wallet = await this.walletsService.getWalletByValue(
      walletName,
      address
    );

    return this.getUserById(wallet.userId);
  }
}
