import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AccessTokenGuard } from './auth/guards/accessToken.guard';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
	imports: [AuthModule, PrismaModule],
	controllers: [AppController],
	providers: [
		AppService,
		PrismaService,
		{
			provide: APP_GUARD,
			useClass: AccessTokenGuard,
		},
	],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoggerMiddleware).forRoutes('*');
	}
}
