import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '@src/prisma/prisma.service';
import { UserService } from '@src/user/user.service';
import { DefaultPayload } from './interfaces/payload.interface';
import {
	JWT_ACCESS_TOKEN_SECRET,
	JWT_FORGOT_PASSWORD_SECRET,
	JWT_REFRESH_TOKEN_SECRET,
} from '@src/configs/env-vars';

@Injectable()
export class AuthService {
	private logger = new Logger(AuthService.name);

	constructor(
		private readonly prisma: PrismaService,
		private readonly jwtService: JwtService,
		private readonly userService: UserService,
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
				return { ...user, password: undefined };
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
				secret: JWT_ACCESS_TOKEN_SECRET,
			}),
			this.jwtService.sign(payload, {
				expiresIn: '8h',
				secret: JWT_REFRESH_TOKEN_SECRET,
			}),
		]);
		return {
			access_token,
			refresh_token,
		};
	}

	async forgotPassword(username: string) {
		const user = await this.prisma.user.findFirst({
			where: {
				username,
			},
		});
		if (user) {
			// Send an email to user and retrieve a jwt token with the secret for forget password in our .env file
			// in this case I'll send the token right away
			const token = this.jwtService.sign(
				{ ...user, password: undefined },
				{
					expiresIn: '15m',
					secret: JWT_FORGOT_PASSWORD_SECRET,
				},
			);
			return {
				forgot_password_token: token,
			};
		}
		throw new UnauthorizedException({
			message: 'username is invalid',
		});
	}

	async updatePassword(password: string, userId: string) {
		const encriptedPassword = await bcrypt.hash(password, 10);
		return await this.userService.updateUserPassword(userId, encriptedPassword);
	}
}
