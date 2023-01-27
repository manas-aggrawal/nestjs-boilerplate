import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

  @Get()
	getHello(): string {
		const a = 'AS';
		return this.appService.getHello();
	}
}
