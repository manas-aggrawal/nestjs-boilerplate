import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { CustomLogger } from './configs/logger';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		logger: new CustomLogger(),
	});
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
	Logger.log(`Server running on http://localhost:${PORT}`, 'App');
}
bootstrap();
