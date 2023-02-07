import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IsPublic } from './decorators/isPublic';
import { LocalGuard } from './guards/local.guard';
import { RefreshTokenGuard } from './guards/refreshToken.guard';

@Controller()
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@IsPublic()
	@Post('/login')
	@UseGuards(LocalGuard)
	async login(@Request() req) {
		return this.authService.giveTokens(req.user);
	}

	@IsPublic()
	@UseGuards(RefreshTokenGuard)
	@Get('/refresh-token')
	async refreshToken(@Request() req) {
		return this.authService.giveTokens(req.user);
	}
}
