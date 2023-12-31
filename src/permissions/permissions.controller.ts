import { Controller, Get } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsResponseDto } from './dto/permissions-response.dto';
import { ApiTags, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Permissions')
@ApiBearerAuth()
@Controller('api/permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @ApiOkResponse({ type: PermissionsResponseDto, isArray: true })
  @Get()
  async getAll(): Promise<PermissionsResponseDto[]> {
    return await this.permissionsService.getAll();
  }
}