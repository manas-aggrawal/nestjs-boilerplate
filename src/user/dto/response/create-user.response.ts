import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const UserResponseSchema = z.object({
	id: z.uuid().describe('User ID'),
	username: z.string().describe('Username'),
	email: z.email().describe('Email address'),
	firstname: z.string().describe('First name'),
	lastname: z.string().describe('Last name'),
	createdAt: z.string().describe('Creation timestamp'),
	updatedAt: z.coerce.string().describe('Last update timestamp'),
});

export class UserResponseDto extends createZodDto(UserResponseSchema) {}
