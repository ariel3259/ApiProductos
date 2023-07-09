import { ApiProperty } from '@nestjs/swagger';

export class RolesUpdateDto {
  @ApiProperty()
  description: string;
}