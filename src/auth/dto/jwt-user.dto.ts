import { RolesPermissions } from 'src/roles-permissions/roles-permissions.entity';
import { Users } from 'src/users/users.entity';

export class JwtUserDto {
  subId: number;
  rolId: number;
  email: string;
  permissionsIds: number[];

  constructor(user: Users, rolesPermissions: RolesPermissions[]) {
    this.subId = user.usersId;
    this.rolId = user.rolId;
    this.email = user.email;
    this.permissionsIds = rolesPermissions.map(
      (x: RolesPermissions) => x.permissionId,
    );
  }
}