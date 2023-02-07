import { applyDecorators } from '@nestjs/common';
import {
	ApiBody,
	ApiOperation,
	ApiProperty,
	ApiResponse,
	ApiTags,
} from '@nestjs/swagger';

export const LoginSwaggerConfig = () =>
	applyDecorators(
		ApiTags('Auth'),
		ApiOperation({ summary: 'Login user' }),
		ApiBody({ type: LoginRequestBodyType }),
		ApiResponse({
			status: 200,
			type: LoginResponseBodyType,
			description:
				'the access_token is used to access all the routes of api and the refresh_token is used to refresh access_token',
		}),
	);

class LoginRequestBodyType {
	@ApiProperty({ description: 'username of user' })
	username: string;
	@ApiProperty({ description: 'password of user' })
	password: string;
}

class LoginResponseBodyType {
	@ApiProperty({ description: 'token to access all routes' })
	access_token: string;
	@ApiProperty({ description: 'token to refresh access_token' })
	refresh_token: string;
}
