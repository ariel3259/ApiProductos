import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { Observable } from 'rxjs';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  canActivate(
    context: ExecutionContextHost,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const urls: string[] = ['api/auth'];
    const req: Request = context.switchToHttp().getRequest();
    if (urls.some((x: string) => new RegExp(x, 'g').test(req.url))) return true;
    return super.canActivate(context);
  }
}