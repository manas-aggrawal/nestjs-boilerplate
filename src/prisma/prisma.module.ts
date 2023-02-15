import { Global, Module } from '@nestjs/common';
import { PrismaHealthIndicator } from './health/prisma.health';
import { PrismaService } from './prisma.service';

@Global()
@Module({
	providers: [PrismaService, PrismaHealthIndicator],
	exports: [PrismaService, PrismaHealthIndicator],
})
export class PrismaModule {}
