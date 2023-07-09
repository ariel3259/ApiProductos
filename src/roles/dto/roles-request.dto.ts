import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RolesRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  description: string;
}