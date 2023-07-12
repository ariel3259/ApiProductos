import { SetMetadata } from '@nestjs/common';

export const Permision = (...permissions: number[]) =>
  SetMetadata('permissionIds', permissions);
