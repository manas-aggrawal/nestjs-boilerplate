import { Role } from '@prisma/client';

export interface DefaultPayload {
	id: string;
	email: string;
	username: string;
	role: Role;
}
