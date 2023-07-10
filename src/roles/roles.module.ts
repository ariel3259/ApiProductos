import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Roles } from './roles.entity';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { RolesPermissions } from 'src/roles-permissions/roles-permissions.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Roles, RolesPermissions])],
  providers: [RolesService],
  controllers: [RolesController],
})
export class RolesModule {}