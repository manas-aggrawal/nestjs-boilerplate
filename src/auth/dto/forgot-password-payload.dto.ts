import { IsString } from 'class-validator';

export class ForgotPasswordPayload {
	@IsString()
	username: string;
}
