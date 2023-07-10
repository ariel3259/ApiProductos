import { AuthService } from '../auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { BasicStrategy as Strategy } from 'passport-http';
import { JwtUserDto } from '../dto/jwt-user.dto';

@Injectable()
export class BasicStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<JwtUserDto> {
    const user: JwtUserDto = await this.authService.validate(
      username,
      password,
    );
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
