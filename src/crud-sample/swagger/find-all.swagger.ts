import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CrudSampleSwaggerEntity } from './crud-sample.swagger';

export const FindAllSwaggerConfig = () =>
	applyDecorators(
		ApiTags('CRUD Sample'),
		ApiOperation({ summary: 'Find All' }),
		ApiResponse({
			status: 200,
			type: CrudSampleSwaggerEntity,
			description: 'Find All Sample',
		}),
	);
