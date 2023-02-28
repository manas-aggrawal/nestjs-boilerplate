import { PartialType } from '@nestjs/swagger';
import { CreateCrudSampleDto } from './create-crud-sample.dto';

export class UpdateCrudSampleDto extends PartialType(CreateCrudSampleDto) {}
