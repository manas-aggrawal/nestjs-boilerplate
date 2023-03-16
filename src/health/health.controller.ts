import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
	HealthCheck,
	HealthCheckService,
	HttpHealthIndicator,
} from '@nestjs/terminus';
import { IsPublic } from 'src/auth/decorators/is-public';
import { PrismaHealthIndicator } from 'src/prisma/health/prisma.health';

@Controller()
export class HealthController {
	constructor(
		private health: HealthCheckService,
		private http: HttpHealthIndicator,
		private db: PrismaHealthIndicator,
	) {}

	@IsPublic()
	@Get('/health')
	@ApiTags('Others')
	@HealthCheck()
	async check() {
		const healthCheck = await this.health.check([
			() => this.http.pingCheck('http', 'https://docs.nestjs.com'),
			() => this.db.isHealthy('db'),
		]);
		return {
			status: healthCheck.status,
			details: healthCheck.details,
		};
	}
}
