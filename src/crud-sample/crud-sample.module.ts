import { Module } from '@nestjs/common';
import { CrudSampleController } from './crud-sample.controller';
import { CrudSampleService } from './crud-sample.service';

@Module({
	controllers: [CrudSampleController],
	providers: [CrudSampleService],
})
export class CrudSampleModule {}
