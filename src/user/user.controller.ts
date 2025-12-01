import {
	Body,
	Controller,
	Get,
	Logger,
	Post,
	Request,
	UseGuards,
} from '@nestjs/common';
import { UserService } from '@user/user.service';
import { IsPublic } from '@src/auth/decorators/is-public';
import { CreateUserDto } from '../user/dto/request/create-user.request';
import {
	UserResponseDto,
	UserResponseSchema,
} from './dto/response/create-user.response';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ZodResponse } from 'nestjs-zod';
import { AuthService } from '@src/auth/auth.service';
import { LoginPayloadDto } from './dto/request/login.request';
import { LocalGuard } from '@src/auth/guards/local.guard';
import { Request as Req } from 'express';
import { AccessTo } from '@src/auth/decorators/roles';
import { Role } from '@src/enum/role';

@ApiTags('User')
@Controller('users')
export class UserController {
	constructor(
		private readonly userService: UserService,
		private readonly logger: Logger,
		private readonly authService: AuthService,
	) {}

	@IsPublic()
	@Post('/register')
	@ZodResponse({ status: 200, type: UserResponseDto })
	async register(@Body() createUser: CreateUserDto): Promise<UserResponseDto> {
		const { username, password, email, firstname, lastname } = createUser;
		const user = await this.userService.register(
			username,
			email,
			password,
			firstname,
			lastname,
		);
		const token = await this.authService.giveTokens({
			id: user.id,
			email: user.email,
			username: user.username,
			role: user.role,
		});
		return UserResponseSchema.parse({ ...user, ...token });
	}

	@IsPublic()
	@Post('/login')
	@UseGuards(LocalGuard)
	@ZodResponse({ status: 200, type: UserResponseDto })
	async login(
		@Body() body: LoginPayloadDto,
		@Request() req: Req & {
			user: Omit<UserResponseDto, 'access_token' | 'refresh_token'> & {
				password: string;
			};
		},
	): Promise<UserResponseDto> {
		const { user } = req;
		const data = await this.authService.giveTokens({
			id: user.id,
			email: user.email,
			username: user.username,
			role: user.role,
		});
		return UserResponseSchema.parse({ ...data, ...user });
	}

	@Get('/test-rbac')
	@ApiBearerAuth('access-token')
	@AccessTo(Role.ADMIN)
	async testRBAC() {
		return true;
	}
}
