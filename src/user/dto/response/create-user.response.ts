import { Role } from '@prisma/client';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const UserResponseSchema = z.object({
	id: z.uuid().describe('User ID'),
	username: z.string().describe('Username'),
	email: z.email().describe('Email address'),
	firstname: z.string().describe('First name'),
	lastname: z.string().describe('Last name'),
	role: z.enum(Role).describe('User role'),
	createdAt: z.string().describe('Creation timestamp'),
	updatedAt: z.coerce.string().describe('Last update timestamp'),
	access_token: z.string().describe('JWT token').optional(),
	refresh_token: z.string().describe('JWT refresh token').optional(),
});

export class UserResponseDto extends createZodDto(UserResponseSchema) {}
