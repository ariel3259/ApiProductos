import { Column } from 'typeorm';

export abstract class BaseEntity {
  @Column('date', { name: 'created_at' })
  createdAt: Date;

  @Column({ type: 'varchar', name: 'created_by' })
  createdBy: string;

  @Column('date', { name: 'updated_at' })
  updatedAt: Date;

  @Column({ type: 'varchar', name: 'updated_by' })
  updatedBy: string;

  @Column({ type: 'tinyint' })
  status: boolean;

  constructor(username: string) {
    if (username) {
      const today = new Date();
      this.createdAt = today;
      this.updatedAt = today;
      this.createdBy = username;
      this.updatedBy = username;
      this.status = true;
    }
  }

  protected modifyBase(username: string): void {
    this.updatedBy = username;
    this.updatedAt = new Date();
  }
}