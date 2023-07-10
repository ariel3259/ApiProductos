import { BaseEntity } from 'src/entity/base.entity';
import { RolesPermissions } from 'src/roles-permissions/roles-permissions.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('permissions')
export class Permissions extends BaseEntity<object> {
  @PrimaryGeneratedColumn('increment', { name: 'permissions_id' })
  permissionsId: number;

  @Column({ type: 'varchar' })
  description: string;

  constructor() {
    super('');
  }

  @OneToMany(
    () => RolesPermissions,
    (rolPermission) => rolPermission.permission,
  )
  rolesPermissions: RolesPermissions[];
}