import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

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
}
