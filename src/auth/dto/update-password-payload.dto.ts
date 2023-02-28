import { IsString } from 'class-validator';

export class UpdatePasswordPayload {
	@IsString()
	password: string;
}
