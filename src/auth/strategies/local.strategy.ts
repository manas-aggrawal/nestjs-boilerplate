import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { UserResponseDto } from '@src/user/dto/response/create-user.response';

@Injectable()
export class LocalStrategy extends PassportStrategy(
	Strategy,
	'local-strategy',
) {
	constructor(private readonly authService: AuthService) {
		super({ usernameField: 'usernameOrEmail' }); // default usernameField is username
	}

	async validate(
		usernameField: string,
		password: string,
	): Promise<
		Omit<
			UserResponseDto,
			'access_token' | 'refresh_token' | 'createdAt' | 'updatedAt'
		>
	> {
		return await this.authService.validateUser(usernameField, password);
	}
}
