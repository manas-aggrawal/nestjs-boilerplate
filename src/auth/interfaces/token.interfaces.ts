export interface UserPayload {
	sub: number;
	username: string;
	iat?: number;
	exp?: number;
}

export interface UserFromJwt {
	id: number;
	username: string;
}
