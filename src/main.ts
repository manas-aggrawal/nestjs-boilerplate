import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { WINSTON_MODULE_NEST_PROVIDER, WinstonModule } from 'nest-winston';
import * as winston from 'winston';

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
	app.useGlobalPipes(new ValidationPipe());
	const PORT = process.env.PORT || 3333;

	const config = new DocumentBuilder()
		.setTitle('Nest bp example')
		.setDescription('The Nestjs boilerplate API description')
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
	SwaggerModule.setup('/docs', app, document);
	await app.listen(PORT);
	logger.log(`Server running on http://localhost:${PORT}`, 'App');
}
bootstrap();
