import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { RolesResponseDto } from './dto/roles-response.dto';
import { Response } from 'express';
import { Page } from 'src/dto/page';
import { RolesRequestDto } from './dto/roles-request.dto';
import { RolesUpdateDto } from './dto/roles-update.dto';
import { RolesDetailDto } from './dto/roles-detail.dto';

@ApiTags('Roles')
@Controller('api/roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @ApiOkResponse({ type: RolesResponseDto, isArray: true })
  @ApiQuery({ name: 'offset', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @Get()
  async getAll(
    @Query('offset') offset: string,
    @Query('limit') limit: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<RolesResponseDto[]> {
    const rolesPage: Page<RolesResponseDto> = await this.rolesService.getAll(
      Number(offset),
      Number(limit),
    );
    res.set('x-total-count', rolesPage.totalItems.toString());
    return rolesPage.elements;
  }

  @ApiOkResponse({ type: RolesDetailDto })
  @Get(':rolId')
  async getDetail(
    @Param('rolId') rolId: number,
    @Res({ passthrough: true }) res: Response
  ): Promise<RolesDetailDto> {
    const result: RolesDetailDto = await this.rolesService.getDetail(rolId);
    if (!result) {
      res.status(204);
      return null;
    }
    return result;
  }

  @ApiCreatedResponse({ type: RolesResponseDto })
  @Post()
  async create(@Body() roles: RolesRequestDto): Promise<RolesResponseDto> {
    const result: RolesResponseDto = await this.rolesService.create(
      roles,
      'ariel_s',
    );
    if (!result) throw new BadRequestException();
    return result;
  }

  @ApiCreatedResponse({ type: RolesRequestDto })
  @Put(':rolesId')
  async update(
    @Param('rolesId') rolesId: number,
    @Body() roles: RolesUpdateDto,
  ): Promise<RolesResponseDto> {
    const result: RolesResponseDto = await this.rolesService.update(
      roles,
      rolesId,
      'ariel_s',
    );
    if (!result) throw new BadRequestException();
    return result;
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':rolesId')
  async delete(@Param('rolesId') rolesId: number): Promise<void> {
    await this.rolesService.delete(rolesId);
  }
}