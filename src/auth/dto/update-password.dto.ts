import * as Joi from 'joi';

export const UpdatePasswordPayloadDto = Joi.object({
	password: Joi.string().required().messages({
		'any.required': 'password is required',
		'string.base': 'password must be a string',
	}),
});
