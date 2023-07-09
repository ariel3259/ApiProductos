import { ApiProperty } from '@nestjs/swagger';
import { Roles } from '../roles.entity';

export class RolesResponseDto {
  @ApiProperty()
  rolesId: number;

  @ApiProperty()
  description: string;

  constructor(rol: Roles) {
    this.rolesId = rol.rolesId;
    this.description = rol.description;
  }
}