import {
	Controller,
	Get,
	Patch,
	Post,
	Request,
	UseGuards,
} from '@nestjs/common';
import { Validator } from 'src/configs/validator.guard';
import { AuthService } from './auth.service';
import { IsPublic } from './decorators/is-public';
import { ForgotPasswordPayloadDto } from './dto/forgot-password.dto';
import { LoginPayloadDto } from './dto/login.dto';
import { UpdatePasswordPayloadDto } from './dto/update-password.dto';
import { ForgotPasswordTokenGuard } from './guards/forgot-password-token.guard';
import { LocalGuard } from './guards/local.guard';
import { RefreshTokenGuard } from './guards/refresh-token.guard';
import { LoginSwaggerConfig } from './swagger/login.swagger';
import { RefreshTokenSwaggerConfig } from './swagger/refresh-token.swagger';

@Controller()
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@IsPublic()
	@Post('/login')
	@LoginSwaggerConfig()
	@UseGuards(new Validator(LoginPayloadDto, 'body'), LocalGuard)
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

	@IsPublic()
	@UseGuards(new Validator(ForgotPasswordPayloadDto, 'body'))
	@Get('/forgot-password')
	async forgotPassword(@Request() req) {
		return await this.authService.forgotPassword(req.body);
	}

	@IsPublic()
	@Patch('/update-password')
	@UseGuards(
		new Validator(UpdatePasswordPayloadDto, 'body'),
		ForgotPasswordTokenGuard,
	)
	async updatePassword(@Request() req) {
		return await this.authService.updatePassword(
			req.body.password,
			req.user.id,
		);
	}
}
