import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '@admin/auth/auth.service';
import { LocalAuthGuard } from '@admin/auth/guards/local-auth.guard';
import { Response } from 'express';
import { AuthRequest, UserType } from './auth.types';
import { LoginDto } from './dto/login.dto';
import { RefreshTokensDto } from './dto/refresh-tokens.dto';
import { Public } from './decorators/public.decorator';
import { RequestToBodyInterceptor } from '@app/common/interceptors/request-to-body.interceptor';
import { CookieToBodyInterceptor } from '@app/common/interceptors/cookie-to-body.interceptor';
import { Roles } from '@admin/auth/decorators/roles.decorator';
import { InviteLinkDto } from './dto/invite-link.dto';
import { ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ApiResponseHelper } from '@app/common/helpers/api-response-helper';
import { ResendInviteLinkDto } from './dto/resend-invite-link.dto';
import { SignUpDto } from './dto/sign-up.dto';

@ApiResponse(ApiResponseHelper.unauthorized())
@UseGuards(JwtAuthGuard)
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  @Public()
  @UseInterceptors(
    new RequestToBodyInterceptor('headers', 'headers'),
    new RequestToBodyInterceptor('ip', 'ip'),
  )
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('login')
  async login(
    @Req() req: AuthRequest,
    @Body() body: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const authData = await this.authService.login(req.admin, body);

    res.cookie('refreshToken', authData.refreshToken, {
      httpOnly: this.configService.get('jwtConfig.refreshTokenCookieHttpOnly'),
      secure: this.configService.get('jwtConfig.refreshTokenCookieSecure'),
      maxAge:
        this.configService.get('jwtConfig.refreshTokenDurationDays') *
        1000 *
        60 *
        60 *
        24,
      domain: this.configService.get('jwtConfig.refreshTokenCookieDomain'),
    });

    return { accessToken: authData.accessToken };
  }

  @Public()
  @UseInterceptors(
    new RequestToBodyInterceptor('headers', 'headers'),
    new RequestToBodyInterceptor('ip', 'ip'),
  )
  @HttpCode(HttpStatus.CREATED)
  @Post('sign-up')
  async signUp(
    @Req() req: AuthRequest,
    @Body() body: SignUpDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const authData = await this.authService.signUpUser(req.user, body);

    res.cookie('refreshToken', authData.refreshToken, {
      httpOnly: this.configService.get('jwtConfig.refreshTokenCookieHttpOnly'),
      secure: this.configService.get('jwtConfig.refreshTokenCookieSecure'),
      maxAge:
        this.configService.get('jwtConfig.refreshTokenDurationDays') *
        1000 *
        60 *
        60 *
        24,
      domain: this.configService.get('jwtConfig.refreshTokenCookieDomain'),
    });

    return { accessToken: authData.accessToken };
  }

  @Public()
  @UseInterceptors(
    new RequestToBodyInterceptor('headers', 'headers'),
    new RequestToBodyInterceptor('ip', 'ip'),
  )
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('login-user')
  async loginWithUser(
    @Req() req: AuthRequest,
    @Body() body: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const authData = await this.authService.loginWithUser(req.user, body);

    res.cookie('refreshToken', authData.refreshToken, {
      httpOnly: this.configService.get('jwtConfig.refreshTokenCookieHttpOnly'),
      secure: this.configService.get('jwtConfig.refreshTokenCookieSecure'),
      maxAge:
        this.configService.get('jwtConfig.refreshTokenDurationDays') *
        1000 *
        60 *
        60 *
        24,
      domain: this.configService.get('jwtConfig.refreshTokenCookieDomain'),
    });

    return { accessToken: authData.accessToken };
  }

  @Public()
  @UseInterceptors(
    new RequestToBodyInterceptor('headers', 'headers'),
    new RequestToBodyInterceptor('ip', 'ip'),
    new CookieToBodyInterceptor('refreshToken', 'refreshToken'),
  )
  @HttpCode(HttpStatus.CREATED)
  @Post('refresh-tokens')
  async refreshTokens(
    @Body() params: RefreshTokensDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<any> {
    const authData = await this.authService.refreshTokens(params);

    res.cookie('refreshToken', authData.refreshToken, {
      httpOnly: this.configService.get('jwtConfig.refreshTokenCookieHttpOnly'),
      secure: this.configService.get('jwtConfig.refreshTokenCookieSecure'),
      maxAge:
        this.configService.get('jwtConfig.refreshTokenDurationDays') *
        1000 *
        60 *
        60 *
        24,
      domain: this.configService.get('jwtConfig.refreshTokenCookieDomain'),
    });

    return { accessToken: authData.accessToken };
  }

  @Roles(UserType.Admin)
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(
    ClassSerializerInterceptor,
    new RequestToBodyInterceptor('user', 'user'),
  )
  @Post('invite-link')
  async inviteLink(@Req() req: AuthRequest, @Body() body: InviteLinkDto) {
    return this.authService.inviteLink(req.user, body);
  }

  @Roles(UserType.Admin)
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(
    ClassSerializerInterceptor,
    new RequestToBodyInterceptor('user', 'user'),
  )
  @Post('resend-invite-link')
  async resendInviteLink(
    @Req() req: AuthRequest,
    @Body() body: ResendInviteLinkDto,
  ) {
    console.log('\n\nuser: ', req.user);
    return this.authService.resendInviteLink(req.user, body);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(@Req() req: AuthRequest): Promise<void> {
    const { refreshToken } = req.cookies || null;

    if (!refreshToken) {
      throw new BadRequestException('Refresh token is missing');
    }

    return this.authService.logout(String(refreshToken));
  }
}
