import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcrypt';
import { Users } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import { LogInResponseDto } from './dto/login-response.dto';
import { JwtService } from '@nestjs/jwt';
import { Roles } from 'src/roles/roles.entity';
import { JwtUserDto } from './dto/jwt-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    @InjectRepository(Roles)
    private readonly rolesRepository: Repository<Roles>,
    private readonly jwtService: JwtService,
  ) {}

  async validate(username: string, password: string): Promise<JwtUserDto> {
    const user: Users = await this.usersRepository.findOne({
      where: {
        email: username,
        status: true
      },
    });
    if (!user) return null;
    const validation: boolean = await compare(password, user.password);
    if (!validation) return null;
    const rol: Roles = await this.rolesRepository.findOne({
      relations: {
        rolesPermissions: true,
      },
      where: {
        rolesId: user.rolId,
      }
    });
    return new JwtUserDto(user, rol.rolesPermissions);
  }

  async makeToken(payload: JwtUserDto): Promise<LogInResponseDto> {
    const accessToken: string = await this.jwtService.signAsync({ ...payload });
    return { accessToken };
  }
}