import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserFromJwt, UserPayload } from '../interfaces/token.interfaces';
import { JWT_FORGOT_PASSWORD_SECRET } from '@src/configs/env-vars';

export class ForgotPasswordTokenStrategy extends PassportStrategy(
	Strategy,
	'fp-strategy',
) {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: JWT_FORGOT_PASSWORD_SECRET,
		});
	}

	async validate(payload: UserPayload): Promise<UserFromJwt> {
		return {
			id: payload.id,
			username: payload.username,
		};
	}
}
