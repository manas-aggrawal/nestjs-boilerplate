import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserResponseDto } from '@user/dto/response/create-user.response';

export const CreateUserSwaggerConfig = () =>
	applyDecorators(
		ApiOperation({ summary: 'Create User' }),
		ApiResponse({
			status: 200,
			type: UserResponseDto,
			description: 'Create User',
		}),
	);
