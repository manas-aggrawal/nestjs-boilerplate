import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CrudSampleSwaggerEntity } from './crud-sample.swagger';

export const UpdateSwaggerConfig = () =>
	applyDecorators(
		ApiTags('CRUD Sample'),
		ApiOperation({ summary: 'Update' }),
		ApiResponse({
			status: 200,
			type: CrudSampleSwaggerEntity,
			description: 'Update Sample',
		}),
	);
