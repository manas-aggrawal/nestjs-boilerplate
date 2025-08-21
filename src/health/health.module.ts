import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { PrismaModule } from 'src/prisma/prisma.module';
import { HealthController } from './health.controller';

@Module({
	imports: [TerminusModule, HttpModule, PrismaModule],
	controllers: [HealthController],
})
export class HealthModule {}
