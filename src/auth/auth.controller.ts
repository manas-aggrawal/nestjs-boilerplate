import {
	Controller,
	Get,
	Patch,
	Post,
	Request,
	UseGuards,
} from '@nestjs/common';
import { Validator } from 'src/configs/validator.guard';
import { traceDecorator } from 'src/core/trace-decorator';
import { AuthService } from './auth.service';
import { IsPublic } from './decorators/is-public';
import { ForgotPasswordTokenGuard } from './guards/forgot-password-token.guard';
import { LocalGuard } from './guards/local.guard';
import { RefreshTokenGuard } from './guards/refresh-token.guard';
import { LoginSwaggerConfig } from './swagger/login.swagger';
import { RefreshTokenSwaggerConfig } from './swagger/refresh-token.swagger';
import { ForgotPasswordSchema } from './validators/forgot-password.schema';
import { LoginSchema } from './validators/login.schema';
import { UpdatePasswordSchema } from './validators/update-password.dto';

@Controller()
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@IsPublic()
	@Post('/login')
	@LoginSwaggerConfig()
	@UseGuards(new Validator(LoginSchema, 'body'), LocalGuard)
	@traceDecorator
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
	@UseGuards(new Validator(ForgotPasswordSchema, 'body'))
	@Get('/forgot-password')
	async forgotPassword(@Request() req) {
		return await this.authService.forgotPassword(req.body.username);
	}

	@IsPublic()
	@Patch('/update-password')
	@UseGuards(
		new Validator(UpdatePasswordSchema, 'body'),
		ForgotPasswordTokenGuard,
	)
	async updatePassword(@Request() req) {
		return await this.authService.updatePassword(
			req.body.password,
			req.user.id,
		);
	}
}
