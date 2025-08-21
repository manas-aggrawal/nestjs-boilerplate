import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(
	Strategy,
	'local-strategy',
) {
	constructor(private readonly authService: AuthService) {
		super(/*{usernameField: 'email'}*/); // default usernameField is username
	}

	async validate(usernameField: string, password: string) {
		return await this.authService.validateUser(usernameField, password);
	}
}
