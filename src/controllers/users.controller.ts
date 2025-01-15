import { map, pick, uniq, uniqBy } from 'lodash';
import { Controller, Get, Put, UseGuards, Body, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { UserRoleTypes } from '@prisma/client';
import { IUserContext } from 'abstractions/interfaces';

import { UsersService, WalletsService } from 'services';
import { AvailableForRole, UserContext } from 'decorators';
import { AuthGuard } from 'guards';

import { NotFoundException, UnauthorizedException } from 'exceptions';
import { UserModel, UserContextModel } from 'models';
import {
  SetAdminByEmail,
  UpdateUserDto,
  UpdateUserPasswordDto,
  UsersByAddresses
} from 'dto/users';

@UseGuards(AuthGuard)
@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly walletsService: WalletsService
  ) {}

  @Get('/current-user')
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserContextModel })
  async getCurrentUser(@UserContext() userContext: IUserContext) {
    const user = await this.usersService.getUserById(userContext.id);

    if (!user) throw new UnauthorizedException();

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      kycStatus: user.kycStatus,
      role: user.role,
      telegram: user.telegram,
      discord: user.discord,
      twitter: user.twitter
    } as UserContextModel;
  }

  @Put('/current-user/info')
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserModel })
  async updateCurrentUserInfo(
    @UserContext() userContext: IUserContext,
    @Body() info: UpdateUserDto
  ) {
    const user = await this.usersService.getUserById(userContext.id);

    if (!user) throw new UnauthorizedException();

    return this.usersService.updateUserById(user.id, info);
  }

  @Put('/current-user/password')
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserModel })
  async updateCurrentUserPassword(
    @UserContext() userContext: IUserContext,
    @Body() { newPassword }: UpdateUserPasswordDto
  ) {
    const user = await this.usersService.getUserById(userContext.id);

    if (!user) throw new UnauthorizedException();

    return this.usersService.updateUserPasswordById(user.id, newPassword);
  }

  @Post('/by-addresses')
  @ApiBearerAuth()
  @AvailableForRole(UserRoleTypes.ADMIN)
  @ApiOkResponse({ type: [UserModel] })
  async getUsersByAddresses(@Body() { addresses }: UsersByAddresses) {
    const wallets = await this.walletsService.getWalletsByValues(addresses);
    const userIds = uniq(map(wallets, (w) => w.userId));
    const users = await this.usersService.getUsersByIds(userIds);
    const uniqueWallets = uniqBy(wallets, 'value');

    return map(uniqueWallets, (w) => ({
      ...pick(
        users.find((u) => u.id === w.userId),
        ['email', 'telegram', 'discord', 'twitter']
      ),
      address: w.value
    }));
  }

  @Post('/set-admin-by-email')
  @ApiBearerAuth()
  @AvailableForRole(UserRoleTypes.ADMIN)
  @ApiOkResponse({ type: [UserModel] })
  async setAdminByEmail(@Body() { email }: SetAdminByEmail) {
    const user = await this.usersService.getUserByEmail(email);

    if (!user) throw new NotFoundException('userByEmail', email);

    await this.usersService.updateUserById(user.id, {
      role: UserRoleTypes.ADMIN
    });
  }
}
