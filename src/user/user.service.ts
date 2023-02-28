import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	async updateUserPassword(userId: string, desiredPassword: string) {
		const encriptedPassword = await bcrypt.hash(desiredPassword, 10);
		await this.prisma.user.update({
			where: {
				id: userId,
			},
			data: {
				password: encriptedPassword,
			},
		});
		return 'password has been updated successfully!';
	}
}
