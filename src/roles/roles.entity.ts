import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { RolesRequestDto } from './dto/roles-request.dto';
import { RolesUpdateDto } from './dto/roles-update.dto';

@Entity('roles')
export class Roles {
  @PrimaryGeneratedColumn('increment', { name: 'roles_id' })
  rolesId: number

  @Column({ type: 'varchar', unique: true })
  description: string;

  @Column('date', { name: 'created_at', default: () => 'GETDATE()' })
  createdAt: Date;

  @Column({ type: 'varchar', name: 'created_by' })
  createdBy: string;

  @Column('date', { name: 'updated_at', default: () => 'GETDATE()' })
  updatedAt: Date;

  @Column({ name: 'updated_by', type: 'varchar' })
  updatedBy: string;

  @Column({ type: 'tinyint' })
  status: boolean;

  constructor(roles: RolesRequestDto, username: string) {
    if (roles && username) {
      this.description = roles.description;
      this.createdBy = username;
      this.updatedBy = username;
      this.status = true;
    }
  }

  modify(rolesUpdateDto: RolesUpdateDto, username: string): void {
    if (
      rolesUpdateDto.description &&
      rolesUpdateDto.description !== this.description
    )
      this.description = rolesUpdateDto.description;
    this.updatedAt = new Date();
    this.updatedBy = username;
  }

}