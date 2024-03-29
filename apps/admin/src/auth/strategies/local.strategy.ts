import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {
    let admin = await this.authService.validateUser(email, password);

    if (!admin) {
      admin = await this.authService.validateUsers(email, password);
    }

    if (!admin) {
      throw new UnauthorizedException('Incorrect username or password');
    }

    return admin;
  }
}
