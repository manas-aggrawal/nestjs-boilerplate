import { ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

export class ForgotPasswordTokenGuard extends AuthGuard('fp-strategy') {
	constructor() {
		super();
	}

	canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		return super.canActivate(context);
	}
}
