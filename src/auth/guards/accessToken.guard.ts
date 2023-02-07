import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { IS_PUBLIC } from '../decorators/isPublic';

@Injectable()
export class AccessTokenGuard extends AuthGuard('at-strategy') {
	constructor(private reflector: Reflector) {
		super();
	}

	canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		const isPublic = this.reflector.get(IS_PUBLIC, context.getHandler());
		if (isPublic) {
			return true;
		}
		return super.canActivate(context);
	}
}
