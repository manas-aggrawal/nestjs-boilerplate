import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IsPublic } from './decorators/isPublic';
import { LocalGuard } from './guards/local.guard';
import { RefreshTokenGuard } from './guards/refreshToken.guard';
import { LoginSwaggerConfig } from './swagger/login.swagger';
import { RefreshTokenSwaggerConfig } from './swagger/refreshToken.swagger';

@Controller()
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@IsPublic()
	@Post('/login')
	@LoginSwaggerConfig()
	@UseGuards(LocalGuard)
	async login(@Request() req) {
		return this.authService.giveTokens(req.user);
	}

	@IsPublic()
	@UseGuards(RefreshTokenGuard)
	@RefreshTokenSwaggerConfig()
	@Get('/refresh-token')
	async refreshToken(@Request() req) {
		return this.authService.giveTokens(req.user);
	}
}
