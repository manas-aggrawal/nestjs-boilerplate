import { SetMetadata } from '@nestjs/common';
import { Role } from '@src/enum/role';

export const ROLE = 'role';
export const AccessTo = (...roles: Role[]) => SetMetadata(ROLE, roles);
