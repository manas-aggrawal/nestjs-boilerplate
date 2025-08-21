import { applyDecorators } from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiOperation,
	ApiProperty,
	ApiResponse,
	ApiTags,
} from '@nestjs/swagger';

export const RefreshTokenSwaggerConfig = () =>
	applyDecorators(
		ApiTags('Auth'),
		ApiBearerAuth('refresh-token'),
		ApiOperation({ summary: 'Refresh the access_token' }),
		ApiResponse({
			status: 200,
			type: RefreshTokenResponseBodyType,
			description:
				'the access_token is used to access all the routes of api and the refresh_token is used to refresh access_token',
		}),
	);

class RefreshTokenResponseBodyType {
	@ApiProperty({ description: 'token to access all routes' })
	access_token: string;
	@ApiProperty({ description: 'token to refresh access_token' })
	refresh_token: string;
}
