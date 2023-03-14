import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserFromJwt, UserPayload } from '../interfaces/token.interfaces';

export class AccessTokenStrategy extends PassportStrategy(
	Strategy,
	'at-strategy',
) {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: process.env.JWT_ACCESS_TOKEN_SECRET,
		});
	}

	async validate(payload: UserPayload): Promise<UserFromJwt> {
		return {
			id: payload.sub,
			username: payload.username,
		};
	}
}
