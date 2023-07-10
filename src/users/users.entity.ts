import { BaseEntity } from 'src/entity/base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UsersRequestDto } from './dto/users-request.dto';
import { Roles } from 'src/roles/roles.entity';
import { UsersUpdateDto } from './dto/users-update.dto';

@Entity('users')
export class Users extends BaseEntity<UsersUpdateDto> {
  @PrimaryGeneratedColumn('increment', { name: 'users_id' })
  usersId: number;

  @Column('int', { name: 'rol_id' })
  rolId: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  lastname: string;

  @Column('bigint')
  dni: number;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar' })
  street: string;

  @Column('int')
  height: number;

  @ManyToOne(() => Roles, (rol) => rol.users)
  @JoinColumn({
    name: 'rol_id',
    referencedColumnName: 'rolesId',
  })
  rol: Roles;

  constructor(userRequestDto: UsersRequestDto, rol: Roles) {
    super(userRequestDto ? userRequestDto.email : 'ariel_s');
    if (userRequestDto) {
      this.name = userRequestDto.name;
      this.lastname = userRequestDto.lastname;
      this.street = userRequestDto.street;
      this.height = userRequestDto.height;
      this.dni = userRequestDto.dni;
      this.email = userRequestDto.email;
      this.rol = rol;
      this.password = userRequestDto.password;
    }
  }
}