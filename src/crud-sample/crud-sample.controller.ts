import {
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Request,
	UseGuards,
} from '@nestjs/common';
import { Validator } from 'src/configs/validator.guard';
import { CrudSampleService } from './crud-sample.service';
import { CreateSwaggerConfig } from './swagger/create.swagger';
import { DeleteSwaggerConfig } from './swagger/delete.swagger';
import { FindAllSwaggerConfig } from './swagger/find-all.swagger';
import { FindOneSwaggerConfig } from './swagger/find-one.swagger';
import { UpdateSwaggerConfig } from './swagger/update.swagger';
import { CreateCrudSampleSchema } from './validators/create-crud-sample.schema';
import { UpdateCrudSampleSchema } from './validators/update-crud-sample.schema';
import { IsPublic } from 'src/auth/decorators/is-public';

@Controller('crud-sample')
export class CrudSampleController {
	constructor(private readonly crudSampleService: CrudSampleService) {}

	@IsPublic()
	@Post('/')
	@UseGuards(new Validator(CreateCrudSampleSchema, 'body'))
	@CreateSwaggerConfig()
	create(@Request() req) {
		return this.crudSampleService.create(req.body);
	}

	@IsPublic()
	@Get('/')
	@FindAllSwaggerConfig()
	findAll() {
		return this.crudSampleService.findAll();
	}

	@Get(':id')
	@FindOneSwaggerConfig()
	findOne(@Param('id') id: string) {
		return this.crudSampleService.findOne(id);
	}

	@Patch(':id')
	@UseGuards(new Validator(UpdateCrudSampleSchema, 'body'))
	@UpdateSwaggerConfig()
	update(@Param('id') id: string, @Request() req) {
		return this.crudSampleService.update(id, req.body);
	}

	@Delete(':id')
	@DeleteSwaggerConfig()
	remove(@Param('id') id: string) {
		return this.crudSampleService.remove(id);
	}
}
