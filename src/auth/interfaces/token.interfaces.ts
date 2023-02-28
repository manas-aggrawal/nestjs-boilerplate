export interface UserPayload {
	sub: string;
	id: string;
	username: string;
	iat?: number;
	exp?: number;
}

export interface UserFromJwt {
	id: string;
	username: string;
}
