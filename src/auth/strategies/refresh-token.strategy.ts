import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserFromJwt, UserPayload } from '../interfaces/token.interfaces';

export class RefreshTokenStrategy extends PassportStrategy(
	Strategy,
	'rt-strategy',
) {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: process.env.JWT_REFRESH_TOKEN_SECRET,
		});
	}

	async validate(payload: UserPayload): Promise<UserFromJwt> {
		return {
			id: payload.sub,
			username: payload.username,
		};
	}
}
