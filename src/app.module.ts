import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { AccessTokenGuard } from './auth/guards/access-token.guard';
import { CrudSampleModule } from './crud-sample/crud-sample.module';
import { HealthModule } from './health/health.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module';

@Module({
	imports: [AuthModule, PrismaModule, HealthModule, CrudSampleModule, UserModule],
	providers: [
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
