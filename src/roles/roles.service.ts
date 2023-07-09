import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Roles } from './roles.entity';
import { Page } from 'src/dto/page';
import { RolesResponseDto } from './dto/roles-response.dto';
import { RolesRequestDto } from './dto/roles-request.dto';
import { RolesUpdateDto } from './dto/roles-update.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Roles)
    private readonly rolesRepository: Repository<Roles>,
  ) {}

  async getAll(offset: number, limit: number): Promise<Page<RolesResponseDto>> {
    const [roles, totalItems]: [Roles[], number] =
      await this.rolesRepository.findAndCount({
        skip: Number.isNaN(offset) ? 0 : offset,
        take: Number.isNaN(limit) || limit === 0 ? 10 : limit,
        where: {
          status: true,
        },
      });
    return {
      elements: roles.map((x: Roles) => new RolesResponseDto(x)),
      totalItems,
    }
  }

  async create(
    rolesRequestDto: RolesRequestDto,
    username: string,
  ): Promise<RolesResponseDto> {
    const rolDuplicated: Roles | undefined = await this.rolesRepository.findOne(
      {
        where: {
          description: rolesRequestDto.description,
        }
      },
    );
    if (rolDuplicated) return null;
    const rol: Roles = await this.rolesRepository.save(
      new Roles(rolesRequestDto, username),
    );
    return new RolesResponseDto(rol);
  }

  async update(
    rolesUpdateDto: RolesUpdateDto,
    rolesId: number,
    username: string
  ): Promise<RolesResponseDto> {
    const rol: Roles | undefined = await this.rolesRepository.findOne({
      where: {
        rolesId,
        status: true,
      }
    });
    if (!rol) return null;
    delete rol.rolesId;
    rol.modify(rolesUpdateDto, username);
    await this.rolesRepository.update(
      {
        rolesId,
        status: true,
      },
      rol,
    );
    rol.rolesId = rolesId;
    return new RolesResponseDto(rol);
  }

  async delete(rolesId: number): Promise<void> {
    await this.rolesRepository.update(
      {
        rolesId,
        status: true,
      },
      {
        status: false,
      },
    );
  }
}