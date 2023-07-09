import { ApiProperty } from '@nestjs/swagger';
import { PermissionsResponseDto } from 'src/permissions/dto/permissions-response.dto';
import { RolesResponseDto } from 'src/roles/dto/roles-response.dto';
import { RolesPermissions } from '../roles-permissions.entity';

export class RolesPermissionsResponseDto {
  @ApiProperty()
  rolesPermissionsId: number;

  @ApiProperty({ type: RolesResponseDto })
  rol: RolesResponseDto;

  @ApiProperty({ type: PermissionsResponseDto })
  permission: PermissionsResponseDto;

  constructor(rolPermission: RolesPermissions) {
    this.rolesPermissionsId = rolPermission.rolesPermissionsId;
    this.rol = new RolesResponseDto(rolPermission.rol);
    this.permission = new PermissionsResponseDto(rolPermission.permission);
  }
}