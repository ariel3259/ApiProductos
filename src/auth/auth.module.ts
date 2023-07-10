import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/users/users.entity';
import { AuthService } from './auth.service';
import { BasicStrategy } from './strategies/basic.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Roles } from 'src/roles/roles.entity';
import { AuthContoller } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, Roles]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('SECRET'),
        signOptions: {
          algorithm: 'HS256',
          expiresIn: '1h',
        }
      })
    }),
  ],
  providers: [AuthService, BasicStrategy, JwtStrategy],
  controllers: [AuthContoller],
})
export class AuthModule {}