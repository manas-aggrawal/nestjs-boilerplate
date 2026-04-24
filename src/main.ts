import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import helmet from 'helmet';
import * as bodyParser from 'body-parser';
import { AppModule } from '@src/app.module';
import { PORT, ALLOWED_ORIGINS } from './configs/env-vars';
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
	const app = await NestFactory.create<NestExpressApplication>(AppModule, {
		logger,
	});

	// Helmet sets security-related HTTP headers (HSTS, X-Frame-Options,
	// X-Content-Type-Options, etc.). CSP is disabled here because Swagger UI
	// requires inline scripts — enable and tune it for your production environment.
	app.use(helmet({ contentSecurityPolicy: false }));

	// Limit request body size to prevent large-payload DoS attacks.
	app.use(bodyParser.json({ limit: '10mb' }));
	app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

	// ALLOWED_ORIGINS is a comma-separated list of allowed origins (e.g. "https://app.com,https://admin.com").
	// If unset, CORS is disabled entirely.
	const origins = ALLOWED_ORIGINS
		? ALLOWED_ORIGINS.split(',').map((o) => o.trim())
		: false;
	app.enableCors({
		origin: origins,
		credentials: true,
		methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
	});

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
		.addBearerAuth(
			{ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
			'forgot-password-token',
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
