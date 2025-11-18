import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { AppModule } from '@src/app.module';
import { PORT } from './configs/env-vars';
import { ZodValidationPipe, cleanupOpenApiDoc } from 'nestjs-zod';

async function bootstrap() {
	const logger = WinstonModule.createLogger({
		level: 'info',
		format: winston.format.combine(
			winston.format.timestamp(),
			winston.format.errors({ stack: true }),
			winston.format.json(),
		),
		transports: [
			new winston.transports.Console({
				format: winston.format.combine(
					winston.format.colorize(),
					winston.format.simple(),
				),
			}),
			new winston.transports.File({
				filename: 'logs/error.log',
				level: 'error',
			}),
			new winston.transports.File({
				filename: 'logs/combined.log',
			}),
		],
	});
	const app = await NestFactory.create(AppModule, { logger });
	app.useGlobalPipes(new ZodValidationPipe());
	const port = PORT ?? 3333;

	const config = new DocumentBuilder()
		.setTitle('Nest backend framework')
		.setDescription('The Nestjs REST API backend framework')
		.setVersion('1.0')
		.addTag('Auth')
		.addTag('Others')
		.addBearerAuth(
			{ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
			'access-token',
		)
		.addBearerAuth(
			{ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
			'refresh-token',
		)
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('/api/docs', app, cleanupOpenApiDoc(document));
	await app.listen(port);
	logger.log(`Server running on http://localhost:${port}`, 'App');
	logger.log(
		`OpenAPI docs running on http://localhost:${port}/api/docs`,
		'App',
	);
}
bootstrap();
