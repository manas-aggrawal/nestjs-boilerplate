import {
	BadRequestException,
	CanActivate,
	ExecutionContext,
	Logger,
} from '@nestjs/common';
import { Request } from 'express';
import { Schema, ValidationOptions } from 'joi';
import { Observable } from 'rxjs';

type HttpTypes = 'body' | 'query' | 'params';

export class Validator implements CanActivate {
	private logger = new Logger(Validator.name);
	private config: ValidationOptions = {
		abortEarly: false,
	};

	constructor(
		private schema: Schema,
		private type: HttpTypes,
	) {}

	canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		const req = context.switchToHttp().getRequest();
		if (this.type == 'body') {
			return this.validateBody(req);
		}
		if (this.type == 'params') {
			return this.validateParams(req);
		}
		if (this.type == 'query') {
			return this.validateQuery(req);
		}
		return false;
	}

	validateBody(req: Request) {
		const validation = this.schema.validate(req.body, this.config);
		if (validation?.error) {
			throw new BadRequestException(validation.error.message);
		}
		return true;
	}

	validateParams(req: Request) {
		const validation = this.schema.validate(req.params, this.config);
		if (validation?.error) {
			throw new BadRequestException(validation.error.message);
		}
		return true;
	}

	validateQuery(req: Request) {
		const validation = this.schema.validate(req.query, this.config);
		if (validation?.error) {
			throw new BadRequestException(validation.error.message);
		}
		return true;
	}
}
