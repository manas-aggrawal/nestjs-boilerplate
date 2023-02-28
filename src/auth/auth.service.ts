import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { ForgotPasswordPayload } from './dto/forgot-password-payload.dto';
import { DefaultPayload } from './interfaces/payload.interface';

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

	async forgotPassword(forgotPasswordPayload: ForgotPasswordPayload) {
		const { username } = forgotPasswordPayload;
		const user = await this.prisma.user.findFirst({
			where: {
				username,
			},
		});
		if (user) {
			// Send an email to user and return a jwt token with the secret password
			return 'An email has been send to reset password';
		}
		throw new UnauthorizedException({
			message: 'username is invalid',
		});
	}

	async updatePassword(password: string, userId: string) {
		return await this.userService.updateUserPassword(userId, password);
	}
}
