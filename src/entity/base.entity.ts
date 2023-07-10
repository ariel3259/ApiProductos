import { Column } from 'typeorm';

/**
 *  {T} is UpdateDto of entity class
 */
export abstract class BaseEntity<T> {
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

  modify(dto: T, username: string): void {
    for (const key of Object.keys(dto)) {
      if (this[key] && dto[key] !== this[key]) this[key] = dto[key];
    }
    this.updatedBy = username;
    this.updatedAt = new Date();
  }
}