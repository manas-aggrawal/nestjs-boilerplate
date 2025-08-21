import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CrudSampleSwaggerEntity } from './crud-sample.swagger';

export const FindOneSwaggerConfig = () =>
	applyDecorators(
		ApiTags('CRUD Sample'),
		ApiOperation({ summary: 'Find One' }),
		ApiResponse({
			status: 200,
			type: CrudSampleSwaggerEntity,
			description: 'Find One Sample',
		}),
	);
