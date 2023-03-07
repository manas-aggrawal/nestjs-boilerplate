import {
	Body,
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
import { ForgotPasswordPayload } from './dto/forgot-password-payload.dto';
import { LoginPayloadDto } from './dto/login.dto';
import { UpdatePasswordPayload } from './dto/update-password-payload.dto';
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
	@Get('/forgot-password')
	async forgotPassword(@Body() forgotPasswordPayload: ForgotPasswordPayload) {
		return await this.authService.forgotPassword(forgotPasswordPayload);
	}

	@IsPublic()
	@Patch('/update-password')
	@UseGuards(ForgotPasswordTokenGuard)
	async updatePassword(
		@Body() updatePasswordPayload: UpdatePasswordPayload,
		@Request() req,
	) {
		return await this.authService.updatePassword(
			updatePasswordPayload.password,
			req.user.id,
		);
	}
}
