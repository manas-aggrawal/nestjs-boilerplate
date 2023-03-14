import * as Joi from 'joi';

export const LoginSchema = Joi.object({
	username: Joi.string().required().messages({
		'any.required': 'username is required',
		'string.base': 'username must be a string',
	}),
	password: Joi.string().required().messages({
		'any.required': 'password is required',
		'string.base': 'password must be a string',
	}),
});
