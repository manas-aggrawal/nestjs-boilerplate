import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { logger } from 'src/configs/logger';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
	use(req: Request, res: Response, next: (error?: unknown) => void) {
		logger.info(
			`Logging HTTP request ${req.method} | ${req.originalUrl} | ${res.statusCode}`,
			LoggerMiddleware.name,
		);
		next();
	}
}
