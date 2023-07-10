import { ApiProperty } from "@nestjs/swagger";

export class UsersUpdateDto {
  @ApiProperty()
  name?: string;

  @ApiProperty()
  lastname?: string;

  @ApiProperty()
  dni?: number;

  @ApiProperty()
  street?: string;

  @ApiProperty()
  height?: string;

  @ApiProperty()
  password?: string;

  @ApiProperty()
  rolId?: number;
}