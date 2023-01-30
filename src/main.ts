import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		logger: console
	});
	const PORT = process.env.PORT_LOCAL || 3333;

	const config = new DocumentBuilder()
		.setTitle('Nest bp example')
		.setDescription('The Nestjs bp API description')
		.setVersion('1.0')
		.addTag('testTag')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('docs', app, document);
	
	await app.listen(PORT);
	console.log(`Server running on http://localhost:${PORT}`);

}
bootstrap();
