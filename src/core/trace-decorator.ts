import { Span, SpanStatusCode, trace } from '@opentelemetry/api';
import { logger } from '@studiographene/nodejs-telemetry';

// active span decorator
export function traceDecorator(target: any, key: string): any {
	let value = target[key];

	const descriptor: PropertyDescriptor = {
		configurable: true,
		enumerable: false,

		get() {
			const _propertyKey = key;

			const originalMethod = value;

			return async function (...args: unknown[]): Promise<unknown> {
				Reflect.defineMetadata('HANDLE_EVENT', event, descriptor.value);
				const tracer = trace.getTracer('telemetry-tracer');

				return tracer.startActiveSpan(
					`${target.constructor.name}.${_propertyKey}`,
					async (span: Span) => {
						logger.info(
							'SPAN STARTS!',
							`${target.constructor.name}.${_propertyKey}`,
						);

						try {
							const result = await originalMethod.apply(this, args);
							span.setStatus({ code: SpanStatusCode.OK });

							return result;
						} catch (err) {
							logger.error(err, `${target.constructor.name}.${_propertyKey}`);
							span.setStatus({
								code: SpanStatusCode.ERROR,
								message: err.message,
							});
							throw err;
						} finally {
							logger.info(
								'SPAN ENDS!',
								`${target.constructor.name}.${_propertyKey}`,
							);
							span.end();
						}
					},
				);
			};
		},

		set(newValue) {
			value = newValue;
		},
	};

	return descriptor;
}
