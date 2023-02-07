import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { DefaultPayload } from './interfaces/payload.interface';

@Injectable()
export class AuthService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly jwtService: JwtService,
	) {}

	async validateUser(usernameField: string, password: string) {
		const user = await this.prisma.user.findFirst({
			where: {
				username: usernameField,
			},
		});
		if (user) {
			const validatePassword = await bcrypt.compare(password, user.password);
			if (validatePassword) {
				return user;
			}
		}
		throw new UnauthorizedException({
			message: 'username or password are invalid',
		});
	}

	async giveTokens(payload: DefaultPayload) {
		const [access_token, refresh_token] = await Promise.all([
			this.jwtService.sign(payload, {
				expiresIn: '1h',
				secret: process.env.JWT_ACCESS_TOKEN_SECRET,
			}),
			this.jwtService.sign(payload, {
				expiresIn: '8h',
				secret: process.env.JWT_REFRESH_TOKEN_SECRET,
			}),
		]);
		return {
			access_token,
			refresh_token,
		};
	}
}
