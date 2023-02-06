import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
	constructor(private readonly prisma: PrismaService) {}

	async validateUser(usernameField: string, password: string) {
		const user = await this.prisma.user.findFirst({
			where: {
				username: usernameField,
			}
		});
		if(user) {
			const validatePassword = await bcrypt.compare(password, user.password);
			if(validatePassword) {
				return user;
			}
		}
		throw new UnauthorizedException({
			message: 'username or password are invalid'
		});
	}
}
