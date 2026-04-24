import { Role } from '@prisma/client';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

// ── Register ──────────────────────────────────────────────────────────────────

const CreateUserSchema = z.object({
	email: z.email(),

	password: z
		.string()
		.min(8, 'Password must be at least 8 characters')
		.regex(/[a-z]/, 'Password must contain at least one lowercase letter')
		.regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
		.regex(/[0-9]/, 'Password must contain at least one number')
		.regex(
			/[^a-zA-Z0-9]/,
			'Password must contain at least one special character',
		),

	firstname: z.string().min(2).max(50),

	lastname: z.string().min(2).max(50).optional(),

	username: z
		.string()
		.min(5, 'Username must be at least 5 characters')
		.max(50, 'Username must be at most 50 characters')
		.toLowerCase()
		.regex(
			/^[a-z0-9]+$/,
			'Username can only contain lowercase letters and numbers',
		),

	role: z.enum(Role),
});

export class CreateUserDto extends createZodDto(CreateUserSchema) {}

// ── Login ─────────────────────────────────────────────────────────────────────

const LoginPayloadSchema = z.object({
	usernameOrEmail: z.email().or(z.string().min(5).max(50)),

	password: z
		.string()
		.min(8, 'Password must be at least 8 characters')
		.regex(/[a-z]/, 'Password must contain at least one lowercase letter')
		.regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
		.regex(/[0-9]/, 'Password must contain at least one number')
		.regex(
			/[^a-zA-Z0-9]/,
			'Password must contain at least one special character',
		),
});

export class LoginPayloadDto extends createZodDto(LoginPayloadSchema) {}

// ── Update profile ────────────────────────────────────────────────────────────

const UpdateUserSchema = z.object({
	firstname: z.string().min(2).max(50).optional(),
	lastname: z.string().min(2).max(50).optional(),
	email: z.email().optional(),
	username: z
		.string()
		.min(5, 'Username must be at least 5 characters')
		.max(50, 'Username must be at most 50 characters')
		.toLowerCase()
		.regex(
			/^[a-z0-9]+$/,
			'Username can only contain lowercase letters and numbers',
		)
		.optional(),
});

export class UpdateUserDto extends createZodDto(UpdateUserSchema) {}

// ── Change password ───────────────────────────────────────────────────────────

const ChangePasswordSchema = z.object({
	currentPassword: z.string().min(1, 'Current password is required'),

	newPassword: z
		.string()
		.min(8, 'Password must be at least 8 characters')
		.regex(/[a-z]/, 'Password must contain at least one lowercase letter')
		.regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
		.regex(/[0-9]/, 'Password must contain at least one number')
		.regex(
			/[^a-zA-Z0-9]/,
			'Password must contain at least one special character',
		),
});

export class ChangePasswordDto extends createZodDto(ChangePasswordSchema) {}
