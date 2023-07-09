import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from 'src/roles/roles.entity';
import { Repository, In } from 'typeorm';
import { RolesPermissions } from './roles-permissions.entity';
import { Page } from 'src/dto/page';
import { RolesPermissionsResponseDto } from './dto/roles-permissions-response.dto';
import { RolesPermissionsRequestDto } from './dto/roles-permissions-request.dto';
import { Permissions } from 'src/permissions/permissions.entity';

@Injectable()
export class RolesPermissionsService {
  constructor(
    @InjectRepository(Permissions)
    private readonly permissionsRepository: Repository<Permissions>,
    @InjectRepository(Roles)
    private readonly rolesRepository: Repository<Roles>,
    @InjectRepository(RolesPermissions)
    private readonly rolesPermissionsRepository: Repository<RolesPermissions>,
  ) {}

  async getAll(
    offset: number,
    limit: number
  ): Promise<Page<RolesPermissionsResponseDto>> {
    const [rolesPermissions, totalItems]: [RolesPermissions[], number] =
      await this.rolesPermissionsRepository.findAndCount({
        relations: {
          rol: true,
          permission: true,
        },
        skip: Number.isNaN(offset) ? 0 : offset,
        take: Number.isNaN(limit) || limit === 0 ? 10 : limit,
        where: {
          status: true,
        }
      });
    return {
      elements: rolesPermissions.map(
        (x: RolesPermissions) => new RolesPermissionsResponseDto(x)
      ),
      totalItems,
    }
  }

  async create(
    rolPermissionRequestDto: RolesPermissionsRequestDto,
    username: string
  ): Promise<RolesPermissionsResponseDto[]> {
    const [rol, permissions, rolesPermissionsCount]: [
      Roles,
      Permissions[],
      number,
    ] = await Promise.all([
      this.rolesRepository.findOne({
        where: {
          rolesId: rolPermissionRequestDto.rolId,
          status: true,
        }
      }),
      this.permissionsRepository.find({
        where: {
          permissionsId: In(rolPermissionRequestDto.permisionIds),
          status: true
        },
      }),
      this.rolesPermissionsRepository.count({
        where: {
          rolId: rolPermissionRequestDto.rolId,
          permissionId: In(rolPermissionRequestDto.permisionIds),
        }
      })
    ]);
    if (!rol || permissions.length === 0 || rolesPermissionsCount > 0)
      return null;
    const rolesPermissionsToCreate: RolesPermissions[] = permissions.map(
      (x: Permissions) => new RolesPermissions(rol, x, username),
    );
    const rolesPermissions: RolesPermissions[] =
      await this.rolesPermissionsRepository.save(rolesPermissionsToCreate);
    return rolesPermissions.map(
      (x: RolesPermissions) => new RolesPermissionsResponseDto(x),
    );
  }

  async delete(rolesPermissionsId: number): Promise<void> {
    await this.rolesPermissionsRepository.update(
      {
        rolesPermissionsId,
        status: true,
      },
      {
        status: false,
      }
    );
  }

}