import { ConsoleLogger } from '@nestjs/common';

export class CustomLogger extends ConsoleLogger {
	private logger = (message, stack) => `[${stack}] ${message}`;

	error(message: unknown, stack?: string, context?: string) {
		super.error(this.logger(message, context || stack));
	}
	warn(message: unknown, stack?: string, context?: string) {
		super.warn(this.logger(message, context || stack));
	}
	debug(message: unknown, stack?: string, context?: string) {
		super.debug(this.logger(message, context || stack));
	}
	verbose(message: unknown, stack?: string, context?: string) {
		super.verbose(this.logger(message, context || stack));
	}
	log(message: unknown, stack?: string, context?: string) {
		super.log(this.logger(message, context || stack));
	}
	// setLogLevels?(levels: LogLevel[]) {
	// 	throw new Error('Method not implemented.');
	// }
}
