import {
	BadRequestException,
	CanActivate,
	ExecutionContext,
} from '@nestjs/common';
import { Schema, ValidationOptions } from 'joi';
import { Observable } from 'rxjs';

type HttpTypes = 'body' | 'query' | 'params';

export class Validator implements CanActivate {
	private config: ValidationOptions = {
		abortEarly: false,
	};

	constructor(private schema: Schema, private type: HttpTypes) {}

	canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		const data = context.switchToHttp().getRequest()[this.type];
		this.validate(data);
		return true;
	}

	validate(data: unknown) {
		const validation = this.schema.validate(data, this.config);
		if (validation?.error) {
			throw new BadRequestException(validation.error.message);
		}
		return true;
	}
}
