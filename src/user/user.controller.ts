import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Logger,
	Param,	
	Patch,
	Post,
	Request,
	UseGuards,
} from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiOperation,
	ApiResponse,
	ApiTags,
} from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { ZodResponse } from 'nestjs-zod';
import { Request as Req } from 'express';
import { AuthService } from '@src/auth/auth.service';
import { IsPublic } from '@src/auth/decorators/is-public';
import { AccessTo } from '@src/auth/decorators/roles';
import { ForgotPasswordTokenGuard } from '@src/auth/guards/forgot-password-token.guard';
import { LocalGuard } from '@src/auth/guards/local.guard';
import { ForgotPasswordSchema } from '@src/auth/validators/forgot-password.schema';
import { UpdatePasswordSchema } from '@src/auth/validators/update-password.dto';
import { Validator } from '@src/configs/validator.guard';
import { Role } from '@src/enum/role';
import { UserService } from '@user/user.service';
import {
	ChangePasswordDto,
	CreateUserDto,
	LoginPayloadDto,
	UpdateUserDto,
} from './dto/user.request';
import {
	UserProfileDto,
	UserProfileSchema,
	UserResponseDto,
	UserResponseSchema,
} from './dto/user.response';

@ApiTags('User')
@Controller('users')
export class UserController {
	constructor(
		private readonly userService: UserService,
		private readonly logger: Logger,
		private readonly authService: AuthService,
	) {}

	// ── Registration & login ──────────────────────────────────────────────

	/**
	 * Registers a new user account and immediately returns an access and
	 * refresh token so the client can proceed without a separate login step.
	 */
	@IsPublic()
	@Post('/register')
	@Throttle({ default: { ttl: 60000, limit: 10 } })
	@ApiOperation({ summary: 'Register a new user' })
	@ZodResponse({ status: 200, type: UserResponseDto })
	async register(@Body() createUser: CreateUserDto): Promise<UserResponseDto> {
		const { username, password, email, firstname, lastname } = createUser;
		const user = await this.userService.register(
			username,
			email,
			password,
			firstname,
			lastname,
		);
		const token = await this.authService.giveTokens({
			id: user.id,
			email: user.email,
			username: user.username,
			role: user.role,
		});
		return UserResponseSchema.parse({ ...user, ...token });
	}

	/**
	 * Authenticates a user with their username/email and password.
	 * Returns an access token (1h) and a refresh token (8h).
	 * The LocalGuard runs the credential check via the local Passport strategy.
	 */
	@IsPublic()
	@Post('/login')
	@Throttle({ default: { ttl: 60000, limit: 10 } })
	@UseGuards(LocalGuard)
	@ApiOperation({ summary: 'Login with username/email and password' })
	@ZodResponse({ status: 200, type: UserResponseDto })
	async login(
		@Body() body: LoginPayloadDto,
		@Request()
		req: Req & {
			user: Omit<UserResponseDto, 'access_token' | 'refresh_token'> & {
				password: string;
			};
		},
	): Promise<UserResponseDto> {
		const { user } = req;
		const data = await this.authService.giveTokens({
			id: user.id,
			email: user.email,
			username: user.username,
			role: user.role,
		});
		return UserResponseSchema.parse({ ...data, ...user });
	}

	// ── Password reset flow (for locked-out users) ────────────────────────

	/**
	 * Initiates the forgot-password flow for a user who cannot log in.
	 * Returns a short-lived forgot_password_token (15 min) that must be passed
	 * as a Bearer token to PATCH /users/reset-password.
	 *
	 * In production this token should be delivered via email, not returned
	 * directly in the response.
	 */
	@IsPublic()
	@Post('/forgot-password')
	@Throttle({ default: { ttl: 60000, limit: 5 } })
	@UseGuards(new Validator(ForgotPasswordSchema, 'body'))
	@ApiOperation({
		summary: 'Request a password reset token (for locked-out users)',
		description:
			'In production, deliver the token via email rather than returning it in the response.',
	})
	@ApiResponse({ status: 200, description: 'Reset token issued' })
	@ApiResponse({ status: 401, description: 'Username not found' })
	async forgotPassword(@Request() req) {
		return await this.authService.forgotPassword(req.body.username);
	}

	/**
	 * Resets the password using the forgot_password_token issued by
	 * POST /users/forgot-password. Intended for locked-out users only.
	 *
	 * The ForgotPasswordTokenGuard validates the Bearer token before this
	 * handler runs — @IsPublic() is required because the user has no access token.
	 * For password changes by logged-in users, use PATCH /users/change-password.
	 */
	@IsPublic()
	@Patch('/reset-password')
	@HttpCode(204)
	@Throttle({ default: { ttl: 60000, limit: 5 } })
	@UseGuards(
		new Validator(UpdatePasswordSchema, 'body'),
		ForgotPasswordTokenGuard,
	)
	@ApiBearerAuth('forgot-password-token')
	@ApiOperation({
		summary:
			'Reset password using a forgot-password token (for locked-out users)',
	})
	@ApiResponse({ status: 204, description: 'Password reset successfully' })
	@ApiResponse({ status: 401, description: 'Invalid or expired token' })
	async resetPassword(@Request() req): Promise<void> {
		await this.authService.updatePassword(req.body.password, req.user.id);
	}

	// ── Own profile ───────────────────────────────────────────────────────

	/**
	 * Returns the profile of the currently authenticated user.
	 * Requires a valid access token. Password is never included in the response.
	 */
	@Get('/me')
	@ApiBearerAuth('access-token')
	@ApiOperation({ summary: 'Get own profile' })
	@ZodResponse({ status: 200, type: UserProfileDto })
	async getMe(@Request() req): Promise<UserProfileDto> {
		return UserProfileSchema.parse(await this.userService.getMe(req.user.id));
	}

	/**
	 * Updates profile fields for the currently authenticated user.
	 * All fields are optional — only those provided are updated.
	 * Password changes must use PATCH /users/change-password instead.
	 */
	@Patch('/me')
	@ApiBearerAuth('access-token')
	@ApiOperation({ summary: 'Update own profile' })
	@ZodResponse({ status: 200, type: UserProfileDto })
	async updateMe(
		@Body() body: UpdateUserDto,
		@Request() req,
	): Promise<UserProfileDto> {
		return UserProfileSchema.parse(
			await this.userService.updateMe(req.user.id, body),
		);
	}

	/**
	 * Changes the password of the currently authenticated user.
	 * Requires the current password for verification to prevent an attacker
	 * with a stolen access token from locking out the real user.
	 * For forgotten passwords, use the POST /users/forgot-password flow instead.
	 */
	@Patch('/change-password')
	@HttpCode(204)
	@ApiBearerAuth('access-token')
	@ApiOperation({
		summary: 'Change password while logged in',
		description:
			'Requires the current password for verification. For forgotten passwords, use POST /users/forgot-password.',
	})
	@ApiResponse({ status: 204, description: 'Password changed successfully' })
	@ApiResponse({ status: 401, description: 'Current password is incorrect' })
	async changePassword(
		@Body() body: ChangePasswordDto,
		@Request() req,
	): Promise<void> {
		await this.userService.changePassword(
			req.user.id,
			body.currentPassword,
			body.newPassword,
		);
	}

	/**
	 * Permanently deletes the account of the currently authenticated user.
	 * This action is irreversible.
	 */
	@Delete('/me')
	@HttpCode(204)
	@ApiBearerAuth('access-token')
	@ApiOperation({ summary: 'Delete own account' })
	@ApiResponse({ status: 204, description: 'Account deleted successfully' })
	async deleteMe(@Request() req): Promise<void> {
		await this.userService.deleteMe(req.user.id);
	}

	// ── Admin ─────────────────────────────────────────────────────────────

	/**
	 * Returns all user profiles. Restricted to users with the Admin role.
	 * Passwords are never included in the response.
	 */
	@Get('/')
	@AccessTo(Role.ADMIN)
	@ApiBearerAuth('access-token')
	@ApiOperation({ summary: 'List all users (Admin only)' })
	@ApiResponse({ status: 200, type: [UserProfileDto] })
	@ApiResponse({ status: 403, description: 'Forbidden — Admin only' })
	async findAll(): Promise<UserProfileDto[]> {
		return this.userService.findAll();
	}

	/**
	 * Returns a single user profile by their UUID. Restricted to Admin role.
	 * Useful for admin dashboards and user management flows.
	 */
	@Get('/:id')
	@AccessTo(Role.ADMIN)
	@ApiBearerAuth('access-token')
	@ApiOperation({ summary: 'Get a user by ID (Admin only)' })
	@ZodResponse({ status: 200, type: UserProfileDto })
	@ApiResponse({ status: 403, description: 'Forbidden — Admin only' })
	@ApiResponse({ status: 404, description: 'User not found' })
	async findById(@Param('id') id: string): Promise<UserProfileDto> {
		return UserProfileSchema.parse(await this.userService.findById(id));
	}
}
