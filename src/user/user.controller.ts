import { Body, Controller, Logger, Post } from '@nestjs/common';
import { UserService } from '@user/user.service';
import { IsPublic } from '@src/auth/decorators/is-public';
import { CreateUserDto } from '../user/dto/request/create-user.request';
import { UserResponseDto } from './dto/response/create-user.response';
import { CreateUserSwaggerConfig } from '@user/swagger/create-user.swagger';
import { ApiTags } from '@nestjs/swagger';
import { ZodResponse } from 'nestjs-zod';

@ApiTags('User')
@Controller('users')
export class UserController {
	constructor(
		private readonly userService: UserService,
		private readonly logger: Logger,
	) {}
	@IsPublic()
	@Post('/')
	@ZodResponse({ status: 200, type: UserResponseDto })
	async register(@Body() createUser: CreateUserDto): Promise<UserResponseDto> {
		const { username, password, email, firstname, lastname } = createUser;
		return this.userService.register(
			username,
			email,
			password,
			firstname,
			lastname,
		);
	}
}
