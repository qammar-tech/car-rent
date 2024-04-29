import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Admin } from '@admin/admin/admin.entity';
import { AdminService } from '@admin/admin/admin.service';
import { AdminRefreshTokenService } from '@admin/admin-refresh-token/admin-refresh-token.service';
import { AdminRefreshToken } from '@admin/admin-refresh-token/admin-refresh-token.entity';
import { AccessTokenInterface, UserType } from './auth.types';
import { LoginDto } from './dto/login.dto';
import { TokensResponseDto } from './dto/tokens-response.dto';
import { RefreshTokensDto } from './dto/refresh-tokens.dto';
import { User } from '@app/user/user.entity';
import { UserService } from '@admin/user/user.service';
import { InviteLinkDto } from './dto/invite-link.dto';
import { ResendInviteLinkDto } from './dto/resend-invite-link.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(
    private adminService: AdminService,
    private userService: UserService,
    private jwtService: JwtService,
    private adminRefreshTokenService: AdminRefreshTokenService,
  ) {}

  async validateUser(
    email: string,
    pass: string,
  ): Promise<Partial<Admin> | null> {
    const admin = await this.adminService.findByEmail(email);

    if (admin && (await bcrypt.compare(pass, admin.password))) {
      return {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        uuid: admin.uuid,
      };
    }

    return null;
  }

  async validateUsers(
    email: string,
    pass: string,
  ): Promise<Partial<Admin> | null | any> {
    const user = await this.userService.findByEmail(email);

    if (user && user.password === pass) {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        uuid: user.uuid,
      };
    }

    return null;
  }

  async login(admin: Admin, body: LoginDto): Promise<TokensResponseDto> {
    const accessToken = await this.createAccessToken(admin);
    const refreshToken = await this.createRefreshToken(admin, body);

    return {
      accessToken,
      refreshToken: refreshToken.token,
    };
  }

  async loginWithUser(user: User, body: LoginDto): Promise<TokensResponseDto> {
    const accessToken = await this.createAccessTokenForUser(user);

    return {
      accessToken,
    };
  }

  async signUpUser(user: User, body: SignUpDto): Promise<TokensResponseDto> {
    const updatedUser = await this.userService.signUpUser(body);

    return this.loginWithUser(updatedUser, body);
  }

  async logout(refreshToken: string): Promise<void> {
    await this.adminRefreshTokenService.deleteByToken(refreshToken);
  }

  private async createAccessToken(admin: Admin): Promise<string> {
    const payload: AccessTokenInterface = {
      name: admin.name,
      email: admin.email,
      uuid: admin.uuid,
      role: UserType.Admin,
    };

    return this.jwtService.signAsync(payload);
  }

  private async createAccessTokenForUser(user: User): Promise<any> {
    const payload: AccessTokenInterface = {
      name: user.name,
      email: user.email,
      uuid: user.uuid,
      role: UserType.Client,
      user,
    };

    return { token: await this.jwtService.signAsync(payload), user };
  }

  private async createRefreshToken(
    admin: Admin,
    params: RefreshTokensDto | LoginDto,
  ): Promise<AdminRefreshToken> {
    return this.adminRefreshTokenService.create(admin, params);
  }

  async refreshTokens(params: RefreshTokensDto): Promise<TokensResponseDto> {
    const oldRefreshToken = await this.adminRefreshTokenService.findOneBy({
      token: params.refreshToken,
    });

    if (!oldRefreshToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    await this.adminRefreshTokenService.deleteByToken(params.refreshToken);
    const admin = await this.adminService.findOne(oldRefreshToken.adminId);

    const accessToken = await this.createAccessToken(admin);
    const refreshToken = await this.createRefreshToken(admin, params);

    return {
      accessToken,
      refreshToken: refreshToken.token,
    };
  }

  async inviteLink(user: User, body: InviteLinkDto) {
    console.log('\n\n\n: user', user);
    const admin = await this.adminService.findByUuid(user.uuid);
    console.log('\n\n\nuuid: ', admin);
    return this.userService.addUser(body, admin.id);
  }

  async resendInviteLink(user: User, body: ResendInviteLinkDto) {
    return this.userService.resendInviteLink(body.email);
  }
}
