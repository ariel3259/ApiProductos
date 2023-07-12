import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { JwtUserDto } from '../dto/jwt-user.dto';

export class PermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const permissionsIds: number[] = this.reflector.get<number[]>(
      'permissionIds',
      context.getHandler(),
    );
    if (!permissionsIds || permissionsIds.length === 0) return true;
    const userJwt: JwtUserDto = context.switchToHttp().getRequest().user;
    if (userJwt.permissionsIds.length === 0) return false;
    return userJwt.permissionsIds.some((x: number) =>
      permissionsIds.some((y: number) => x === y),
    );
  }
}