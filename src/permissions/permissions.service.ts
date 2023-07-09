import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';  
import { Permissions } from './permissions.entity';
import { PermissionsResponseDto } from './dto/permissions-response.dto';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permissions)
    private readonly permissionsRepository: Repository<Permissions>,
  ) {}

  async getAll(): Promise<PermissionsResponseDto[]> {
    const permissions: Permissions[] = await this.permissionsRepository.find({
      where: {
        status: true,
      },
    });
    console.log(permissions);
    return permissions.map((x: Permissions) => new PermissionsResponseDto(x));
  }
}