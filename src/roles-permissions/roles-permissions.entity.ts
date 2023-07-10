import { BaseEntity } from 'src/entity/base.entity';
import { Permissions } from 'src/permissions/permissions.entity';
import { Roles } from 'src/roles/roles.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';


@Entity('roles_permissions')
export class RolesPermissions extends BaseEntity<object> {
  @PrimaryGeneratedColumn('increment', { name: 'roles_permissions_id' })
  rolesPermissionsId;

  @Column('int', { name: 'rol_id' })
  rolId: number;

  @Column('int', { name: 'permission_id' })
  permissionId: number;

  @ManyToOne(() => Roles, (rol: Roles) => rol.rolesPermissions)
  @JoinColumn({
    name: 'rol_id',
    referencedColumnName: 'rolesId'
  })
  rol: Roles;

  @ManyToOne(
    () => Permissions,
    (permission: Permissions) => permission.rolesPermissions
  )
  @JoinColumn({
    name: 'permission_id',
    referencedColumnName: 'permissionsId'
  })
  permission: Permissions;

  constructor(rol: Roles, permission: Permissions, username: string) {
    super(username);
    if (rol && permission) {
      this.rol = rol;
      this.permission = permission;
    }
  }
}