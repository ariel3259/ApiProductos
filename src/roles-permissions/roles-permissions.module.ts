import { Module } from '@nestjs/common'; 
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesPermissions } from './roles-permissions.entity';
import { Roles } from 'src/roles/roles.entity';
import { Permissions } from 'src/permissions/permissions.entity';
import { RolesPermissionsService } from './roles-permissions.service';
import { RolesPermissionsController } from './roles-permissions.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Roles, Permissions, RolesPermissions])],
  providers: [RolesPermissionsService],
  controllers: [RolesPermissionsController],
})
export class RolesPermissionsModule {}
