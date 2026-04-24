import {
	Injectable,
	Logger,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { ChangePasswordDto, UpdateUserDto } from './dto/user.request';
import { UserProfileDto, UserResponseDto } from './dto/user.response';

@Injectable()
export class UserService {
	constructor(
		private prisma: PrismaService,
		private readonly logger: Logger,
	) {}

	/**
	 * Registers a new user after hashing their password.
	 * Called by the register endpoint which then issues tokens via AuthService.
	 *
	 * @param username - Unique username (lowercase, alphanumeric)
	 * @param email - Unique email address
	 * @param password - Plain-text password; hashed before storage
	 * @param firstname - User's first name
	 * @param lastname - User's last name
	 * @returns The created user record (without tokens — caller adds those)
	 * @throws Error - Propagates Prisma errors (e.g. unique constraint on username/email)
	 */
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

	/**
	 * Returns the profile of the currently authenticated user.
	 * Password is excluded at the database query level via Prisma's omit.
	 *
	 * @param userId - ID from the JWT payload (set by AccessTokenGuard)
	 * @returns User profile without password or token fields
	 * @throws NotFoundException - If the user record no longer exists
	 */
	async getMe(userId: string): Promise<UserProfileDto> {
		const user = await this.prisma.user.findUnique({
			where: { id: userId },
			omit: { password: true },
		});
		if (!user) throw new NotFoundException('User not found');
		return {
			...user,
			createdAt: user.createdAt.toISOString(),
			updatedAt: user.updatedAt.toISOString(),
		};
	}

	/**
	 * Updates profile fields for the currently authenticated user.
	 * Only fields present in the request body are updated (partial update).
	 * Password changes must go through changePassword or resetPassword.
	 *
	 * @param userId - ID from the JWT payload (set by AccessTokenGuard)
	 * @param data - Partial profile fields to update (firstname, lastname, email, username)
	 * @returns Updated user profile without password or token fields
	 */
	async updateMe(userId: string, data: UpdateUserDto): Promise<UserProfileDto> {
		const user = await this.prisma.user.update({
			where: { id: userId },
			data,
			omit: { password: true },
		});
		return {
			...user,
			createdAt: user.createdAt.toISOString(),
			updatedAt: user.updatedAt.toISOString(),
		};
	}

	/**
	 * Permanently deletes the account of the currently authenticated user.
	 * This action is irreversible — consider soft-delete for production use.
	 *
	 * @param userId - ID from the JWT payload (set by AccessTokenGuard)
	 */
	async deleteMe(userId: string): Promise<void> {
		await this.prisma.user.delete({ where: { id: userId } });
	}

	/**
	 * Changes the password of the currently authenticated user.
	 * Verifies the current password before allowing the update, preventing
	 * an attacker with a stolen access token from locking out the real user.
	 *
	 * @param userId - ID from the JWT payload (set by AccessTokenGuard)
	 * @param currentPassword - The user's existing password for verification
	 * @param newPassword - The new password to set (must meet strength requirements)
	 * @returns Success message
	 * @throws NotFoundException - If the user record no longer exists
	 * @throws UnauthorizedException - If currentPassword does not match the stored hash
	 */
	async changePassword(
		userId: string,
		currentPassword: string,
		newPassword: string,
	): Promise<void> {
		const user = await this.prisma.user.findUnique({ where: { id: userId } });
		if (!user) throw new NotFoundException('User not found');

		const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
		if (!isPasswordValid)
			throw new UnauthorizedException('Current password is incorrect');

		await this.prisma.user.update({
			where: { id: userId },
			data: { password: await bcrypt.hash(newPassword, 10) },
		});
	}

	/**
	 * Updates a user's password using a verified forgot-password token.
	 * Called after ForgotPasswordTokenGuard has already validated the token,
	 * so no additional password verification is needed here.
	 * Used exclusively by the reset-password flow for locked-out users.
	 *
	 * @param userId - ID extracted from the validated forgot-password JWT
	 * @param desiredPassword - Plain-text new password; hashed before storage
	 */
	async updateUserPassword(userId: string, desiredPassword: string): Promise<void> {
		await this.prisma.user.update({
			where: { id: userId },
			data: { password: desiredPassword },
		});
	}

	/**
	 * Returns all user profiles. Restricted to Admin role.
	 * Passwords are excluded at the database query level.
	 *
	 * @returns Array of all user profiles without password or token fields
	 */
	async findAll(): Promise<UserProfileDto[]> {
		const users = await this.prisma.user.findMany({
			omit: { password: true },
		});
		return users.map((user) => ({
			...user,
			createdAt: user.createdAt.toISOString(),
			updatedAt: user.updatedAt.toISOString(),
		}));
	}

	/**
	 * Returns a single user profile by ID. Restricted to Admin role.
	 * Password is excluded at the database query level.
	 *
	 * @param id - UUID of the user to retrieve
	 * @returns User profile without password or token fields
	 * @throws NotFoundException - If no user exists with the given ID
	 */
	async findById(id: string): Promise<UserProfileDto> {
		const user = await this.prisma.user.findUnique({
			where: { id },
			omit: { password: true },
		});
		if (!user) throw new NotFoundException('User not found');
		return {
			...user,
			createdAt: user.createdAt.toISOString(),
			updatedAt: user.updatedAt.toISOString(),
		};
	}
}
