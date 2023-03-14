import * as Joi from 'joi';

export const ForgotPasswordSchema = Joi.object({
	username: Joi.string().required().messages({
		'any.required': 'username is required',
		'string.base': 'username must be a string',
	}),
});
