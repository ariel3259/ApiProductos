import { ApiProperty } from '@nestjs/swagger';
import { RolesResponseDto } from 'src/roles/dto/roles-response.dto';
import { Users } from '../users.entity';

export class UsersDetailDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  lastname: string;

  @ApiProperty()
  street: string;

  @ApiProperty()
  height: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  dni: number;

  @ApiProperty({ type: RolesResponseDto })
  rol: RolesResponseDto;

  constructor(user: Users) {
    this.name = user.name;
    this.dni = user.dni;
    this.lastname = user.lastname;
    this.email = user.email;
    this.street = user.street;
    this.height = user.height;
    this.rol = new RolesResponseDto(user.rol);
  }
}