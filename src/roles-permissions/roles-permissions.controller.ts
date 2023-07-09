import {
  Controller,
  Get,
  Query,
  Res,
  Post,
  Body,
  BadRequestException,
  HttpCode,
  HttpStatus,
  Delete,
  Param,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { RolesPermissionsService } from './roles-permissions.service';
import { Response } from 'express';
import { RolesPermissionsResponseDto } from './dto/roles-permissions-response.dto';
import { Page } from 'src/dto/page';
import { RolesPermissionsRequestDto } from './dto/roles-permissions-request.dto';

@ApiTags('Roles Permissions')
@Controller('api/rolesPermissions')
export class RolesPermissionsController {
  constructor(
    private readonly rolesPermissionsService: RolesPermissionsService,
  ) {}

  @ApiOkResponse({ type: RolesPermissionsResponseDto, isArray: true })
  @ApiQuery({ name: 'offset', type: Number, required: false })
  @ApiQuery({ name: 'limit', type: Number, required: false })
  @Get()
  async getAll(
    @Query('offset') offset: string,
    @Query('limit') limit: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<RolesPermissionsResponseDto[]> {
    const rolesPermissionsPage: Page<RolesPermissionsResponseDto> =
      await this.rolesPermissionsService.getAll(Number(offset), Number(limit));
    res.set('x-total-count', rolesPermissionsPage.totalItems.toString());
    return rolesPermissionsPage.elements;
  }

  @ApiCreatedResponse({ type: RolesPermissionsResponseDto, isArray: true })
  @Post()
  async create(
    @Body() rolesPermissionsRequestDto: RolesPermissionsRequestDto,
  ): Promise<RolesPermissionsResponseDto[]> {
    const username = 'ariel_s';
    const result: RolesPermissionsResponseDto[] =
      await this.rolesPermissionsService.create(
        rolesPermissionsRequestDto,
        username,
      );
    if (!result) throw new BadRequestException();
    return result;
  }

  @ApiNoContentResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':rolesPermissionsId')
  async delete(
    @Param('rolesPermissionsId') rolesPermissionsId: number
  ): Promise<void> {
    await this.delete(rolesPermissionsId);
  }
}