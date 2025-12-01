import { Injectable, Logger } from '@nestjs/common';
import { AuthService } from '@src/auth/auth.service';
import { PrismaService } from '@src/prisma/prisma.service';
import { UserResponseDto } from '@user/dto/response/create-user.response';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
	constructor(
		private prisma: PrismaService,
		private readonly logger: Logger,
	) {}

	async updateUserPassword(userId: string, desiredPassword: string) {
		await this.prisma.user.update({
			where: {
				id: userId,
			},
			data: {
				password: desiredPassword,
			},
		});
		return 'password has been updated successfully!';
	}
	async register(
		username: string,
		email: string,
		password: string,
		firstname: string,
		lastname: string,
	): Promise<UserResponseDto> {
		try {
			const user = await this.prisma.user.create({
				data: {
					username,
					email,
					password: await bcrypt.hash(password, 10),
					firstname,
					lastname,
				},
			});
			return {
				...user,
				createdAt: user.createdAt.toISOString(),
				updatedAt: user.updatedAt.toISOString(),
			};
		} catch (error) {
			this.logger.error(error);
			throw new Error(error);
		}
	}
}
