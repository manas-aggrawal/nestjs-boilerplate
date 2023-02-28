import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCrudSampleDto } from './dto/create-crud-sample.dto';
import { UpdateCrudSampleDto } from './dto/update-crud-sample.dto';

@Injectable()
export class CrudSampleService {
	constructor(private prisma: PrismaService) {}

	async verifyIfCrudSampleIdExist(id: string) {
		const crudSampleIdExist = await this.prisma.crudSample.findFirst({
			where: { id },
		});
		if (!crudSampleIdExist) {
			throw new BadRequestException('id not found');
		}
	}

	async create(createCrudSampleDto: CreateCrudSampleDto) {
		return await this.prisma.crudSample.create({
			data: createCrudSampleDto,
		});
	}

	async findAll() {
		return await this.prisma.crudSample.findMany();
	}

	async findOne(id: string) {
		await this.verifyIfCrudSampleIdExist(id);
		return await this.prisma.crudSample.findFirst({
			where: {
				id,
			},
		});
	}

	async update(id: string, updateCrudSampleDto: UpdateCrudSampleDto) {
		await this.verifyIfCrudSampleIdExist(id);
		return await this.prisma.crudSample.update({
			where: { id },
			data: updateCrudSampleDto,
		});
	}

	async remove(id: string) {
		await this.verifyIfCrudSampleIdExist(id);
		return await this.prisma.crudSample.delete({
			where: { id },
		});
	}
}
