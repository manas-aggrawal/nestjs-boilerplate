import { Module } from '@nestjs/common';
import { CrudSampleService } from './crud-sample.service';
import { CrudSampleController } from './crud-sample.controller';

@Module({
  controllers: [CrudSampleController],
  providers: [CrudSampleService]
})
export class CrudSampleModule {}
