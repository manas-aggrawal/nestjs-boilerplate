import * as Joi from 'joi';

export const LoginPayloadDto = Joi.object({
	username: Joi.string().required().messages({
		'any.required': 'username is required',
	}),
	password: Joi.string().required().messages({
		'any.required': 'password is required',
	}),
});
