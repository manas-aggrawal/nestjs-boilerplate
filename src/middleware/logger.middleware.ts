import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
	private logger = new Logger('HTTP');

	use(req: Request, res: Response, next: (error?: unknown) => void) {
		this.logger.log(
			`Logging HTTP request ${req.method} | ${req.originalUrl} | ${res.statusCode}`,
		);
		next();
	}
}
