import { BaseEntity } from '../entity/base.entity';
import { RolesPermissions } from '../roles-permissions/roles-permissions.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('permissions')
export class Permissions extends BaseEntity<object> {
  @PrimaryGeneratedColumn('increment', { name: 'permissions_id' })
  permissionsId: number;

  @Column({ type: 'varchar' })
  description: string;

  constructor(permissionId: number, description: string, username: string) {
    super(username);
    if (permissionId && description) {
      this.permissionsId = permissionId;
      this.description = description;
    }
  }

  @OneToMany(
    () => RolesPermissions,
    (rolPermission) => rolPermission.permission,
  )
  rolesPermissions: RolesPermissions[];
}