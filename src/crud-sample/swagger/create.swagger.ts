import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CrudSampleSwaggerEntity } from './crud-sample.swagger';

export const CreateSwaggerConfig = () =>
	applyDecorators(
		ApiTags('CRUD Sample'),
		ApiOperation({ summary: 'Create' }),
		ApiResponse({
			status: 200,
			type: CrudSampleSwaggerEntity,
			description: 'Create Sample',
		}),
	);
