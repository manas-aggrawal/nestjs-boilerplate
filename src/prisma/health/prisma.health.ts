import { Injectable } from '@nestjs/common';
import { HealthIndicator, HealthIndicatorResult } from '@nestjs/terminus';
import { PrismaService } from '../prisma.service';
import { logger } from 'src/configs/logger';

@Injectable()
export class PrismaHealthIndicator extends HealthIndicator {
	constructor(private readonly prismaService: PrismaService) {
		super();
	}

	async isHealthy(key: string): Promise<HealthIndicatorResult> {
		try {
			await this.prismaService.$queryRaw`SELECT 1`;
			return this.getStatus(key, true);
		} catch (e) {
			logger.error('Prisma check failed', PrismaHealthIndicator.name);
			return this.getStatus(key, false);
		}
	}
}
