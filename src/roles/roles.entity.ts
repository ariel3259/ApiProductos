import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { RolesRequestDto } from './dto/roles-request.dto';
import { RolesUpdateDto } from './dto/roles-update.dto';
import { RolesPermissions } from '../roles-permissions/roles-permissions.entity';
import { BaseEntity } from '../entity/base.entity';
import { Users } from '../users/users.entity';

@Entity('roles')
export class Roles extends BaseEntity<RolesUpdateDto> {
  @PrimaryGeneratedColumn('increment', { name: 'roles_id' })
  rolesId: number

  @Column({ type: 'varchar', unique: true })
  description: string;

  @OneToMany(() => RolesPermissions, (rolPermission) => rolPermission.rol)
  rolesPermissions: RolesPermissions[];

  @OneToMany(() => Users, (user) => user.rol)
  users: Users[];

  constructor(roles: RolesRequestDto, username: string) {
    super(username);
    if (roles) {
      this.description = roles.description;
    }
  }
}