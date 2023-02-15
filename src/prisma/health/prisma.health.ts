import { Injectable, Logger } from '@nestjs/common';
import { HealthIndicator, HealthIndicatorResult } from '@nestjs/terminus';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaHealthIndicator extends HealthIndicator {
	private logger = new Logger(PrismaHealthIndicator.name);

	constructor(private readonly prismaService: PrismaService) {
		super();
	}

	async isHealthy(key: string): Promise<HealthIndicatorResult> {
		try {
			await this.prismaService.$queryRaw`SELECT 1`;
			return this.getStatus(key, true);
		} catch (e) {
			this.logger.error('Prisma check failed');
			return this.getStatus(key, false);
		}
	}
}
