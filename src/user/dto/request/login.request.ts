import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

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
