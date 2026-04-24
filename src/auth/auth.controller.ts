import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { IsPublic } from './decorators/is-public';
import { RefreshTokenGuard } from './guards/refresh-token.guard';
import { RefreshTokenSwaggerConfig } from './swagger/refresh-token.swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	/**
	 * Issues a new access token and refresh token using a valid refresh token.
	 * The client should call this when the access token expires (1h) to get a
	 * new one without requiring the user to log in again.
	 *
	 * Pass the refresh token as a Bearer token in the Authorization header.
	 * The RefreshTokenGuard validates it before this handler runs.
	 */
	@IsPublic()
	@UseGuards(RefreshTokenGuard)
	@RefreshTokenSwaggerConfig()
	@Get('/refresh-token')
	async refreshToken(@Request() req) {
		return this.authService.giveTokens(req.user);
	}
}
