import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('permissions')
export class Permissions {
  @PrimaryGeneratedColumn('increment', { name: 'permissions_id' })
  permissionsId: number;

  @Column({ type: 'varchar' })
  description: string;

  @Column('date', {
    name: 'created_at',
  })
  createdAt: Date;

  @Column({ name: 'created_by', type: 'varchar' })
  createdBy: string;

  @Column('date', { name: 'updated_at' })
  updatedAt: Date;

  @Column({ name: 'updated_by', type: 'varchar' })
  updatedBy: string;

  @Column({ type: 'tinyint' })
  status: boolean;
}