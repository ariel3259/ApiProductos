import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  Controller,
  Get,
  Param,
  Res,
  Post,
  Body,
  BadRequestException,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersDetailDto } from './dto/users-detail.dto';
import { Response } from 'express';
import { UsersRequestDto } from './dto/users-request.dto';
import { UsersUpdateDto } from './dto/users-update.dto';

@ApiTags('Users')
@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOkResponse({ type: UsersDetailDto })
  @ApiBearerAuth()
  @Get('usersId')
  async getDetail(
    @Param('usersId') userId: number,
    @Res({ passthrough: true }) res: Response,
  ): Promise<UsersDetailDto> {
    const result: UsersDetailDto = await this.usersService.getById(userId);
    if (!result) {
      res.status(204);
      return null;
    }
    return result;
  }

  @ApiCreatedResponse({ type: UsersDetailDto })
  @Post()
  async create(
    @Body() userRequestDto: UsersRequestDto,
  ): Promise<UsersDetailDto> {
    const result: UsersDetailDto = await this.usersService.create(
      userRequestDto,
    );
    if (!result) throw new BadRequestException();
    return result;
  }

  @ApiOkResponse({ type: UsersDetailDto })
  @ApiBearerAuth()
  @Put(':usersId')
  async modify(
    @Body() userUpdateDto: UsersUpdateDto,
    @Param('usersId') userId: number,
  ): Promise<UsersDetailDto> {
    const result: UsersDetailDto = await this.usersService.modify(
      userUpdateDto,
      userId
    );
    if (!result) throw new BadRequestException();
    return result;
  }

  @ApiNoContentResponse()
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('usersId')
  async delete(@Param('usersId') usersId: number): Promise<void> {
    await this.usersService.delete(usersId);
  }
}