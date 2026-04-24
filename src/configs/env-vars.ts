export const {
	PORT,
	PORT_DATABASE,
	PG_USER,
	PG_PASSWORD,
	PG_DATABASE_NAME,
	JWT_ACCESS_TOKEN_SECRET,
	JWT_REFRESH_TOKEN_SECRET,
	JWT_FORGOT_PASSWORD_SECRET,
	DATABASE_URL,
	// Rate limiting (see ThrottlerModule in app.module.ts)
	THROTTLE_TTL,    // Time window in ms, default: 60000 (1 min)
	THROTTLE_LIMIT,  // Max requests per window for general routes, default: 100
	// CORS — comma-separated list of allowed origins; unset = CORS disabled
	ALLOWED_ORIGINS,
} = process.env;
