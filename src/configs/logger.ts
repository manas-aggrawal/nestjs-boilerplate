import { hostname } from 'os';
import { Service } from 'typedi';
import { createLogger, format, transports } from 'winston';

@Service()
export class Logger {
	private logger;
	private hostName: string = hostname();
	private ctxData: Record<string, unknown>;

	constructor() {
		this.logger = createLogger({
			format: format.combine(format.json({ deterministic: false })),
			transports: [new transports.Console()],
		});
	}

	public info(
		message: string,
		source: string,
		data?: Record<string, unknown>,
	): void {
		this.log('info', message, source, data);
	}
	public warn(
		message: string,
		source: string,
		data?: Record<string, unknown>,
	): void {
		this.log('warn', message, source, data);
	}
	public error(
		message: string,
		source: string,
		data?: Record<string, unknown>,
	): void {
		this.log('error', message, source, data);
	}
	public debug(
		message: string,
		source: string,
		data?: Record<string, unknown>,
	): void {
		this.log('debug', message, source, data);
	}

	// this function is used to get request context
	public contextData(ctx: Record<string, unknown>): void {
		this.ctxData = ctx;
	}

	// this fn to add user context
	public userContext(usrCtx: Record<string, unknown>): void {
		this.ctxData.user = usrCtx;
	}

	private log(
		level: string,
		message: string,
		source: string,
		data?: Record<string, unknown>,
	): void {
		const logEntry = {
			timestamp: new Date(),
			level,
			source,
			message,
			data,
			context: this.ctxData,

			hostname: this.hostName,
		};
		this.logger.log(logEntry);
	}
}
export const logger = new Logger();
