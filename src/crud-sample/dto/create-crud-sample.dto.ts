import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateCrudSampleDto {
	@IsString()
	testField1: string;

	@IsNumber()
	testField2: number;

	@IsBoolean()
	testField3: boolean;
}
