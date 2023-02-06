import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalGuard extends AuthGuard('local-strategy') {
	canActivate(context: ExecutionContext) {
		return super.canActivate(context);
	}

	handleRequest(err: any, user: any) {
		if(!user || err) {
			throw new UnauthorizedException();
		}
		return user;
	}
}
