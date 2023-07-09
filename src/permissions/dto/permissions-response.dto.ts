import { Permissions } from '../permissions.entity';
import { ApiProperty } from '@nestjs/swagger';

export class PermissionsResponseDto {
  @ApiProperty()
  permissionsId: number;
  @ApiProperty()
  description: string;
  constructor(permission: Permissions) {
    this.permissionsId = permission.permissionsId;
    this.description = permission.description;
  }
}