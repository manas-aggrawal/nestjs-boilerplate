import { IsString } from 'class-validator';

export class LoginPayload {
	@IsString()
		username: string;
	@IsString()
		password: string;
}
