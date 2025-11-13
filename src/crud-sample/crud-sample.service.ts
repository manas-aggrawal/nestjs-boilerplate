import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { CreateCrudSample } from './interfaces/create-crud-sample.interface';
import { UpdateCrudSample } from './interfaces/update-crud-sample.interface';

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

	async create(data: CreateCrudSample) {
		return await this.prisma.crudSample.create({
			data,
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

	async update(id: string, data: UpdateCrudSample) {
		await this.verifyIfCrudSampleIdExist(id);
		return await this.prisma.crudSample.update({
			where: { id },
			data,
		});
	}

	async remove(id: string) {
		await this.verifyIfCrudSampleIdExist(id);
		return await this.prisma.crudSample.delete({
			where: { id },
		});
	}
}
