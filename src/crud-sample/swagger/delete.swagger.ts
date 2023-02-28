import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CrudSampleSwaggerEntity } from './crud-sample.swagger';

export const DeleteSwaggerConfig = () =>
	applyDecorators(
		ApiTags('CRUD Sample'),
		ApiOperation({ summary: 'Delete' }),
		ApiResponse({
			status: 200,
			type: CrudSampleSwaggerEntity,
			description: 'Delete Sample',
		}),
	);
