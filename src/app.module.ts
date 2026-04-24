import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { AuthModule } from './auth/auth.module';
import { AccessTokenGuard } from './auth/guards/access-token.guard';
import { HealthModule } from './health/health.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module';
import { THROTTLE_TTL, THROTTLE_LIMIT } from './configs/env-vars';

@Module({
	imports: [
		ThrottlerModule.forRoot([
			{
				// Default: 100 requests per minute. Override per-route with @Throttle().
				ttl: Number(THROTTLE_TTL) || 60000,
				limit: Number(THROTTLE_LIMIT) || 100,
			},
		]),
		AuthModule,
		PrismaModule,
		HealthModule,
		UserModule,
	],
	providers: [
		PrismaService,
		{
			// ThrottlerGuard must come before AccessTokenGuard so rate limits are
			// enforced before any auth work happens.
			provide: APP_GUARD,
			useClass: ThrottlerGuard,
		},
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
