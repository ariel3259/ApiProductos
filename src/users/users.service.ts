import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from 'src/roles/roles.entity';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { UsersDetailDto } from './dto/users-detail.dto';
import { UsersRequestDto } from './dto/users-request.dto';
import { genSalt, hash } from 'bcrypt';
import { UsersUpdateDto } from './dto/users-update.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Roles)
    private readonly rolesRepository: Repository<Roles>,
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async getById(usersId: number): Promise<UsersDetailDto> {
    const user: Users = await this.usersRepository.findOne({
      relations: {
        rol: true,
      },
      where: {
        usersId,
        status: true,
      }
    });
    if (!user) return null;
    return new UsersDetailDto(user);
  }

  async create(userRequestDto: UsersRequestDto): Promise<UsersDetailDto> {
    const [rol, usersCount]: [Roles, number] = await Promise.all([
      this.rolesRepository.findOne({
        where: {
          status: true,
          rolesId: userRequestDto.rolId,
        }
      }),
      this.usersRepository.count({
        where: [{ email: userRequestDto.email }, { dni: userRequestDto.dni }],
      }),
    ]);
    if (!rol || usersCount > 0) return null;
    const salt: string = await genSalt(12);
    userRequestDto.password = await hash(userRequestDto.password, salt);
    const userToCreate: Users = new Users(userRequestDto, rol);
    const userSaved: Users = await this.usersRepository.save(userToCreate);
    return new UsersDetailDto(userSaved);
  }

  async modify(
    userUpdateDto: UsersUpdateDto,
    usersId: number
  ): Promise<UsersDetailDto> {
    const user: Users = await this.usersRepository.findOne({
      relations: {
        rol: true,
      },
      where: {
        usersId,
        status: true
      }
    });
    if (!user) return null;
    if (userUpdateDto.password) {
      const salt: string = await genSalt(12);
      userUpdateDto.password = await hash(userUpdateDto.password, salt);
    }
    user.modify(userUpdateDto, user.email);
    await this.usersRepository.update(
      {
        usersId,
      },
      user,
    );
    return new UsersDetailDto(user);
  }

  async delete(usersId: number): Promise<void> {
    await this.usersRepository.update(
      {
        usersId,
        status: true,
      },
      {
        status: false,
      },
    );
  }
}
