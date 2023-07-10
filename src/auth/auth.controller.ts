import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LogInResponseDto } from './dto/login-response.dto';
import { Request } from 'express';
import { BasicGuard } from './guards/basic.guard';

@ApiTags('Auth')
@Controller('api/auth')
export class AuthContoller {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(BasicGuard)
  @Post()
  async logIn(@Req() req: Request): Promise<LogInResponseDto> {
    return await this.authService.makeToken(req.user);
  }
}