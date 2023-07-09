import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class RolesPermissionsRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  rolId: number;
  @ApiProperty({ type: Number, isArray: true })
  @IsNotEmpty()
  permisionIds: number[];
}