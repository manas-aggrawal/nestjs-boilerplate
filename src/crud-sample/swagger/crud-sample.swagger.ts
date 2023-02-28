import { ApiProperty } from '@nestjs/swagger';

export class CrudSampleSwaggerEntity {
	@ApiProperty({ description: 'Sample CRUD Id' })
	id: string;
	@ApiProperty({ description: 'Sample CRUD testField1' })
	testField1: string;
	@ApiProperty({ description: 'Sample CRUD testField2' })
	testField2: number;
	@ApiProperty({ description: 'Sample CRUD testField3' })
	testField3: boolean;
}
