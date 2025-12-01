import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { IS_PUBLIC } from '../decorators/is-public';
import { ROLE } from '../decorators/roles';
import { Role } from '.prisma/client/client';

@Injectable()
export class AccessTokenGuard extends AuthGuard('token-strategy') {
	constructor(private reflector: Reflector) {
		super();
	}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const isPublic = this.reflector.get(IS_PUBLIC, context.getHandler());
		if (isPublic) {
			return true;
		}

		const isAuthenticated = await super.canActivate(context);

		if (!isAuthenticated) {
			return false;
		}

		const { user } = context.switchToHttp().getRequest();

		const requiredRoles = this.reflector.get<Role[]>(
			ROLE,
			context.getHandler(),
		);

		if (!requiredRoles || requiredRoles.length === 0) {
			return true;
		}

		const hasRole = requiredRoles.includes(user.role);

		return hasRole;
	}
}
