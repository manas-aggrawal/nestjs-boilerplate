import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
} from '@nestjs/common';
import { CrudSampleService } from './crud-sample.service';
import { CreateCrudSampleDto } from './dto/create-crud-sample.dto';
import { UpdateCrudSampleDto } from './dto/update-crud-sample.dto';
import { CreateSwaggerConfig } from './swagger/create.swagger';
import { DeleteSwaggerConfig } from './swagger/delete.swagger';
import { FindAllSwaggerConfig } from './swagger/find-all.swagger';
import { FindOneSwaggerConfig } from './swagger/find-one.swagger';
import { UpdateSwaggerConfig } from './swagger/update.swagger';

@Controller('crud-sample')
export class CrudSampleController {
	constructor(private readonly crudSampleService: CrudSampleService) {}

	@Post('/')
	@CreateSwaggerConfig()
	create(@Body() createCrudSampleDto: CreateCrudSampleDto) {
		return this.crudSampleService.create(createCrudSampleDto);
	}

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
	@UpdateSwaggerConfig()
	update(
		@Param('id') id: string,
		@Body() updateCrudSampleDto: UpdateCrudSampleDto,
	) {
		return this.crudSampleService.update(id, updateCrudSampleDto);
	}

	@Delete(':id')
	@DeleteSwaggerConfig()
	remove(@Param('id') id: string) {
		return this.crudSampleService.remove(id);
	}
}
