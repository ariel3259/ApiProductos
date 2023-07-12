import { ApiProperty } from '@nestjs/swagger';
import { PermissionsResponseDto } from '../../permissions/dto/permissions-response.dto';
import { RolesPermissions } from '../../roles-permissions/roles-permissions.entity';
import { Roles } from '../roles.entity';

export class RolesDetailDto {
  @ApiProperty()
  rolesId: number;

  @ApiProperty()
  description: string;

  @ApiProperty({ type: PermissionsResponseDto, isArray: true })
  permissions: PermissionsResponseDto[];

  constructor(rol: Roles, rolesPermissions: RolesPermissions[]) {
    this.rolesId = rol.rolesId;
    this.description = rol.description;
    this.permissions = rolesPermissions.map(
      (x: RolesPermissions) => new PermissionsResponseDto(x.permission)
    );
  }
}