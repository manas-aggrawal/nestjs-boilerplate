import { Role } from '@prisma/client';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

// ── Auth response (login / register) ─────────────────────────────────────────
// Includes tokens — only used for login and register endpoints.

export const UserResponseSchema = z.object({
	id: z.uuid().describe('User ID'),
	username: z.string().describe('Username'),
	email: z.email().describe('Email address'),
	firstname: z.string().describe('First name'),
	lastname: z.string().describe('Last name'),
	role: z.enum(Role).describe('User role'),
	createdAt: z.string().describe('Creation timestamp'),
	updatedAt: z.coerce.string().describe('Last update timestamp'),
	access_token: z.string().describe('JWT access token').optional(),
	refresh_token: z.string().describe('JWT refresh token').optional(),
});

export class UserResponseDto extends createZodDto(UserResponseSchema) {}

// ── Profile response ──────────────────────────────────────────────────────────
// Pure user data — no tokens. Used for all profile and admin endpoints.

export const UserProfileSchema = z.object({
	id: z.uuid().describe('User ID'),
	username: z.string().describe('Username'),
	email: z.email().describe('Email address'),
	firstname: z.string().describe('First name'),
	lastname: z.string().describe('Last name'),
	role: z.enum(Role).describe('User role'),
	createdAt: z.string().describe('Creation timestamp'),
	updatedAt: z.coerce.string().describe('Last update timestamp'),
});

export class UserProfileDto extends createZodDto(UserProfileSchema) {}
