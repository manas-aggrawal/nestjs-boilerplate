import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWT_ACCESS_TOKEN_SECRET } from '@src/configs/env-vars';
import { UserFromJwt, UserPayload } from '../interfaces/token.interfaces';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
	Strategy,
	'token-strategy',
) {
	constructor() {
		super({
			jwtFromRequest: (req) => {
				const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);

				return token;
			},
			ignoreExpiration: false,
			secretOrKey: JWT_ACCESS_TOKEN_SECRET, // Buffer.from(JWT_ACCESS_TOKEN_SECRET, 'base64').toString(),
		});
	}

	public async validate(payload: UserPayload): Promise<UserFromJwt> {
		if (!payload) {
			throw new UnauthorizedException();
		}
		return payload;
	}
}
